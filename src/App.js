import "./App.css";
import { Route,  Routes } from "react-router-dom";
import LoginPage from "./Login Page/Login Page"
import RegisterPage from "./RegisterPage/RegisterPage"
import DashboardPage from "./DashboardPage/DashboardPage"
import DepositPage from "./DepositPage/DepositPage"
import DepositsubmitPage from "./DepositsubmitPage/Depositsubmit";
import WithdrawPage from "./WidrawPage/WidrawPage";
import WDHistory from "./WDHistory/WDHistory";
import CustomerServicePage from "./CustomerPage/CustomerPage";
import TermsAndConditions from "./Termcondition/Termcondition";
import AboutPage from "./AboutPage/AboutPage";
import FaqPage from "./FaqPage/FaqPage";
import InvitationPage from "./InvitationPage/Invitation";
import OrderPage from "./OrderPage/OrderPage";
import OrderConfirmPage from "./OrderconfirmPage/OrderConfirm";
import OrderHistoryPage from "./OrderHistory page/OrderHistory";
import ProfilePage from "./ProfilePage/ProfilePage";
import SettingsPage from "./Setting page/SettingPage";
import AdminPage from "./Admin/Admin";
import DefaultPage from "./DafaultPage/DefaultPage"
import  DepositContext, { DepositProvider }  from "./DepositContext/DepositContext";
import WithdrawMethod from "./WIdrawMethodPage/WidrawMethod";
import ChangeWithdrawPassword from "./WidrawPasswordPage/WidrawPassword";
import ChangeLoginPassword from "./LoginPasswordPage/LoginPassword";
  





function App() {
  return (
  
      <Routes>
      
        

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
         <Route path="/home"element={<DashboardPage />} />
         <Route path="/deposit" element={<DepositPage/>}/>
         <Route path="/form" element={<DepositsubmitPage/>}/>
         <Route path="/widraw"element={<WithdrawPage/>}/>
         <Route path="/wd"element={<WDHistory/>}/>
         <Route path="/customer"element={<CustomerServicePage/>}/>
         <Route path="/terms" element={<TermsAndConditions/>}/>
         <Route path="/about" element={<AboutPage/>}/>
         <Route path="/faq" element={<FaqPage/>}/>
         <Route path="/invite" element={<InvitationPage/>}/>
          <Route path="/order" element={<OrderPage/>}/>
          <Route path="/orderConfirm" element={<OrderConfirmPage/>}/>
          <Route path="/orderhistory" element={<OrderHistoryPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/setting" element={<SettingsPage/>}/>
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path="/" element={<DefaultPage/>}/>
          <Route path="context"element={<DepositProvider/>}/>
          <Route path="wmethod"element={<WithdrawMethod/>}/>
          <Route path="wpassword"element={<ChangeWithdrawPassword/>}/>
          <Route path="lpassword"element={<ChangeLoginPassword/>}/>






          





      </Routes>
      
    
  );
}

export default App;
