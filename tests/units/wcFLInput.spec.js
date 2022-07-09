import '@testing-library/jest-dom';
import FLInput from '../../src/wcFLInput';

describe('wcFLInput.js', () => {

  window.customElements.define('fl-input', FLInput);

  test('Render fl-input element with text type in JSDOM', () => {

    document.body.innerHTML = `
      <h1>Custom element test</h1>
      <fl-input
        id="floating-label-input"
        name="username"
        type="text"
        placeholder="Please enter your name"
        height="50"
      >
      </fl-input>
    `;

    // 1. Check shadow dom element is rendered
    const customElement = document.getElementById('floating-label-input');
    expect(customElement === null).toBeFalsy();

    // 2. Check eye icon is not displayed
    const eyeIcon = document.getElementById('floating-label-input').shadowRoot.getElementById("eye-icon")
    const eyeOffIcon = document.getElementById('floating-label-input').shadowRoot.getElementById("eye-off-icon")
    expect(eyeIcon.style.display === 'none').toBeTruthy();
    expect(eyeOffIcon.style.display === 'none').toBeTruthy();

    // 3. Check focus
    const inputElement = document.getElementById('floating-label-input').shadowRoot.querySelector("input")
    const rootElement = document.getElementById('floating-label-input').shadowRoot.querySelector('.floating-label')
    expect(inputElement === null).toBeFalsy();
    expect(rootElement === null).toBeFalsy();
    inputElement.focus();
    expect(rootElement.classList.contains("focused")).toBeTruthy();

    // 4. Check blur
    inputElement.blur();
    expect(rootElement.classList.contains("focused")).toBeFalsy();

    // 5. Check height
    const styles = document.getElementById('floating-label-input').shadowRoot.querySelector("style").textContent;
    expect(String(styles).startsWith(":host{--input-height: 50px;--icon-scale: 0.48;}")).toBeTruthy();

  })

  test('Render fl-input element with password type in JSDOM', async () => {
    document.body.innerHTML = `
      <h1>Custom element test</h1>
      <fl-input
        id="floating-label-input"
        name="username"
        type="password"
        placeholder="Please enter your name"
        height="50"
      >
      </fl-input>
    `;
    // 1. Check shadow dom element is rendered
    const customElement = document.getElementById('floating-label-input');
    expect(customElement === null).toBeFalsy();

    // 2. Check eye icon is not displayed
    const eyeIcon = document.getElementById('floating-label-input').shadowRoot.getElementById("eye-icon")
    const eyeOffIcon = document.getElementById('floating-label-input').shadowRoot.getElementById("eye-off-icon")
    expect(eyeIcon.style.display !== 'none' || eyeOffIcon.style.display !== 'none').toBeTruthy();

    // 3. Check focus
    const inputElement = document.getElementById('floating-label-input').shadowRoot.getElementById("floating-label-input")
    const rootElement = document.getElementById('floating-label-input').shadowRoot.querySelector('.floating-label')
    expect(inputElement === null).toBeFalsy();
    expect(rootElement === null).toBeFalsy();
    inputElement.focus();
    expect(rootElement.classList.contains("focused")).toBeTruthy();

    // 4. Check blur
    inputElement.blur();
    expect(rootElement.classList.contains("focused")).toBeFalsy();

    // 5. Check eye icon
    expect(inputElement.type === 'password').toBeTruthy();
    eyeIcon.click();
    expect(eyeIcon.style.display === 'none' && eyeOffIcon.style.display !== 'none').toBeTruthy();
    expect(inputElement.type === 'text').toBeTruthy();

  })

});