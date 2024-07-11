export function lockOrientation() {
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('portrait').catch((error) => {
            // console.error('Orientation lock failed: ', error);
        });
    } else if (window.screen.lockOrientation) {
        window.screen.lockOrientation('portrait').catch((error) => {
            // console.error('Orientation lock failed: ', error);
        });
    } else {
        window.addEventListener('orientationchange', () => {
            if (window.orientation !== 0) {
                window.orientation = 0;
            }
        });
    }
}