const remoteURL = "http://localhost:5002";
//1. convert fetch calls to match json
//2.use fetch calls to get post data where needed
export default {
  getSong(id) {
    return fetch(`${remoteURL}/songsAddedToPlaylist/${id}`).then(response =>
      response.json()
    );
  },
  getAllPlaylist() {
    return fetch(`${remoteURL}/playlists`).then(response => response.json());
  },
  postPlaylist(playlistObject) {
    return fetch(`${remoteURL}/playlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(playlistObject)
    }).then(response => response.json());
  },
  postSong(songObject) {
    return fetch(`${remoteURL}/songsAddedToPlaylist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(songObject)
    }).then(response => response.json());
  },
  deletePlaylist(id) {
    return fetch(`${remoteURL}/playlists/${id}`, { method: "DELETE" }).then(
      response => response.json()
    );
  },
  editPlaylist(chatObj, id) {
    return fetch(`${remoteURL}/playlists/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(chatObj)
    }).then(response => response.json());
  }
};
