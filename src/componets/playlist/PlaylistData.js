const remoteURL = "http://localhost:5002"
//1. convert fetch calls to match json
//2.use fetch calls to get post data where needed
export default {
    getSong(id) {
        return fetch(`${remoteURL}/songsAddedToPlaylist/${id}`)
            .then(response => response.json());
    },  
    getAllChats() {
        return fetch(`${remoteURL}/chat`)
            .then(response => response.json());
    },
    getAllChatsWithUser() {
        return fetch(`${remoteURL}/chat?_expand=user`)
            .then(response => response.json());
    },
    postChat(chatObject) {
        return fetch(`${remoteURL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(chatObject)
        }).then(response => response.json())
    },
    deleteChat(id) {
        return fetch(`${remoteURL}/chat/${id}`,
        {method: "DELETE"
        }).then(response => response.json())
    },
    editChat(chatObj, id) {
        return fetch (`${remoteURL}/chat/${id}`,  {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(chatObj)
        }).then(response => response.json());
    }
}