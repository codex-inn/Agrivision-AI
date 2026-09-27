# Real AI Setup Guide

## Current status

The website is connected to TensorFlow.js inference, but there is deliberately no fake model.

## What is required

A real labelled dataset must be prepared before training.

### Target crop groups

- Rice
- Wheat
- Maize
- Cotton
- Sugarcane
- Groundnut
- Chickpea (the first concrete pulse crop)

### Dataset rule

Do not mix incompatible disease names or rename a class unless the source dataset documents that disease/class.

Use one folder per final class:

`Crop___Disease`

Example:

`Rice___Healthy`
`Rice___Blast`

### Training

The repository contains an EfficientNetB0 transfer-learning script. It:
- creates train/validation/test splits,
- trains a real classifier,
- evaluates on held-out data,
- exports TensorFlow.js files,
- writes the exact class labels.

### Browser deployment

After training, copy:

`models/agrivision_tfjs/model.json`
and all `.bin` files plus `labels.json`

into this repository.

GitHub Pages can then load the model directly in the browser.

## Important scientific limitation

A high test accuracy alone does not prove field accuracy. The final project should report the dataset source, class counts, held-out test results, confusion matrix/per-class metrics, and limitations such as background, lighting, camera, cultivar, and field conditions.

## Dataset source note

A public GitHub project documents an Indian-crops dataset with 2,166 images and 35 classes, including Rice, Wheat, Cotton, Sugarcane, Maize and Chickpea. This is useful as a lead for dataset preparation, but its exact provenance/licensing and class definitions must be checked before redistribution or publication.

PlantVillage is another widely used plant-disease benchmark, but it does not by itself provide all seven requested crop groups, so it should not be presented as the complete AgriVision seven-crop dataset.

## No fake AI

Until the trained model files exist, the scanner must show that the model is unavailable rather than inventing a disease or confidence score.
