import React from "react";
import { useNavigate } from "react-router-dom";
import "./Styles.css";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="terms-wrapper">
      <div className="terms-card">
        {/* ✅ Back Button */}
        <button className="back-button" onClick={() => navigate(-1)}>←</button>

        <h1 className="terms-title">Terms and Conditions</h1>

        <section className="terms-section">
          <h2>1. Introduction</h2>
          <p>
            Welcome to our Share Market Platform. By accessing or using our
            services, you agree to comply with and be bound by the following terms
            and conditions.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. Eligibility</h2>
          <p>
            You must be at least 18 years old to use this platform. By agreeing to
            these terms, you represent and warrant that you are legally permitted
            to use our services.
          </p>
        </section>

        <section className="terms-section">
          <h2>3. Account Responsibility</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account
            and password. You agree to accept responsibility for all activities
            that occur under your account.
          </p>
        </section>

        <section className="terms-section">
          <h2>4. Market Risk</h2>
          <p>
            Investing in the share market involves risks, including possible loss
            of capital. We are not liable for any financial losses you may incur.
          </p>
        </section>

        <section className="terms-section">
          <h2>5. User Conduct</h2>
          <p>
            You agree not to use our platform for any unlawful or fraudulent
            activities, and you must comply with all applicable laws and
            regulations.
          </p>
        </section>

        <section className="terms-section">
          <h2>6. Modifications</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use
            of the platform after changes constitutes acceptance of the updated
            terms.
          </p>
        </section>

        <section className="terms-section">
          <h2>7. Contact</h2>
          <p>
            If you have any questions about these Terms and Conditions, please
            contact us at <strong>support@abc.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
