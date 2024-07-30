import './style.css'
import { header } from './src/Header/Header'
import { renderImages, refreshButton, query } from './src/images/images'
import { footer } from './src/footer/footer'

const init = async () => {
  header()
  await renderImages()
  footer()
  document.body
    .querySelector('.refresh-button')
    .addEventListener('click', refreshButton)
  document.body
    .querySelector('.search-bar')
    .addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault()
        query(document.getElementById('input').value)
      }
    })
}
init()
