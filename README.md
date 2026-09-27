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

---

## 🎬 5-Second 3D AI Scan Preview

The AgriVision AI website template is designed to support a short **5-second 3D animated scan presentation** for demonstrations, project reviews, and the landing-page experience.

### Animation sequence

| Time | Scene |
|---|---|
| **0–1 s** | 🌿 Leaf appears with a clean 3D entrance |
| **1–2 s** | 🔍 AI scanning beam moves across the leaf |
| **2–3 s** | 🧠 AI analysis indicator and detection grid animate |
| **3–4 s** | 📊 Confidence/result card appears |
| **4–5 s** | 🌱 Final AgriVision AI result settles into the interface |

### Suggested visual flow

```text
3D Leaf
   ↓
AI SCANNING
   ↓
ANALYSING PLANT HEALTH
   ↓
Disease Detected
   ↓
Crop + Disease + Confidence
   ↓
TNAU Reference
```

The animation is intended as a **visual UI demonstration**, while the actual disease prediction continues to come from the deployed AgriVision image-classification model.

---

## ✨ Premium Website Experience

AgriVision AI follows a modern agriculture + artificial-intelligence interface concept.

### Main experience

- 🌿 Clean agricultural visual identity
- 🤖 AI-powered plant health scanner
- 📷 Leaf image upload and preview
- 🔍 Animated scanning state
- 📊 Confidence-based result display
- 🌾 Crop and disease identification
- 📚 TNAU disease reference connection
- 🕘 Scan history
- 📱 Responsive website layout
- 🧠 Optional offline Ollama explanation layer
- ⚡ Browser-based TensorFlow.js inference
- 🔒 No fake diagnosis generation

### Result presentation

A typical result is presented as:

```text
AGRI VISION AI
────────────────────────

CROP
Rice

DETECTED CONDITION
Leaf Blast

AI CONFIDENCE
87%

TNAU DISEASE REFERENCE
Available

STATUS
AI screening result
```

The confidence value is produced by the deployed model. The 3D animation is only a presentation layer and does not change the model prediction.

---

## 🧩 System Architecture

```text
                    AGRIVISION AI
                         │
              ┌──────────┴──────────┐
              │                     │
         Leaf Scanner          Disease Library
              │                     │
              ▼                     ▼
       TensorFlow.js             TNAU Data
              │                     │
              ▼                     │
        EfficientNetB0             │
              │                     │
              └──────────┬──────────┘
                         ▼
                  Result Interface
                         │
              ┌──────────┴──────────┐
              │                     │
        3D Scan Animation      Optional Ollama
              │                     │
              ▼                     ▼
          User Result        Offline Explanation
```

---

## 🏆 Project Summary

**AgriVision AI** is a browser-based agricultural AI project that brings together:

**Real Image AI + Agricultural Knowledge + Modern UI + Optional Offline AI**

The current deployment focuses on six crops and eighteen image classes. The system is structured so additional crops, disease classes, agricultural references, and local AI capabilities can be added in future versions.

### Core concept

> **Scan the leaf. Understand the crop health. Connect the result with agricultural knowledge.**

---

