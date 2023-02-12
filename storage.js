class Store {
  addToStorage(songsArr) {
    return localStorage.setItem("song", JSON.stringify(songsArr));
  }

  getStorage() {
    const storedArr =
      localStorage.getItem("song") === null
        ? []
        : JSON.parse(localStorage.getItem("song"));

    const mappedArr = storedArr.map((item) => {
      return new Song(item.name, item.artist, item.uid, item.votes, item.date);
    });
    return mappedArr;
  }
}
