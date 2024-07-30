import './footer.css'
const footerInfo = `<section class = "footer-box">
<p> Created by Verónica Centeno 2024 ® </p>
<p> Powered by Unsplash </p> </section>
`
const appContainer = document.querySelector('#app')
const footerContainer = `<footer class= 'footer-container'> </footer>`

export const footer = () => {
  appContainer.innerHTML += footerContainer
  document.body.querySelector('.footer-container').innerHTML = footerInfo
}
