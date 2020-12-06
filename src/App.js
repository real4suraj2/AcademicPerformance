import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Kform from './components/form';
import Login from './screens/Login';
import Admin from './screens/Admin';
import Student from './screens/Student';
import TeacherScreen from './screens/Teacher';


class App extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="h-100">
        <Switch>
          <Route path="/" component={Login} exact/>
          <Route path="/dashboard" component={Student} />
          <Route path="/admin" component={Admin} />
          <Route path="/teacher" component={TeacherScreen} />
        </Switch>
      </div>
    )

  };
}

export default App;
