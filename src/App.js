import logo from "./logo.svg";
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

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <header className="App-header">
//           <h2 class="p-text">Welcome to Stock - Time Series</h2>
//           <img src={logo} className="App-logo" alt="logo" />
//           <p class="p-text">
//             Click
//             <span>
//               <div className="sans-serif">
//                 <Link to="/stocks">here </Link>
//               </div>
//             </span>
//             to see time series data of stock prices.
//           </p>
//         </header>
//       </div>
//       <Switch>
//         <Route path="/stocks" exact component={StocksTimeSeries} />
//       </Switch>
//     </Router>
//   );
// }

export default App;
