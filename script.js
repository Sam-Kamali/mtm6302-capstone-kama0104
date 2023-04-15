const form = document.querySelector('form');
const imageContainer = document.querySelector('#image-container');
const saveButton = document.querySelector('#save');
const favoritesContainer = document.querySelector('#favorites-container');
const apiKey = "9c9fS2zjTYrBRH4LGZkWdjm32cXXZR29f7L2ix61";

// Fetching image data for selected date and displaying it
function fetchImageData(event) {
    event.preventDefault();
    const date = document.querySelector('#date').value;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

// requesting the api for the image data and using the response.json converting to js object    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            imageContainer.innerHTML = `
                <img src="${data.url}" alt="${data.title}" class="image-style">
                <h2 class="h1-style">${data.title}</h2>
                <p class="p-style">${data.explanation}</p>
            `;
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
    favoritesContainer.innerHTML = ''; // clear the existing favorites list
    favorites.forEach(favorite => {
      const favoriteImage = document.createElement('div');
      favoriteImage.innerHTML = favorite;
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
    imageContainer.innerHTML = favoriteImage;
    saveButton.style.display = 'none';
    favoritesContainer.style.display = 'block';
    favoritesContainer.innerHTML = `
      <div>${favoriteImage}</div>
    `;
  }
}

// add an event listener to the window object to display the favorite image on page load
window.addEventListener('load', displayFavoriteImage);
form.addEventListener('submit', fetchImageData);
saveButton.addEventListener('click', saveImage);


