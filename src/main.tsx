import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { LangProvider } from './context/LangContext'
import { ThemeProvider } from './context/ThemeContext'
import { ChatsProvider } from './context/ChatsContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LangProvider>
        <ChatsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChatsProvider>
      </LangProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
