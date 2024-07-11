export function handleOrientationChange() {
    const body = document.querySelector('body');
    if (window.matchMedia("(orientation: landscape)").matches) {
        body.classList.add('scroll-active');
    } else {
        body.classList.remove('scroll-active');
    }
}