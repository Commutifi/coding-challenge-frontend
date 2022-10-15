import './styles/styles.scss';
import Weather from './components/Weather'
import Header from './components/Header'
import Footer from './components/Footer'
function App() {
  return (
    <div className="App">
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
      </a>
      <Header />
      <Weather />
      <Footer />
    </div>
  );
}

export default App;
