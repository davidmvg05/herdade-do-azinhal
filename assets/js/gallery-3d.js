/**
 * Herdade do Azinhal - 3D Video Coverflow Gallery Controller (Imagem 1)
 */

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('coverflowTrack');
  const cards = Array.from(document.querySelectorAll('.video-card'));
  const prevBtn = document.getElementById('coverflowPrev');
  const nextBtn = document.getElementById('coverflowNext');
  const paginationContainer = document.getElementById('coverflowPagination');

  if (!track || cards.length === 0) return;

  let currentIndex = 0;
  const totalCards = cards.length;
  let isMutedGlobal = true;

  // Gerar Bullets de Paginação
  if (paginationContainer) {
    paginationContainer.innerHTML = '';
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `coverflow-dot ${i === 0 ? 'is-active' : ''}`;
      dot.setAttribute('aria-label', `Ir para vídeo ${i + 1}`);
      dot.addEventListener('click', () => goToIndex(i));
      paginationContainer.appendChild(dot);
    });
  }

  const dots = paginationContainer ? Array.from(paginationContainer.querySelectorAll('.coverflow-dot')) : [];

  function updateSlots() {
    cards.forEach((card, index) => {
      // Calcular distância cíclica relativa ao centro
      let diff = index - currentIndex;

      // Wrap around para rotação circular fluida
      if (diff > totalCards / 2) diff -= totalCards;
      if (diff < -totalCards / 2) diff += totalCards;

      let slotAttr = '0';
      if (diff === 0) {
        slotAttr = '0';
      } else if (diff === -1) {
        slotAttr = '-1';
      } else if (diff === 1) {
        slotAttr = '1';
      } else if (diff === -2) {
        slotAttr = '-2';
      } else if (diff === 2) {
        slotAttr = '2';
      } else if (diff < -2) {
        slotAttr = 'hidden-left';
      } else {
        slotAttr = 'hidden-right';
      }

      card.setAttribute('data-slot', slotAttr);

      const video = card.querySelector('video');
      const soundBtn = card.querySelector('.video-sound-btn');

      if (slotAttr === '0') {
        // Carta Ativa
        card.setAttribute('aria-current', 'true');
        card.tabIndex = 0;
        if (video) {
          video.muted = isMutedGlobal;
          video.play().catch(() => {
            // Autoplay com áudio bloqueado por políticas do browser
            video.muted = true;
            video.play().catch(() => {});
          });
        }
      } else {
        // Carta Inativa
        card.removeAttribute('aria-current');
        card.tabIndex = -1;
        if (video) {
          video.pause();
        }
      }
    });

    // Atualizar Bullets
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === currentIndex);
    });
  }

  function goToIndex(index) {
    currentIndex = (index + totalCards) % totalCards;
    updateSlots();
  }

  function next() {
    goToIndex(currentIndex + 1);
  }

  function prev() {
    goToIndex(currentIndex - 1);
  }

  // Event Listeners das Setas
  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);

  // Clique em cartas laterais para trazer para o centro
  cards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      // Ignorar cliques no botão de som
      if (e.target.closest('.video-sound-btn')) return;

      if (index !== currentIndex) {
        goToIndex(index);
      }
    });

    // Atualização da Barra de Progresso do Vídeo
    const video = card.querySelector('video');
    const progressBar = card.querySelector('.video-progress-bar');
    if (video && progressBar) {
      video.addEventListener('timeupdate', () => {
        if (video.duration) {
          const pct = (video.currentTime / video.duration) * 100;
          progressBar.style.width = `${pct}%`;
        }
      });
      // Loop contínuo suave
      video.addEventListener('ended', () => {
        video.currentTime = 0;
        video.play().catch(() => {});
      });
    }

    // Botão de Som da Carta
    const soundBtn = card.querySelector('.video-sound-btn');
    if (soundBtn && video) {
      soundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isMutedGlobal = !isMutedGlobal;
        video.muted = isMutedGlobal;

        // Atualizar ícone de som
        updateSoundIcons();
      });
    }
  });

  function updateSoundIcons() {
    cards.forEach(card => {
      const btn = card.querySelector('.video-sound-btn');
      const v = card.querySelector('video');
      if (v) v.muted = isMutedGlobal;
      if (btn) {
        if (isMutedGlobal) {
          // Ícone Mudo (com barra de corte)
          btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Ativar som">
              <line x1="1" y1="1" x2="23" y2="23"></line>
              <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
              <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0a7 7 0 0 1-.11 1.23"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>`;
        } else {
          // Ícone Som Ativo
          btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Desativar som">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>`;
        }
      }
    });
  }

  // Teclado (Setas Esquerda / Direita)
  document.addEventListener('keydown', (e) => {
    // Ignorar se o drawer estiver aberto
    const drawer = document.getElementById('drawerOverlay');
    if (drawer && drawer.classList.contains('is-open')) return;

    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // Suporte a Touch Swipe
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diffX = touchEndX - touchStartX;
    if (Math.abs(diffX) > 45) {
      if (diffX < 0) next();
      else prev();
    }
  }, { passive: true });

  // Inicializar estado
  updateSoundIcons();
  updateSlots();
});
