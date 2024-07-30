import { element } from '/src/elements/elements'

const apiInfo = 'https://api.unsplash.com'
const key = import.meta.env.VITE_KEY
const userId = 'client_id=' + key
const imageNumber = 'per_page=30'
let pageNumber = 1
const urlApi = apiInfo + '/photos' + '?' + userId + '&' + imageNumber

let i = 0

const chargeImage = async (url) => {
  try {
    const response = await fetch(url)
    const result = await response.json()
    return result
  } catch (error) {
    console.error(error)
  }
}

export const renderImages = async () => {
  try {
    const images = await chargeImage(urlApi)

    if (!Array.isArray(images)) {
      console.error('Image not found')
      return
    }

    const galleryContainer = document.createElement('div')
    galleryContainer.classList.add('grid-container', 'gallery')

    for (let i = 0; i < images.length; i++) {
      const cardImage = element(images[i].urls.regular, i, images[i].links.html)
      galleryContainer.innerHTML += cardImage
    }

    const appContainer = document.getElementById('app')
    appContainer.appendChild(galleryContainer)
  } catch (error) {
    console.error('Error loading those images:', error)
  }
}

export const refreshButton = async () => {
  pageNumber++
  const pageRefresh = `&page=${pageNumber}`
  const responseRefresh = await chargeImage(urlApi + pageRefresh)
  document.body.querySelector('.grid-container.gallery').innerHTML = ''
  let i = 0
  for (const image of responseRefresh) {
    const cardImage = element(image.urls.regular, i, image.links.html)
    document.body.querySelector('.grid-container.gallery').innerHTML +=
      cardImage
    i++
  }
  const searchInput = document.getElementById('input')

  searchInput.value = ''
  console.log('Refresh failure')
}

export const query = async (query) => {
  console.log('search:' + query)
  let apiUrlSearch =
    apiInfo + `/search/photos?query=${query}` + '&' + userId + '&' + imageNumber
  const responseRefresh = await chargeImage(apiUrlSearch)
  console.log(responseRefresh)
  document.body.querySelector('.grid-container.gallery').innerHTML = ''

  const appContainer = document.getElementById('app')
  let errorMessage = document.getElementById('error-message')
  if (!errorMessage) {
    errorMessage = document.createElement('p')
    errorMessage.id = 'error-message'
    appContainer.insertBefore(
      errorMessage,
      appContainer.querySelector('footer')
    )
  }

  if (responseRefresh.results.length === 0) {
    errorMessage.textContent =
      'No results found for your search. Try with "Ocean"'
    errorMessage.style.display = 'block'
  } else {
    errorMessage.style.display = 'none'

    let i = 0
    for (const image of responseRefresh.results) {
      const cardImage = element(image.urls.regular, i, image.links.html)
      document.body.querySelector('.grid-container.gallery').innerHTML +=
        cardImage
      i++
    }
  }
}
