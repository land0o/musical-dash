import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import MusicalDash from "./componets/MusicalDash";
// import LandingPage from "./componets/landing/LandingPage";
import 'bootstrap/dist/css/bootstrap.css';
// import NavBar from "./componets/nav/NavBar";

ReactDOM.render(
  <Router>
    <MusicalDash />
  </Router>,
  document.getElementById("root")
);
