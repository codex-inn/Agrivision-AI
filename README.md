# 🌱 AgriVision AI

## AI-Powered Crop Health Intelligence

AgriVision AI is an agriculture-focused artificial intelligence project for plant health and disease detection. It combines a real trained image-classification model with a crop disease knowledge/reference layer to help users analyse plant leaf images and understand possible crop health problems.

> **Project:** B.Sc. Agriculture – Final Year Project  
> **Institution:** Tamil Nadu Agricultural University (TNAU)  
> **Campus:** Agricultural College & Research Institute, Vazhavachanur (AC&RI VVNR)

---

## 🎯 Project Objective

**Leaf Image → AI Model → Crop/Disease Prediction → Confidence → TNAU Disease Reference → Agricultural Information**

The system is designed as a decision-support and educational tool. AI results should be verified with field symptoms and qualified agricultural advice before making crop-management decisions.

---

## 🤖 AI Model

The deployed model is a real **EfficientNetB0** image-classification model converted to **TensorFlow.js** for browser-based inference.

- **Architecture:** EfficientNetB0
- **Input:** 224 × 224 RGB image
- **Output:** 18 classes
- **Crops covered:** 6
- **Inference:** TensorFlow.js
- **Model format:** TensorFlow.js Graph Model
- **Confidence threshold:** 60%
- **Held-out test-set accuracy during training:** **92.45%**

### Supported crops

- 🌾 Rice
- 🌾 Wheat
- 🌽 Maize
- 🌿 Cotton
- 🎋 Sugarcane
- 🥜 Groundnut

### Current model classes

| Crop | Classes |
|---|---|
| Cotton | Bacterial Blight, Curl Virus, Healthy |
| Groundnut | Healthy, Late Leaf Spot, Nutrition Deficiency |
| Maize | Leaf Spot, Streak Virus, Healthy |
| Rice | Brown Spot, Healthy, Leaf Blast |
| Sugarcane | Brown Spot, Grassy Shoot Disease, Healthy |
| Wheat | Brown Rust, Healthy, Yellow Rust |

**Note:** Chickpea/Pulses is currently not included in the deployed image model.

---

## 🧠 AI + Agricultural Knowledge Layer

### Image AI
EfficientNetB0 analyses the uploaded leaf image and returns the highest-probability class and confidence.

### TNAU disease reference
The project includes a structured disease reference based on the **TNAU Crop Protection disease portal**, connecting supported crops and diseases with agricultural reference information.

### Optional local AI
The architecture can be extended with **Ollama** for offline text-based analysis. DeepSeek, Qwen, or Llama can explain an already-detected result, while EfficientNet remains the primary image classifier.

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

## 🔄 Application Workflow

1. User selects a plant leaf image.
2. Browser resizes it to 224 × 224.
3. TensorFlow.js loads the deployed AgriVision model.
4. EfficientNetB0 produces 18 class probabilities.
5. The highest-confidence class is selected.
6. Low-confidence predictions are treated as uncertain.
7. Class metadata provides the crop and disease name.
8. The result is connected with the TNAU disease reference library.
9. The result is displayed in the scanner and scan history.

---

## 🛡️ Safety & Reliability

AgriVision AI does **not** report a disease when model confidence is below the configured threshold.

The **92.45% figure is held-out test-set accuracy from the project training evaluation**, not a guarantee of field-level diagnostic accuracy.

Results can vary with lighting, camera quality, leaf age, crop variety, growth stage, field conditions, and multiple simultaneous stresses. Use the system as screening/support information rather than a substitute for professional diagnosis.

---

## 🌐 Technology Stack

- HTML5
- CSS3
- JavaScript
- React
- TensorFlow.js
- EfficientNetB0
- JSON
- GitHub Pages
- TNAU agricultural disease reference data
- Optional Ollama local AI layer

---

## 🚀 Deployment

The project is deployed as a static web application using GitHub Pages.

**Live website:** https://codex-inn.github.io/Agrivision-AI/  
**Repository:** https://github.com/codex-inn/Agrivision-AI/

---

## 📚 Training & Development

Training resources are maintained under `ai-training/`.

The browser inference model is stored under `models/agrivision_tfjs/`.

The original training dataset is **not included in this repository**; only the required trained inference artifacts are deployed.

---

## 🏫 Academic Project

**AgriVision AI**  
**AI-Powered Crop Health Intelligence**

B.Sc. Agriculture – Final Year Project  
Tamil Nadu Agricultural University (TNAU)  
Agricultural College & Research Institute, Vazhavachanur (AC&RI VVNR)

**Student:** KOWSHIK S

---

## 📌 Project Status

- ✅ Frontend deployed
- ✅ Real AI model deployed
- ✅ TensorFlow.js browser inference configured
- ✅ 18-class / 6-crop model
- ✅ TNAU disease reference layer
- ✅ Confidence-based uncertainty handling
- ✅ Project documentation
- 🔄 Optional Ollama offline analysis can be integrated separately

---

## 📄 License & Attribution

This repository contains project source code and trained inference artifacts. Dataset licensing and attribution should follow the original dataset terms.

Agricultural disease reference information is connected to Tamil Nadu Agricultural University Crop Protection resources.

---

### 🌱 AgriVision AI
**AI-Powered Crop Health Intelligence**
