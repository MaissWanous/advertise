// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Navbar from './assets/components/NavBar/NavBar';
// import Footer from './assets/components/Footer/Footer';
// import Profile from './assets/components/ProfileAd/Profile'
// import YourAds from './assets/components/Your ads/YourAds';
// import Detials from './assets/components/DetialsAds/Detials';
// import Saved from './assets/components/Saved/Saved';
// import Viewer from './assets/components/Viewer/Viewer';
// import SignInSignUp from './assets/components/SignInSignUp/SignInSignUp';
// import SignOut from './assets/components/SignOut/SignOut';
// import CreateAdForm from './assets/components/CreateAdForm/CreateAdForm';
// import Start from './assets/components/Start/Start'
// import DashboardAds from './assets/components/DashboardAds/DashboardAds';
// import Subscription from './assets/components/Subscription/Subscription';
// import DashboardAdmain from './assets/components/DashboardAdmain/DashboardAdmain';
// import Admain from './assets/components/Admain/Admain';
// import Section from './assets/components/Section/Section';
// import Follow from './assets/components/Follow/Follow';
// import About from './assets/components/About/About';
// import Payment from './assets/components/Payment1/Payment';
// import Payment2 from './assets/components/Payment2/Payment2';
// import Password from './assets/components/Password/Password';
// import ForgotPasswordModal from './assets/components/Forget/ForgotPassword';
//  import ResetPassword from './assets/components/CreatNewPassword/ResetPassword';
// import Verification from './assets/components/Verification/Verification';
// import Home from './assets/components/Home/Home';
// import ForgotPassword  from'./assets/components/Forget/ForgotPassword';



// export default function App() {
//   return (
//     <>
    
//       <Routes>
//         <Route path="/"  element={<Start/>}/>
//         < Route path="/Home" element={<Home />}/>
//         <Route path="/profile"  element={<Profile />} />
//         < Route path="/saved"  element={<Saved />}/>
//         < Route path="/follow" element={<Follow />}/>
//         < Route path="/about"  element={<About />}/>
//         < Route path="/signout"  element={<SignOut />}/>
//           < Route path="/signinsignUp" element={<SignInSignUp/>}/>
//           <Route path="/ signOut"  element={ <SignOut/>}/>
//           <Route path="/DashboardAds" element={<DashboardAds/>}/>
//           <Route path="/YourAds" element={<YourAds/>}/>
//           <Route path="/Subscription" element={<Subscription/>}/>
//           <Route path="/Payment2" element={<Payment2/>}/>
//           <Route path='/Payment' element={<Payment/>}/>
//           <Route path='/forgotPassword' element={<ForgotPassword/>}/>
//           <Route path='/verification' element={<Verification/>}/>
//           <Route path='/resetPassword' element={<ResetPassword/>}/>
//           <Route path='/password' element={<Password/>}/>
//           <Route path='/Detials' element={<Detials/>}/>
//           <Route path='/Section'  element={<Section/>}/> 
//           <Route path='/CreateAdForm' element={<CreateAdForm/>}/>
          
         
//            </Routes>




//         {/* 
//    <Viewer/>

  
//    <CreateAdForm/>

  
 
 

//    <DashboardAdmain/>
//    <Admain/> 
//    */}

        

    


//     </>
//   );
// }
// src/App.jsx
import React from "react";
import { Route, Routes } from 'react-router-dom';
 import Follow from "./assets/components/Follow/Follow";
//import Navbar from "./assets/components/NavBar/Navbar";
//import Footer from "./assets/components/Footer/Footer";
import Start from "./assets/components/Start/Start";
import SignInSignUp from "./assets/components/SignInSignUp/SignInSignUp";
 import Home from './assets/components/Home/Home';
//import LogIn from "./assets/components/LogIn/LogIn";
 import ForgotPassword from "./assets/components/Forget/ForgotPassword";
 import About from './assets/components/About/About';
 import SignOut from './assets/components/SignOut/SignOut';
 import Profile from './assets/components/ProfileAd/Profile';
 import CreateAccount from './assets/components/CreateAccount/CreateAccount';
 import CreateAdForm from './assets/components/CreateAdForm/CreateAdForm';
 import Payment from './assets/components/Payment1/Payment';
  import ResetPassword from './assets/components/CreatNewPassword/ResetPassword';
 import Verification from './assets/components/Verification/Verification';
  import Saved from './assets/components/Saved/Saved';
  import Section from './assets/components/Section/Section';
  import LogIn from './assets/components/LogIn/LogIn';
  import Subscription from './assets/components/Subscription/Subscription';
  import Detials from './assets/components/DetialsAds/Detials';
export default function App() {
  return(
     <>
     <Routes>
          <Route path="/"  element={<Start/>}/>
          < Route path="/signinsignUp" element={<SignInSignUp/>}/>
         
             <Route path='/forgotPassword' element={<ForgotPassword/>}/>
               < Route path="/about"  element={<About />}/>
                  < Route path="/Home" element={<Home />}/>
                  < Route path="/follow" element={<Follow />}/>
                  <Route path="/profile"  element={<Profile />} />
                     < Route path="/signout"  element={<SignOut />}/>
                     <Route path="/CreateAccount" element={<CreateAccount/>}/>
                       <Route path='/CreateAdForm' element={<CreateAdForm/>}/>
                          <Route path='/Payment' element={<Payment/>}/>
                             <Route path='/verification' element={<Verification/>}/>
                              <Route path='/resetPassword' element={<ResetPassword/>}/>
                               < Route path="/saved"  element={<Saved />}/>
                                 <Route path='/Section'  element={<Section/>}/> 
                                 <Route path="/LogIn" element={<LogIn/>}/>
                                  <Route path="/Subscription" element={<Subscription/>}/>
                                     <Route path='/Detials' element={<Detials/>}/>
       
   
    {/* <Navbar/>
    
    <Footer/> */}


     {/* <LogIn/> */}
    {/* < ForgotPassword /> */}
  
</Routes>
{/* <Follow/>

<Profile/> */}


   

</>
  )
  ;
}