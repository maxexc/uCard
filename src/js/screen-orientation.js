export function handleOrientationChange() {
    const body = document.querySelector('body');
    if (window.innerWidth > 610) {
        body.classList.add('scroll-active');
    } else {
        body.classList.remove('scroll-active');
    }
}