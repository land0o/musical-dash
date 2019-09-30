import React, { Component } from "react";
import ChatDataManager from "./ChatDataManager";
import ChatCard from "./ChatCard";

class ChatList extends Component {
  state = {
    chats: [],
    userId: sessionStorage.getItem("spotifyId"),
    userName: sessionStorage.getItem("SpotifyName"),
    message: "",
    chatId: "",
    editedMessage: false,
    loadingStatus: false
  };

  componentDidMount() {
    console.log("chat LIST: ComponentDidMount");
    ChatDataManager.getAllChats().then(chats => {
      this.setState({
        chats: chats
      });
      console.log(this.state.chats);
    });
  }
  deleteChats = id => {
    ChatDataManager.deleteChat(id).then(() => {
      ChatDataManager.getAllChats().then(newChats => {
        this.setState({
          chats: newChats
        });
      });
    });
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  populateInput = id => {
    ChatDataManager.getChat(id).then(chat =>
      this.setState({
        message: chat.message,
        editedMessage: true,
        chatId: chat.id
      })
    );
  };

  constructNewChat = evt => {
    evt.preventDefault();
    console.log(this.state.userName);

    this.setState({ loadingStatus: true });
    const chat = {
      userName: sessionStorage.getItem("SpotifyName"),
      message: this.state.message
    };
    ChatDataManager.postChat(chat)
      .then(() => ChatDataManager.getAllChats())
      .then(chats => {
        this.setState({
          chats: chats,
          message: ""
        });
        console.log(this.state.chats);
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-cards">
          <h1 className="header">Chat</h1>
          <div className="wrapper">
            {this.state.chats.map(chat => (
              <ChatCard
                key={chat.id}
                chat={chat}
                deleteChats={this.deleteChats}
                populateInput={this.populateInput}
                {...this.props}
              />
            ))}
          </div>
          {/* input field  */}
          <div className="submitSection">
            <input
              id="message"
              onChange={this.handleFieldChange}
              placeholder="Chat with other users!"
              value={this.state.message}
            />
            <button id="chatSubmitBtn" onClick={this.constructNewChat}>
              Send
            </button>
          </div>
        </div>

        {/* end of submitSection */}
      </React.Fragment>
    );
  }
}

export default ChatList;
