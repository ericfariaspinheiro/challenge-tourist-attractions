document.addEventListener("DOMContentLoaded", function () {
  const touristSpotList = [];

  const dropArea = document.querySelector(".tourist-spots-input-img");
  const dropInput = document.querySelector(".tourist-spots-input-img-input");
  const inputLabel = document.querySelector(".input-label");
  const formSubmit = document.querySelector(".tourist-spots-form");
  const cards = document.querySelector(".tourist-spots-list");

  dropArea.addEventListener("click", dropInputClick);
  dropArea.addEventListener("change", onFileSelection);
  dropArea.addEventListener("dragover", dragOverEvent);
  dropArea.addEventListener("drop", dropEvent);
  formSubmit.addEventListener("submit", addCardToList);

  function dropInputClick() {
    dropInput.click();
  }

  function onFileSelection() {
    if (dropInput.files.length) {
      updateThumbnail(dropArea, dropInput.files[0]);
    }
  }

  function dragOverEvent(e) {
    e.preventDefault();
  }

  function dropEvent(e) {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      dropInput.files = e.dataTransfer.files;
      updateThumbnail(dropArea, e.dataTransfer.files[0]);
    }
  }

  function updateThumbnail(dropZoneElement, file) {
    inputLabel.remove();

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        dropArea.style.backgroundImage = `url('${reader.result}')`;
        dropArea.style.backgroundOrigin = "border-box";
      };
    } else {
      dropArea.style.backgroundImage = null;
    }
  }

  function addCardToList(e) {
    e.preventDefault();
    const spotName = e.target["tourist-spot-name"].value;
    const spotDescription = e.target["tourist-spot-description"].value;
    const spotImage = dropInput.files[0];

    const newTouristSpot = {
      image: spotImage,
      name: spotName,
      description: spotDescription,
    };

    touristSpotList.push(newTouristSpot);
    renderList();
  }

  function renderList() {
    let newSpotStructure = "";

    touristSpotList.forEach((item) => {
      newSpotStructure += `
        <div class="list-item">
          <div class="list-item-div-img">
            <img
              class="list-item-img"
              src="${item.image}"
              alt=""
            />
          </div>
          <div class="list-item-description">
            <div class="list-item-description-container">
              <h3 class="list-item-description-title">${item.name}</h3>
              <p class="list-item-description-text">
                ${item.description}
              </p>
            </div>
          </div>
        </div>
      `;
    });
    console.log(newSpotStructure);
    cards.innerHTML = newSpotStructure;
    console.log(touristSpotList[0]);
  }
});
