const remoteURL = "http://localhost:5002";
//1. convert fetch calls to match json
//2.use fetch calls to get post data where needed
export default {
  getSong(id) {
    return fetch(`${remoteURL}/songsAddedToPlaylist/${id}`).then(response =>
      response.json()
    );
  },
  getAllSongs(id) {
    return fetch(`${remoteURL}/songsAddedToPlaylist?playlistId=${id}`).then(response => response.json());
  },
  getAllPlaylists() {
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
  getAllUsers() {
    return fetch(`${remoteURL}/users`).then(response => response.json());
  },
  postUser(userObject) {
    return fetch(`${remoteURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userObject)
    }).then(response => response.json());
  },
  checkUsers(email, spotifyId) {
    return fetch(
      `${remoteURL}/users?email=${email}&&spotifyId=${spotifyId}`
    ).then(response => response.json());
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
  deleteSong(id) {
    return fetch(`${remoteURL}/songsAddedToPlaylist/${id}`, { method: "DELETE" }).then(
      response => response.json()
    );
  },
  editPlaylist(playlistObj, id) {
    return fetch(`${remoteURL}/playlists/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(playlistObj)
    }).then(response => response.json());
  }
};
