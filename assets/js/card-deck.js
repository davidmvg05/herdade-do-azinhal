/**
 * Herdade do Azinhal - Card Stacking Deck Controller (Imagens 2 a 4)
 * Virtual scroll bidirecional sem barra de scroll nativa, com rotações orgânicas.
 */

document.addEventListener('DOMContentLoaded', () => {
  const cards = Array.from(document.querySelectorAll('.deck-card'));
  const counterEl = document.getElementById('deckCounter');
  const prevBtn = document.getElementById('deckPrev');
  const nextBtn = document.getElementById('deckNext');

  if (cards.length === 0) return;

  let currentCardIndex = 0;
  const totalCards = cards.length;
  let isThrottled = false;

  // Ângulos orgânicos de rotação para cada carta (conforme referências 2 a 4)
  const cardRotations = [0, -4.5, 3.8, -3.2, 4.0, -2.8, 3.5];

  function updateDeck() {
    cards.forEach((card, index) => {
      const rot = cardRotations[index % cardRotations.length];

      if (index < currentCardIndex) {
        // Carta Anterior (já empilhada por trás da carta ativa)
        const depthOffset = (currentCardIndex - index) * 6;
        card.style.transform = `translateY(-${depthOffset}px) scale(${1 - (currentCardIndex - index) * 0.035}) rotate(${rot}deg)`;
        card.style.zIndex = 30 - (currentCardIndex - index);
        card.style.opacity = '1';
        card.style.pointerEvents = 'none';
        card.setAttribute('aria-hidden', 'true');
      } else if (index === currentCardIndex) {
        // Carta Ativa no centro do ecrã
        card.style.transform = `translateY(0) scale(1) rotate(${rot}deg)`;
        card.style.zIndex = 50;
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
        card.style.cursor = 'grab';
        card.removeAttribute('aria-hidden');
      } else if (index === currentCardIndex + 1) {
        // O segundo card: posicionado mesmo em baixo da página, apenas com o início a espreitar
        card.style.transform = `translateY(calc(50vh + 195px)) scale(0.97) rotate(${rot * 0.35}deg)`;
        card.style.zIndex = 60;
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
        card.style.cursor = 'pointer';
        card.setAttribute('aria-hidden', 'false');
      } else {
        // Cartas posteriores (mais abaixo, completamente fora de vista)
        card.style.transform = `translateY(calc(50vh + 350px)) scale(0.9) rotate(0deg)`;
        card.style.zIndex = 1;
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
        card.setAttribute('aria-hidden', 'true');
      }
    });

    // Atualizar Contador (ex: 01 / 04)
    if (counterEl) {
      const currentFormatted = String(currentCardIndex + 1).padStart(2, '0');
      const totalFormatted = String(totalCards).padStart(2, '0');
      counterEl.textContent = `${currentFormatted} / ${totalFormatted}`;
    }

    // Atualizar estado dos botões
    if (prevBtn) prevBtn.disabled = currentCardIndex === 0;
    if (nextBtn) nextBtn.disabled = currentCardIndex === totalCards - 1;
  }

  function nextCard() {
    if (currentCardIndex < totalCards - 1) {
      currentCardIndex++;
      updateDeck();
    }
  }

  function prevCard() {
    if (currentCardIndex > 0) {
      currentCardIndex--;
      updateDeck();
    }
  }

  // Throttle para impedir saltos rápidos no wheel
  function triggerScrollAction(isDown) {
    if (isThrottled) return;
    isThrottled = true;

    if (isDown) {
      nextCard();
    } else {
      prevCard();
    }

    setTimeout(() => {
      isThrottled = false;
    }, 450);
  }

  // Capturar Wheel do Rato (Scroll sem barra de rolagem nativa)
  window.addEventListener('wheel', (e) => {
    // Ignorar se o menu drawer estiver aberto
    const drawer = document.getElementById('drawerOverlay');
    if (drawer && drawer.classList.contains('is-open')) return;

    if (Math.abs(e.deltaY) > 15) {
      triggerScrollAction(e.deltaY > 0);
    }
  }, { passive: true });

  // Capturar Teclas de Navegação
  window.addEventListener('keydown', (e) => {
    const drawer = document.getElementById('drawerOverlay');
    if (drawer && drawer.classList.contains('is-open')) return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      triggerScrollAction(true);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      triggerScrollAction(false);
    }
  });

  // Capturar Touch em Dispositivos Móveis
  let touchStartY = 0;
  let touchEndY = 0;

  window.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    const drawer = document.getElementById('drawerOverlay');
    if (drawer && drawer.classList.contains('is-open')) return;

    touchEndY = e.changedTouches[0].screenY;
    const diffY = touchEndY - touchStartY;

    if (Math.abs(diffY) > 35) {
      // Arrastar para cima -> avança próxima carta
      // Arrastar para baixo -> volta carta anterior
      triggerScrollAction(diffY < 0);
    }
  }, { passive: true });

  // Listeners dos Botões de Controlo
  if (nextBtn) nextBtn.addEventListener('click', nextCard);
  if (prevBtn) prevBtn.addEventListener('click', prevCard);

  // Clicar na carta que espreita em baixo avança para ela
  cards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      if (index === currentCardIndex + 1) {
        e.preventDefault();
        nextCard();
      }
    });
  });

  // Inicializar estado do baralho
  updateDeck();
});
