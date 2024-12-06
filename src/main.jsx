import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './hooks/useTheme';
import { AuthProvider } from "./hooks/useAuth"; 
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
     <ThemeProvider>
        <App />
     </ThemeProvider>
   </AuthProvider>
  </StrictMode>,
)
