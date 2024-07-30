import './elements.css'

export const element = (url, id) => {
  const elementsInfo = `<div class = "elements-container ${id}" id = "${id}">
  <img src= "${url}" class = "image">
  </div>`
  return elementsInfo
}
