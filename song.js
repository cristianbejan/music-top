class Song {
  constructor(name, artist, uid) {
    this.name = name;
    this.artist = artist;
    this.uid = !uid ? (Math.random() + 1).toString(36).substring(7) : uid;
    this.votes = 0;
  }

  #entryTopDate = new Date();

  vote() {
    this.votes++;
  }

  // getVoteCount() {
  //   return this.votes;
  // }

  get entryTopDate() {
    return this.#entryTopDate.toLocaleString("en-GB");
  }

  set updateVote(vote) {
    this.votes = vote;
  }
}
