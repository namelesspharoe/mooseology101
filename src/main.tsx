import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Enable React.Strict only in development
const StrictWrapper = process.env.NODE_ENV === 'development' ? React.StrictMode : React.Fragment;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictWrapper>
    <App />
  </StrictWrapper>,
)