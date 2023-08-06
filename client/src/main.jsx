import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import "./css/style.css"
import { UserContextProvider } from "./context/UserContext"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserContextProvider>
      <App />
    </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
