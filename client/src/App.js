import "./App.css";
import Routes from "./router";
import Footer from "./containers/Footer/Footer";
import Navbar from "./containers/NavBar/navbar";
function App() {
  console.log("app");
  return (
    <div className="App">
      <Navbar />
      <div className="routesMain">
        <Routes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
