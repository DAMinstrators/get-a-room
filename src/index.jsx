import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import FloorCanvas from './css/floorCanvas.css';
import Layout from './css/layout.css';
import Style from './css/style.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, browserHistory } from 'react-router';
injectTapEventPlugin();

ReactDOM.render((
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
      </Route>
    </Router>
  </MuiThemeProvider>
), document.getElementById('app'));

        // <Route path='/create' component={}/>
        // <Route path='/join' component={}/>
        // <Route path='/select' component={}/>