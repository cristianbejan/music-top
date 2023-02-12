class Song {
  #entryTopDate = new Date();
  #votes = 0;

  constructor(name, artist, uid, votes, date) {
    this.name = name;
    this.artist = artist;
    this.uid = !uid ? (Math.random() + 1).toString(36).substring(7) : uid;
    this.votes = !votes ? 0 : votes;
    this.date = !date ? new Date().toLocaleString("en-GB") : date;
  }

  vote() {
    this.votes++;
    this.#votes++;
  }

  getVoteCount() {
    return this.#votes;
  }

  get entryTopDate() {
    return this.#entryTopDate.toLocaleString("en-GB");
  }
}
