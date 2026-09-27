# AgriVision AI — Real Model Training (Google Colab)

This notebook is the execution guide for the real AgriVision AI model.

## 1. Install
!pip -q install tensorflow tensorflowjs scikit-learn pillow

## 2. Upload / mount dataset
# Mount Google Drive and put your labelled images at:
# /content/drive/MyDrive/AgriVisionAI/dataset/
from google.colab import drive
drive.mount('/content/drive')

import os
os.environ["AGRIVISION_DATASET"] = "/content/drive/MyDrive/AgriVisionAI/dataset"

## 3. Expected classes
# Each folder must contain REAL labelled images.
#
# Rice___Healthy
# Rice___<verified disease>
# Wheat___Healthy
# Wheat___<verified disease>
# Maize___Healthy
# Maize___<verified disease>
# Cotton___Healthy
# Cotton___<verified disease>
# Sugarcane___Healthy
# Sugarcane___<verified disease>
# Groundnut___Healthy
# Groundnut___<verified disease>
# Chickpea___Healthy
# Chickpea___<verified disease>

## 4. Copy the AgriVision training script
# Download ai-training/train_agrivision.py from the GitHub repository,
# or paste its contents into a Colab cell/file.

## 5. Run training
!python ai-training/train_agrivision.py

## 6. Verify output
# Required browser files:
# models/agrivision_tfjs/model.json
# models/agrivision_tfjs/*.bin
# models/agrivision_tfjs/labels.json
#
# IMPORTANT:
# Do not publish the model unless held-out test accuracy and per-class
# performance have been checked.

## 7. Copy the trained TensorFlow.js folder into:
# Agrivision-AI/models/agrivision_tfjs/

print("Training pipeline ready.")
