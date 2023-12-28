# floating-label-input
[![NPM](https://nodei.co/npm/@yishiashia/floating-label-input.png?mini=true)](https://www.npmjs.com/package/@yishiashia/floating-label-input)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@yishiashia/floating-label-input)


Floating label input web component.



## Install

    $ npm install @yishiashia/floating-label-input

## Syntax

```html
<script src="fl-input.js"></script>

<form action="#" method="POST">
    <fl-input
        name="username"
        type="text"
        placeholder="Please enter your name"
        height="50"
    >
    </fl-input>
    <fl-input
        name="username"
        type="password"
        placeholder="Please enter your password"
        height="50"
    >
    </fl-input>
    <input type="submit" value="submit" />
</form>
```

## Demo page
The demo page: https://yishiashia.github.io/floating-label-input/
## Usage

If you want to customize this web component, you can import the library and 
implement your new class by extend `FLInput`.

```js
import FLInput from "floating-label-input";

class customizedFLInput extends FLInput {
    // override here
}

```

### Options
- [name](#name)
- [placeholder](#placeholder)
- [height (optional)](#height-optional)
- [type (optional)](#type-optional)

#### name

The name of input, it would be the POST parameter name.

#### placeholder

The floating label of input field.

#### height (optional)

The height of input field (unit: pixel).

#### type (optional)

The input type, default `text`.
