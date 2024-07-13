(function() {
  document.addEventListener('DOMContentLoaded', () => { // Убедимся, что DOM полностью загружен
    const piece1 = document.querySelector('.hero__animate-piece1');
    const piece2 = document.querySelector('.hero__animate-piece2');
    const piece3 = document.querySelector('.hero__animate-piece3');
    const piece4 = document.querySelector('.hero__animate-piece4');
  
    if (piece1) setUpHoverAnimation(piece1);
    if (piece2) setUpHoverAnimation(piece2);
    if (piece3) setUpHoverAnimation(piece3);
    if (piece4) setUpHoverAnimation(piece4);
  });
  
  function setUpHoverAnimation(element) {
    const initialTop = window.getComputedStyle(element).top; // Получаем начальное значение top
  
    element.addEventListener('mouseenter', () => {
      element.style.animation = 'none';
      element.style.top = `calc(${initialTop} - 30px)`;
    });
    element.addEventListener('mouseleave', () => {
      element.style.top = initialTop;
      element.style.animation = '';
    });
  }
  
})();
