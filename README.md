# 🌱 AgriVision AI

## AI-Powered Crop Health Intelligence

AgriVision AI is a browser-based agricultural AI project developed for plant health and disease screening. It combines a real trained image-classification model, agricultural disease reference data, and a simple modern web interface.

> **B.Sc. Agriculture – Final Year Project**  
> **Tamil Nadu Agricultural University (TNAU)**  
> **Agricultural College & Research Institute, Vazhavachanur (AC&RI VVNR)**  
> **Student: KOWSHIK S**

---

## 🎯 Project Overview

AgriVision AI follows a simple workflow:

**Leaf Image → AI Prediction → Crop & Disease → Confidence → TNAU Reference**

The system is designed to provide quick preliminary plant-health information from leaf images. Results are intended for screening and educational use and should be verified with field symptoms and agricultural expertise.

---

## 🤖 Real AI Model

The website uses a real **EfficientNetB0** image-classification model converted to **TensorFlow.js** for browser inference.

- **Input:** 224 × 224 RGB leaf image
- **Output:** 18 classes
- **Supported crops:** 6
- **Inference:** TensorFlow.js
- **Model format:** TensorFlow.js Graph Model
- **Confidence threshold:** 60%
- **Held-out test-set accuracy:** 92.45%

### Supported Crops

| Crop | Detected Classes |
|---|---|
| Rice | Brown Spot, Healthy, Leaf Blast |
| Wheat | Brown Rust, Healthy, Yellow Rust |
| Maize | Leaf Spot, Streak Virus, Healthy |
| Cotton | Bacterial Blight, Curl Virus, Healthy |
| Sugarcane | Brown Spot, Grassy Shoot Disease, Healthy |
| Groundnut | Healthy, Late Leaf Spot, Nutrition Deficiency |

**Current scope:** Chickpea/Pulses is not included in the deployed image model.

---

## 🧠 Agricultural Knowledge Layer

The AI prediction is connected with a structured disease reference based on **Tamil Nadu Agricultural University Crop Protection resources**.

This layer helps connect a detected crop/disease with relevant agricultural reference information rather than relying only on the model label.

---

## 📁 Project Structure

```text
Agrivision-AI/
├── index.html
├── style.css
├── script.js
├── README.md
│
├── data/
│   └── tnau_diseases.json
│
├── models/
│   ├── agrivision_tfjs/
│   │   ├── model.json
│   │   ├── group1-shard1of4.bin
│   │   ├── group1-shard2of4.bin
│   │   ├── group1-shard3of4.bin
│   │   ├── group1-shard4of4.bin
│   │   └── labels.json
│   ├── efficientnet_b4/
│   │   └── README.md
│   └── plant_disease_tfjs/
│       └── README.md
│
├── ai-training/
│   ├── train_agrivision.py
│   ├── COLAB_TRAINING.md
│   ├── REAL_AI_SETUP.md
│   ├── labels.json
│   └── README.md
│
└── .github/
    └── workflows/
        └── static.yml
```

---

## 🔄 How It Works

1. User uploads a plant leaf image.
2. The browser resizes the image to 224 × 224.
3. TensorFlow.js loads the deployed AgriVision model.
4. EfficientNetB0 calculates probabilities for 18 classes.
5. The highest-confidence class is selected.
6. Low-confidence results are treated as uncertain.
7. Class metadata identifies the crop and disease.
8. The result is connected to the TNAU disease reference.
9. The result and confidence are shown in the website.

---

## ✨ Key Features

- 🌿 Real leaf-image AI screening
- 🤖 EfficientNetB0 browser inference
- 📷 Image upload and preview
- 📊 Confidence-based results
- 🌾 Six supported crops
- 📚 TNAU disease reference integration
- 🕘 Scan history
- 📱 Responsive web interface
- ⚡ Static GitHub Pages deployment
- 🧠 Optional Ollama offline explanation layer
- 🚫 No fake diagnosis generation

---

## 🛡️ Reliability

The **92.45% accuracy** value is the held-out test-set accuracy from model evaluation. It should not be interpreted as guaranteed field-level diagnostic accuracy.

Performance can vary with image quality, lighting, leaf age, crop variety, growth stage, and field conditions. The system should therefore be used as a screening/support tool and not as a replacement for professional diagnosis.

---

## 🧩 Technology Stack

- HTML5
- CSS3
- JavaScript
- React
- TensorFlow.js
- EfficientNetB0
- JSON
- GitHub Pages
- TNAU agricultural disease reference data
- Optional Ollama local AI

---

## 🚀 Deployment

**Live Website:**  
https://codex-inn.github.io/Agrivision-AI/

**GitHub Repository:**  
https://github.com/codex-inn/Agrivision-AI/

The original training dataset is not stored in this repository. The repository contains the trained browser inference artifacts and project source files required for deployment.

---

## 🏫 Academic Project

**AgriVision AI**  
**AI-Powered Crop Health Intelligence**

B.Sc. Agriculture – Final Year Project  
Tamil Nadu Agricultural University (TNAU)  
Agricultural College & Research Institute, Vazhavachanur (AC&RI VVNR)

**Student:** KOWSHIK S

---

## 📌 Current Status

- ✅ Web application deployed
- ✅ Real AI model deployed
- ✅ TensorFlow.js inference configured
- ✅ 18-class / 6-crop model
- ✅ TNAU disease reference layer
- ✅ Confidence-based uncertainty handling
- ✅ Project documentation
- 🔄 Optional Ollama integration

---

## 📄 Attribution

Dataset licensing and attribution follow the original dataset terms. Agricultural disease reference information is connected to Tamil Nadu Agricultural University Crop Protection resources.

---

### 🌱 AgriVision AI
**AI-Powered Crop Health Intelligence**
