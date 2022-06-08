export class TouristSpots {
  constructor() {
    this.touristSpotList = [
      {
        image: "assets/rio-de-janeiro.png",
        name: "Rio de Janeiro",
        description:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
      },
      {
        image: "assets/ilha-grande.png",
        name: "Ilha Grande",
        description:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
      },
      {
        image: "assets/cristo-redentor.png",
        name: "Cristo Redentor",
        description:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
      },
      {
        image: "assets/centro-historico-paraty.png",
        name: "Centro Histórico de Paraty",
        description:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
      },
    ];

    this.selectors();
    this.events();
    this.renderList();
  }

  selectors() {
    this.dropArea = document.querySelector(".tourist-spots-input-img");
    this.dropInput = document.querySelector(".img-input");
    this.imgInputLabel = document.querySelector(".input-label");
    this.formSubmit = document.querySelector(".tourist-spots-form");
    this.cards = document.querySelector(".list-cards");
  }

  events() {
    this.dropArea.addEventListener("change", this.onFileSelection.bind(this));
    this.dropArea.addEventListener("dragover", this.dragOverEvent.bind(this));
    this.dropArea.addEventListener("drop", this.dropEvent.bind(this));
    this.formSubmit.addEventListener("submit", this.addCardToList.bind(this));
  }

  onFileSelection() {
    if (this.dropInput.files.length) {
      this.updateThumbnail(this.dropInput.files[0]);
    }
  }

  dragOverEvent(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  dropEvent(e) {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      this.dropInput.files = e.dataTransfer.files;
      this.updateThumbnail(e.dataTransfer.files[0]);
    }
  }

  updateThumbnail(file) {
    if (!file.type.startsWith("image/")) {
      return;
    }

    this.imgInputLabel.style.display = "none";

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      this.dropArea.style.backgroundImage = `url('${reader.result}')`;
      this.dropArea.style.backgroundOrigin = "border-box";
      this.dropArea.style.backgroundRepeat = "round";
    };
  }

  addCardToList(e) {
    e.preventDefault();

    const spotName = e.target["tourist-spot-name"].value;
    const spotDescription = e.target["tourist-spot-description"].value;
    const spotImage = this.dropInput.files[0];

    if (!spotImage.type.startsWith("image/")) {
      return;
    }

    const newTouristSpot = {
      image: spotImage,
      name: spotName,
      description: spotDescription,
    };

    this.touristSpotList.push(newTouristSpot);
    this.renderList();
    this.resetList();
  }

  renderList() {
    let newSpotStructure = "";

    this.touristSpotList.forEach((item, index) => {
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

    this.cards.innerHTML = newSpotStructure;
  }

  resetList() {
    const clearTitle = document.querySelector(".tourist-spots-input-title");
    const clearDescription = document.querySelector(
      ".tourist-spots-input-description"
    );

    clearTitle.value = "";
    clearDescription.value = "";
    this.dropArea.style.backgroundImage = "unset";
    this.imgInputLabel.style.display = "block";

    this.dropInput.value = "";
  }
}
