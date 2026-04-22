//Efeito para a navbar

const navEl = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if(window.scrollY >= 75){
        navEl.classList.add('navbar-scrolled');
    }else if(window.scrollY < 75){
        navEl.classList.remove('navbar-scrolled');
    }
}); 



