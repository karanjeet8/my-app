import React, { useState, useEffect } from "react";
import "./Styles.css";
import { useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";

const translations = {
  English: {
    features: ["Deposit", "Withdrawal", "Invitation", "Customer Service", "Terms", "About Us", "FAQ", "WFP"],
    transactionsTitle: "Withdraw amount",
    bottomNav: ["Home", "Deposit", "Orders", "Records", "Profile"]
  },
  Turkish: {
    features: ["Para Yatır", "Para Çek", "Davet", "Müşteri Hizmeti", "Şartlar", "Hakkımızda", "SSS", "WFP"],
    transactionsTitle: "Çekilen Tutar",
    bottomNav: ["Ana Sayfa", "Yatır", "Siparişler", "Kayıtlar", "Profil"]
  },
  French: {
    features: ["Dépôt", "Retrait", "Invitation", "Service client", "Conditions", "À propos", "FAQ", "WFP"],
    transactionsTitle: "Montant Retiré",
    bottomNav: ["Accueil", "Dépôt", "Commandes", "Historique", "Profil"]
  },
  Spanish: {
    features: ["Depósito", "Retiro", "Invitación", "Servicio al Cliente", "Términos", "Sobre nosotros", "FAQ", "WFP"],
    transactionsTitle: "Monto retirado",
    bottomNav: ["Inicio", "Depósito", "Pedidos", "Registros", "Profil"]
  },
  Arabic: {
    features: ["إيداع", "سحب", "دعوة", "خدمة العملاء", "الشروط", "معلومات عنا", "الأسئلة الشائعة", "WFP"],
    transactionsTitle: "المبلغ المسحوب",
    bottomNav: ["الرئيسية", "إيداع", "الطلبات", "السجلات", "الملف الشخصي"]
  }
};

const langCodes = {
  English: "en-US",
  Arabic: "ar-SA",
  Turkish: "tr-TR",
  French: "fr-FR",
  Spanish: "es-ES"
};

const sliderImages = [
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhboNerHbw6UBAARF2Nbv8cxxbbgHK8ZQCTZdChnA6uAic5xLZSXEGm8D66B4L8ARINYz_BLe88rwHiSiLAK7YNfFt0iUPuyKz43tLNPDwVphKa5VI8isx5yN0O6fJ2RY9e_D3ylPv4sGsZ/s1600/cr7-ad-insane+%25284%2529.jpg",
  "https://cedcommerce.com/blog/wp-content/uploads/2019/05/Amazon-Sponsored-products-tw-og2.jpg",
  "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202302/untitled-11-sixteen_nine.jpg?size=1280:720",
  "https://evitamin.in/cdn/shop/articles/Blog_Creatives2_1_1_15c22938-a285-49ca-9276-2d547469d593.jpg?v=1736491368"
];

const Homepage = () => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "English");
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transactionMessages, setTransactionMessages] = useState([]);
  const [speakerOn, setSpeakerOn] = useState(localStorage.getItem("speakerOn") !== "false");
  const navigate = useNavigate();
  const selectedLang = translations[language];

  const speak = (text, langCode) => {
    if (!speakerOn) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    speechSynthesis.speak(utterance);
  };

  const toggleSpeaker = () => {
    const newState = !speakerOn;
    setSpeakerOn(newState);
    localStorage.setItem("speakerOn", newState);

    if (!newState) {
      speechSynthesis.cancel(); // 🔇 Stop any ongoing speech
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => {
      clearInterval(interval);
      speechSynthesis.cancel(); // Clean up on unmount
    };
  }, []);

  useEffect(() => {
    const voiceCode = langCodes[language] || "en-US";
    let latestWithdraw = JSON.parse(localStorage.getItem("latestWithdraw"));

    let dummyData = [
      { name: language === "Arabic" ? "علي" : "Ali", id: "Z1A8923", amount: "125.00" },
      { name: language === "Arabic" ? "فاطمة" : "Fatima", id: "Z1B7632", amount: "200.50" },
      { name: language === "Arabic" ? "أحمد" : "Ahmed", id: "Z1C4401", amount: "89.99" },
      { name: language === "Arabic" ? "مريم" : "Maryam", id: "Z1D1190", amount: "300.00" },
      { name: language === "Arabic" ? "سلمان" : "Salman", id: "Z1E5678", amount: "150.75" }
    ];

    const itemsToAnnounce = latestWithdraw ? [latestWithdraw] : dummyData;

    itemsToAnnounce.forEach((entry, i) => {
      setTimeout(() => {
        const message =
          language === "Arabic"
            ? `📢 ${entry.name} (معرف: ${entry.id}) سحب ${entry.amount} دولار.`
            : `📢 ${entry.name} (ID: ${entry.id}) has withdrawn ${entry.amount} USDT.`;

        setTransactionMessages((prev) => [...prev, message]);
        speak(message, voiceCode);

        if (latestWithdraw) {
          localStorage.removeItem("latestWithdraw");
        }
      }, i * 4000);
    });
  }, [language, speakerOn]);

  const icons = ["💰", "🏧", "🎁", "📞", "📄", "ℹ️", "❓", "🌀"];
  const bottomIcons = ["🏠", "💵", "🛒", "🗂️", "👤"];

  const handleFeatureClick = (index) => {
    const routes = ["/deposit", "/widraw", "/invite", "/customer", "/terms", "/about", "/faq", "/wD"];
    navigate(routes[index]);
  };

  const handleBottomNavClick = (index) => {
    const bottomRoutes = ["/", "/form", "/order", "/orderhistory", "/profile"];
    navigate(bottomRoutes[index]);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    setShowDropdown(false);
  };

  return (
    <div className="homepage">
      <header className="header">
        <div className="app-name">🚀 Z1 Wallet</div>
        <div className="header-right">
          <div className="language-selector">
            <div className="language-toggle" onClick={() => setShowDropdown(!showDropdown)}>
              🌐 {language}
            </div>
            {showDropdown && (
              <ul className="language-dropdown">
                {Object.keys(translations).map((lang, idx) => (
                  <li key={idx} onClick={() => handleLanguageChange(lang)}>
                    {lang}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="speaker-toggle" onClick={toggleSpeaker} title="Toggle Speaker">
            {speakerOn ? "🔊" : "🔇"}
          </div>

          <div className="logout" onClick={handleLogout} title="Logout">
            <CiLogin size={28} />
          </div>
        </div>
      </header>

      <div className="slider-container">
        {sliderImages.map((img, i) => (
          <img key={i} src={img} alt={`slide-${i}`} className={`slider-image ${i === currentSlide ? "active" : ""}`} />
        ))}
      </div>

      <div className="feature-grid">
        {selectedLang.features.map((label, index) => (
          <div key={index} className="feature-card" onClick={() => handleFeatureClick(index)}>
            <div className="icon">{icons[index]}</div>
            <div className="label">{label}</div>
          </div>
        ))}
      </div>

      <div className="transaction-section">
        <h3>{selectedLang.transactionsTitle}</h3>
        <div className="transaction-list">
          {transactionMessages.map((msg, i) => (
            <div key={i} className="transaction-alert">{msg}</div>
          ))}
        </div>
      </div>

      <footer className="bottom-nav">
        {selectedLang.bottomNav.map((label, i) => (
          <div key={i} className="nav-item" onClick={() => handleBottomNavClick(i)}>
            <div className="icon">{bottomIcons[i]}</div>
            <div className="label">{label}</div>
          </div>
        ))}
      </footer>
    </div>
  );
};

export default Homepage;
