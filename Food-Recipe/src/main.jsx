import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextAPI from './Context/ContextAPI.jsx'

createRoot(document.getElementById('root')).render(
	<ContextAPI>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ContextAPI>
)
