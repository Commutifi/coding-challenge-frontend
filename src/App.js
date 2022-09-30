/*
 * @Author: Leo
 * @Date: 2022-09-29 16:01:09
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-29 17:04:28
 * @FilePath: \coding-challenge-frontend\src\App.js
 * @Description:
 */
// import logo from './logo.svg';
import './App.css';
import 'animate.css';
import Home from './views/Home';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Home />
    </div>
  );
}

export default App;
