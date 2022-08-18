const form = document.querySelector('form')
const btn = document.querySelector('#submit_button')
const firstName = document.querySelector('[name=first]')
const lastName = document.querySelector('[name=last]')
const email = document.querySelector('[name=email]')
const text = document.querySelector('[name=message]')
const modal = document.getElementById('contact_modal')
const main = document.getElementById('main')
const errorMessage = document.querySelectorAll('span')

let firstNameValue, lastNameValue, emailValue, messageValue

function displayModal () {
  const crossCloseModal = document.querySelector('#contact_modal input')
  modal.style.display = 'block'
  crossCloseModal.focus() // focus ?
  document.body.classList.add('stop_scrolling')
  if (modal.hasAttribute('aria-hidden') && main.hasAttribute('aria-hidden')) {
    modal.setAttribute('aria-hidden', 'false')
    main.setAttribute('aria-hidden', 'true')
  }
}

function closeModal () {
  modal.style.display = 'none'
  document.body.classList.remove('stop_scrolling')
  if (modal.hasAttribute('aria-hidden') && main.hasAttribute('aria-hidden')) {
    modal.setAttribute('aria-hidden', 'true')
    main.setAttribute('aria-hidden', 'false')
  }
}
// FERMETURE MODALE AVEC TOUCHE ECHAP
window.addEventListener('keyup', (e) => {
  if (modal.getAttribute('aria-hidden') === 'false' && e.key === 'Escape') {
    closeModal()
  }
})

// VALIDATION FIRST NAME
form.first.addEventListener('change', function () {
  validFirstName(this)
})

const validFirstName = function (inputFirstName) {
  if (inputFirstName.value.length !== 0) {
    firstName.classList.remove('error')
    errorMessage[0].style = 'display:none'
    firstNameValue = inputFirstName.value
    return true
  }

  firstName.classList.add('error')
  errorMessage[0].style = 'display:block'
  return false
}

// VALIDATION LAST NAME
form.last.addEventListener('change', function () {
  validLastName(this)
})

const validLastName = function (inputLastName) {
  if (inputLastName.value.length !== 0) {
    lastNameValue = inputLastName.value
    lastName.classList.remove('error')
    errorMessage[1].style = 'display:none'
    return true
  }
  lastName.classList.add('error')
  errorMessage[1].style = 'display:block'
  return false
}

// VALIDATION EMAIL
form.email.addEventListener('change', function () {
  validEmail(this)
})

const validEmail = function (inputEmail) {
  const emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g')
  if (emailRegExp.test(inputEmail.value)) {
    emailValue = inputEmail.value
    email.classList.remove('error')
    errorMessage[2].style = 'display:none'
    return true
  }
  email.classList.add('error')
  errorMessage[2].style = 'display:block'
  return false
}

// VALIDATION MESSAGE
form.message.addEventListener('change', function () {
  validMessage(this)
})

const validMessage = function (inputMessage) {
  if (inputMessage.value !== 0) {
    messageValue = inputMessage.value
    return true
  }
  false
}

// VIDAGE DES CHAMPS
function clearForm () {
  firstName.value = null
  lastName.value = null
  email.value = null
  text.value = null
}

// VALIDATION DES CHAMPS ET AFFICHAGE DES VALEURS DANS LA CONSOLE
function validate () {
  btn.addEventListener('click', (e) => {
    e.preventDefault()
    if (
      validFirstName(form.first) &&
            validLastName(form.last) &&
            validEmail(form.email) &&
            validMessage(form.message)
    ) {
      console.log(`Prénom: ${firstNameValue}`)
      console.log(`Nom: ${lastNameValue}`)
      console.log(`Email: ${emailValue}`)
      console.log(`Message: ${messageValue}`)
      closeModal()
      clearForm()
    }
  })
}

// GARDE LE FOCUS DANS LA MODALE
function trapFocus (modal) {
  const focusableEls = modal.querySelectorAll('input, textarea, button')
  const firstFocusableEl = focusableEls[0]
  const lastFocusableEl = focusableEls[focusableEls.length - 1]
  const KEYCODE_TAB = 9

  modal.addEventListener('keydown', (e) => {
    const isTabPressed = (e.key === 'Tab' || e.keycode === KEYCODE_TAB)

    if (!isTabPressed) {
      return
    }

    if (e.shiftkey) {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus()
        e.preventDefault()
      }
    } else if (document.activeElement === lastFocusableEl) {
      firstFocusableEl.focus()
      e.preventDefault()
    }
  })
}
