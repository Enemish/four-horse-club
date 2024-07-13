(function() {

  document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.stages__list');
    const prevButton = document.querySelector('.stages__slider-prev-btn');
    const nextButton = document.querySelector('.stages__slider-next-btn');
    let currentColumn = 0;
    const columnWidth = 330; 
    const columnGap = 20;
    const slides = Math.round(slider.scrollWidth / (columnWidth + columnGap)); 
    const paginationContainer = document.querySelector('.stages__slider-pagination');
    const swipeThreshold = 30;

    function updateScrollPosition() {
      slider.scrollTo({
        left: currentColumn * (columnWidth + columnGap),
        behavior: 'smooth'
      });
    }
  
    /* Pagination */
    for (let i = 0; i < slides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('pagination-dot');
      dot.addEventListener('click', () => moveToSlide(i));
      paginationContainer.appendChild(dot);
    }
  
    function updatePagination() {
      const dots = document.querySelectorAll('.pagination-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentColumn);
      });
    }

    updatePagination();
  
    function moveToSlide(index) {
      currentColumn = index; 
      updateScrollPosition(); 
      updatePagination(); 
      updateActiveBtn();
    }

    function moveToNextSlide() {
      if (currentColumn < slider.scrollWidth / (columnWidth + columnGap) - 1) {
        currentColumn++;
        updateScrollPosition();
        updatePagination();
        touchStartX = 0;
        touchEndX = 0;
        updateActiveBtn();
      }
    }
    
    function moveToPreviousSlide() {
      if (currentColumn > 0) {
        currentColumn--;
        updateScrollPosition();
        updatePagination();
        touchStartX = 0;
        touchEndX = 0;
        updateActiveBtn();
      }
    }

    function updateActiveBtn(){
      if (currentColumn === 0) {
        prevButton.disabled = true;
        nextButton.disabled = false;
      }else if (currentColumn === slides - 1) {
        nextButton.disabled = true;
        prevButton.disabled = false;
      }else {
        prevButton.disabled = false;
        nextButton.disabled = false;
      }  
    }
    updateActiveBtn();

    // Обработчики событий для кнопок
    nextButton.addEventListener('click', moveToNextSlide);
    prevButton.addEventListener('click', moveToPreviousSlide);

    /* Stage slider swipe */
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', function(event) {
      touchStartX = event.touches[0].clientX;
    }, false);
    
    slider.addEventListener('touchmove', function(event) {
      touchEndX = event.touches[0].clientX;
    }, false);
    
    slider.addEventListener('touchend', function() {
      handleSwipeGesture();
    }, false);
    
    function handleSwipeGesture() {
      const swipeDistance = Math.abs(touchEndX - touchStartX);
      if (swipeDistance > swipeThreshold && swipeDistance <= columnWidth) {
        if (touchEndX < touchStartX) {
          moveToNextSlide();
        } else if (touchEndX > touchStartX) {
          moveToPreviousSlide();
        }
      }
    }
  });

  
})();

