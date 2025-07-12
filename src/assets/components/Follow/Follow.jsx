// Follow.jsx 
import React, { useState, useEffect } 
from 'react'; import './Follow.css'; 
import im4 from './image/im4.jpg'; 
import im2 from './image/im2.jpg'; 
import im5 from './image/im5.jpg'; 
import Navbar from '../NavBar/NavBar'; 
import Footer from '../Footer/Footer';

const Follow = () => { const [advertisers, setAdvertisers] = useState([]);

useEffect(() => { // محاكاة جلب البيانات من API 
 setAdvertisers([ { 
  id: 1,
   name: 'LearnHub', 
   description: 'Online courses', 
   avatar: im2 }, {
     id: 2, 
     name: 'Travelio', 
     description: 'Touristic tours', 
     avatar: im4 }, { 
      id: 3,
       name: 'BistroPlace', 
       description: 'Restaurant advertising', 
       avatar: im5 } ]); }, []);

return ( <div> <Navbar /> 
<div className="fa-container"> 
  {advertisers.map(ad => ( <div key={ad.id} className="fa-card"> <img src={ad.avatar} alt={ad.name} className="fa-avatar" /> <div className="fa-info"> <h4 className="fa-name">{ad.name}</h4>
   <p className="fa-desc">{ad.description}</p> </div> <div className="fa-actions"> 
    <button className="fa-btn-follow">Following</button>
     <button className="fa-btn-unfollow">Unfollow</button> </div> </div> ))}
      </div> <Footer /> </div> ); };

export default Follow;