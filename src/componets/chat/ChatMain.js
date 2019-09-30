import React, { Component } from "react";
import ChatList from "./ChatList";

class ChatMain extends Component {
  render() {
    return (
      <React.Fragment>
        <ChatList {...this.props} />
      </React.Fragment>
    );
  }
}

export default ChatMain;
