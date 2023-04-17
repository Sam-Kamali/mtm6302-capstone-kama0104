const form = document.querySelector('form');
const imageContainer = document.querySelector('#image-container');
const saveButton = document.querySelector('#save');
const favoritesContainer = document.querySelector('#favorites-container');
const apiKey = "9c9fS2zjTYrBRH4LGZkWdjm32cXXZR29f7L2ix61";
const removeButton = document.querySelector('#remove');

// Fetching image data for selected date and displaying it
function fetchImageData(event) {
  event.preventDefault();
  const date = document.querySelector('#date').value;
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const imageLink = document.createElement('a'); // create an anchor tag
      imageLink.href = data.hdurl; // set the href attribute to the hdurl property
      const image = document.createElement('img'); // create an img tag
      image.src = data.url; // set the src attribute to the url property
      image.alt = data.title;
      image.classList.add('image-style'); // add class to the img tag
      imageLink.appendChild(image); // append the img tag to the anchor tag
      imageContainer.innerHTML = ''; 
      imageContainer.appendChild(imageLink); // append the anchor tag to the image container
      const title = document.createElement('h2');
      title.classList.add('h1-style');
      title.textContent = data.title;
      const explanation = document.createElement('p');
      explanation.classList.add('p-style');
      explanation.textContent = data.explanation;
      imageContainer.appendChild(title);
      imageContainer.appendChild(explanation);
      saveButton.style.display = 'block';
    })
    .catch(error => console.error(error));
}


// Saving the current image as a favorite
function saveImage() {
    const image = imageContainer.innerHTML;
    const page = window.location.pathname;
    const key = `favoriteImage_${page}`;
    let favorites = JSON.parse(localStorage.getItem(key)) || []; //retrieves existing favorites 
    favorites.push(image); // adds the new image to the favorites array
    localStorage.setItem(key, JSON.stringify(favorites)); // saves the updated favorites array
    favoritesContainer.innerHTML = ''; 
    favorites.forEach(favorite => {
      const favoriteImage = document.createElement('div');
      favoriteImage.innerHTML = favorite;
      favoriteImage.classList.add('favorite-image'); // Adding a class to the favorite image element
      favoritesContainer.appendChild(favoriteImage);
    });
    favoritesContainer.style.display = 'block';
  }
  


//to retrieve the favorite image from local storage when the page is refreshed
// display the favorite image from local storage
function displayFavoriteImage() {
  const page = window.location.pathname;
  const key = `favoriteImage_${page}`;
  const favoriteImages = JSON.parse(localStorage.getItem(key)) || [];
  if (favoriteImages.length > 0) {
    const favoriteImage = favoriteImages[favoriteImages.length - 1];
    const imageElement = document.createElement('div');
    imageElement.innerHTML = favoriteImage;
    const img = imageElement.querySelector('img'); 
    if (img) {
      favoritesContainer.appendChild(img); 
      favoritesContainer.style.display = 'block';
    }
    saveButton.style.display = 'none';
  }
}

// add an event listener to the window object to display the favorite image on page load
window.addEventListener('load', displayFavoriteImage);
form.addEventListener('submit', fetchImageData);
saveButton.addEventListener('click', saveImage);





// Removing a saved image from favorites
function removeImage() {
  const page = window.location.pathname;
  const key = `favoriteImage_${page}`;
  let favorites = JSON.parse(localStorage.getItem(key)) || []; // retrieves existing favorites
  favorites.pop(); 
  localStorage.setItem(key, JSON.stringify(favorites)); 
  favoritesContainer.innerHTML = ''; 
  favorites.forEach(favorite => {
    const favoriteImage = document.createElement('div');
    favoriteImage.innerHTML = favorite;
    favoritesContainer.appendChild(favoriteImage);
  });
  if (favorites.length === 0) {
    favoritesContainer.style.display = 'none';
  }
}

removeButton.addEventListener('click', removeImage);





