class MusicTop {
  addSong(song) {
    server.addSong(song).then(async () => await getTop());
  }

  async getTop() {
    let songsArr = await server.getSongs();

    return songsArr.sort((a, b) => {
      if (a.votes === b.votes) {
        return new Date(b.date) - new Date(a.date);
      } else {
        return b.votes - a.votes;
      }
    });
  }
}
