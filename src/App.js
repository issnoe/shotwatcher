import React, { Component } from 'react';
import { withGetScreen } from 'react-getscreen'
import { WebCamera } from './components/WebCam'
import { Route, HashRouter, Switch } from 'react-router-dom'
import LoginPage from './screens/login/LoginPage'
import BottomAppBar from './components/BottomAppBar'
class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/access" component={LoginPage} />
          <Route path="/" component={BottomAppBar} />
        </Switch>
      </HashRouter>
    );
  }
}
export default App;
