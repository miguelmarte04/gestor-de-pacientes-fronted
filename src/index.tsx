import { createRoot } from 'react-dom/client'
import App from './App'
import 'antd/dist/antd.min.css'
import './styles/index.less'
import 'draft-js/dist/Draft.css'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(<App />)
