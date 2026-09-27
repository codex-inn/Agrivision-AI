"""
AgriVision AI real model training script.

Train locally or in Google Colab after preparing a dataset with one folder per
final disease/healthy class.

Example:
  dataset/
    Rice___Healthy/
    Rice___Blast/
    Wheat___Healthy/
    ...

The script trains EfficientNetB0 with transfer learning, evaluates on a held-out
test set, saves the Keras model, exports TensorFlow.js files, and writes labels.

This script never creates synthetic/fake predictions.
"""

import json
import os
import random
import shutil
from pathlib import Path

import numpy as np
import tensorflow as tf

SEED = 42
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS_HEAD = 8
EPOCHS_FINE = 12

DATASET_DIR = Path(os.environ.get("AGRIVISION_DATASET", "dataset"))
OUTPUT_DIR = Path("models/agrivision_tfjs")
KERAS_DIR = Path("models/agrivision_keras")

AUTOTUNE = tf.data.AUTOTUNE

random.seed(SEED)
np.random.seed(SEED)
tf.random.set_seed(SEED)


def collect_files():
    extensions = {".jpg", ".jpeg", ".png", ".webp"}
    rows = []

    for class_dir in sorted(DATASET_DIR.iterdir()):
        if not class_dir.is_dir():
            continue
        label = class_dir.name
        for p in class_dir.rglob("*"):
            if p.is_file() and p.suffix.lower() in extensions:
                rows.append((str(p), label))

    if len(rows) < 100:
        raise RuntimeError(
            f"Only {len(rows)} images found. Add a real labelled dataset first."
        )

    labels = sorted({label for _, label in rows})
    if len(labels) < 2:
        raise RuntimeError("At least two real classes are required.")

    return rows, labels


def split_rows(rows):
    by_label = {}
    for path, label in rows:
        by_label.setdefault(label, []).append(path)

    train, val, test = [], [], []

    for label, paths in by_label.items():
        random.shuffle(paths)
        n = len(paths)

        if n < 5:
            raise RuntimeError(
                f"Class '{label}' has only {n} images. "
                "Each class needs enough real images for train/validation/test."
            )

        n_test = max(1, round(n * 0.15))
        n_val = max(1, round(n * 0.15))

        test_paths = paths[:n_test]
        val_paths = paths[n_test:n_test + n_val]
        train_paths = paths[n_test + n_val:]

        train += [(p, label) for p in train_paths]
        val += [(p, label) for p in val_paths]
        test += [(p, label) for p in test_paths]

    return train, val, test


def make_dataset(rows, label_to_id, shuffle=False):
    paths = [p for p, _ in rows]
    ids = [label_to_id[label] for _, label in rows]

    ds = tf.data.Dataset.from_tensor_slices((paths, ids))

    def load(path, label):
        image = tf.io.read_file(path)
        image = tf.image.decode_image(image, channels=3, expand_animations=False)
        image = tf.image.resize(image, IMG_SIZE)
        image = tf.cast(image, tf.float32)
        return image, label

    ds = ds.map(load, num_parallel_calls=AUTOTUNE)
    if shuffle:
        ds = ds.shuffle(min(len(rows), 2000), seed=SEED)

    return ds.batch(BATCH_SIZE).prefetch(AUTOTUNE)


def build_model(num_classes):
    augmentation = tf.keras.Sequential(
        [
            tf.keras.layers.RandomFlip("horizontal"),
            tf.keras.layers.RandomRotation(0.08),
            tf.keras.layers.RandomZoom(0.10),
            tf.keras.layers.RandomContrast(0.10),
        ],
        name="augmentation",
    )

    base = tf.keras.applications.EfficientNetB0(
        include_top=False,
        weights="imagenet",
        input_shape=(*IMG_SIZE, 3),
    )
    base.trainable = False

    inputs = tf.keras.Input(shape=(*IMG_SIZE, 3), name="image")
    x = augmentation(inputs)
    x = tf.keras.applications.efficientnet.preprocess_input(x)
    x = base(x, training=False)
    x = tf.keras.layers.GlobalAveragePooling2D()(x)
    x = tf.keras.layers.Dropout(0.25)(x)
    outputs = tf.keras.layers.Dense(
        num_classes, activation="softmax", name="predictions"
    )(x)

    model = tf.keras.Model(inputs, outputs, name="AgriVision_EfficientNetB0")

    model.compile(
        optimizer=tf.keras.optimizers.Adam(1e-3),
        loss="sparse_categorical_crossentropy",
        metrics=["accuracy"],
    )
    return model, base


def main():
    rows, labels = collect_files()
    label_to_id = {label: i for i, label in enumerate(labels)}

    train_rows, val_rows, test_rows = split_rows(rows)

    print(f"Images: {len(rows)}")
    print(f"Classes: {len(labels)}")
    print(f"Train: {len(train_rows)} | Val: {len(val_rows)} | Test: {len(test_rows)}")

    train_ds = make_dataset(train_rows, label_to_id, shuffle=True)
    val_ds = make_dataset(val_rows, label_to_id)
    test_ds = make_dataset(test_rows, label_to_id)

    model, base = build_model(len(labels))

    callbacks = [
        tf.keras.callbacks.EarlyStopping(
            monitor="val_accuracy", patience=4, restore_best_weights=True
        ),
        tf.keras.callbacks.ModelCheckpoint(
            "best_agrivision.keras",
            monitor="val_accuracy",
            save_best_only=True,
        ),
    ]

    model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=EPOCHS_HEAD,
        callbacks=callbacks,
    )

    # Fine-tune only the top portion of the ImageNet backbone.
    base.trainable = True
    for layer in base.layers[:-40]:
        layer.trainable = False

    model.compile(
        optimizer=tf.keras.optimizers.Adam(1e-5),
        loss="sparse_categorical_crossentropy",
        metrics=["accuracy"],
    )

    model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=EPOCHS_FINE,
        callbacks=callbacks,
    )

    model = tf.keras.models.load_model("best_agrivision.keras")
    loss, accuracy = model.evaluate(test_ds, verbose=1)

    print(f"HELD-OUT TEST ACCURACY: {accuracy:.4f}")

    KERAS_DIR.mkdir(parents=True, exist_ok=True)
    model.save(KERAS_DIR / "agrivision_efficientnetb0.keras")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # TensorFlow.js converter is installed separately:
    # pip install tensorflowjs
    import tensorflowjs as tfjs

    tfjs.converters.save_keras_model(model, str(OUTPUT_DIR))

    (OUTPUT_DIR / "labels.json").write_text(
        json.dumps(
            {
                "labels": labels,
                "input_size": [IMG_SIZE[0], IMG_SIZE[1]],
                "model": "EfficientNetB0",
                "test_accuracy": float(accuracy),
            },
            indent=2,
        ),
        encoding="utf-8",
    )

    print("REAL MODEL EXPORT COMPLETE")
    print(f"TensorFlow.js model: {OUTPUT_DIR}")
    print(f"Labels: {OUTPUT_DIR / 'labels.json'}")


if __name__ == "__main__":
    main()
