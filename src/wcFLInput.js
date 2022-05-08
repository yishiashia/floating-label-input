import '@webcomponents/webcomponentsjs/webcomponents-bundle'
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'
import '@webcomponents/custom-elements/custom-elements.min.js'
import FLStyle from './floatingLabel.scss'

function getPixel (val) {
  const pixelVal = parseInt(val)
  if (!isNaN(pixelVal) && pixelVal > 0) {
    return pixelVal
  } else {
    return 50
  }
}
export default class StarInput extends HTMLElement {
  constructor () {
    super()

    // Shadow dom
    this.attachShadow({ mode: 'open' })

    this.realInput = null
    this.value_ = ''
    this.type_ = 'text'
    this.placeholder = ''
    this.hidePwd = true
  }

  connectedCallback () {
    const _self = this

    this.realInput = document.createElement('input')
    this.realInput.type = 'hidden'
    this.realInput.name = this.attributes.name === undefined ? undefined : this.attributes.name.value
    this.realInput.value = this.value_
    this.appendChild(this.realInput)

    this.type_ = this.attributes.type?.value
    this.type_ = this.type_ === 'password' ? 'password' : 'text'

    this.placeholder = this.attributes.placeholder?.value
    this.placeholder = typeof this.placeholder === 'string' ? this.placeholder : ''

    this.shadowRoot.innerHTML = this.template()

    // Style
    const styleElement = document.createElement('style')
    styleElement.appendChild(
      document.createTextNode(
        `:host{--input-height: ${getPixel(_self.attributes.height?.value)}px;--icon-scale: ${48.0 / getPixel(_self.attributes.height?.value) / 2};}`
      )
    )
    styleElement.appendChild(document.createTextNode(FLStyle))
    this.shadowRoot.appendChild(styleElement)

    this.inputFocused = this.inputFocused.bind(this)
    this.inputBlurred = this.inputBlurred.bind(this)
    this.updateStyle = this.updateStyle.bind(this)
    this.updateHidePwd = this.updateHidePwd.bind(this)
    this.valueChange = this.valueChange.bind(this)
    this.shadowRoot.getElementById('floating-label-input').addEventListener('focus', this.inputFocused)
    this.shadowRoot.getElementById('floating-label-input').addEventListener('blur', this.inputBlurred)
    this.shadowRoot.getElementById('floating-label-input').addEventListener('change', this.valueChange)
    this.shadowRoot.querySelectorAll('.eye-icon').forEach(element => {
      element.addEventListener('click', this.updateHidePwd)
    })

    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', 0)
      this.tabIndex = 0
    }

    this.updateStyle()
    this.onfocus = function () {
      this.shadowRoot.getElementById('floating-label-input').focus()
    }
  }

  disconnectedCallback () {
  }

  inputFocused () {
    this.shadowRoot.querySelector('.floating-label').classList.add('focused')
  }

  inputBlurred () {
    this.shadowRoot.querySelector('.floating-label').classList.remove('focused')
  }

  updateHidePwd () {
    this.hidePwd = !this.hidePwd
    this.shadowRoot.getElementById('floating-label-input').focus()
    this.updateStyle()
  }

  valueChange () {
    this.value_ = this.shadowRoot.getElementById('floating-label-input').value
    if (this.realInput) {
      this.realInput.value = this.value_
    }
  }

  get type () {
    return this.type_
  }

  set type (val) {
    if (val !== '') {
      this.type_ = val
    }
    this.updateStyle()
  }

  updateStyle () {
    if (this.type_ !== 'password') {
      this.shadowRoot.querySelectorAll('.eye-icon').forEach(element => {
        element.style.display = 'none'
      })
      this.shadowRoot.getElementById('floating-label-input').type = 'text'
    } else {
      if (this.hidePwd) {
        this.shadowRoot.getElementById('eye-off-icon').style.display = 'none'
        this.shadowRoot.getElementById('eye-icon').style.display = 'inline-flex'
        this.shadowRoot.getElementById('floating-label-input').type = 'password'
      } else {
        this.shadowRoot.getElementById('eye-icon').style.display = 'none'
        this.shadowRoot.getElementById('eye-off-icon').style.display = 'inline-flex'
        this.shadowRoot.getElementById('floating-label-input').type = 'text'
      }
    }
  }

  template () {
    return `
      <div class="floating-label">
        <input id="floating-label-input" placeholder=" " required="reqiured" type="${this.type_}" value="">
        <div id="eye-icon" class="eye-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><path d="M24 31.5Q27.55 31.5 30.025 29.025Q32.5 26.55 32.5 23Q32.5 19.45 30.025 16.975Q27.55 14.5 24 14.5Q20.45 14.5 17.975 16.975Q15.5 19.45 15.5 23Q15.5 26.55 17.975 29.025Q20.45 31.5 24 31.5ZM24 28.6Q21.65 28.6 20.025 26.975Q18.4 25.35 18.4 23Q18.4 20.65 20.025 19.025Q21.65 17.4 24 17.4Q26.35 17.4 27.975 19.025Q29.6 20.65 29.6 23Q29.6 25.35 27.975 26.975Q26.35 28.6 24 28.6ZM24 38Q16.7 38 10.8 33.85Q4.9 29.7 2 23Q4.9 16.3 10.8 12.15Q16.7 8 24 8Q31.3 8 37.2 12.15Q43.1 16.3 46 23Q43.1 29.7 37.2 33.85Q31.3 38 24 38ZM24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23ZM24 35Q30.05 35 35.125 31.725Q40.2 28.45 42.85 23Q40.2 17.55 35.125 14.275Q30.05 11 24 11Q17.95 11 12.875 14.275Q7.8 17.55 5.1 23Q7.8 28.45 12.875 31.725Q17.95 35 24 35Z"/></svg>
        </div>
        <div id="eye-off-icon" class="eye-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><path d="M31.45 27.05 29.25 24.85Q30.55 21.3 27.9 18.95Q25.25 16.6 22.15 17.75L19.95 15.55Q20.8 15 21.85 14.75Q22.9 14.5 24 14.5Q27.55 14.5 30.025 16.975Q32.5 19.45 32.5 23Q32.5 24.1 32.225 25.175Q31.95 26.25 31.45 27.05ZM37.9 33.5 35.9 31.5Q38.35 29.7 40.175 27.475Q42 25.25 42.85 23Q40.35 17.45 35.35 14.225Q30.35 11 24.5 11Q22.4 11 20.2 11.4Q18 11.8 16.75 12.35L14.45 10Q16.2 9.2 18.925 8.6Q21.65 8 24.25 8Q31.4 8 37.325 12.075Q43.25 16.15 46 23Q44.7 26.2 42.65 28.85Q40.6 31.5 37.9 33.5ZM40.8 44.8 32.4 36.55Q30.65 37.25 28.45 37.625Q26.25 38 24 38Q16.7 38 10.75 33.925Q4.8 29.85 2 23Q3 20.4 4.775 17.925Q6.55 15.45 9.1 13.2L2.8 6.9L4.9 4.75L42.75 42.6ZM11.15 15.3Q9.3 16.65 7.575 18.85Q5.85 21.05 5.1 23Q7.65 28.55 12.775 31.775Q17.9 35 24.4 35Q26.05 35 27.65 34.8Q29.25 34.6 30.05 34.2L26.85 31Q26.3 31.25 25.5 31.375Q24.7 31.5 24 31.5Q20.5 31.5 18 29.05Q15.5 26.6 15.5 23Q15.5 22.25 15.625 21.5Q15.75 20.75 16 20.15ZM26.4 22.4Q26.4 22.4 26.4 22.4Q26.4 22.4 26.4 22.4Q26.4 22.4 26.4 22.4Q26.4 22.4 26.4 22.4Q26.4 22.4 26.4 22.4Q26.4 22.4 26.4 22.4ZM20.6 25.3Q20.6 25.3 20.6 25.3Q20.6 25.3 20.6 25.3Q20.6 25.3 20.6 25.3Q20.6 25.3 20.6 25.3Q20.6 25.3 20.6 25.3Q20.6 25.3 20.6 25.3Z"/></svg>
        </div>
        <label for="floating-label-input">${this.placeholder}</label>
      </div>
    `
  }
}
