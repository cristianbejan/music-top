const BASE_URL = " http://localhost:3000";

class Server {
  getSongs() {
    const url = `${BASE_URL}/songs`;

    return fetch(url).then((result) => result.json());
  }

  getSong(id) {
    const url = `${BASE_URL}/songs/${id}`;

    return fetch(url).then((result) => result.json());
  }

  addSong(song) {
    const url = `${BASE_URL}/songs`;

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(song),
    });
  }

  updateVotes(newValue, id) {
    const url = `${BASE_URL}/songs/${id}`;

    return fetch(url, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        votes: newValue,
      }),
    });
  }

  deleteSong(id) {
    const url = `${BASE_URL}/songs/${id}`;

    return fetch(url, {
      method: "DELETE",
    });
  }
}
