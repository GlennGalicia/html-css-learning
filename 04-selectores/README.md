# CSS Selectors

## Table of Contents

`.class1.class2` - Select an HTML element using two or more classes:
```css
.text.uppercase {
font-size: 10rem;

}
```

`tag.class` - Select an element by specifying both the tag and class:
```css
div.text {
background-color: aqua;

}
```

`class > class/element/tag` - Select the **first level** of children:

```html
<div class="admin">

<div>

<p>You are logged in as: Admin</p>

<div>

<p>Log out here</p>

</div>

</div>
</div>
```

```css
.admin > div {
border: 2px solid salmon;

}
```

`element[attribute]` - selects an element by its attributes:
```css
a[href^="http"] {
color: salmon;

}
```

`element:not(class)` selects elements except for one or more:
```css
p:not(.text):not(.class) {
color: salmon;

}
```

[<< Day 3](../03-cssgrid-basicos/README.md) | [Day 5 >>](../05-RWD/README.md)
