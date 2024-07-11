import { gsap } from 'gsap';
import throttle from 'lodash.throttle';
import { handleOrientationChange } from './screen-orientation';

let cx, cy, mouseX, mouseY, posX, posY, clientX, clientY, dx, dy, tiltx, tilty, request, radius, degree;

document.addEventListener('DOMContentLoaded', () => {

    handleOrientationChange();
    window.addEventListener("orientationchange", handleOrientationChange);

    const body = document.querySelector('body');
    const content = document.querySelector('.content');

    const setCenter = () => {
        const bounds = content.getBoundingClientRect();
        cx = bounds.left + bounds.width / 2;
        cy = bounds.top + bounds.height / 2;
    };

    setCenter();
    window.addEventListener('resize', setCenter);

    // cx = window.innerWidth / 2;
    // cy = window.innerHeight / 2;

    body.addEventListener('mousemove', e => {
        clientX = e.pageX;
        clientY = e.pageY;

        request = requestAnimationFrame(updateMe);

        mouseCoords(e);
        cursor.classList.remove('hidden');
        follower.classList.remove('hidden');
    });

    body.addEventListener('touchmove', throttle(e => {
        clientX = e.touches[0].pageX;
        clientY = e.touches[0].pageY;

        request = requestAnimationFrame(updateMe);

        mouseCoords(e.touches[0]);
        cursor.classList.remove('hidden');
        follower.classList.remove('hidden');
    }, 100));


    function updateMe() {

        dx = clientX - cx;
        dy = clientY - cy;
        tiltx = dy / cy;
        tilty = dx / cx;
        radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2));
        if (window.innerWidth < 576) {
            degree = radius * 27; // Increased sensitivity for mobiles
        } else {
            degree = radius * 18;
        }
        gsap.to('.content', 1, { transform: `rotate3d( ${tiltx}, ${tilty}, 0, ${degree}deg )` });

    };

    gsap.to('.card', { zoom: .98 });
    gsap.to('.l_main', { opacity: 1, duration: .1 });
    gsap.to('.l2_main', { opacity: 1, left: -10, top: 10, duration: .25, delay: .25 });
    gsap.to('.l3_main', { opacity: 1, left: -20, top: 20, duration: .25, delay: .25 });
    gsap.to('.card-europe', { opacity: .07, duration: .1 });
    gsap.to('.card-logo_w', { opacity: 1, duration: .225 });
    gsap.to('.card-chip', { opacity: 1, duration: .225 });
    gsap.to('.card-valid', { opacity: 1, zoom: 1, duration: .1, delay: .25 });
    gsap.to('.card-number-holder', { opacity: 1, zoom: 1, duration: .1, delay: .25 });

    const cursor = document.getElementById('cursor'),
        follower = document.getElementById('aura'),
        links = document.getElementsByTagName('a')

    mouseX = 0, mouseY = 0, posX = 0, posY = 0;

    function mouseCoords(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
    };

    gsap.to({}, .01, {
        repeat: -1,

        onRepeat: () => {
            posX += (mouseX - posX) / 5;
            posY += (mouseY - posY) / 5;

            gsap.set(cursor, {
                css: {
                    left: mouseX,
                    top: mouseY,
                }
            });

            gsap.set(follower, {
                css: {
                    left: posX - 24,
                    top: posY - 24,
                }
            });
        }
    });

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('mouseover', () => {
            cursor.classList.add('active');
            follower.classList.add('active');
        });

        links[i].addEventListener('mouseout', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');
        });
    };

    body.addEventListener('mouseout', () => {
        cursor.classList.add('hidden');
        follower.classList.add('hidden');
    });

    body.addEventListener('touchstart', e => {
        cursor.classList.remove('hidden');
        follower.classList.remove('hidden');
        mouseCoords(e.touches[0]);
    });

    body.addEventListener('touchend', () => {
        cursor.classList.add('hidden');
        follower.classList.add('hidden');
    });
});
