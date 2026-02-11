const nav = document.querySelector('nav');
const menuIcon = document.querySelector('.bi-list');
menuIcon.addEventListener('click', () => {
    nav.classList.toggle('active');
});