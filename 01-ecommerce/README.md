# Proyecto 01 - Ecommerce

## Tabla de contenido

1. [Enlaces a documentación:](#enlaces-a-documentación)
2. [Box Sizing](#box-sizing)
3. [Display](#display)
4. [Propiedades Generales](#propiedades-generales)
5. [Imagénes](#imagénes)
6. [FlexBox](#flexbox)
7. [CSS Grid](#css-grid)
8. [Fuentes](#fuentes)
9. [Unidades](#unidades)
10. [Recomendaciones](#recomendaciones)

### Enlaces a documentación:

* [Semántica HTML](https://blog.hubspot.com/website/semantic-html)

* [Intro FlexBox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

* [Intro Css Grid](https://css-tricks.com/snippets/css/complete-guide-grid/#aa-introduction)

* [CSS Normalize](https://necolas.github.io/normalize.css/)

### Box Sizing
Define el ancho(width) para un elemento HTML, si añades paddings no sumará al ancho definido, sino que dentro ajustara el contenido.

### Display
Existen 5 tipos de displays en CSS, en Block,
inline e inline-block(básicos). Cada elemento HTML posee
un tipo de display por defaul, ejemplo:

La etiqueta "a" por default establece display: inline
mientras que un parrafo "p" establece display: block

Al implementar display: block se puede implementar width y heigh.

### Propiedades Generales

`Margin` toma distancia hacia afuera del elemento.

`Padding` toma distancia hacia adentro del elemento.

`display: block;` el elemento se coloca por debajo del otro sin importar su tamaño.

`display: inline;` el elemento se posiciona a la derecha una vez que haya tomado el espacio que requiere.

`display: inline-block;` permite dar width, height y margin a un elemento inline.

### Imagénes 
Por defecto las imagenes cuentan con display inline. Se recomienda definir las siguientes propiedades para el tamaño de las imágenes:
```css
img {
    max-width: 100%; /* toma el 100% del tamaño de su contenedor */
    display: block;
}
```
Propiedades básicas para definir una imagen con css: 
```css 
div {
    background-image: url('../img/principal.jpg');  /* url > la ubicación es relativa  */
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    height: 550px;
}
```
Código para mejorar estilos de una imagen:
```css 
img {
    width: 40rem;
    height: 40rem;
    object-fit: cover;
} 
```

### FlexBox 
Se aplica solamente al primer nivel de hijos y el contenido crece automáticamente.

`justify-content` alinear contenido horizontalmente(izq, der, centro).

`align-item` alinear contenido verticalmente (inicio, fin, centro).

Si el flex direction es column:

`justify-content` alinear contenido verticalmente (inicio,fin, centro).

`align-item` alinear contenido horizontalmente( izq, der, centro).

### CSS Grid
Permite definir la ubicación y el tamaño de tu sitio. El contenido se agrupa dentro de un área definida
La propiedad `gap` sirve para dejar espacio entre los elementos hijos del grid.

> **Cuando usar Css Grid ó FlexBox**
>
> `Flexbox` usarlo para la alineación o distribución de los elementos que estarán dentro de contenedores.
>
> `CSS Grid` implementalo para definir el layout de tu sitio web, como pueden ser las columnas o contenedores de elementos. 

### Fuentes
La recomendación es añadir las fuentes desde Google Fonts, se enlazan en el head de html y en el archivo CSS se importan las fuentes dentro de los selectores. Además tu página/sitio debe contar con 3 fuentes como máximo.

La propiedad `font-family` se usa para cambiar las fuentes, ajustalo en las propiedades globales de tu style.css

```html
# home.html
<head>
    <link href="https://fonts.googleapis.com/css2?family=Playfair:wght@700&family=Raleway:wght@400;700;900&display=swap"
        rel="stylesheet">
</head>
```


```css
# style.css

body {
    font-family: "Raleway", sans-serif;
    font-size: 1.6rem;
    line-height: 2;
}
```

### Unidades
`Absolutas` las unidades absolutas son las que son exactas, como pueden ser centrimetros o pixeles.

`Relativas` las unidades relativas toman su valor en base a otro elemento. Algunos ejemplos: em,rem,vh,vw y porcentajes.

Tienen la ventaja de que se adaptan mejor a diferentes resoluciones y densidades de pixeles, lo cual lo hace mejor opción para la gran cantidad de dispositivos que utilizan los usuarios para navegar.

Por default se aplica un font-size de 16 px, ajusta tu reglas de estilo colocando tamaña de letra por default en rems: 
```css
html {
    box-sizing: border-box;
    font-size: 62.5%; /* 1rem = 10px */
}
```

### Recomendaciones
> * Iniciar los estilos con la parte de los globales.
> 
> * Primero colocar estilos a los elementos y posteriormente posicionarlo en el grid.
> 
> * Seleccionar	la clase padre e ir al elemento hijo mediante selector.
> 
> * colocar labels junto a los inputs.

[<< Home](../README.md) | [Day 2 >>](../02-flexbox-basicos/README.md)
