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
            <p>Date added: ${song.date}</p>
            
          </div>
        </div>
        <div class="vote flex-center">
            <button type="button" class="btn vote-btn" data-id='${song.id}' >Vote</button>
          <p>${song.votes} votes</p>
        </div>
        <i class="fa-solid fa-xmark" data-uid='${song.id}'></i>
    `;
  }
}

class MusicTopHtmlGenerator {
  static async getHtml(musicTopArr) {
    let displayTop = ``;
    const htmlSong = new HtmlSong();

    let musicTop = await musicTopArr.getTop();

    musicTop.forEach((item, index) => {
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
