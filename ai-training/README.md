# AgriVision AI — Real Model Training

This folder contains the browser-compatible training pipeline for AgriVision AI.

## Target crops

1. Rice
2. Wheat
3. Maize
4. Cotton
5. Sugarcane
6. Groundnut
7. Pulses — represented by Chickpea for the first model

## Model

- Transfer learning: EfficientNetB0
- Input: 224 x 224 RGB
- Output: disease/healthy classes
- Framework: TensorFlow/Keras
- Browser deployment target: TensorFlow.js

## Important

The model is NOT pre-generated in this repository. Predictions must only be produced after a real trained model is created and validated.

## Training data

A 2026 Mendeley dataset (CC BY 4.0) contains Rice, Wheat, Maize, Cotton, Sugarcane and Groundnut among 15 crops and 45 disease/healthy classes. It is 4.15 GB.

For the first seven-crop build, Chickpea is used as the concrete "Pulses" crop. A separate Chickpea dataset/class set must be added before training.

## Expected dataset layout

Put images into folders named by final class:

dataset/
  Rice___Healthy/
  Rice___DiseaseName/
  Wheat___Healthy/
  ...
  Groundnut___DiseaseName/
  Chickpea___Healthy/
  Chickpea___DiseaseName/

The training script creates train/validation/test splits without putting duplicate images across splits.

## Output

The training process will create:

- models/agrivision_tfjs/model.json
- models/agrivision_tfjs/*.bin
- models/agrivision_tfjs/labels.json
- models/agrivision_tfjs/model_metadata.json

Do not upload a fake placeholder model. Only upload these files after actual training and evaluation.
