// Fills photos.html from CONTENT.photos (see content.js): the add button,
// the embedded Google Drive folder, and the "open in Drive" fallback link.

(function () {
  const photos = CONTENT.photos;
  const folderUrl = `https://drive.google.com/drive/folders/${photos.folderId}`;

  document.getElementById("photos-title").textContent = photos.title;
  document.getElementById("photos-intro").textContent = photos.intro;
  document.getElementById("photos-note").textContent = photos.addNote;
  document.getElementById("photos-add").href = folderUrl;
  document.getElementById("photos-open").href = folderUrl;
  document.getElementById("photos-frame").src =
    `https://drive.google.com/embeddedfolderview?id=${photos.folderId}#grid`;
})();
