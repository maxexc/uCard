export function handleOrientationChange() {
    if (window.matchMedia("(orientation: landscape)").matches) {
        window.screen.orientation.lock("portrait").catch(() => {
            // if required
        });
    }
}