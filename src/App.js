import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import Progress from './components/Progress/Progress';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userContext = createContext();

function App() {
 const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <userContext.Provider  value={[loggedInUser, setLoggedInUser]} >
          <Router>
          <Header></Header>
          <div className="main-div">
            <Switch>
              <Route path="/shop">
                 <Shop></Shop>
              </Route>
              <Route path="/review">
                 <Review></Review>
              </Route>
              <Route path="/progress">
                 <Progress></Progress>
              </Route>
              <PrivateRoute path="/manage">
                 <Manage></Manage>
              </PrivateRoute>
              <PrivateRoute path="/shipment">
                 <Shipment></Shipment>
              </PrivateRoute>
              <Route path="/login">
                 <Login></Login>
              </Route>
              <Route path="/product/:key">
                 <ProductDetail></ProductDetail>
              </Route>
              <Route exact path="/">
                 <Shop></Shop>
              </Route>
              <Route path="*">
                 <NotFound></NotFound>
              </Route>
            </Switch>
            </div>
          </Router>
    </userContext.Provider>
  );
}

export default App;
