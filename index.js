document.addEventListener('DOMContentLoaded', function() {
    // ===== IMAGE SLIDER =====
    const initImageSlider = () => {
      const slides = document.querySelectorAll('.slide');
      const dots = document.querySelectorAll('.dot');
      const prevBtn = document.querySelector('.prev');
      const nextBtn = document.querySelector('.next');
      const slider = document.querySelector('.image-slider');
      
      if (!slides.length || !slider) return;
  
      let currentIndex = 0;
      let slideInterval;
      const slideDuration = 7000; // 7 seconds
  
      function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentIndex = (index + slides.length) % slides.length;
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
      }
  
      function nextSlide() {
        showSlide(currentIndex + 1);
      }
  
      function prevSlide() {
        showSlide(currentIndex - 1);
      }
  
      function startSlideShow() {
        stopSlideShow();
        slideInterval = setInterval(nextSlide, slideDuration);
      }
  
      function stopSlideShow() {
        clearInterval(slideInterval);
      }
  
      // Event listeners
      nextBtn?.addEventListener('click', () => {
        nextSlide();
        startSlideShow();
      });
  
      prevBtn?.addEventListener('click', () => {
        prevSlide();
        startSlideShow();
      });
  
      dots.forEach(dot => {
        dot.addEventListener('click', function() {
          const slideIndex = parseInt(this.getAttribute('data-slide'));
          showSlide(slideIndex);
          startSlideShow();
        });
      });
  
      // Pause on hover
      slider.addEventListener('mouseenter', stopSlideShow);
      slider.addEventListener('mouseleave', startSlideShow);
  
      // Touch support
      let touchStartX = 0;
      slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopSlideShow();
      });
  
      slider.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) nextSlide();
        if (touchEndX > touchStartX + 50) prevSlide();
        startSlideShow();
      });
  
      // Initialize
      showSlide(0);
      startSlideShow();
    };
  
    // ===== SCROLL ANIMATIONS =====
    const initScrollAnimations = () => {
      const animateElements = document.querySelectorAll('.scroll-animate');
      const welcomeElements = [
        document.querySelector('.school-name-title'),
        document.querySelector('.school-image'),
        document.querySelector('.welcome-paragraph')
      ].filter(el => el);
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
  
      animateElements.forEach(el => observer.observe(el));
      welcomeElements.forEach(el => observer.observe(el));
    };
  
    // ===== NOTICE ITEM ANIMATION =====
    const initNoticeItems = () => {
      document.querySelectorAll('.notice-item').forEach(item => {
        item.addEventListener('click', function(e) {
          if (e.target === this || e.target.tagName === 'A') {
            this.classList.add('notice-click');
            setTimeout(() => this.classList.remove('notice-click'), 300);
          }
        });
      });
    };
  
    // ===== SPLASH SCREEN =====
    const initSplashScreen = () => {
      const splash = document.querySelector('.splash-screen');
      const closeBtn = document.querySelector('.close-splash');
      
      if (!splash || !closeBtn) return;
  
      if (!sessionStorage.getItem('splashShown')) {
        splash.classList.remove('hidden');
  
        const timer = setTimeout(() => {
          closeSplash();
        }, 6000);
  
        const closeSplash = () => {
          clearTimeout(timer);
          splash.classList.add('hidden');
          sessionStorage.setItem('splashShown', 'true');
          splash.removeEventListener('click', handleOutsideClick);
          closeBtn.removeEventListener('click', closeSplash);
        };
  
        const handleOutsideClick = (e) => {
          if (e.target === splash) closeSplash();
        };
  
        closeBtn.addEventListener('click', closeSplash);
        splash.addEventListener('click', handleOutsideClick);
      } else {
        splash.style.display = 'none';
      }
    };
  
    // Initialize all components
    initImageSlider();
    initScrollAnimations();
    initNoticeItems();
    initSplashScreen();
  });