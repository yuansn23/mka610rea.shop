window.addEventListener('load', () => {
    const androidPage = document.getElementById('android-page');
    androidPage.style.opacity = '1';
});

const carouselMap = new Map();

function initCarousel(carousel) {
    const slides = carousel.querySelectorAll('.slide');
    if (!slides.length) return;

    let current = 0;

    let indicators = carousel.querySelector('.indicators');
    if (!indicators) {
        indicators = document.createElement('div');
        indicators.className = 'indicators';
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.addEventListener('click', () => goToSlide(i));
            indicators.appendChild(dot);
        });
        carousel.appendChild(indicators);
    }

    function updateIndicators() {
        indicators.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === current);
        });
    }

    function goToSlide(index) {
        slides[current].classList.remove('active');
        current = index;
        slides[current].classList.add('active');
        updateIndicators();

        const state = carouselMap.get(carousel);
        if (state) state.current = current;
    }

    function nextSlide() {
        goToSlide((current + 1) % slides.length);
    }

    slides.forEach((s, i) => {
        s.classList.remove('active');
        if (i === 0) s.classList.add('active');
    });
    updateIndicators();

    const intervalId = setInterval(nextSlide, 6000);

    let startX = 0;
    carousel.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    });
    carousel.addEventListener('touchend', e => {
        const diff = e.changedTouches[0].clientX - startX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                goToSlide((current - 1 + slides.length) % slides.length);
            } else {
                goToSlide((current + 1) % slides.length);
            }
        }
    });

    carouselMap.set(carousel, { current, intervalId, goToSlide });
}

function pauseCarousel(carousel) {
    const state = carouselMap.get(carousel);
    if (state) clearInterval(state.intervalId);
}

function resumeCarousel(carousel) {
    const state = carouselMap.get(carousel);
    if (!state) return;

    clearInterval(state.intervalId);
    state.intervalId = setInterval(() => {
        state.goToSlide((state.current + 1) % carousel.querySelectorAll('.slide').length);
    }, 5000);

    carouselMap.set(carousel, state);
}

document.addEventListener('DOMContentLoaded', () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isiOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    const isAndroid = /android/i.test(userAgent);

    const iosPage = document.getElementById('ios-page');
    const androidPage = document.getElementById('android-page');

if (isiOS) {
    iosPage.classList.remove('hidden');
    androidPage.classList.add('hidden');
    document.querySelectorAll('.guide-section h3').forEach(el => el.classList.add('ios-line'));
} else {
    androidPage.classList.remove('hidden');
    iosPage.classList.add('hidden');
}
    document.querySelectorAll('.carousel').forEach(initCarousel);

    const tabs = document.querySelectorAll('.android-tabs .tab');
    const contents = document.querySelectorAll('.android-guide-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', e => {
            e.preventDefault();

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const target = tab.dataset.target;
            contents.forEach(c => {
                c.classList.remove('active');
                const car = c.querySelector('.carousel');
                if (car) pauseCarousel(car);
            });

            const activeContent = document.getElementById(target);
            activeContent.classList.add('active');

            const carousel = activeContent.querySelector('.carousel');
            if (carousel) resumeCarousel(carousel);
        });
    });
});
