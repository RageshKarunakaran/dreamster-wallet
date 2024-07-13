const ENABLE_PAGE_REVEALER = true;
const ENABLE_PAGE_PRELOADER = true;

const ENABLE_PAGE_REVEALER_USED = ENABLE_PAGE_REVEALER && localStorage.getItem('page-revealer') === 'show';

// Page Preloader
if (!ENABLE_PAGE_REVEALER_USED && ENABLE_PAGE_PRELOADER) {
    const easing = 'cubic-bezier(0.8, 0, 0.2, 1)';
    const duration = 1.1; // seconds
    const preloader = document.createElement('div');
    preloader.classList.add('tg-preloader');
    preloader.innerHTML = `
        <div class="tg-loading">
            <div></div><div></div><div></div><div></div>
        </div>
    `;
    document.documentElement.classList.add('show-preloader');
    document.documentElement.append(preloader);
    const t0 = Date.now();
    (async () => {
        await new Promise(r => document.addEventListener('DOMContentLoaded', r));
        document.documentElement.classList.remove('show-preloader');
        await new Promise(r => requestAnimationFrame(r));
        await new Promise(r => setTimeout(r, Math.max(0, 500 - (Date.now() - t0))));
        preloader.style.transition = 'opacity ' + duration + 's ' + easing;
        preloader.style.opacity = '0';
        await new Promise(r => setTimeout(r, duration * 1000));
        preloader.remove();
    })();
}