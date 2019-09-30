import React, { Component } from "react";
import "./TopNav.css";
// import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


class TopNav extends Component {
  state ={
    userName: sessionStorage.getItem("SpotifyName")
  }
  logout = () => {
    sessionStorage.clear();
  };
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark light-blue flex-md-nowrap p-0 shadow">
          <img src={require("./img/MdLogo.svg")} alt="" className="navImg" />
          <p className="welcome">Welcome {this.state.userName}</p>
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:8888">
                Refresh Tokens
              </a>
            </li>
            <li className="nav-item">
              <a
                onClick={this.logout}
                className="nav-link"
                href="http://localhost:3000"
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>
        {/* <Navbar color="dark" fixed expand="md" className="navbar">
          <NavbarBrand href="/">
            <div>
              <img
                src={require("./img/MdLogo.svg")}
                alt=""
                className="navImg"
              />
            </div>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="http://localhost:8888">Refresh Tokens</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="http://localhost:3000">Logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar> */}
      </div>
    );
  }
}

export default TopNav;
