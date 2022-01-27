'use strict'
;(() => emailjs.init('user_M5FG5gIz2xCou220iYzzH'))()

const confirmationButton = document.querySelector('.confirmationOrder')
const numberСheck = document.querySelector('.number-check')
const nameСheck = document.querySelector('.name-check')
const buyButtons = document.querySelectorAll('.btn')
const goodsInput = document.querySelector('.goods')
const form = document.querySelector('.form')
const checkInputs = [nameСheck, numberСheck]

buyButtons.forEach(buyButton =>
  buyButton.addEventListener(
    'click',
    ({ target }) => (goodsInput.value = target.attributes.data_value.value)
  )
)

const handleChange = () => {
  for (const input of checkInputs) {
    if (input.value.trim() === '') {
      confirmationButton.setAttribute('disabled', '')
      return
    }
  }
  confirmationButton.removeAttribute('disabled')
}

for (const input of checkInputs) {
  input.onkeydown = input.onkeyup = input.onkeypress = input.change = handleChange
}

form.addEventListener('submit', event => {
  event.preventDefault()

  for (const input of checkInputs) {
    if (input.value.trim() === '') {
      return
    }
  }

  emailjs.sendForm('service_39usllh', 'template_oax2kvl', '.form').then(
    res => {
      console.log(res.status, res.text),
        (form[1].value = ''),
        (form[2].value = ''),
        (form[3].value = ''),
        confirmationButton.setAttribute('disabled', '')
    },
    () => alert('Ошибка отправки. Попробуйте ещё раз.')
  )
})
