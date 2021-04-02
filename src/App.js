import "./App.css";
import StocksTimeSeries from "./components/stocks/StocksTimeSeries";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
    return (
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage}></Route>
            <Route path="/stocks" component={StocksTimeSeries}></Route>
          </Switch>
        </Router>
      </div>
    );
}

export default App;
