 const form = document.querySelector('form')
 const messipt = document.querySelector('#message-input')
 const linkipt = document.querySelector('#link-input')
 const linkform = document.querySelector('#linkform')
 const messageform = document.querySelector('#messageform')
const messageshow = document.querySelector('.messageshow')
const h1 = document.querySelector('h1')
const {hash} = window.location

const message = atob(hash.replace('#', ''));

if(message) {
  messageform.classList.add('hide')
  messageshow.classList.remove('hide')
  h1.innerHTML = message
}

 form.addEventListener('submit', event => {
  messageform.classList.add('hide')
  linkform.classList.remove('hide')
  event.preventDefault()
const encrypted =btoa(messipt.value)
linkipt.value = `${window.location}#${encrypted}`

linkipt.select()

 })