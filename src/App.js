import React, { Component } from 'react';
import Kform from './components/form';
import InputScreen from './screens/commloginscreen';
import Admin from './screens/loginpage';
import Login from './screens/loginpage';
import Student from './screens/studentinfo';
import TeacherScreen from './screens/teacherscreen';


class App extends Component  {

  constructor(props){
    super(props);
    this.state = {
    
    }
  }
//set routes here!!
  render() {
    return (
    <Student/>
    )

  };
}

export default App;
