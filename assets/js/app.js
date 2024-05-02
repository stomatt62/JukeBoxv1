const playlist = document.getElementById("playlist");
const lecteur = document.querySelector(".lecteur");
const cover = document.getElementById("cover");
const disque = document.getElementById("disque");
const category = document.getElementById("category");
const gif = document.getElementById("gif");

const config = {
  urlCover: "uploads/covers/",
  urlSound: "uploads/musics/",
};

const getData = async () => {
  const req = await fetch("https://api-195d.onrender.com/api/v1/music");
  console.log(req);
  const dbMusic = await req.json();
  data = dbMusic.result;
  console.log("result", data);

  data.forEach((music) => {
    playlist.innerHTML += `<li id="${music.id}"><h2>${music.title}</h2><div><small>${music.category}</small></div></li>`;
  });

  const allLi = document.querySelectorAll("li");

  allLi.forEach((li) => {
    li.addEventListener("click", function (elem) {
      const id = parseInt(li.id);
      const searchById = data.find((element) => element.id === id);
      lecteur.src = `${config.urlSound}${searchById.sound}`;
      lecteur.play();
      cover.src = `${config.urlCover}${searchById.cover}`;
      if (disque.classList.contains("pause")) {
        disque.classList.remove("pause");
      }
    });
  });

  const aleatoireBtn = document.getElementById("aleatoire");

  aleatoireBtn.addEventListener("click", function () {
    // Générer un index aléatoire dans la plage des indices du tableau dbMusic
    const randomIndex = Math.floor(Math.random() * data.length);

    // Sélectionner une musique aléatoire à partir de dbMusic
    const randomMusic = data[randomIndex];

    // Mettre à jour le lecteur audio avec la musique aléatoire
    lecteur.src = `${config.urlSound}${randomMusic.sound}`;
    lecteur.play();

    // Mettre à jour la couverture avec la couverture de la musique aléatoire
    cover.src = `${config.urlCover}${randomMusic.cover}`;

    // Retirer la classe "pause" pour lancer l'animation du disque
    disque.classList.remove("pause");
  });
  gif.style.display = "none";

  // Ajoutez le code suivant pour afficher le GIF animé lorsque l'utilisateur appuie sur "Play"
  lecteur.addEventListener("play", function () {
    // Afficher le GIF animé
    gif.style.display = "block";
  });

  // Ajoutez le code suivant pour cacher le GIF animé lorsque la lecture est mise en pause
  lecteur.addEventListener("pause", function () {
    // Cacher le GIF animé
    gif.style.display = "none";
  });
};

getData();

lecteur.addEventListener("pause", function () {
  disque.classList.add("pause");
});

lecteur.addEventListener("play", function () {
  disque.classList.remove("pause");
});

// Récupérez l'élément de sélection et écoutez les événements de changement
//const sortSelect = document.getElementById("sort-select");
//sortSelect.addEventListener("change", function () {
// Obtenez la valeur sélectionnée pour déterminer comment trier
// const sortBy = sortSelect.value;
// Appelez la fonction de tri avec la méthode de tri sélectionnée
// sortPlaylist(sortBy);
//});

/* Fonction pour trier la liste de lecture en fonction de la méthode de tri sélectionnée
function sortPlaylist(sortBy) {
  const playlistItems = Array.from(document.querySelectorAll("#playlist li"));
  const sortedItems = playlistItems.sort((a, b) => {
    const aValue = a.querySelector(`.${sortBy}`).innerText;
    const bValue = b.querySelector(`.${sortBy}`).innerText;
    return aValue.localeCompare(bValue);
  });
  // Effacez la liste de lecture actuelle
  playlist.innerHTML = "";
  // Ajoutez les éléments triés à la liste de lecture
  sortedItems.forEach((item) => playlist.appendChild(item));}*/
