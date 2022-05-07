import {createRoot} from 'react-dom/client'
import "./assets/base.less"
import Router from './router'

const root = createRoot(document.getElementById('root'))
root.render(<Router/>)