import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import' main.css' //not required for library. only for convience and to keep the lib ui independent. 

createRoot(document.getElementById('root')).render(
    <App />
)
