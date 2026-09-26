let selectedImage = null;
let currentLanguage = "en";

const imageInput = document.getElementById("imageInput");
const cameraInput = document.getElementById("cameraInput");
const preview = document.getElementById("imagePreview");
const previewContainer = document.getElementById("previewContainer");
const analyzeBtn = document.getElementById("analyzeBtn");
const resultSection = document.getElementById("resultSection");
const resultContent = document.getElementById("resultContent");
const languageBtn = document.getElementById("languageBtn");


// ===============================
// LANGUAGE
// ===============================

function updateLanguage() {
    document.querySelectorAll("[data-en][data-ta]").forEach(element => {
        element.textContent =
            currentLanguage === "en"
                ? element.dataset.en
                : element.dataset.ta;
    });

    if (languageBtn) {
        languageBtn.textContent =
            currentLanguage === "en"
                ? "🌐 தமிழ்"
                : "🌐 English";
    }
}

if (languageBtn) {
    languageBtn.addEventListener("click", () => {
        currentLanguage = currentLanguage === "en" ? "ta" : "en";
        updateLanguage();
    });
}


// ===============================
// IMAGE HANDLING
// ===============================

function handleImage(file) {

    if (!file) return;

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    if (!allowedTypes.includes(file.type)) {
        alert("Please upload JPG, PNG or WEBP image.");
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        alert("Image size must be below 10 MB.");
        return;
    }

    selectedImage = file;

    const imageURL = URL.createObjectURL(file);

    preview.src = imageURL;
    previewContainer.style.display = "block";

    analyzeBtn.disabled = false;

    resultSection.style.display = "none";
}


// Gallery upload
if (imageInput) {
    imageInput.addEventListener("change", (event) => {
        handleImage(event.target.files[0]);
    });
}


// Camera upload
if (cameraInput) {
    cameraInput.addEventListener("change", (event) => {
        handleImage(event.target.files[0]);
    });
}


// ===============================
// AI ANALYSIS
// ===============================

if (analyzeBtn) {

    analyzeBtn.addEventListener("click", async () => {

        if (!selectedImage) {
            alert("Please upload a leaf image first.");
            return;
        }

        analyzeBtn.disabled = true;

        analyzeBtn.innerHTML = "🔄 Analyzing...";

        resultSection.style.display = "block";

        resultContent.innerHTML = `
            <div class="analysis-status">

                <div style="font-size:48px;">🔄</div>

                <h3>AI Analysis</h3>

                <p>
                    <strong>Server Busy</strong>
                </p>

                <p>
                    The AI disease detection model is currently
                    unavailable.
                </p>

                <p>
                    Please try again later.
                </p>

            </div>
        `;

        // Model will be connected here later.

        setTimeout(() => {

            analyzeBtn.disabled = false;

            analyzeBtn.innerHTML =
                currentLanguage === "en"
                    ? "🔍 Analyze Image"
                    : "🔍 படத்தை பகுப்பாய்வு செய்";

        }, 1500);
    });
}


// ===============================
// INITIAL STATE
// ===============================

if (analyzeBtn) {
    analyzeBtn.disabled = true;
}

updateLanguage();
