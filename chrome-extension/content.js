console.log('phishguard is watching 👀');

const checkLinkOnClick = (e) => {
    const target = e.target.closest('a');
    if (target && target.href) {
        console.log('link clicked:', target.href);
    }
};

document.addEventListener('click', checkLinkOnClick, true);
