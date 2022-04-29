import {createRoot} from 'react-dom/client'
import "./assets/base.css"
import Router from './router'

const root = createRoot(document.getElementById('root'))
root.render(<Router/>)