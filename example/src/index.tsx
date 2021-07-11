import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { HashRouter as Router } from 'react-router-dom'
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)