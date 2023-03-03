import {createRoot} from 'react-dom/client'
import App from './App'
import './index.css'

const container = document.getElementById('root') as HTMLElement
const app = <App />
createRoot(container).render(app)
