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
  let favorites = JSON.parse(localStorage.getItem(key)) || [];
  
  // Create a container element for the image and the remove button
  const favoriteImageContainer = document.createElement('div');
  favoriteImageContainer.classList.add('favorite-image-container');

  // Create the remove button
  const removeButton = document.createElement('button');
  removeButton.classList.add('remove-button');
  removeButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

  // Add an event listener to the remove button to remove the favorite image
  removeButton.addEventListener('click', function() {
    const index = favorites.indexOf(image);
    if (index > -1) {
      favorites.splice(index, 1);
    }
    localStorage.setItem(key, JSON.stringify(favorites));
    favoriteImageContainer.remove();
  });

  // Create the image element
  const favoriteImage = document.createElement('div');
  favoriteImage.innerHTML = image;
  favoriteImage.classList.add('favorite-image');

  // Append the remove button and the image to the container
  favoriteImageContainer.appendChild(removeButton);
  favoriteImageContainer.appendChild(favoriteImage);

  // Append the container to the favorites container
  favoritesContainer.appendChild(favoriteImageContainer);

  // Add the new image to the favorites array
  favorites.push(image);
  localStorage.setItem(key, JSON.stringify(favorites));

  // Clear the image container
  imageContainer.innerHTML = '';
  
  // Display the favorites container
  favoritesContainer.style.display = 'block';
}

  


//to retrieve the favorite image from local storage when the page is refreshed
// display the favorite image from local storage
function displayFavoriteImage() {
  const page = window.location.pathname;
  const key = `favoriteImage_${page}`;
  const favoriteImages = JSON.parse(localStorage.getItem(key)) || [];


  // Loop through each saved image and add it to the favorites container
  favoriteImages.forEach(favorite => {
    const favoriteImageContainer = document.createElement('div');
    favoriteImageContainer.classList.add('favorite-image-container');

    // Create the remove button
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    // Add an event listener to the remove button to remove the favorite image
    removeButton.addEventListener('click', function() {
      const index = favoriteImages.indexOf(favorite);
      if (index > -1) {
        favoriteImages.splice(index, 1);
      }
      localStorage.setItem(key, JSON.stringify(favoriteImages));
      favoriteImageContainer.remove();
    });

    // Create the image element
    const favoriteImage = document.createElement('div');
    favoriteImage.innerHTML = favorite;
    favoriteImage.classList.add('favorite-image');

    // Append the remove button and the image to the container
    favoriteImageContainer.appendChild(removeButton);
    favoriteImageContainer.appendChild(favoriteImage);

    // Append the container to the favorites container
    favoritesContainer.appendChild(favoriteImageContainer);
  });

  // Display the favorites container if there are saved images
  if (favoriteImages.length > 0) {
    favoritesContainer.style.display = 'block';
  } else {
    favoritesContainer.style.display = 'none';
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





