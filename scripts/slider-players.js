(function () {
  const sliderContainer = document.querySelector('.slider-players__container');
  const slider = document.querySelector('.slider-players__list');
  const slides = document.querySelectorAll('.slider-players__list-item');
  let currentIndex = 0;
  const desktopSlides = 3;
  const mobileSlides = 1;
  let autoSlideTimeout;

  function showSlide(index) {
    const slideWidth = sliderContainer.clientWidth / (window.innerWidth >= 1315 ? desktopSlides : mobileSlides);
    slides.forEach((item) => {
      item.style.transform = `translateX(-${index * slideWidth}px)`;
    });
  
    document.querySelectorAll('.current-slide').forEach((crr)=>{

      let slideToCurrent = window.innerWidth >= 1315 ? desktopSlides : mobileSlides;
      crr.textContent = `${Math.min(index + slideToCurrent, slides.length)}`;
    
    document.querySelectorAll('.total-slides').forEach((ttl)=>{
        ttl.textContent = `/`+ slides.length;
      });
    });
  }

  function nextSlide() {
    let slidesToShow = window.innerWidth >= 1315 ? desktopSlides : mobileSlides;
    
    if (currentIndex + slidesToShow >= slides.length) {
      currentIndex = 0; 
    } else {
      currentIndex += slidesToShow;
    }
    showSlide(currentIndex);
  }
  
  function prevSlide() {
    let slidesToShow = window.innerWidth >= 1315 ? desktopSlides : mobileSlides;
    
    if (currentIndex - slidesToShow < 0) {
      currentIndex = slides.length - (slides.length % slidesToShow || slidesToShow); 
    } else {
      currentIndex -= slidesToShow;
    }
    showSlide(currentIndex);
  }

  function startAutoSlide() {
    autoSlideTimeout = setInterval(() => {
      slides.forEach((item) => {
        item.classList.add('slider-players__list-item-auto');
      })
      nextSlide();
    }, 4000+3500);
  }
  
    function stopAutoSlide() {
      clearInterval(autoSlideTimeout);
      slides.forEach((item) => {
          item.classList.remove('slider-players__list-item-auto');
        })
    }
  
    function checkMousePosition() {
      sliderContainer.addEventListener('mouseover', () => {
        stopAutoSlide();
      })
      sliderContainer.addEventListener('mouseout', () => {
        startAutoSlide();
      })
    }

    document.querySelectorAll('.slider-players__prev-btn').forEach((btn)=> {
      btn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide(); 
      })
    });
    document.querySelectorAll('.slider-players__next-btn').forEach((btn)=> {
      btn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide(); 
      })
    });
  /* Slider Swipe */

  let startX = 0;
  let isDragging = false;

  function getVisibleSlides() {
    return window.innerWidth >= 1315 ? desktopSlides : mobileSlides;
  }

  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    stopAutoSlide() 
  });

  slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;

    if (diffX < -40) { // Свайп влево
      currentIndex = (currentIndex + getVisibleSlides()) % slides.length;
      showSlide(currentIndex);
      isDragging = false;
      stopAutoSlide() 
    } else if (diffX > 40) { // Свайп вправо
      currentIndex = (currentIndex - getVisibleSlides() + slides.length) % slides.length;
      showSlide(currentIndex);
      isDragging = false;
      stopAutoSlide() 
    }
  });

  slider.addEventListener('touchend', () => {
    isDragging = false;
    startAutoSlide();
  });
  // Запускаем авто-переключение при загрузке страницы
  document.addEventListener('DOMContentLoaded', () => {
    showSlide(0);
    startAutoSlide();
    checkMousePosition();
  });
})();

