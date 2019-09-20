import React, { Component } from "react";
import { Button } from "reactstrap";
import EditPlaylistForm from "./EditPlaylistForm"

class CreatedPlaylistCard extends Component {
state = {
  showEditForm: false
}

  render() {
    return (
      <div className="createdPlaylistCard">
        <div className="singlePlaylist">
          <p>
            {this.props.playlist.title} for {this.props.playlist.description}
            <br/>
            <Button
              size="sm"
              color="info"
              className="editPlaylist"
              onClick={() =>this.setState({showEditForm: true})}
            >
              edit
            </Button>
            <Button
              size="sm"
              color="info"
              className="editPlaylist"
            >
             <span role="img"/>Add🎵
            </Button>
          </p>
          <hr className="hrLine" />
        </div>
        {/* toggles the input field to true so it shows*/}
        {
          this.state.showEditForm?<EditPlaylistForm 
          playlist={this.props.playlist} 
          deletePlaylist={this.props.deletePlaylist}
          editPlaylist={this.props.editPlaylist}
          />: null
        }
        
      </div>
    );
  }
}

export default CreatedPlaylistCard;
