import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'

// Enable React.Strict only in development
const StrictWrapper = process.env.NODE_ENV === 'development' ? React.StrictMode : React.Fragment;

// AuthProvider wraps the app so Navigation and About can use useAuth (login/logout, edit mode).
ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictWrapper>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictWrapper>,
)