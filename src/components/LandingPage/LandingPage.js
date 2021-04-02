import logo from "../../logo.svg";
import "./LandingPage.css";
import {  Link } from "react-router-dom";
function LandingPage() {
  return (
      <div className="LandingPage">
        <header className="LandingPage-header">
          <h2 class="p-text">Welcome to Stock - Time Series</h2>
          <img src={logo} className="LandingPage-logo" alt="logo" />
          <p class="p-text">
            Click
            <span>
              <div className="sans-serif">
                <Link to="/stocks">here </Link>
              </div>
            </span>
            to see time series data of stock prices.
          </p>
        </header>
      </div>
  );
}

export default LandingPage;
