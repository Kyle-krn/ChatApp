import React, { Component } from "react";
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { LoginPage } from "./pages/LoginPage";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<div>home</div>}/>  
            <Route path='/login' element={<LoginPage />}/>  
          </Routes>
      </BrowserRouter>
    );
  }
}

// const appDiv = document.getElementById("app");
// render(<App />, appDiv);