/* =========================================
   AGRIVISION AI
   JAVASCRIPT
========================================= */

let selectedImage = null;

let currentLanguage = "en";


/* =========================================
   ELEMENTS
========================================= */

const imageInput =
  document.getElementById("imageInput");

const cameraButton =
  document.getElementById("cameraButton");

const previewImage =
  document.getElementById("previewImage");

const uploadPlaceholder =
  document.getElementById("uploadPlaceholder");

const analyzeButton =
  document.getElementById("analyzeButton");

const resultCard =
  document.getElementById("resultCard");

const historyList =
  document.getElementById("historyList");


/* =========================================
   IMAGE UPLOAD
========================================= */

imageInput.addEventListener(
  "change",
  function (event) {

    const file =
      event.target.files[0];

    if (!file) {
      return;
    }

    processImage(file);

  }
);


/* =========================================
   CAMERA
========================================= */

cameraButton.addEventListener(
  "click",
  function () {

    imageInput.setAttribute(
      "capture",
      "environment"
    );

    imageInput.click();

  }
);


/* =========================================
   PROCESS IMAGE
========================================= */

function processImage(file) {

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
  ];

  if (!allowedTypes.includes(file.type)) {

    alert(
      currentLanguage === "en"
        ? "Please select a JPG, PNG or WEBP image."
        : "JPG, PNG அல்லது WEBP படத்தை தேர்வு செய்யவும்."
    );

    return;
  }


  /* Maximum 10 MB */

  if (file.size > 10 * 1024 * 1024) {

    alert(
      currentLanguage === "en"
        ? "Image size must be less than 10 MB."
        : "படத்தின் அளவு 10 MB-க்கு குறைவாக இருக்க வேண்டும்."
    );

    return;
  }


  selectedImage = file;


  /* Create preview */

  const imageURL =
    URL.createObjectURL(file);

  previewImage.src = imageURL;

  previewImage.hidden = false;

  uploadPlaceholder.style.display =
    "none";


  /* Enable AI button */

  analyzeButton.disabled = false;


  /* Scroll slightly */

  document
    .getElementById("scanner")
    .scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

}


/* =========================================
   AI ANALYSIS
========================================= */

analyzeButton.addEventListener(
  "click",
  function () {

    if (!selectedImage) {

      alert(
        currentLanguage === "en"
          ? "Please select an image first."
          : "முதலில் ஒரு படத்தை தேர்வு செய்யவும்."
      );

      return;
    }


    /*
      IMPORTANT

      The actual AI model will be connected
      in the next stage.

      We intentionally do NOT pretend that
      this is a real diagnosis yet.
    */


    analyzeButton.disabled = true;

    analyzeButton.innerHTML =
      currentLanguage === "en"
        ? "⏳ Preparing AI..."
        : "⏳ AI தயாராகிறது...";


    resultCard.innerHTML = `

      <div class="result-placeholder">

        <div>🧠</div>

        <h3>
          ${
            currentLanguage === "en"
              ? "AI Model Ready"
              : "AI மாடல் தயாராக உள்ளது"
          }
        </h3>

        <p>
          ${
            currentLanguage === "en"
              ? "The disease-detection model will be connected next."
              : "நோய் கண்டறிதல் AI மாடல் அடுத்த கட்டத்தில் இணைக்கப்படும்."
          }
        </p>

      </div>

    `;


    setTimeout(
      function () {

        analyzeButton.disabled = false;

        analyzeButton.innerHTML =
          currentLanguage === "en"
            ? "🧠 Analyze with AI"
            : "🧠 AI மூலம் பகுப்பாய்வு";

      },
      1200
    );

  }
);


/* =========================================
   LANGUAGE TOGGLE
========================================= */

function toggleLanguage() {

  currentLanguage =
    currentLanguage === "en"
      ? "ta"
      : "en";


  const elements =
    document.querySelectorAll(
      "[data-en][data-ta]"
    );


  elements.forEach(
    function (element) {

      element.textContent =
        currentLanguage === "en"
          ? element.dataset.en
          : element.dataset.ta;

    }
  );


  const languageButton =
    document.getElementById(
      "languageButton"
    );


  languageButton.textContent =
    currentLanguage === "en"
      ? "🌐 தமிழ்"
      : "🌐 English";


  updateInterfaceLanguage();

}


/* =========================================
   UPDATE INTERFACE
========================================= */

function updateInterfaceLanguage() {

  /*
    These elements are not covered by
    data-en / data-ta attributes.
  */


  const navLinks =
    document.querySelectorAll(
      ".navbar a span"
    );


  /*
    Existing data attributes are handled
    automatically above.
  */


  if (analyzeButton && !analyzeButton.disabled) {

    analyzeButton.innerHTML =
      currentLanguage === "en"
        ? "🧠 Analyze with AI"
        : "🧠 AI மூலம் பகுப்பாய்வு";

  }

}


/* =========================================
   LOCAL STORAGE
========================================= */

function getScanHistory() {

  try {

    const history =
      localStorage.getItem(
        "agrivision_scan_history"
      );

    return history
      ? JSON.parse(history)
      : [];

  } catch (error) {

    console.error(
      "History error:",
      error
    );

    return [];

  }

}


/* =========================================
   SAVE SCAN
========================================= */

function saveScanHistory(scan) {

  const history =
    getScanHistory();


  history.unshift({

    id:
      Date.now(),

    date:
      new Date().toISOString(),

    crop:
      scan.crop || "Unknown",

    disease:
      scan.disease || "Unknown",

    confidence:
      scan.confidence || 0

  });


  /*
    Keep maximum 50 scans
  */

  const limitedHistory =
    history.slice(0, 50);


  localStorage.setItem(
    "agrivision_scan_history",
    JSON.stringify(
      limitedHistory
    )
  );


  displayHistory();

}


/* =========================================
   DISPLAY HISTORY
========================================= */

function displayHistory() {

  if (!historyList) {
    return;
  }


  const history =
    getScanHistory();


  if (history.length === 0) {

    historyList.innerHTML = `

      <div class="history-empty">

        <div>🕘</div>

        <h3>
          ${
            currentLanguage === "en"
              ? "No scan history"
              : "ஸ்கேன் வரலாறு இல்லை"
          }
        </h3>

        <p>
          ${
            currentLanguage === "en"
              ? "Your AI scan results will appear here."
              : "உங்கள் AI ஸ்கேன் முடிவுகள் இங்கே தோன்றும்."
          }
        </p>

      </div>

    `;

    return;
  }


  historyList.innerHTML =
    history
      .map(
        function (item) {

          const date =
            new Date(
              item.date
            ).toLocaleString();


          return `

            <div
              style="
                padding:15px;
                margin-bottom:10px;
                border:1px solid #dce9dd;
                border-radius:12px;
                background:#f8fbf8;
              "
            >

              <strong>
                🌱 ${escapeHTML(item.crop)}
              </strong>

              <div
                style="
                  margin-top:4px;
                  color:#59675e;
                  font-size:12px;
                "
              >
                🦠 ${escapeHTML(item.disease)}
              </div>

              <div
                style="
                  margin-top:4px;
                  color:#18833d;
                  font-size:11px;
                  font-weight:700;
                "
              >
                🎯 ${item.confidence}% confidence
              </div>

              <small
                style="
                  display:block;
                  margin-top:5px;
                  color:#89948c;
                "
              >
                ${date}
              </small>

            </div>

          `;

        }
      )
      .join("");

}


/* =========================================
   HTML SAFETY
========================================= */

function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


/* =========================================
   INITIALIZE
========================================= */

displayHistory();


/* =========================================
   CLEANUP
========================================= */

window.addEventListener(
  "beforeunload",
  function () {

    if (
      previewImage.src &&
      previewImage.src.startsWith(
        "blob:"
      )
    ) {

      URL.revokeObjectURL(
        previewImage.src
      );

    }

  }
);
