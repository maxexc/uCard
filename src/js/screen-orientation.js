export function handleOrientationChange() {
    const body = document.querySelector('body');
    if (window.innerWidth > 610) {
        body.classList.add('scroll-active');
    } else {
        body.classList.remove('scroll-active');
    }

    if (window.gsap && typeof window.gsap.restart === 'function') {
        window.gsap.restart();
    }
}