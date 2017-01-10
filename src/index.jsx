import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import FloorCanvas from './css/floorCanvas.css';
import Layout from './css/layout.css';
import Style from './css/style.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, browserHistory } from 'react-router';
import MakeReservation from './components/content/makeReservation/MakeReservation.jsx';
import JoinBuilding from './components/content/joinBuilding/JoinBuilding.jsx';
import CreateBuilding from './components/content/createBuilding/CreateBuilding.jsx';
import Content from './components/content/Content.jsx';
injectTapEventPlugin();

ReactDOM.render((
    <div>
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <Route path='/' component={App}>
            <div className={'container'}>
              <Route path='/createreservation' component={MakeReservation} />
              <Route path='/join' component={JoinBuilding} />
              <Route path='/createbuilding' component={CreateBuilding} />
            </div>
          </Route>
        </Router>
      </MuiThemeProvider>
    </div>
), document.getElementById('app'));


