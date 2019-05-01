import React, { Component } from 'react';
import { withGetScreen } from 'react-getscreen'
import { WebCamera } from './components/WebCam'
import { Route, HashRouter, Switch } from 'react-router-dom'
import LoginPage from './screens/login/LoginPage'

const WebCameraRender = withGetScreen(WebCamera)
class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" component={LoginPage} />
          {/* <Route path="/reset/password/:token" component={ResetPassword} />
          <Route path="/invite/:token" component={CompletePage} /> */}
        </Switch>
      </HashRouter>
      //<WebCameraRender></WebCameraRender>
    );
  }
}
export default App;
