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
  },
  German: {
    features: ["Einzahlung", "Auszahlung", "Einladung", "Kundendienst", "Bedingungen", "Über uns", "FAQ", "WFP"],
    transactionsTitle: "Auszahlungsbetrag",
    bottomNav: ["Start", "Einzahlung", "Bestellungen", "Aufzeichnungen", "Profil"]
  },
  Italian: {
    features: ["Deposito", "Prelievo", "Invito", "Servizio clienti", "Termini", "Chi siamo", "FAQ", "WFP"],
    transactionsTitle: "Importo Ritirato",
    bottomNav: ["Home", "Deposito", "Ordini", "Registri", "Profilo"]
  },
  Russian: {
    features: ["Депозит", "Вывод", "Приглашение", "Поддержка", "Условия", "О нас", "FAQ", "WFP"],
    transactionsTitle: "Сумма Вывода",
    bottomNav: ["Главная", "Депозит", "Заказы", "История", "Профиль"]
  },
  Japanese: {
    features: ["入金", "出金", "招待", "カスタマーサービス", "利用規約", "私たちについて", "FAQ", "WFP"],
    transactionsTitle: "出金額",
    bottomNav: ["ホーム", "入金", "注文", "履歴", "プロフィール"]
  },
  Portuguese: {
    features: ["Depósito", "Retirada", "Convite", "Atendimento", "Termos", "Sobre nós", "FAQ", "WFP"],
    transactionsTitle: "Valor Retirado",
    bottomNav: ["Início", "Depósito", "Pedidos", "Registros", "Perfil"]
  },
  Chinese: {
    features: ["充值", "提现", "邀请", "客服", "条款", "关于我们", "常见问题", "WFP"],
    transactionsTitle: "提现金额",
    bottomNav: ["首页", "充值", "订单", "记录", "个人资料"]
  },
  Korean: {
    features: ["입금", "출금", "초대", "고객 서비스", "약관", "회사 소개", "FAQ", "WFP"],
    transactionsTitle: "출금 금액",
    bottomNav: ["홈", "입금", "주문", "기록", "프로필"]
  },
  Dutch: {
    features: ["Storten", "Opnemen", "Uitnodiging", "Klantenservice", "Voorwaarden", "Over ons", "FAQ", "WFP"],
    transactionsTitle: "Opnamebedrag",
    bottomNav: ["Start", "Storten", "Bestellingen", "Records", "Profiel"]
  },
  Indonesian: {
    features: ["Deposit", "Penarikan", "Undangan", "Layanan Pelanggan", "Syarat", "Tentang Kami", "FAQ", "WFP"],
    transactionsTitle: "Jumlah Penarikan",
    bottomNav: ["Beranda", "Deposit", "Pesanan", "Catatan", "Profil"]
  },
  Polish: {
    features: ["Depozyt", "Wypłata", "Zaproszenie", "Obsługa Klienta", "Warunki", "O nas", "FAQ", "WFP"],
    transactionsTitle: "Kwota Wypłaty",
    bottomNav: ["Strona", "Depozyt", "Zamówienia", "Rekordy", "Profil"]
  }
};

const langCodes = {
  English: "en-US",
  Arabic: "ar-SA",
  Turkish: "tr-TR",
  French: "fr-FR",
  Spanish: "es-ES",
  German: "de-DE",
  Italian: "it-IT",
  Russian: "ru-RU",
  Japanese: "ja-JP",
  Portuguese: "pt-PT",
  Chinese: "zh-CN",
  Korean: "ko-KR",
  Dutch: "nl-NL",
  Indonesian: "id-ID",
  Polish: "pl-PL"
};

const sliderImages = [
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhboNerHbw6UBAARF2Nbv8cxxbbgHK8ZQCTZdChnA6uAic5xLZSXEGm8D66B4L8ARINYz_BLe88rwHiSiLAK7YNfFt0iUPuyKz43tLNPDwVphKa5VI8isx5yN0O6fJ2RY9e_D3ylPv4sGsZ/s1600/cr7-ad-insane+%25284%2529.jpg",
  "https://cedcommerce.com/blog/wp-content/uploads/2019/05/Amazon-Sponsored-products-tw-og2.jpg",
  "https://moneymoveshq.com/wp-content/uploads/2023/04/AdobeStock_106078504.jpeg",
  "https://evitamin.in/cdn/shop/articles/Blog_Creatives2_1_1_15c22938-a285-49ca-9276-2d547469d593.jpg?v=1736491368"
];

const Homepage = () => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "English");
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transactionMessages, setTransactionMessages] = useState([]);
  const [speakerOn, setSpeakerOn] = useState(localStorage.getItem("speakerOn") !== "false");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
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
    if (!newState) speechSynthesis.cancel();
  };

  const toggleDarkMode = () => {
    const newState = !darkMode;
    setDarkMode(newState);
    localStorage.setItem("darkMode", newState);
    document.body.classList.toggle("dark-mode", newState);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => {
      clearInterval(interval);
      speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    document.body.dir = language === "Arabic" ? "rtl" : "ltr";
    setTransactionMessages([]);
    const voiceCode = langCodes[language] || "en-US";
    const dummyData = [
      { name: "Ali", id: "Z1A8923", amount: "125.00" },
      { name: "Fatima", id: "Z1B7632", amount: "200.50" },
      { name: "Ahmed", id: "Z1C4401", amount: "89.99" }
    ];
    dummyData.forEach((entry, i) => {
      setTimeout(() => {
        const msg = `📢 ${entry.name} (ID: ${entry.id}) has withdrawn ${entry.amount} USDT.`;
        setTransactionMessages((prev) => [...prev, msg]);
        speak(msg, voiceCode);
      }, i * 4000);
    });
  }, [language, speakerOn]);

  const icons = ["💰", "🏧", "🎁", "📞", "📄", "ℹ️", "❓", "🌀"];
  const bottomIcons = ["🏠", "💵", "🛒", "🗂️", "👤"];

  const handleFeatureClick = (i) => {
    const routes = ["/deposit", "/widraw", "/invite", "/customer", "/terms", "/about", "/faq", "/wD"];
    navigate(routes[i]);
  };

  const handleBottomNavClick = (i) => {
    const routes = ["/", "/form", "/order", "/orderhistory", "/profile"];
    navigate(routes[i]);
  };

  return (
    <div className={`homepage ${darkMode ? "dark" : ""}`}>
      <header className="navbar">
        <div className="navbar-left">
          <span className="logo-text">💸 <span className="logo-gradient">W1 Wallet</span></span>
        </div>
        <div className="navbar-right">
          <div className="language-selector">
            <div className="language-toggle" onClick={() => setShowDropdown(!showDropdown)}>
              🌐 {language}
            </div>
            {showDropdown && (
              <ul className="language-dropdown">
                {Object.keys(translations).map((lang, i) => (
                  <li key={i} onClick={() => {
                    setLanguage(lang);
                    localStorage.setItem("language", lang);
                    setShowDropdown(false);
                  }}>
                    {lang}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="dark-mode-toggle" onClick={toggleDarkMode} title="Toggle Dark/Light Mode">
            {darkMode ? "🌙" : "☀️"}
          </div>
          <div className="speaker-toggle" onClick={toggleSpeaker} title="Toggle Speaker">
            {speakerOn ? "🔊" : "🔇"}
          </div>
          <div className="logout" onClick={() => navigate("/login")} title="Logout">
            <CiLogin size={28} />
          </div>
        </div>
      </header>

      <div className="slider-container">
        {sliderImages.map((img, i) => (
          <img key={i} src={img} alt={`Slide ${i}`} className={`slider-image ${i === currentSlide ? "active" : ""}`} />
        ))}
      </div>

      <div className="feature-grid">
        {selectedLang.features.map((label, i) => (
          <div key={i} className="feature-card" onClick={() => handleFeatureClick(i)}>
            <div className="icon">{icons[i]}</div>
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
