import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UserProvider from './context/context';
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
// استيراد الخط محليّاً
import '@fontsource/poppins/600.css';  // وزن 600
import '@fontsource/poppins/700.css';
import '@fontsource/monoton';
import '@fontsource/pacifico';
// يُحمّل وزن 400 تلقائياً
import '@fontsource/nunito/400.css';  // وزن 400
import '@fontsource/nunito/600.css';  // وزن 600
import '@fontsource/nunito/700.css';  // وزن 700
import '@fontsource/great-vibes'; // الوزن الافتراضي 400
import '@fontsource/lobster';
import '@fontsource/abril-fatface';
import '@fontsource/lora';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </UserProvider>
  </BrowserRouter>
)
