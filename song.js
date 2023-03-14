class Song {
  #entryTopDate = new Date();
  #votes = 0;

  constructor(name, artist, votes, date, id) {
    this.name = name;
    this.artist = artist;
    this.votes = !votes ? 0 : votes;
    this.date = !date ? new Date().toLocaleString("en-GB") : date;
    this.id = !id ? Math.floor(Math.random() * Date.now()) : id;
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
