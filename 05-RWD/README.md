# Responsive Web Desing

## Table of Contents

`max-width` - Maximum width for the element, a media query for desktop-first design. It is recommended to implement media queries from largest to smallest.

`min-width` - Minimum width for the element, a media query for mobile-first design. It is recommended to implement media queries from smallest to largest.

> Note: It is recommended to apply media queries with only one approach: `Desktop First` or `Mobile First`.


To configure snippets within VSC: **command + shift + p** > configure user snippets > css.json

#### Standard sizes for responsive HTML

Mobile devices:
```css
@media (min-width: 550px) {
...
}
```
Tablets:
```css
@media (min-width: 768px) {
...
}
```
Landspace:
```css
@media(min-width: 1024px) {
...
}
```
Laptop:
```css
@media (min-width: 1200px) {
...
}
```
Monitors:
```css
@media(min-width: 1600px) {
...
}
```

#### Responsive Containers

The `min(minimum-value, maximum-value)` property can be implemented.

```css
.responsive-container {
background-color: aliceblue;
width: min(90%, 1000px);
height: 400px;
margin: 0 auto;

}
```

#### Snippet for responsive images

The image will grow to its maximum natural size:
```css
img {
max-width: 100%;
display: block;

}
```

[<< Day 4](../04-selectores/README.md)
