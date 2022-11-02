import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { Provider,useDispatch } from "react-redux";
import store from "./redux/store";
import { useEffect } from "react";
import { APICheckAuth } from "./redux/auth/loginReducer";

import { LoginPage } from "./pages/LoginPage";
import { RoomsPage } from "./pages/RoomsPage";
import { ChatPage } from "./pages/ChatPage";


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
                  <Route path='/' element={<RoomsPage />}/>  
                  <Route path='/login' element={<LoginPage />}/>  
                  <Route path='/room/:id' element={<ChatPage />}/>  
              </Routes>
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }

  export default App;
