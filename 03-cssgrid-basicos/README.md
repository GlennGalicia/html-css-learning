# CSS Grid Layout

## Table of Contents

Enable grid properties by placing `display: grid;` in the parent container.

**grid shorthand (Container)**

`grid: <grid-rows> / grid: <grid-columns>`

**auto-flow** automatically positions elements, preventing row breaks in the grid:

```css
.grid {
display: grid;
grid-auto-flow: dense;

}
```

**align-items** is used for the vertical alignment of elements:
```css
.grid {
height: 300px;
display: grid;

grid-template-columns: repeat(6, 1fr);

align-items: center;

}
```

**auto-fill** generates columns as long as the container has space.

**auto-fit** generates the necessary columns.

```css
.grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

}
```

## Addtional Resources

### Official Documentation
- [CSS Grid Site](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-display)

### Practice Sites
- [Practice site for CSS Grid](https://codepip.com/games/grid-garden/)



[<< Day 2](../02-flexbox-basicos/README.md) | [Day 4 >>](../04-selectores/README.md)
