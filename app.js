const list = document.querySelector("ul");
const songInput = document.querySelector("#song");
const artistInput = document.querySelector("#artist");
const submitBtn = document.querySelector("#submit-btn");

const musicTop = new MusicTop();

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

// Implement the voting functionality

list.addEventListener("click", (e) => {
  const targetSong = musicTop.getSong(e.target.name);

  if (!targetSong) {
    return;
  }

  targetSong.vote();
  const musicTopHtml = MusicTopHtmlGenerator.getHtml(musicTop);
  list.innerHTML = musicTopHtml;
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

  const musicTopHtml = MusicTopHtmlGenerator.getHtml(musicTop);
  list.innerHTML = musicTopHtml;

  songInput.value = "";
  artistInput.value = "";
}
