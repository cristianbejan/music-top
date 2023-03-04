const list = document.querySelector("ul");
const songInput = document.querySelector("#song");
const artistInput = document.querySelector("#artist");
const submitBtn = document.querySelector("#submit-btn");

const musicTop = new MusicTop();
const server = new Server();

window.addEventListener("DOMContentLoaded", async () => {
  list.innerHTML = await MusicTopHtmlGenerator.getHtml(musicTop);
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addSong();
});

artistInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addSong();
    artistInput.blur();
  }
});

function addSong() {
  const alert = new Alert();

  if (!songInput.value.length) {
    songInput.after(alert.showAlert());
    submitBtn.disabled = true;

    setTimeout(() => {
      alert.clearAlert();
      submitBtn.disabled = false;
    }, 2000);
    return;
  }

  if (!artistInput.value.length) {
    artistInput.after(alert.showAlert());
    submitBtn.disabled = true;

    setTimeout(() => {
      alert.clearAlert();
      submitBtn.disabled = false;
    }, 2000);
    return;
  }

  const song = new Song(songInput.value, artistInput.value);
  musicTop.addSong(song);

  songInput.value = "";
  artistInput.value = "";
}

// Implement the voting functionality

list.addEventListener("click", async (e) => {
  const targetSongId = e.target.dataset["id"];

  if (!targetSongId) {
    return;
  }
  let targetSong = await server.getSong(targetSongId);
  const newVoteValue = targetSong.votes + 1;

  server.updateVotes(newVoteValue, targetSongId);
});

// Remove song from list

list.addEventListener("click", async (e) => {
  const targetSongId = e.target.dataset["uid"];

  if (!targetSongId) {
    return;
  }

  if (window.confirm("Are you sure?")) {
    server.deleteSong(targetSongId);
  }
});
