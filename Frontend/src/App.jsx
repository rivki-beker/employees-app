import { useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/layout";
import Login from "./components/login";
import Home from "./components/layout/home";
import Employees from "./components/employees/employees";
import RoleNames from "./components/roleNames/roleNames";

export const IsConnected = createContext(null);

function App() {
  const token = localStorage.getItem("security_token");
  const [isConnected, setIsConnected] = useState(token ? true : false);
  const connected = { isConnected, setIsConnected };

  return (
    <IsConnected.Provider value={connected}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Layout />}>
            <Route path={""} element={<Home />}></Route>
            <Route path={"login"} element={<Login />}></Route>
            <Route path={"employees"} element={<Employees />}></Route>
            <Route path={"roles"} element={<RoleNames />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </IsConnected.Provider>
  );
}

export default App;
