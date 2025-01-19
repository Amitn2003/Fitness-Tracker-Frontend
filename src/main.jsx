import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './hooks/useTheme';
import { AuthProvider } from "./hooks/useAuth"; 
import App from './App.jsx'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWorker.js')
    .then(() => {
      console.log('Service Worker Registered');
    })
    .catch((error) => {
      console.error('Service Worker Registration Failed:', error);
    });
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
     <ThemeProvider>
        <App />
     </ThemeProvider>
   </AuthProvider>
  </StrictMode>,
)
