// Fills photos.html from CONTENT.photos (see content.js): the add button and a
// gallery of the shared Google Drive folder with a pop-up viewer. The list of files
// comes from the Apps Script (see apps-script/Code.gs). If it can't be reached, the
// page falls back to Google's own embedded folder view.

(function () {
  const photos = CONTENT.photos;
  const folderUrl = `https://drive.google.com/drive/folders/${photos.folderId}`;
  const thumbUrl = (id, width) => `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;

  document.getElementById("photos-title").textContent = photos.title;
  document.getElementById("photos-intro").textContent = photos.intro;
  document.getElementById("photos-add").href = folderUrl;
  document.getElementById("photos-open").href = folderUrl;

  const status = document.getElementById("photos-status");
  const grid = document.getElementById("photo-grid");
  const frame = document.getElementById("photos-frame");
  let items = [];

  function showEmbedFallback() {
    status.hidden = true;
    frame.src = `https://drive.google.com/embeddedfolderview?id=${photos.folderId}#grid`;
    frame.hidden = false;
  }

  async function loadPhotos() {
    try {
      const response = await fetch(`${photos.endpoint}?action=photos&t=${Date.now()}`);
      const data = await response.json();
      if (!data.ok || !Array.isArray(data.photos)) throw new Error("bad response");
      items = data.photos;
    } catch (e) {
      showEmbedFallback();
      return;
    }
    if (!items.length) {
      status.textContent = "No photos yet. Be the first to add one!";
      return;
    }
    status.hidden = true;
    renderGrid();
  }

  function renderGrid() {
    grid.innerHTML = "";
    items.forEach((item, index) => {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "photo-tile";
      tile.setAttribute("aria-label", `${item.kind === "video" ? "Play video" : "Open photo"} ${index + 1} of ${items.length}`);
      const img = document.createElement("img");
      img.src = thumbUrl(item.id, 400);
      img.alt = "";
      img.loading = "lazy";
      tile.appendChild(img);
      if (item.kind === "video") {
        const play = document.createElement("span");
        play.className = "photo-play";
        play.setAttribute("aria-hidden", "true");
        play.textContent = "▶";
        tile.appendChild(play);
      }
      tile.addEventListener("click", () => openViewer(index));
      grid.appendChild(tile);
    });
  }

  // ---------- Pop-up viewer ----------

  const viewer = document.getElementById("lightbox");
  const stage = document.getElementById("lightbox-stage");
  let current = 0;

  function showItem() {
    const item = items[current];
    stage.innerHTML = "";
    if (item.kind === "video") {
      const player = document.createElement("iframe");
      player.src = `https://drive.google.com/file/d/${item.id}/preview`;
      player.allow = "autoplay; fullscreen";
      player.allowFullscreen = true;
      player.title = "Party video";
      stage.appendChild(player);
    } else {
      const img = document.createElement("img");
      img.src = thumbUrl(item.id, 1600);
      img.alt = "Party photo";
      stage.appendChild(img);
    }
    document.getElementById("lightbox-prev").hidden = items.length < 2;
    document.getElementById("lightbox-next").hidden = items.length < 2;
  }

  function openViewer(index) {
    current = index;
    showItem();
    if (!viewer.open) viewer.showModal();
  }

  function step(delta) {
    current = (current + delta + items.length) % items.length;
    showItem();
  }

  function closeViewer() {
    viewer.close();
  }

  // Clearing the stage stops a playing video when the viewer closes.
  viewer.addEventListener("close", () => { stage.innerHTML = ""; });
  document.getElementById("lightbox-close").addEventListener("click", closeViewer);
  document.getElementById("lightbox-prev").addEventListener("click", () => step(-1));
  document.getElementById("lightbox-next").addEventListener("click", () => step(1));
  // A click on the dark backdrop (the dialog itself) closes it.
  viewer.addEventListener("click", (event) => { if (event.target === viewer) closeViewer(); });
  viewer.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") step(-1);
    if (event.key === "ArrowRight") step(1);
  });

  // Swipe left/right on a phone.
  let touchStartX = null;
  viewer.addEventListener("touchstart", (event) => { touchStartX = event.touches[0].clientX; }, { passive: true });
  viewer.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;
    const dx = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(dx) > 60) step(dx < 0 ? 1 : -1);
  });

  loadPhotos();
})();
