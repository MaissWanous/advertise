import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import all components used in the routes
import Start from './assets/components/Start/Start';
import SignInSignUp from './assets/components/SignInSignUp/SignInSignUp';
import ForgotPassword from './assets/components/Forget/ForgotPassword';
import About from './assets/components/About/About';
import Home from './assets/components/Home/Home';
import Follow from './assets/components/Follow/Follow';
import Profile from './assets/components/ProfileAd/Profile';
import SignOut from './assets/components/SignOut/SignOut';
import CreateAccount from './assets/components/CreateAccount/CreateAccount';
import CreateAdForm from './assets/components/CreateAdForm/CreateAdForm';
import Payment from './assets/components/Payment1/Payment';
import ResetPassword from './assets/components/CreatNewPassword/ResetPassword';
import Verification from './assets/components/Verification/Verification';
import Saved from './assets/components/Saved/Saved';
import Section from './assets/components/Section/Section';
import LogIn from './assets/components/LogIn/LogIn';
import AdminLogin from './assets/components/AdminLogin/AdminLogin';
import Subscription from './assets/components/Subscription/Subscription';
import Detials from './assets/components/DetialsAds/Detials';
import DashboardAdmain from './assets/components/DashboardAdmain/DashboardAdmain';
import Dashboard from './assets/components/DashboardAdmain/Dashboard';
import ProtectedRoute from './context/protectedRoute';
// import Dashboard from './assets/components/DashboardAdmain/Dashboard'; // Assuming this is the correct component for the dashboard

export default function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Start />} />
        <Route path="/signinsignUp" element={<SignInSignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path='/AdminLogin'element={<AdminLogin/>}/>
        {/* Authenticated User Routes  */}
        <Route element={<ProtectedRoute/>}>
        <Route path="/Home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/follow" element={<Follow />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/CreateAdForm" element={<CreateAdForm />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Section" element={<Section />} />
        <Route path="/Subscription" element={<Subscription />} />
        <Route path="/Detials" element={<Detials />} />
        <Route path="/DashbordAdmin/*" element={<Dashboard />} />
        <Route path='/d'element={<DashboardAdmain/>}/>
        </Route>
      </Routes>
    </>
  );
}
