import logo from "./logo.svg";
import "./App.css";

import Header from "./components/header";
import Account from "./components/account";
import Logout from "./components/logout";
import Password from "./components/password";
import MainComponent from "./components/maincomponent";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      {/* <Header />
      <MainComponent /> */}
      <Dashboard />
    </div>
  );
}

export default App;
