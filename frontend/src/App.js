import React, { Component } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { LoginPage } from "./pages/LoginPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useEffect } from "react";
import { APICheckAuth } from "./redux/auth/loginReducer";
import { useDispatch } from "react-redux";

const Layout = ({children}) => {
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(APICheckAuth())
  }, [])
  return (
    <React.Fragment>
        {children}
    </React.Fragment>
  )
}

const App = () => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Routes>
                  <Route path='/' element={<div>home</div>}/>  
                  <Route path='/login' element={<LoginPage />}/>  
              </Routes>
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }

  export default App;
