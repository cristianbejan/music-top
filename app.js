const list = document.querySelector("ul");
const songInput = document.querySelector("#song");
const artistInput = document.querySelector("#artist");
const submitBtn = document.querySelector("#submit-btn");
const addForm = document.querySelector("#add-form");
const addBtn = document.querySelector(".add-song");
const cancelBtn = document.querySelector("#cancel-btn");
const filterBtn = document.querySelector("#filter-btn");
const clearFilter = document.querySelector("#clear-filter");
const searchInput = document.querySelector("#filter");

let editSongId = null;
let editMode = false;

const musicTop = new MusicTop();
const server = new Server();

window.addEventListener("DOMContentLoaded", () => getTop());

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  editMode ? saveEditedSong() : addSong();
});

artistInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    editMode ? saveEditedSong() : addSong();
  }
});

list.addEventListener("click", (e) => {
  editSong(e);
  vote(e);
  removeSong(e);
});

addBtn.addEventListener("click", () => showForm());

cancelBtn.addEventListener("click", () => {
  clearForm();
  hideForm();
});

filterBtn.addEventListener("click", () => filterSong());

clearFilter.addEventListener("click", () => clearSearchInput());

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    filterSong();
  }

  if (e.key === "Backspace" || e.key === "Delete") {
    clearSearchInput();
  }
});

// Get top
async function getTop() {
  let getMusicTop = await musicTop.getTop();
  list.innerHTML = await MusicTopHtmlGenerator.getHtml(getMusicTop);
}

// Add new song
function addSong() {
  const alert = new Alert();

  if (!songInput.value.length) {
    songInput.after(alert.showAlert());
    submitBtn.disabled = true;

    setTimeout(() => {
      alert.clearAlert();
      submitBtn.disabled = false;
    }, 3000);
    return;
  }

  if (!artistInput.value.length) {
    artistInput.after(alert.showAlert());
    submitBtn.disabled = true;

    setTimeout(() => {
      alert.clearAlert();
      submitBtn.disabled = false;
    }, 3000);
    return;
  }

  const song = new Song(songInput.value, artistInput.value);
  musicTop.addSong(song);

  clearForm();
}

// Search by name or artist
async function filterSong() {
  const searchInput = document.querySelector("#filter");
  const alert = new Alert();
  const filterDiv = document.querySelector(".filter");

  if (!searchInput.value.length) {
    filterDiv.after(alert.showAlert());
    filterBtn.disabled = true;

    setTimeout(() => {
      alert.clearAlert();
      filterBtn.disabled = false;
    }, 3000);

    return;
  }

  const filteredData = await server.filterSong(searchInput.value);

  if (filteredData.length === 0) {
    list.innerHTML = "Nothing found. Please try different keyword.";
  } else {
    list.innerHTML = await MusicTopHtmlGenerator.getHtml(filteredData);
  }
}

// Implement the voting functionality
async function vote(e) {
  const targetSongId = e.target.dataset["id"];

  if (!targetSongId) {
    return;
  }
  let targetSong = await server.getSong(targetSongId);
  const newVoteValue = targetSong.votes + 1;

  server.updateVotes(newVoteValue, targetSongId);
}

// Remove song from list
function removeSong(e) {
  const targetSongId = e.target.dataset["delete"];

  if (!targetSongId) {
    return;
  }

  if (window.confirm("Are you sure?")) {
    server.deleteSong(targetSongId);
  }
}

// Edit song
async function editSong(e) {
  e.preventDefault();

  const songId = e.target.dataset["update"];

  if (!songId) {
    return;
  }

  showForm();
  songInput.focus();
  addForm.scrollIntoView();

  editSongId = songId;
  editMode = true;

  let song = await server.getSong(editSongId);

  songInput.value = song.name;
  artistInput.value = song.artist;

  submitBtn.textContent = "Save changes";
}

// Save edited song
function saveEditedSong() {
  const payload = {
    name: songInput.value,
    artist: artistInput.value,
  };

  server.editSong(payload, editSongId);

  editMode = false;
  submitBtn.textContent = "Add Song";
}

// Show form
function showForm() {
  addForm.style.display = "block";
  songInput.focus();
  addForm.scrollIntoView();
  addBtn.style.display = "none";
}

// Hide form
function hideForm() {
  addForm.style.display = "none";
  addBtn.style.display = "flex";
}

// Clear form

function clearForm() {
  songInput.value = "";
  artistInput.value = "";
  editMode = false;
  submitBtn.textContent = "Add Song";
}

// Clear search input
function clearSearchInput() {
  if (!searchInput.value) {
    return;
  }

  searchInput.value = "";
  filterBtn.disabled = false;
  getTop();
}
