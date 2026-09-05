const imagenes = document.querySelectorAll('.propiedad__imagen');

let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const scroll = window.scrollY / -20;
    imagenes.forEach((imagen) => {
      imagen.style.backgroundPositionY = `${scroll}px`;
    });
    ticking = false;
  });
});
