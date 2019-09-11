import { Route } from "react-router-dom";
import React, { Component } from "react";
import CurrentTrack from "./trackInfo/CurrentTrack";
import Landing from "./landing/Landing";
export default class ApplicationViews extends Component {
  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            return <Landing {...props} />;
          }}
        />
        <Route
          exact
          path="/trackInfo"
          render={props => {
            return <CurrentTrack {...props} />;
          }}
        />
      </React.Fragment>
    );
  }
}
