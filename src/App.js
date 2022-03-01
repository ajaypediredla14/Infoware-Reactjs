import react, {useEffect,useState} from 'react';
import './App.css';
import Weather from './components/weather.js';
import Shoppingcart from './components/cart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

function App() {
  const [state, setstate] = useState("/");
  

  return (
    <div className="App">
      <Router basename={window.location.pathname || ''}>
        <Switch>
          <Route path="/">
            <div style={{ display: "flex",borderBottom: "2px solid white", justifyContent: "space-evenly" }}>
              <Link  to="/" className={state==="/"? "mainactive":"main"} onClick={()=>setstate("/")}>
                <h3 >Weather Api</h3>
              </Link>
              <Link  to="/cart" className={state==="/cart"? "mainactive":"main"} onClick={()=>setstate("/cart")}>
                <h3 >Shopping Cart</h3>
              </Link>
            </div>
            <Route exact path="/" component={Weather} />
            <Route exact path="/cart" component={Shoppingcart} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
