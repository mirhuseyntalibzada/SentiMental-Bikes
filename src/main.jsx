import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './toolkit/store'
import { ModeProvider } from './context/ModeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ModeProvider>
        <App />
      </ModeProvider>
    </Provider>
  </React.StrictMode >,
)
