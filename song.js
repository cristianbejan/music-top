class Song {
  constructor(name, artist) {
    this.uid = (Math.random() + 1).toString(36).substring(7);
    this.name = name;
    this.artist = artist;
  }

  #entryTopDate = new Date();
  #votes = 0;

  vote() {
    this.#votes++;
  }

  getVoteCount() {
    return this.#votes;
  }

  get entryTopDate() {
    return this.#entryTopDate.toLocaleString("en-GB");
  }
}
