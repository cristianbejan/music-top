class HtmlSong extends Song {
  getHtml(song) {
    return `
        <i class="fa-solid fa-music fa-2x"></i>
        <div class="song-details">
          <div>
            <h3>${song.name}</h3>
            <h5>${song.artist}</h5>
          </div>
          <div>
            <p>Date added: ${song.entryTopDate}</p>
            
          </div>
        </div>
        <div class="vote flex-center">
          <button type="button" class="btn vote-btn" name='${
            song.uid
          }' >Vote</button>
          <p>${song.getVoteCount()} votes</p>
        </div>
    `;
  }
}

class MusicTopHtmlGenerator {
  static getHtml(musicTopArr) {
    let displayTop = ``;
    const htmlSong = new HtmlSong();

    musicTopArr.getTop().forEach((item, index) => {
      console.log("item: ", item);
      displayTop += `
          <li class="item-list flex-center">
            <span>${index + 1}</span>
            ${htmlSong.getHtml(item)}
          </li>
      `;
    });

    return displayTop;
  }
}

class Alert {
  showAlert() {
    const alert = document.createElement("div");
    alert.classList = "error";
    alert.innerHTML = "*Please fill out this field";

    return alert;
  }

  clearAlert() {
    const alert = document.querySelector(".error");
    alert.remove();
  }
}
