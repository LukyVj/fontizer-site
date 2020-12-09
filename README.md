# Fontizer

## Small react helper to let users handle your fonts display

### Demo

![](https://github.com/LukyVj/fontizer-site/blob/main/public/fontizer-demo.gif?raw=true)

### How to use it

Install the package

`yarn add fontizer`

Prepare your CSS file, by adding these base values to your CSS :root element

```css
--base-font-size: 16px;
--base-font-weight: 300;
```

Then load Fontizer on your page, it can take 3 props:

- The `position` one that will position it ( in the corners ).
- A `callback` function that returns the new values in an array `[16, 300]`
- A `variables` props, which take an object with `{size: '--new-variable-name', weight: '--new-variable-name'}`

_Note that if you decide to go with custom variable names, you MUST provide both size & weight variables_

```javascript
import { Fontizer } from "fontizer";

<Fontizer
  position="bl"
  callback={(value) => console.log(`values changed ${value}`)}
  variables={{ size: "--foo-bar-size", weight: "--foo-bar-weight" }}
/>;
```

### Props

| prop      | type     | value                            | default                               | description                                                               |
| --------- | -------- | -------------------------------- | ------------------------------------- | ------------------------------------------------------------------------- |
| position  | string   | 'bl' \| 'br' \| 'tl' \| 'tr'     | bl                                    | corner coordinates to position your Fontizer button/panel                 |
| callback  | Function | any javascript function          | null                                  | Pass a function using the callback returned value, happen on each updates |
| variables | object   | {size: '--foo', weight: '--bar'} | --base-font-size & --base-font-weight | If needed, you can override the default variables name.                   |

### A sprinkle of CSS?

override the styles

```css
.fontizer-wrapper {
}
.fontizer-button {
}
.fontizer-icon {
}
.fontizer-panel {
}
```
