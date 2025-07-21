// File: OrdersPage.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Styles.css";
import { FaEdit } from "react-icons/fa";

const tabs = ["All", "VIP 1", "VIP 2", "VIP 3"];

// ✅ Google Sheets Web App URL
const GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"; // 🔁 Replace with your actual URL

const defaultVipData = [
  {
    level: "VIP 1",
    percent: "4%",
    unlocked: "20 USDT",
    orders: "25",
    rate: "4%",
    image: "https://ih1.redbubble.net/image.5681565445.8331/ur,pin_large_front,square,600x600.jpg",
  },
  {
    level: "VIP 2",
    percent: "8%",
    unlocked: "500 USDT",
    orders: "25",
    rate: "8%",
    image: "https://st4.depositphotos.com/1842549/20931/i/450/depositphotos_209318190-stock-photo-vip-icon-internet-button-white.jpg",
  },
  {
    level: "VIP 3",
    percent: "12%",
    unlocked: "899 USDT",
    orders: "25",
    rate: "12%",
    image: "https://ih1.redbubble.net/image.1832947537.6722/ur,pin_large_front,square,600x600.jpg",
  },
];

const OrdersPage = () => {
  const location = useLocation();
  const isAdmin = location.pathname.includes("/admin");
  const navigate = useNavigate();
  const [vipData, setVipData] = useState(() => {
    return location.state?.updatedVipData || defaultVipData;
  });
  const [activeTab, setActiveTab] = useState("All");
  const [selectedVIP, setSelectedVIP] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const filteredData =
    activeTab === "All"
      ? vipData
      : vipData.filter((item) => item.level === activeTab);

  const handleNext = () => {
    if (!selectedVIP) {
      alert("Please select a VIP option.");
      return;
    }
    navigate("/orderconfirm", { state: { vip: selectedVIP } });
  };

  const handleUpdateChange = (index, key, value) => {
    const updated = [...vipData];
    updated[index][key] = value;
    setVipData(updated);
  };

  // ✅ Send VIP data to Google Sheets
  const sendToGoogleSheet = async () => {
    try {
      await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vipData),
      });
      console.log("✅ Data sent to Google Sheets");
    } catch (error) {
      console.error("❌ Failed to send to Google Sheets:", error.message);
    }
  };

  const handleSaveAndView = async () => {
    await sendToGoogleSheet();
    alert("✅ VIP data saved to Google Sheets!");
    navigate("/orders", { state: { updatedVipData: vipData } });
  };

  // ✅ FETCH VIP data live from Google Sheets (only addition)
  useEffect(() => {
    const fetchVIPData = async () => {
      try {
        const response = await fetch(GOOGLE_SHEET_WEBHOOK_URL);
        const data = await response.json();
        setVipData(data);
      } catch (error) {
        console.error("❌ Failed to fetch VIP data:", error.message);
      }
    };

    fetchVIPData();
  }, []);

  return (
    <div className="orders-container">
      <button className="back-btn-floating" onClick={() => navigate(-1)}>
        ←
      </button>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => {
              setActiveTab(tab);
              setSelectedVIP(null);
              setEditingIndex(null);
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="vip-cards">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className={`vip-card ${
              selectedVIP?.level === item.level ? "selected-card" : ""
            }`}
            onClick={() => {
              if (!isAdmin) setSelectedVIP(item);
            }}
          >
            <div className="vip-info">
              <div className="vip-header">
                <span className="vip-label">{item.level}</span>
                {isAdmin && (
                  <FaEdit
                    className="edit-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingIndex(index);
                    }}
                  />
                )}
              </div>

              {editingIndex === index ? (
                <>
                  <input
                    value={item.percent}
                    onChange={(e) =>
                      handleUpdateChange(index, "percent", e.target.value)
                    }
                  />
                  <input
                    value={item.unlocked}
                    onChange={(e) =>
                      handleUpdateChange(index, "unlocked", e.target.value)
                    }
                  />
                  <input
                    value={item.orders}
                    onChange={(e) =>
                      handleUpdateChange(index, "orders", e.target.value)
                    }
                  />
                  <input
                    value={item.rate}
                    onChange={(e) =>
                      handleUpdateChange(index, "rate", e.target.value)
                    }
                  />
                  <input
                    value={item.image}
                    onChange={(e) =>
                      handleUpdateChange(index, "image", e.target.value)
                    }
                  />
                  <button
                    className="save-button"
                    onClick={() => setEditingIndex(null)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <h3>{item.percent}</h3>
                  <p>Unlocked amount: {item.unlocked}</p>
                  <p>Daily order number: {item.orders}</p>
                  <p>Commission rate: {item.rate}</p>
                </>
              )}
            </div>

            <div className="vip-image">
              <img src={item.image} alt={item.level} />
            </div>
          </div>
        ))}
      </div>

      {!isAdmin && (
        <button className="next-button" onClick={handleNext}>
          Next →
        </button>
      )}

      {isAdmin && (
        <button className="save-button" onClick={handleSaveAndView}>
          Save & View Order Page
        </button>
      )}
    </div>
  );
};

export default OrdersPage;
