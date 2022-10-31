import React, { Component } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { LoginPage } from "./pages/LoginPage";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<div>home</div>}/>  
              <Route path='/login' element={<LoginPage />}/>  
            </Routes>
        </BrowserRouter>
      </Provider>
    );
  }

  export default App;
