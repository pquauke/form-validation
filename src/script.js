// import CSS into JS
import './style.css'

// global functions -----------------------------------------------------------
function correct(node) {
  node.innerHTML = '<span class="material-symbols-outlined">thumb_up</span>'
}

function valid(node) {
  node.classList.remove('invalid')
  node.classList.add('valid')
}

function invalid(node) {
  node.classList.remove('valid')
  node.classList.add('invalid')
}

// email validation -----------------------------------------------------------
const emailInput = document.querySelector('#email')
const emailError = emailInput.nextElementSibling

function emailValidation() {
  return emailInput.validity.valueMissing
    ? ((emailError.textContent = 'This is required'),
      invalid(emailInput),
      false)
    : emailInput.validity.typeMismatch
      ? ((emailError.textContent = 'It has to be an E-Mail'),
        invalid(emailInput),
        false)
      : (correct(emailError), valid(emailInput), true)
}

emailInput.addEventListener('blur', () => emailValidation())

// country validation ---------------------------------------------------------
const countryInput = document.querySelector('#country')
const countryError = countryInput.nextElementSibling

function countryValidation() {
  return countryInput.value.length !== 2
    ? ((countryError.textContent = 'Select a country'),
      invalid(countryInput),
      false)
    : (correct(countryError), valid(countryInput), true)
}

countryInput.addEventListener('blur', () => countryValidation())

// zip code validation --------------------------------------------------------
const zipInput = document.querySelector('#zip')
const zipError = zipInput.nextElementSibling

function zipValidation() {
  return zipInput.validity.valueMissing
    ? ((zipError.textContent = 'This is required'), invalid(zipInput), false)
    : countryValidation() == false
      ? ((zipError.textContent = 'Select a country'), invalid(zipInput), false)
      : !(
            (countryInput.value == 'de' && /^\d{5}$/.test(zipInput.value)) ||
            (countryInput.value == 'at' && /^\d{4}$/.test(zipInput.value))
          )
        ? ((zipError.textContent = 'The Zip-Code is wrong'),
          invalid(zipInput),
          false)
        : (correct(zipError), valid(zipInput), true)
}

zipInput.addEventListener('blur', () => zipValidation())

// password validation --------------------------------------------------------
const pwInput = document.querySelector('#password')
const pwError = pwInput.nextElementSibling

function pwValidation() {
  return pwInput.validity.valueMissing
    ? ((pwError.textContent = 'This is required'), invalid(pwInput), false)
    : (correct(pwError), valid(pwInput), true)
}

pwInput.addEventListener('blur', () => pwValidation())

const pwConfirmInput = document.querySelector('#passwordConfirmation')
const pwConfirmError = pwConfirmInput.nextElementSibling

function pwConfirmValidation() {
  return pwConfirmInput.validity.valueMissing
    ? ((pwConfirmError.textContent = 'This is required'),
      invalid(pwConfirmInput),
      false)
    : pwInput.value !== pwConfirmInput.value
      ? ((pwConfirmError.textContent = 'The Passwords dont match'),
        invalid(pwConfirmInput),
        false)
      : (correct(pwConfirmError), valid(pwConfirmInput), true)
}

pwConfirmInput.addEventListener('blur', () => pwConfirmValidation())

// form validation ------------------------------------------------------------
const form = document.querySelector('form')
const formConfirm = form.nextElementSibling

form.addEventListener('submit', (e) => {
  e.preventDefault()

  !(
    emailValidation() &&
    countryValidation() &&
    zipValidation() &&
    pwValidation() &&
    pwConfirmValidation()
  )
    ? (emailValidation(),
      countryValidation(),
      zipValidation(),
      pwValidation(),
      pwConfirmValidation())
    : correct(formConfirm)
})
