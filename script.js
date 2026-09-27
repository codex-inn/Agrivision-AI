const { useState, useEffect } = React;

function App() {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [language, setLanguage] = useState("en");
  const [scanHistory, setScanHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("agrivision_scan_history") || "[]");
    } catch {
      return [];
    }
  });
  const [historySearch, setHistorySearch] = useState("");
  const [historyCrop, setHistoryCrop] = useState("All Crops");

  useEffect(() => {
    localStorage.setItem(
      "agrivision_scan_history",
      JSON.stringify(scanHistory)
    );
  }, [scanHistory]);

  const clearHistory = () => setScanHistory([]);

  const handleImage = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp"
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please select a JPG, PNG or WEBP image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image size must be less than 10 MB.");
      return;
    }

    setSelectedFile(file);
    setImage(URL.createObjectURL(file));
    setUploadResult(null);
  };

  /*
   * =========================================
   * AI ANALYSIS
   * =========================================
   *
   * Real AI model will be connected later.
   * For now, NEVER generate a fake diagnosis.
   */

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a plant image first 🌱");
      return;
    }

    setUploading(true);
    setUploadResult(null);

    // Temporary server-busy simulation
    await new Promise((resolve) => {
      setTimeout(resolve, 1200);
    });

    setUploadResult({
      success: false,
      serverBusy: true,
      message:
        "The AI disease detection service is currently busy. Please try again later."
    });

    setUploading(false);
  };

  /*
   * =========================================
   * CLEAR IMAGE
   * =========================================
   */

  const clearImage = () => {
    setImage(null);
    setSelectedFile(null);
    setUploadResult(null);
  };

  /*
   * =========================================
   * LANGUAGE
   * =========================================
   */

  const translations = {
    en: {
      home: "🏠 Home",
      scanner: "🤖 AI Scanner",
      features: "✨ AI Features",
      crops: "🌾 Crops",
      history: "🕘 History",
      project: "🎓 Project",
      scan: "📷 Scan Plant",

      scannerTitle: "🌱 Plant Disease Scanner",
      scannerText:
        "Upload a clear image of a plant leaf for analysis.",

      upload: "📁 Choose Image",
      camera: "📷 Open Camera",
      analyze: "🧠 Analyze with AI",
      analyzing: "⏳ AI Analyzing...",

      result: "AI Analysis Result",

      how: "⚙️ How It Works",
      uploadStep: "📤 Upload Leaf Image",
      aiStep: "🧠 AI Image Analysis",
      diseaseStep: "🔎 Disease Prediction",
      managementStep: "💡 Management Information"
    },

    ta: {
      home: "🏠 முகப்பு",
      scanner: "🤖 AI ஸ்கேனர்",
      features: "✨ AI அம்சங்கள்",
      crops: "🌾 பயிர்கள்",
      history: "🕘 வரலாறு",
      project: "🎓 திட்டம்",
      scan: "📷 பயிரை ஸ்கேன் செய்",

      scannerTitle: "🌱 தாவர நோய் ஸ்கேனர்",
      scannerText:
        "பகுப்பாய்விற்காக தாவர இலை படத்தை பதிவேற்றவும்.",

      upload: "📁 படத்தை தேர்வு செய்",
      camera: "📷 கேமரா திற",
      analyze: "🧠 AI மூலம் பகுப்பாய்வு",
      analyzing: "⏳ AI பகுப்பாய்வு...",

      result: "AI பகுப்பாய்வு முடிவு",

      how: "⚙️ இது எப்படி வேலை செய்கிறது",
      uploadStep: "📤 இலை படத்தை பதிவேற்றுதல்",
      aiStep: "🧠 AI பட பகுப்பாய்வு",
      diseaseStep: "🔎 நோய் கணிப்பு",
      managementStep: "💡 மேலாண்மை தகவல்"
    }
  };

  const lang = translations[language];

  /*
   * =========================================
   * RENDER
   * =========================================
   */

  return (
    <div className="app">

      {/* TNAU HEADER */}

      <header className="tnau-header">

        <div className="header-overlay"></div>

        <div className="tnau-brand">

          <div className="tnau-logo">
            <img
              src="./tnau-logo.png"
              alt="Tamil Nadu Agricultural University Logo"
            />
          </div>

          <div className="university-info">

            <h1>
              Tamil Nadu Agricultural University
            </h1>

            <h2>
              தமிழ்நாடு வேளாண்மைப் பல்கலைக்கழகம்
            </h2>

            <p>
              Coimbatore – 641 003, Tamil Nadu, India
            </p>

          </div>

        </div>

        <div className="college-info">

          <h3>
            🏫 Agricultural College & Research Institute
          </h3>

          <h4>
            Vazhavachanur
          </h4>

          <p>
            Tamil Nadu Agricultural University
          </p>

          <span>
            AC&RI • VVNR
          </span>

        </div>

      </header>


      {/* NAVIGATION */}

      <nav className="navbar">

        <a href="#home" className="brand">
          🌱 AgriVision AI
        </a>

        <div className="nav-links">

          <a href="#home">
            {lang.home}
          </a>

          <a href="#scanner">
            {lang.scanner}
          </a>

          <a href="#features">
            {lang.features}
          </a>

          <a href="#diseases">
            {lang.crops}
          </a>

          <a href="#history">
            {lang.history}
          </a>

          <a href="#project">
            {lang.project}
          </a>

        </div>

        <div className="language-toggle">

          <button
            type="button"
            className={language === "en" ? "active" : ""}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>

          <button
            type="button"
            className={language === "ta" ? "active" : ""}
            onClick={() => setLanguage("ta")}
          >
            தமிழ்
          </button>

        </div>

        <a
          href="#scanner"
          className="project-button"
        >
          {lang.scan}
        </a>

      </nav>


      {/* HERO */}

      <main>

        <section id="home" className="hero">

          <div className="hero-overlay"></div>

          <div className="hero-content">

            <div className="smart-badge">
              🌿 SMART AGRICULTURE • AI TECHNOLOGY
            </div>

            <h1>
              AgriVision <span>AI</span>
            </h1>

            <h2>
              Plant Disease Detection using Artificial Intelligence
            </h2>

            <div className="tamil-line">
              “ஆரோக்கியமான பயிர் – வளமான விவசாயம்”
            </div>

            <p>
              AgriVision AI is an agriculture-focused artificial
              intelligence platform designed to identify plant diseases
              from leaf images and provide useful crop health information.
            </p>

            <div className="hero-actions">

              <a
                href="#scanner"
                className="primary-button"
              >
                📷 Scan Your Plant
              </a>

              <a
                href="#diseases"
                className="secondary-button"
              >
                ✨ Explore AI Features
              </a>

            </div>

          </div>

          {/* SAMPLE AI CARD */}

          <div className="ai-card">

            <div className="ai-heading">

              <div className="ai-symbol">
                AI
              </div>

              <div>
                <h3>
                  AI ANALYSIS
                </h3>

                <p>
                  Plant Health Detection
                </p>
              </div>

            </div>


            <div className="analysis-box">

              <div className="leaf-preview">
                🌿
              </div>

              <div className="analysis-text">

                <small>
                  SAMPLE RESULT
                </small>

                <h3>
                  Early Blight
                </h3>

                <strong>
                  Confidence: 95%
                </strong>

              </div>

            </div>


            <div className="management">

              <h4>
                ✓ Suggested Management
              </h4>

              <p>✓ Remove infected leaves</p>
              <p>✓ Improve field sanitation</p>
              <p>✓ Follow recommended management</p>
              <p>✓ Maintain proper crop rotation</p>

            </div>

          </div>

        </section>


        {/* SCANNER */}

        <section
          id="scanner"
          className="section scanner-section"
        >

          <div className="section-title">

            <span>
              🤖 ARTIFICIAL INTELLIGENCE
            </span>

            <h2>
              {lang.scannerTitle}
            </h2>

            <p>
              {lang.scannerText}
            </p>

          </div>


          <div className="scanner-layout">

            {/* IMAGE UPLOAD AREA */}

            <div className="upload-card">

              {image ? (

                <>

                  <img
                    src={image}
                    alt="Uploaded plant leaf"
                    className="uploaded-image"
                  />

                  <button
                    type="button"
                    className="remove-image-button"
                    onClick={clearImage}
                  >
                    ❌ Remove Image
                  </button>

                </>

              ) : (

                <>

                  <div className="upload-icon">
                    📷
                  </div>

                  <h3>
                    Upload Leaf Image
                  </h3>

                  <p>
                    Choose a clear image of the affected leaf.
                  </p>

                </>

              )}


              <div className="upload-actions">

                <label className="upload-button">

                  {lang.upload}

                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                    onChange={handleImage}
                    hidden
                  />

                </label>


                <label className="camera-button">

                  {lang.camera}

                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImage}
                    hidden
                  />

                </label>

              </div>


              <button
                type="button"
                className="analyze-button"
                onClick={handleUpload}
                disabled={
                  !selectedFile ||
                  uploading
                }
              >

                {uploading
                  ? lang.analyzing
                  : lang.analyze}

              </button>


              <small>
                JPG • JPEG • PNG • WEBP • Max 10 MB
              </small>

            </div>


            {/* HOW IT WORKS */}

            <div className="workflow-card">

              <h3>
                {lang.how}
              </h3>

              <div className="workflow-step">
                <b>01</b>
                <span>
                  {lang.uploadStep}
                </span>
              </div>

              <div className="workflow-step">
                <b>02</b>
                <span>
                  {lang.aiStep}
                </span>
              </div>

              <div className="workflow-step">
                <b>03</b>
                <span>
                  {lang.diseaseStep}
                </span>
              </div>

              <div className="workflow-step">
                <b>04</b>
                <span>
                  {lang.managementStep}
                </span>
              </div>


              {/* AI CONNECTION */}

              <div className="connection-box">

                <div className="connection-title">
                  🔗 AI CONNECTION
                </div>

                <div className="connection-flow">
                  AgriVision AI <span>→</span> AI Processing
                </div>

                <div className="connection-details">
                  Disease detection service
                  <br />
                  Status: Preparing AI model
                </div>

              </div>

            </div>

          </div>


          {/* SERVER BUSY RESULT */}

          {uploadResult?.serverBusy && (

            <div className="ai-result-dashboard">

              <div className="result-dashboard-header">

                <div className="result-header-left">

                  <div className="result-ai-icon">
                    🤖
                  </div>

                  <div>

                    <div className="result-eyebrow">
                      AI ANALYSIS
                    </div>

                    <h2>
                      AI Analysis Result
                    </h2>

                    <p>
                      The analysis service is temporarily unavailable.
                    </p>

                  </div>

                </div>

                <div className="analysis-complete-badge">
                  SERVER BUSY
                </div>

              </div>


              <div
                className="result-section-card"
                style={{
                  marginTop: "20px",
                  textAlign: "center"
                }}
              >

                <div style={{ fontSize: "36px" }}>
                  ⚠️
                </div>

                <h3
                  style={{
                    color: "#174b29",
                    margin: "10px 0 6px"
                  }}
                >
                  AI Disease Detection Server Busy
                </h3>

                <p
                  style={{
                    color: "#748078",
                    fontSize: "12px",
                    margin: 0
                  }}
                >
                  Please try again later.
                </p>

              </div>

            </div>

          )}

        </section>


        {/* HISTORY */}

        <section
          id="history"
          className="section history-section"
        >

          <div className="section-title">

            <span>
              🕘 YOUR AI SCANS
            </span>

            <h2>
              Scan History
            </h2>

            <p>
              Previous AgriVision AI plant analyses are stored locally in this browser.
            </p>

          </div>


          <div className="history-container">

            <div className="history-toolbar">

              <input
                type="text"
                placeholder="🔎 Search crop or disease..."
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
              />

              <select
                value={historyCrop}
                onChange={(e) => setHistoryCrop(e.target.value)}
              >
                <option>All Crops</option>
                <option>Rice</option>
                <option>Wheat</option>
                <option>Maize</option>
                <option>Cotton</option>
                <option>Sugarcane</option>
                <option>Groundnut</option>
                <option>Pulses</option>
              </select>

              <button
                type="button"
                className="clear-history-button"
                onClick={clearHistory}
                disabled={!scanHistory.length}
              >
                🗑️ Clear History
              </button>

            </div>


            <div className="history-stats">

              <div>
                <span>TOTAL SCANS</span>
                <strong>{scanHistory.length}</strong>
              </div>

              <div>
                <span>IDENTIFIED</span>
                <strong>0</strong>
              </div>

              <div>
                <span>FILTERED RESULTS</span>
                <strong>{scanHistory.length}</strong>
              </div>

            </div>


            {scanHistory.length === 0 ? (

              <div className="empty-history">

                <div>🌱</div>

                <h3>
                  No scan history yet
                </h3>

                <p>
                  Analyze a plant image and the result will appear here.
                </p>

              </div>

            ) : (

              <div className="history-list">

                {scanHistory
                  .filter((item) => {
                    const q = historySearch.toLowerCase();
                    const matchesSearch =
                      !q ||
                      item.crop?.toLowerCase().includes(q) ||
                      item.disease?.toLowerCase().includes(q);

                    const matchesCrop =
                      historyCrop === "All Crops" ||
                      item.crop === historyCrop;

                    return matchesSearch && matchesCrop;
                  })
                  .map((item) => (

                    <div
                      className="history-item"
                      key={item.id}
                    >

                      <div className="history-date">
                        {item.date}
                      </div>

                      <div className="history-main">

                        <div className="history-crop">
                          <span>🌱</span>
                          <div>
                            <small>CROP</small>
                            <strong>{item.crop}</strong>
                          </div>
                        </div>

                        <div className="history-disease">
                          <small>RESULT</small>
                          <strong>{item.disease || "Not identified"}</strong>
                        </div>

                        <div className="history-confidence">
                          <small>CONFIDENCE</small>
                          <strong>{item.confidence || "—"}</strong>
                        </div>

                      </div>

                    </div>

                  ))}

              </div>

            )}


            <div className="history-privacy">
              🔒 Privacy: Scan history is stored only in this browser using localStorage. The backend temporary image file is not stored as part of the history.
            </div>

          </div>

        </section>


        {/* FEATURES */}

        <section
          id="features"
          className="features-section"
        >

          <div className="section-title">

            <span>
              ✨ SMART PLANT HEALTH
            </span>

            <h2>
              AgriVision AI Features
            </h2>

            <p>
              Designed for intelligent plant health analysis.
            </p>

          </div>


          <div className="features-grid">

            <div className="feature-card">

              <div className="feature-icon">
                🤖
              </div>

              <h3>
                AI Prediction
              </h3>

              <p>
                Analyze plant leaf images using artificial intelligence.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                🎯
              </div>

              <h3>
                Confidence Score
              </h3>

              <p>
                Display prediction confidence for detected diseases.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                💊
              </div>

              <h3>
                Management
              </h3>

              <p>
                Provide useful disease management information.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                📚
              </div>

              <h3>
                Disease Library
              </h3>

              <p>
                Explore symptoms and prevention information.
              </p>

            </div>

          </div>

        </section>


        {/* CROP LIBRARY */}

        <section
          id="diseases"
          className="section disease-section"
        >

          <div className="section-title">

            <span>
              🌿 PLANT HEALTH KNOWLEDGE
            </span>

            <h2>
              🌾 Crop Library
            </h2>

            <p>
              Explore the crops supported by AgriVision AI.
            </p>

          </div>


          <div className="crop-grid">

            <div className="crop-card">
              <span>🌾</span>
              <h3>Rice</h3>
            </div>

            <div className="crop-card">
              <span>🌾</span>
              <h3>Wheat</h3>
            </div>

            <div className="crop-card">
              <span>🌽</span>
              <h3>Maize</h3>
            </div>

            <div className="crop-card">
              <span>🌿</span>
              <h3>Cotton</h3>
            </div>

            <div className="crop-card">
              <span>🎋</span>
              <h3>Sugarcane</h3>
            </div>

            <div className="crop-card">
              <span>🥜</span>
              <h3>Groundnut</h3>
            </div>

            <div className="crop-card">
              <span>🫘</span>
              <h3>Pulses</h3>
            </div>

          </div>

        </section>


        {/* PROJECT */}

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
              Plant Disease Detection using Artificial Intelligence
            </h3>

            <p>
              A B.Sc. Agriculture Final Year Project focused on artificial intelligence for plant health and disease detection.
            </p>


            <div className="project-details">

              <div className="project-card institution-card">

                <div className="project-icon">
                  🏫
                </div>

                <span>
                  INSTITUTION
                </span>

                <h3>
                  Agricultural College & Research Institute
                </h3>

                <p>
                  Vazhavachanur (VVNR)
                  <br />
                  Tamil Nadu Agricultural University
                </p>

              </div>

            </div>


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

          </div>

        </section>


      </main>


      {/* FOOTER */}

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
          🏫 Agricultural College & Research Institute,
          Vazhavachanur (VVNR)
        </small>

        <small>
          Tamil Nadu Agricultural University
        </small>

        <div className="copyright">
          © 2026 AgriVision AI • Final Year Project
        </div>

      </footer>

    </div>  );
}


/*
 * =========================================
 * START APPLICATION
 * =========================================
 */

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(<App />);
