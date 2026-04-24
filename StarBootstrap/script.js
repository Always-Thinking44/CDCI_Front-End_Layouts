const navEl = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

// 1. Efeito de Scroll (Mudar cor da Navbar)
window.addEventListener('scroll', () => {
    if (window.scrollY >= 75) {
        navEl.classList.add('navbar-scrolled');
    } else {
        navEl.classList.remove('navbar-scrolled');
    }
});

// 2. Menu Mobile (Abrir/Fechar)
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// 3. ScrollSpy (Link Ativo conforme a seção)
window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
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



//script para modal

document.querySelectorAll('.portfolio-link').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const id = link.dataset.modal;
        document.getElementById(id).style.display = 'flex';
    });
});

// fechar botão
document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.janela').style.display = 'none';
    });
});

// fechar fora
window.addEventListener('click', e => {
    document.querySelectorAll('.janela').forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});









const form = document.getElementById('contactForm');
const btn = form.querySelector('.btn-submit');
const inputs = form.querySelectorAll('input[required], textarea[required]');

function validarFormulario() {
    
    let algumVazio = false;
    
    inputs.forEach(input => {
        if (input.value.trim() === "") {
            algumVazio = true;
        }
    });

    
    btn.disabled = algumVazio;
}


inputs.forEach(input => {
    input.addEventListener('input', validarFormulario);
});