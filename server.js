// const BASE_URL = " http://localhost:3000";
const BASE_URL = " https://music-top.herokuapp.com";

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

  filterSong(query) {
    const url = `${BASE_URL}/songs?q=${query}`;

    return fetch(url).then((result) => result.json());
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

  editSong(payload, id) {
    const url = `${BASE_URL}/songs/${id}`;

    return fetch(url, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }

  deleteSong(id) {
    const url = `${BASE_URL}/songs/${id}`;

    return fetch(url, {
      method: "DELETE",
    });
  }
}
