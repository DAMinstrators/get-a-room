import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import FloorCanvas from './css/floorCanvas.css';
import Layout from './css/layout.css';
import Style from './css/style.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(<MuiThemeProvider><App/></MuiThemeProvider>, document.getElementById('app'));