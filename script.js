const crops = [
  { name: "Rice", icon: "🌾" },
  { name: "Wheat", icon: "🌾" },
  { name: "Maize", icon: "🌽" },
  { name: "Cotton", icon: "🌿" },
  { name: "Sugarcane", icon: "🎋" },
  { name: "Groundnut", icon: "🥜" },
  { name: "Pulses", icon: "🫘" },
];

const features = [
  {
    icon: "🤖",
    title: "AI Prediction",
    text: "Analyze plant leaf images using artificial intelligence.",
  },
  {
    icon: "🎯",
    title: "Confidence Score",
    text: "Display prediction confidence for detected diseases.",
  },
  {
    icon: "💊",
    title: "Management",
    text: "Provide useful disease management information.",
  },
  {
    icon: "📚",
    title: "Disease Library",
    text: "Explore symptoms and prevention information.",
  },
];

function App() {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [language, setLanguage] = useState("en");

  const [scanHistory, setScanHistory] = useState([]);
  const [historySearch, setHistorySearch] = useState("");
  const [historyCrop, setHistoryCrop] = useState("All");

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(
        "agrivision_scan_history"
      );

      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);

        if (Array.isArray(parsed)) {
          setScanHistory(parsed);
        }
      }
    } catch (error) {
      console.error(
        "Unable to load scan history:",
        error
      );
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "agrivision_scan_history",
        JSON.stringify(scanHistory)
      );
    } catch (error) {
      console.error(
        "Unable to save scan history:",
        error
      );
    }
  }, [scanHistory]);

  const saveScanHistory = (result) => {
    const historyItem = {
      id:
        `${Date.now()}-` +
        Math.random()
          .toString(36)
          .slice(2, 8),

      date: new Date().toISOString(),

      crop:
        result?.crop ||
        "Unknown",

      disease:
        result?.disease ||
        "Unknown",

      confidence:
        Number(result?.confidence || 0),

      status:
        result?.status ||
        "unknown",

      symptoms:
        Array.isArray(result?.symptoms)
          ? result.symptoms.slice(0, 5)
          : [],

      management:
        Array.isArray(result?.management)
          ? result.management.slice(0, 5)
          : [],

      prevention:
        Array.isArray(result?.prevention)
          ? result.prevention.slice(0, 5)
          : [],

      model:
        result?.model ||
        "AgriVision AI",
    };

    setScanHistory((previous) =>
      [historyItem, ...previous].slice(0, 50)
    );
  };

  const deleteScan = (id) => {
    setScanHistory((previous) =>
      previous.filter(
        (item) => item.id !== id
      )
    );
  };

  const clearHistory = () => {
    if (scanHistory.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      "Clear all AgriVision AI scan history?"
    );

    if (confirmed) {
      setScanHistory([]);
    }
  };

  const filteredHistory =
    scanHistory.filter((item) => {
      const query =
        historySearch
          .trim()
          .toLowerCase();

      const matchesSearch =
        !query ||
        String(item.crop)
          .toLowerCase()
          .includes(query) ||
        String(item.disease)
          .toLowerCase()
          .includes(query);

      const matchesCrop =
        historyCrop === "All" ||
        String(item.crop)
          .toLowerCase() ===
          historyCrop.toLowerCase();

      return (
        matchesSearch &&
        matchesCrop
      );
    });

  const historyCrops = [
    "All",
    ...Array.from(
      new Set(
        scanHistory
          .map((item) => item.crop)
          .filter(Boolean)
      )
    ),
  ];

  const handleImage = (event) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      alert(
        "Please select a JPG, JPEG, PNG or WEBP image."
      );

      event.target.value = "";
      return;
    }

    if (
      file.size >
      10 * 1024 * 1024
    ) {
      alert(
        "Image size must be less than 10 MB."
      );

      event.target.value = "";
      return;
    }

    setSelectedFile(file);

    setImage(
      URL.createObjectURL(file)
    );

    setUploadResult(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert(
        "Please select a plant image first 🌱"
      );
      return;
    }

    setUploading(true);
    setUploadResult(null);

    await new Promise(
      (resolve) =>
        setTimeout(resolve, 1200)
    );

    setUploadResult({
      success: false,
      serverBusy: true,
      message:
        "The AI disease detection service is currently busy. Please try again later.",
    });

    setUploading(false);
  };

  const clearImage = () => {
    if (image) {
      URL.revokeObjectURL(image);
    }

    setImage(null);
    setSelectedFile(null);
    setUploadResult(null);
  };

  const aiResult = uploadResult;

  const downloadPDFReport = () => {
    if (!aiResult?.success) {
      return;
    }

    const pdf = new jsPDF();

    const pageWidth =
      pdf.internal.pageSize.getWidth();

    const pageHeight =
      pdf.internal.pageSize.getHeight();

    const margin = 18;

    let y = 20;

    const crop =
      aiResult.crop ||
      "Unknown";

    const disease =
      aiResult.disease ||
      "Unknown";

    const confidence =
      Number(
        aiResult.confidence || 0
      );

    const predictions =
      Array.isArray(
        aiResult.topPredictions
      )
        ? aiResult.topPredictions
        : [];

    const symptoms =
      Array.isArray(
        aiResult.symptoms
      )
        ? aiResult.symptoms
        : [];

    const management =
      Array.isArray(
        aiResult.management
      )
        ? aiResult.management
        : [];

    const prevention =
      Array.isArray(
        aiResult.prevention
      )
        ? aiResult.prevention
        : [];

    const ensureSpace = (
      needed = 12
    ) => {
      if (
        y + needed >
        pageHeight - 18
      ) {
        pdf.addPage();
        y = 20;
      }
    };

    const addWrapped = (
      text,
      x = margin,
      width =
        pageWidth -
        margin * 2,
      lineHeight = 5.5
    ) => {
      const lines =
        pdf.splitTextToSize(
          String(text),
          width
        );

      ensureSpace(
        lines.length *
          lineHeight +
          2
      );

      pdf.text(
        lines,
        x,
        y
      );

      y +=
        lines.length *
          lineHeight +
        2;
    };

    pdf.setFillColor(
      19,
      131,
      59
    );

    pdf.rect(
      0,
      0,
      pageWidth,
      12,
      "F"
    );

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.setFontSize(20);

    pdf.setTextColor(
      23,
      75,
      41
    );

    pdf.text(
      "AgriVision AI",
      margin,
      y
    );

    y += 8;

    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.setFontSize(10);

    pdf.setTextColor(
      90,
      105,
      94
    );

    pdf.text(
      "AI-Powered Crop Health Intelligence",
      margin,
      y
    );

    y += 6;

    pdf.text(
      "Tamil Nadu Agricultural University (TNAU)",
      margin,
      y
    );

    y += 5;

    pdf.text(
      "Agricultural College & Research Institute, Vazhavachanur (AC&RI VVNR)",
      margin,
      y
    );

    y += 9;

    pdf.setDrawColor(
      210,
      225,
      213
    );

    pdf.line(
      margin,
      y,
      pageWidth -
        margin,
      y
    );

    y += 10;

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.setFontSize(15);

    pdf.setTextColor(
      23,
      75,
      41
    );

    pdf.text(
      "Plant Health Analysis Report",
      margin,
      y
    );

    y += 9;

    pdf.setFontSize(10);

    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.setTextColor(
      70,
      82,
      73
    );

    addWrapped(
      `Date & Time: ${new Date().toLocaleString()}`
    );

    addWrapped(
      `Detected Crop: ${crop}`
    );

    addWrapped(
      `Detected Condition: ${disease}`
    );

    addWrapped(
      `Confidence: ${confidence}%`
    );

    addWrapped(
      `Analysis Status: ${
        aiResult.status ||
        "completed"
      }`
    );

    const section = (
      title,
      items,
      bullet = "•"
    ) => {
      if (!items.length) {
        return;
      }

      ensureSpace(15);

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(12);

      pdf.setTextColor(
        23,
        75,
        41
      );

      pdf.text(
        title,
        margin,
        y
      );

      y += 7;

      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(10);

      pdf.setTextColor(
        70,
        82,
        73
      );

      items.forEach(
        (item, index) => {
          const value =
            typeof item ===
            "string"
              ? item
              : item?.disease ||
                item?.name ||
                JSON.stringify(
                  item
                );

          const prefix =
            title ===
            "Top Predictions"
              ? `${index + 1}. `
              : `${bullet} `;

          addWrapped(
            prefix + value,
            margin + 3,
            pageWidth -
              margin * 2 -
              3
          );
        }
      );

      y += 3;
    };

    section(
      "Top Predictions",
      predictions.map(
        (p) => {
          if (
            typeof p ===
            "string"
          ) {
            return p;
          }

          return `${
            p?.disease ||
            p?.name ||
            "Unknown"
          }${
            p?.confidence !==
            undefined
              ? ` — ${p.confidence}%`
              : ""
          }`;
        }
      ),
      "•"
    );

    section(
      "Visible Symptoms",
      symptoms
    );

    section(
      "Suggested Management",
      management,
      "✓"
    );

    section(
      "Prevention",
      prevention,
      "🛡"
    );

    ensureSpace(35);

    pdf.setFillColor(
      255,
      248,
      230
    );

    pdf.roundedRect(
      margin,
      y,
      pageWidth -
        margin * 2,
      28,
      3,
      3,
      "F"
    );

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.setFontSize(10);

    pdf.setTextColor(
      104,
      88,
      47
    );

    pdf.text(
      "AI Information",
      margin + 5,
      y + 7
    );

    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.setFontSize(8.5);

    const disclaimer =
      "This report provides AI-assisted plant health analysis and should not be considered a guaranteed agricultural diagnosis. Field observation and expert confirmation are recommended before treatment decisions.";

    const dLines =
      pdf.splitTextToSize(
        disclaimer,
        pageWidth -
          margin * 2 -
          10
      );

    pdf.text(
      dLines,
      margin + 5,
      y + 14
    );

    y += 37;

    pdf.setFontSize(9);

    pdf.setTextColor(
      100,
      112,
      103
    );

    pdf.text(
      `AI Model: ${
        aiResult.model ||
        "AgriVision AI"
      }`,
      margin,
      y
    );

    pdf.text(
      "Generated by AgriVision AI",
      pageWidth -
        margin,
      y,
      {
        align: "right",
      }
    );

    const totalPages =
      pdf.getNumberOfPages();

    for (
      let page = 1;
      page <= totalPages;
      page += 1
    ) {
      pdf.setPage(page);

      pdf.setFontSize(8);

      pdf.setTextColor(
        120,
        130,
        123
      );

      pdf.text(
        `AgriVision AI • Page ${page} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 8,
        {
          align: "center",
        }
      );
    }

    pdf.save(
      `AgriVision_AI_Report_${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`
    );
  };

  const getConfidenceText = (
    confidence
  ) => {
    if (confidence >= 90) {
      return "Very High";
    }

    if (confidence >= 75) {
      return "High";
    }

    if (confidence >= 50) {
      return "Moderate";
    }

    return "Low";
  };

  const t = {
    en: {
      home: "🏠 Home",
      scanner: "🤖 AI Scanner",
      features: "✨ AI Features",
      crops: "🌾 Crops",
      history: "🕘 History",
      project: "🎓 Project",
      scan: "📷 Scan Plant",

      scannerTitle:
        "🌱 Plant Disease Scanner",

      scannerText:
        "Upload a clear image of a plant leaf for analysis.",

      upload:
        "📁 Choose Image",

      camera:
        "📷 Open Camera",

      analyze:
        "🧠 Analyze with AI",

      analyzing:
        "⏳ AI Analyzing...",

      result:
        "AI Analysis Result",

      completed:
        "AgriVision AI plant analysis completed",

      crop:
        "🌱 Crop",

      disease:
        "🦠 Disease",

      confidence:
        "🎯 Confidence",

      predictions:
        "🔍 Top AI Predictions",

      symptoms:
        "🔎 Visible Symptoms",

      management:
        "💊 Suggested Management",

      prevention:
        "🛡️ Prevention",

      pdf:
        "📄 Download PDF Report",

      how:
        "⚙️ How It Works",

      uploadStep:
        "📤 Upload Leaf Image",

      aiStep:
        "🧠 AI Image Analysis",

      diseaseStep:
        "🔎 Disease Prediction",

      managementStep:
        "💡 Management Information",
    },

    ta: {
      home: "🏠 முகப்பு",
      scanner: "🤖 AI ஸ்கேனர்",
      features: "✨ AI அம்சங்கள்",
      crops: "🌾 பயிர்கள்",
      history: "🕘 வரலாறு",
      project: "🎓 திட்டம்",
      scan: "📷 பயிரை ஸ்கேன் செய்",

      scannerTitle:
        "🌱 தாவர நோய் ஸ்கேனர்",

      scannerText:
        "பகுப்பாய்விற்காக தாவர இலை படத்தை பதிவேற்றவும்.",

      upload:
        "📁 படத்தை தேர்வு செய்",

      camera:
        "📷 கேமரா திற",

      analyze:
        "🧠 AI மூலம் பகுப்பாய்வு",

      analyzing:
        "⏳ AI பகுப்பாய்வு செய்கிறது...",

      result:
        "AI பகுப்பாய்வு முடிவு",

      completed:
        "AgriVision AI தாவர பகுப்பாய்வு முடிந்தது",

      crop:
        "🌱 பயிர்",

      disease:
        "🦠 நோய் / நிலை",

      confidence:
        "🎯 நம்பகத்தன்மை",

      predictions:
        "🔍 முக்கிய AI கணிப்புகள்",

      symptoms:
        "🔎 காணப்படும் அறிகுறிகள்",

      management:
        "💊 பரிந்துரைக்கப்படும் மேலாண்மை",

      prevention:
        "🛡️ தடுப்பு நடவடிக்கைகள்",

      pdf:
        "📄 PDF அறிக்கையை பதிவிறக்கு",

      how:
        "⚙️ இது எப்படி செயல்படுகிறது",

      uploadStep:
        "📤 இலை படத்தை பதிவேற்று",

      aiStep:
        "🧠 AI பட பகுப்பாய்வு",

      diseaseStep:
        "🔎 நோய் கணிப்பு",

      managementStep:
        "💡 மேலாண்மை தகவல்",
    },
  };

  const lang = t[language];

  return (
    <div className="app">                </h3>

                <p>
                  {feature.text}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* =================================
            CROPS / DISEASES
        ================================= */}

        <section
          id="diseases"
          className="section crops-section"
        >

          <div className="section-title">

            <span>
              🌾 SUPPORTED CROPS
            </span>

            <h2>
              Crop Health Intelligence
            </h2>

            <p>
              AgriVision AI is designed to support
              important agricultural crops.
            </p>

          </div>


          <div className="crop-grid">

            {crops.map((crop) => (

              <div
                className="crop-card"
                key={crop.name}
              >

                <span>
                  {crop.icon}
                </span>

                <h3>
                  {crop.name}
                </h3>

              </div>

            ))}

          </div>

        </section>


        {/* =================================
            ABOUT / INFORMATION
        ================================= */}

        <section
          id="about"
          className="about-section"
        >

          <div className="section-title">

            <span>
              🌱 ABOUT AGRIVISION AI
            </span>

            <h2>
              AI-Powered Crop Health Intelligence
            </h2>

            <p>
              AgriVision AI combines agriculture and
              artificial intelligence to support plant
              health analysis from leaf images.
            </p>

          </div>


          <div className="about-grid">

            <div className="about-card">

              <div className="about-icon">
                🌿
              </div>

              <h3>
                Plant Health
              </h3>

              <p>
                Identify visible plant health conditions
                using leaf image analysis.
              </p>

            </div>


            <div className="about-card">

              <div className="about-icon">
                🤖
              </div>

              <h3>
                Artificial Intelligence
              </h3>

              <p>
                AI technology can assist in analysing
                crop images and providing useful
                information.
              </p>

            </div>


            <div className="about-card">

              <div className="about-icon">
                👨‍🌾
              </div>

              <h3>
                Farmer Support
              </h3>

              <p>
                Provide accessible crop health
                information for agricultural users.
              </p>

            </div>

          </div>

        </section>


        {/* =================================
            HOW IT WORKS
        ================================= */}

        <section
          className="workflow-section"
        >

          <div className="section-title">

            <span>
              ⚙️ AI WORKFLOW
            </span>

            <h2>
              From Leaf Image to Crop Insight
            </h2>

            <p>
              A simple workflow for plant health
              analysis.
            </p>

          </div>


          <div className="workflow-grid">

            <div className="workflow-card-large">

              <div className="workflow-number">
                01
              </div>

              <div>

                <h3>
                  Upload
                </h3>

                <p>
                  Select a clear image of the affected
                  plant leaf.
                </p>

              </div>

            </div>


            <div className="workflow-card-large">

              <div className="workflow-number">
                02
              </div>

              <div>

                <h3>
                  Analyse
                </h3>

                <p>
                  The image is prepared for artificial
                  intelligence analysis.
                </p>

              </div>

            </div>


            <div className="workflow-card-large">

              <div className="workflow-number">
                03
              </div>

              <div>

                <h3>
                  Predict
                </h3>

                <p>
                  AI can identify the likely crop health
                  condition.
                </p>

              </div>

            </div>


            <div className="workflow-card-large">

              <div className="workflow-number">
                04
              </div>

              <div>

                <h3>
                  Manage
                </h3>

                <p>
                  Useful management and prevention
                  information can be provided.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =================================
            FINAL YEAR PROJECT
        ================================= */}

        <section
          id="project"
          className="project-section"
        >

          <div className="project-main">

            <span>
              🎓 FINAL YEAR PROJECT
            </span>

            <h2>
              AgriVision AI
            </h2>

            <h3>
              Plant Disease Detection using
              Artificial Intelligence
            </h3>

            <p>
              A B.Sc. Agriculture Final Year Project
              focused on artificial intelligence for
              plant health and disease detection.
            </p>

          </div>


          <div className="project-details">

            <div className="project-card">

              <div className="project-icon">
                🏫
              </div>

              <span>
                INSTITUTION
              </span>

              <h3>
                Agricultural College &amp;
                Research Institute
              </h3>

              <p>
                Vazhavachanur (VVNR)
                <br />
                Tamil Nadu Agricultural University
              </p>

            </div>

          </div>


          {/* SUBMITTED BY */}

          <div className="submitted-block">

            <div>
              📄 SUBMITTED BY
            </div>

            <strong>
              KOWSHIK S
            </strong>

            <span>
              B.Sc. Agriculture – Final Year
            </span>

          </div>

        </section>

      </main>


      {/* =================================
          FOOTER
      ================================= */}

      <footer>

        <div className="footer-brand">
          🌱 AgriVision AI
        </div>

        <p>
          AI-Powered Crop Health Intelligence
        </p>

        <div className="footer-line"></div>

        <strong>
          🎓 Final Year Project
        </strong>

        <span>
          B.Sc. Agriculture
        </span>

        <small>
          🏫 Agricultural College &amp; Research
          Institute, Vazhavachanur (VVNR)
        </small>

        <small>
          Tamil Nadu Agricultural University
        </small>

        <div className="copyright">
          © 2026 AgriVision AI • Final Year Project
        </div>

      </footer>

    </div>
  );
}

const root =
  ReactDOM.createRoot(
    document.getElementById("root")
  );

root.render(
  <App />
);        {/* =================================
            FINAL YEAR PROJECT
        ================================= */}

        <section
          id="project"
          className="project-section"
        >

          <div className="project-main">

            <span>
              🎓 FINAL YEAR PROJECT
            </span>

            <h2>
              AgriVision AI
            </h2>

            <h3>
              Plant Disease Detection using
              Artificial Intelligence
            </h3>

            <p>
              A B.Sc. Agriculture Final Year Project
              focused on artificial intelligence for
              plant health and disease detection.
            </p>

          </div>


          <div className="project-details">

            <div className="project-card">

              <div className="project-icon">
                🏫
              </div>

              <span>
                INSTITUTION
              </span>

              <h3>
                Agricultural College &amp;
                Research Institute
              </h3>

              <p>
                Vazhavachanur (VVNR)
                <br />
                Tamil Nadu Agricultural University
              </p>

            </div>

          </div>


          {/* SUBMITTED BY */}

          <div className="submitted-block">

            <div>
              📄 SUBMITTED BY
            </div>

            <strong>
              KOWSHIK S
            </strong>

            <span>
              B.Sc. Agriculture – Final Year
            </span>

          </div>

        </section>

      </main>


      {/* =================================
          FOOTER
      ================================= */}

      <footer>

        <div className="footer-brand">
          🌱 AgriVision AI
        </div>

        <p>
          AI-Powered Crop Health Intelligence
        </p>

        <div className="footer-line"></div>

        <strong>
          🎓 Final Year Project
        </strong>

        <span>
          B.Sc. Agriculture
        </span>

        <small>
          🏫 Agricultural College &amp; Research
          Institute, Vazhavachanur (VVNR)
        </small>

        <small>
          Tamil Nadu Agricultural University
        </small>

        <div className="copyright">
          © 2026 AgriVision AI • Final Year Project
        </div>

      </footer>

    </div>
  );
}

const root =
  ReactDOM.createRoot(
    document.getElementById("root")
  );

root.render(
  <App />
);        {/* =================================
            FINAL YEAR PROJECT
        ================================= */}

        <section
          id="project"
          className="project-section"
        >

          <div className="project-main">

            <span>
              🎓 FINAL YEAR PROJECT
            </span>

            <h2>
              AgriVision AI
            </h2>

            <h3>
              Plant Disease Detection using
              Artificial Intelligence
            </h3>

            <p>
              A B.Sc. Agriculture Final Year Project
              focused on artificial intelligence for
              plant health and disease detection.
            </p>

          </div>


          <div className="project-details">

            <div className="project-card">

              <div className="project-icon">
                🏫
              </div>

              <span>
                INSTITUTION
              </span>

              <h3>
                Agricultural College &amp;
                Research Institute
              </h3>

              <p>
                Vazhavachanur (VVNR)
                <br />
                Tamil Nadu Agricultural University
              </p>

            </div>

          </div>


          {/* SUBMITTED BY */}

          <div className="submitted-block">

            <div>
              📄 SUBMITTED BY
            </div>

            <strong>
              KOWSHIK S
            </strong>

            <span>
              B.Sc. Agriculture – Final Year
            </span>

          </div>

        </section>

      </main>


      {/* =================================
          FOOTER
      ================================= */}

      <footer>

        <div className="footer-brand">
          🌱 AgriVision AI
        </div>

        <p>
          AI-Powered Crop Health Intelligence
        </p>

        <div className="footer-line"></div>

        <strong>
          🎓 Final Year Project
        </strong>

        <span>
          B.Sc. Agriculture
        </span>

        <small>
          🏫 Agricultural College &amp; Research
          Institute, Vazhavachanur (VVNR)
        </small>

        <small>
          Tamil Nadu Agricultural University
        </small>

        <div className="copyright">
          © 2026 AgriVision AI • Final Year Project
        </div>

      </footer>

    </div>
  );
}

const root =
  ReactDOM.createRoot(
    document.getElementById("root")
  );

root.render(
  <App />
);        {/* =================================
            FINAL YEAR PROJECT
        ================================= */}

        <section
          id="project"
          className="project-section"
        >

          <div className="project-main">

            <span>
              🎓 FINAL YEAR PROJECT
            </span>

            <h2>
              AgriVision AI
            </h2>

            <h3>
              Plant Disease Detection using
              Artificial Intelligence
            </h3>

            <p>
              A B.Sc. Agriculture Final Year Project
              focused on artificial intelligence for
              plant health and disease detection.
            </p>

          </div>


          <div className="project-details">

            <div className="project-card">

              <div className="project-icon">
                🏫
              </div>

              <span>
                INSTITUTION
              </span>

              <h3>
                Agricultural College &amp;
                Research Institute
              </h3>

              <p>
                Vazhavachanur (VVNR)
                <br />
                Tamil Nadu Agricultural University
              </p>

            </div>

          </div>


          {/* SUBMITTED BY */}

          <div className="submitted-block">

            <div>
              📄 SUBMITTED BY
            </div>

            <strong>
              KOWSHIK S
            </strong>

            <span>
              B.Sc. Agriculture – Final Year
            </span>

          </div>

        </section>

      </main>


      {/* =================================
          FOOTER
      ================================= */}

      <footer>

        <div className="footer-brand">
          🌱 AgriVision AI
        </div>

        <p>
          AI-Powered Crop Health Intelligence
        </p>

        <div className="footer-line"></div>

        <strong>
          🎓 Final Year Project
        </strong>

        <span>
          B.Sc. Agriculture
        </span>

        <small>
          🏫 Agricultural College &amp; Research
          Institute, Vazhavachanur (VVNR)
        </small>

        <small>
          Tamil Nadu Agricultural University
        </small>

        <div className="copyright">
          © 2026 AgriVision AI • Final Year Project
        </div>

      </footer>

    </div>
  );
}

const root =
  ReactDOM.createRoot(
    document.getElementById("root")
  );

root.render(
  <App />
);
