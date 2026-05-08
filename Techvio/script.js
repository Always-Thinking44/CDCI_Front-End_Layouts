

/*Efeito Vanilla Tilt do header*/

 var wind = $(window);

    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 15,
    speed: 400,
    glare: false,
    "max-glare": 0.3,
    });


/*Efeito Isotopo do portfolio*/


    $('.portfolio-item').isotope({
        itemSelector: '.item',
        layoutMode: 'fitRows'
    });

    $('.portfolio-menu ul li').click(function(){
        $('.portfolio-menu ul li').removeClass('active');
        $(this).addClass('active');

        var selector = $(this).attr('data-filter');
        $('.portfolio-item').isotope({
            filter:selector
        });
        return false;
    });




/*--Efeito CounterUp do portfolio--*/

$(document).ready(function() {
    // Seleciona todos os elementos com a classe .number
    const observers = document.querySelectorAll('.number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Se o elemento entrou na tela
            if (entry.isIntersecting) {
                const $this = $(entry.target);
                const countTo = $this.text(); // Pega o número final que está no HTML

                // Inicia a animação do número
                $({ countNum: 0 }).animate({
                    countNum: countTo
                }, {
                    duration: 2000, // 2 segundos
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                        // NÃO FAZ MAIS NADA: O número fica parado aqui
                    }
                });

                // ESTA É A CHAVE: Para de observar o elemento após a primeira vez
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Só dispara quando 50% do número estiver visível

    observers.forEach(obs => observer.observe(obs));
});


 /*Efeito do preenchimento do About */
var wind = $(window);
    wind.on('scroll', function () {
    $(".skill-progress .progres").each(function () {
    var bottom_of_object = $(this).offset().top + $(this).outerHeight();
    var bottom_of_window = $(window).scrollTop() + $(window).height();
    var myVal = $(this).attr('data-value');
    if (bottom_of_window > bottom_of_object) {
        $(this).css({ width: myVal });
    }
    });
});
   


/* Efeito Sticky do Navbar */

function checkNavbarSticky() {

    const navbar = document.querySelector('.navbar-section');

    if (window.scrollY > 120) {

        navbar.classList.add('is-sticky');

    } else {

        navbar.classList.remove('is-sticky');
    }
}

/* Executa ao scroll */

window.addEventListener('scroll', checkNavbarSticky);

/* Executa ao carregar */

document.addEventListener('DOMContentLoaded', checkNavbarSticky);







/* Efeito do Carousel do Testimonial */
    (function () {
  var track    = document.getElementById('testiTrack');
  var dotsWrap = document.getElementById('testiDots');
  if (!track || !dotsWrap) return;

  var GAP = 28;
  var timer = null;

  /* ── 1. Clonar os cards originais para criar o loop ── */
  /* Guardamos apenas os cards originais (antes de clonar) */
  var originals = Array.prototype.slice.call(track.querySelectorAll('.testi-card'));
  var total     = originals.length; /* 3 */

  /* Clonamos todos os cards e acrescentamos ao final do track.
     Assim o track fica: [1, 2, 3, clone1, clone2, clone3]
     Quando chegamos ao clone3, teleportamos para o card 3 original
     e continuamos a andar — o utilizador nunca vê a costura. */
  originals.forEach(function (card) {
    track.appendChild(card.cloneNode(true));
  });

  /* Posição actual no track (em índice de cards, começa em 0) */
  var pos = 0;

  /* ── 2. Utilitários ── */
  function visibleCount() {
    if (window.innerWidth <= 600)  return 1;
    if (window.innerWidth <= 991)  return 2;
    return 3;
  }

  function cardWidth() {
    /* largura real de um card já renderizado */
    return track.querySelectorAll('.testi-card')[0].getBoundingClientRect().width;
  }

  function stepPx() {
    return cardWidth() + GAP;
  }

  /* ── 3. Mover o track COM animação ── */
  function moveTo(idx, animate) {
    if (animate === false) {
      /* desliga a transição momentaneamente */
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    track.style.transform = 'translateX(-' + (idx * stepPx()) + 'px)';
    pos = idx;
    updateDots();
  }

  /* ── 4. Avançar um card (sempre para a esquerda) ── */
  function next() {
    var nextPos = pos + 1;
    moveTo(nextPos, true);

    /* Quando chegamos ao primeiro clone (índice === total),
       esperamos que a animação termine e teleportamos de volta
       ao card original equivalente (índice 0) sem animação.
       O loop é: 0→1→2→3(clone0)→teleporta para 0→1→2→... */
    if (nextPos >= total) {
      track.addEventListener('transitionend', resetToStart, { once: true });
    }
  }

  function resetToStart() {
    /* Força reflow para que "transition:none" seja aplicado antes
       de repor o transform — evita flash */
    moveTo(0, false);
    /* Forçamos reflow */
    track.getBoundingClientRect();
    /* Religa a transição no próximo frame */
    requestAnimationFrame(function () {
      track.style.transition = 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  }

  /* ── 5. Dots — um por card original ── */
  function buildDots() {
    dotsWrap.innerHTML = '';
    for (var i = 0; i < total; i++) {
      var dot = document.createElement('button');
      dot.className = 'testi-dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Testemunho ' + (i + 1));
      (function (idx) {
        dot.addEventListener('click', function () {
          moveTo(idx, true);
          resetTimer();
        });
      }(i));
      dotsWrap.appendChild(dot);
    }
  }

  function updateDots() {
    /* O dot activo corresponde a pos % total (para os clones mostrarem
       o dot do card original equivalente) */
    var activeDot = pos % total;
    dotsWrap.querySelectorAll('.testi-dot').forEach(function (d, i) {
      d.classList.toggle('is-active', i === activeDot);
    });
  }

  /* ── 6. Timer ── */
  function startTimer() { timer = setInterval(next, 5000); }
  function stopTimer()  { clearInterval(timer); }
  function resetTimer() { stopTimer(); startTimer(); }

  /* Pausa no hover */
  track.addEventListener('mouseenter', stopTimer);
  track.addEventListener('mouseleave', startTimer);

  /* Reconstrói em resize (reset ao início para evitar posições erradas) */
  window.addEventListener('resize', function () {
    stopTimer();
    moveTo(0, false);
    startTimer();
  });

  /* ── 7. Iniciar ── */
  buildDots();
  moveTo(0, false);
  startTimer();
}());




/* Efeito do efeito de onda dos botões */
$(function () {
$('.default-btn, .default-btn-one, .default-btn-two')
    .on('mouseenter', function (e) {
    var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
    $(this).find('span').css({ top: relY, left: relX });
    })
    .on('mouseout', function (e) {
    var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
    $(this).find('span').css({ top: relY, left: relX });
    });
});
