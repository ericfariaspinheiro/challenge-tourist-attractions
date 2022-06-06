document.addEventListener("DOMContentLoaded", function () {
  const touristSpotList = [
    {
      image: "../src/assets/rio-de-janeiro.png",
      name: "Rio de Janeiro",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
    },
    {
      image: "../src/assets/ilha-grande.png",
      name: "Ilha Grande",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
    },
    {
      image: "../src/assets/cristo-redentor.png",
      name: "Cristo Redentor",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
    },
    {
      image: "../src/assets/centro-historico-paraty.png",
      name: "Centro Histórico de Paraty",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
    },
  ];

  const dropArea = document.querySelector(".tourist-spots-input-img");
  const dropInput = document.querySelector(".tourist-spots-input-img-input");
  const formSubmit = document.querySelector(".tourist-spots-form");
  const cards = document.querySelector(".list-items");

  renderList();

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
    document.querySelector(".input-label").remove();

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        dropArea.style.backgroundImage = `url('${reader.result}')`;
        dropArea.style.backgroundOrigin = "border-box";
        dropArea.style.backgroundRepeat = "round";
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
    resetList();
  }

  function renderList() {
    let newSpotStructure = "";

    touristSpotList.forEach((item, index) => {
      newSpotStructure += `
        <div class="list-item">
          <div class="list-item-div-img">
            <img
              class="list-item-img"
              src="${
                index > 3 ? window.URL.createObjectURL(item.image) : item.image
              }"
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

    cards.innerHTML = newSpotStructure;
  }

  function resetList() {
    const clearTitle = document.querySelector(".tourist-spots-input-title");
    const clearDescription = document.querySelector(
      ".tourist-spots-input-description"
    );
    const clearImage = document.querySelector(".tourist-spots-input-img");
    const inputImageText = document.createElement("span");
    inputImageText.innerText = "Imagem";
    inputImageText.classList.add("input-label");

    clearTitle.value = "";
    clearDescription.value = "";
    clearImage.style.backgroundImage = "unset";
    clearImage.appendChild(inputImageText);
  }
});
