import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h2 class="p-text">
         Welcome to Stock - Time Series
        </h2>
        <img src={logo} className="App-logo" alt="logo" />
        <p class="p-text">
          Click <span>here</span> to see time series data of stock prices.
        </p>
      </header>
    </div>
  );
}

export default App;
