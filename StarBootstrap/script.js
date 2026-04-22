//Efeito para a navbar

const navEl = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if(window.scrollY >= 75){
        navEl.classList.add('navbar-scrolled');
    }else if(window.scrollY < 75){
        navEl.classList.remove('navbar-scrolled');
    }
}); 



const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#main-nav .nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150; // compensação da navbar
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});