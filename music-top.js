class MusicTop {
  storage = new Store();
  #songs = this.storage.getStorage();

  addSong(song) {
    this.#songs.push(song);
    this.storage.addToStorage(this.#songs);
  }

  getTop() {
    const sortedArr = this.#songs.sort((a, b) => {
      if (a.votes === b.votes) {
        return new Date(b.date) - new Date(a.date);
      } else {
        return b.votes - a.votes;
      }
    });
    this.storage.addToStorage(sortedArr);
    return sortedArr;
  }

  getSong(uid) {
    return this.#songs.find((song) => song.uid === uid);
  }
}

// <!-- b) Create 1 instance of MusicTop called musicTopTest and at least 5 instances of Song. Every time you create a song instance, add it to the musicTopTest instance. Log the top in the console after adding all song instances.  -->

// const musicTopTest = new MusicTop();

// const song1 = new Song("Thunder", "Imagine Dragons");
// musicTopTest.addSong(song1);
// const song2 = new Song("Feel It Still", "Portugal, The Man");
// musicTopTest.addSong(song2);
// const song3 = new Song("Dat Melody", "Doub");
// musicTopTest.addSong(song3);
// const song4 = new Song(
//   "La Bolintinul din Vale",
//   "Damian Draghici, Mihai Margineanu"
// );
// musicTopTest.addSong(song4);
// const song5 = new Song("Mergem mai departe", "Suie Paparude");
// musicTopTest.addSong(song5);

// console.log("initial musicTopTest: ", musicTopTest);

// // <!-- Simulate increasing the votes count for some songs. Log the top again after messing with the votes. Repeat these steps several times. -->

// song4.vote();
// song4.vote();
// song4.vote();
// song2.vote();
// song2.vote();
// song3.vote();

// console.log("second musicTopTest: ", musicTopTest.getTop());

// song3.vote();
// song5.vote();
// song4.vote();

// console.log("third musicTopTest: ", musicTopTest.getTop());

// song5.vote();
// song2.vote();
// song2.vote();
// song2.vote();
// song2.vote();
// song5.vote();
// song5.vote();
// song5.vote();
// song5.vote();

// console.log("fourth musicTopTest: ", musicTopTest.getTop());
