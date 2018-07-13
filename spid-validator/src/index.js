import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';

import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'

// Containers
import Main from './containers/Main'
import Empty from './containers/Empty'

ReactDOM.render((
  <HashRouter>
    <Switch>
      <Route path="/request" name="Request Validator" component={Main}/>
      <Route path="/response/:id" name="Response Validator" component={Main}/>
      {/* <Route path="/login" name="Login" component={Empty}/> */}
	    <Route path="/" name="Home" component={Main}/>
    </Switch>
  </HashRouter>
), document.getElementById('root'));
