import React, { Component } from "react";
import "./Chat.css";

class ChatCard extends Component {
  state = {
    userId: sessionStorage.getItem("spotifyId"),
    userName: sessionStorage.getItem("SpotifyName")
  };
  render() {
    return (
      <div className="chatCard">
        <div className="chatCardContent">
          <div className="chats">
            <p>
              {this.props.chat.userName}: {this.props.chat.message}
            </p>
            {this.state.userName === this.props.chat.userName && (
              <div className="chatBtns">
                <button
                  id="chatDelete"
                  onClick={() => this.props.deleteChats(this.props.chat.id)}
                >
                  🗑
                </button>
              </div>
            )}
            {/* end of chat btns  */}
          </div>
          {/* end of chats section  */}
        </div>
        <hr className="hrLine" />
        {/* end of chatCardContent section  */}
      </div>
    );
  }
}

export default ChatCard;
