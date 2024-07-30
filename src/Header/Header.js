import './Header.css'
import { searchBar } from '/src/searchBar/searchBar'
import { button } from '/src/button/button'

const headerElements = `<img src="./src/logo.png"> 
${searchBar()}
${button()}
`

const appContainer = document.querySelector('#app')
const headerBox = `<header class = "header-box"> </header>`

export const header = () => {
  appContainer.innerHTML += headerBox
  document.querySelector('.header-box').innerHTML = headerElements
}
