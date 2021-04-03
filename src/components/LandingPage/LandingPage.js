import logo from "../../logo.svg";
import "./LandingPage.css";
import { Link } from "react-router-dom";
function LandingPage() {
  return (
    <div className="LandingPage">
      <header className="LandingPage-header">
        <h2 className="p-text">Welcome to Stock - Time Series</h2>
        <img src={logo} className="LandingPage-logo" alt="logo" />
        <p className="p-text">
          <span>
            <div className="sans-serif">
              Click <Link to="/stocks">here </Link> to see time series data of
              stock prices.
            </div>
          </span>
        </p>
      </header>
    </div>
  );
}

export default LandingPage;
