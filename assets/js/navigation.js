/**
 * Herdade do Azinhal - Navigation & Drawer Controller
 * Handles Drawer menu state, keyboard accessibility (Esc/Tab), and slice interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const sliceItems = document.querySelectorAll('.slice-item');

  if (!menuToggle || !drawerOverlay) return;

  let isDrawerOpen = false;
  let previousActiveElement = null;

  // Toggle Drawer
  function toggleDrawer(open) {
    isDrawerOpen = typeof open === 'boolean' ? open : !isDrawerOpen;

    if (isDrawerOpen) {
      previousActiveElement = document.activeElement;
      drawerOverlay.classList.add('is-open');
      menuToggle.classList.add('is-active');
      document.body.classList.add('menu-is-open');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Fechar menu de navegação');
      document.body.style.overflow = 'hidden';

      // Foco no primeiro link acessível do drawer
      setTimeout(() => {
        const firstLink = drawerOverlay.querySelector('a');
        if (firstLink) firstLink.focus();
      }, 150);
    } else {
      drawerOverlay.classList.remove('is-open');
      menuToggle.classList.remove('is-active');
      document.body.classList.remove('menu-is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
      document.body.style.overflow = '';

      if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        previousActiveElement.focus();
      }
    }
  }

  menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggleDrawer();
  });

  // Fechar ao clicar numa ligação
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleDrawer(false);
    });
  });

  // Fechar com tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isDrawerOpen) {
      toggleDrawer(false);
    }
  });

  // Fechar ao clicar fora do conteúdo
  drawerOverlay.addEventListener('click', (e) => {
    if (e.target === drawerOverlay) {
      toggleDrawer(false);
    }
  });

  // Trap focus dentro do drawer enquanto aberto (Acessibilidade WCAG)
  drawerOverlay.addEventListener('keydown', (e) => {
    if (!isDrawerOpen || e.key !== 'Tab') return;

    const focusable = drawerOverlay.querySelectorAll('a, button');
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  });

  // Teclado nas fatias verticais (Enter / Espaço para ativar)
  sliceItems.forEach(item => {
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const href = item.getAttribute('href');
        if (href) window.location.href = href;
      }
    });
  });

  // Toggle do Popover de Termos e Políticas em Mobile/Touch
  const policiesTrigger = document.querySelector('.drawer-policies-trigger');
  const policiesWrap = document.querySelector('.drawer-policies-wrap');
  if (policiesTrigger && policiesWrap) {
    policiesTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const popover = policiesWrap.querySelector('.drawer-policies-popover');
      if (popover) {
        const isVisible = window.getComputedStyle(popover).visibility === 'visible';
        popover.style.opacity = isVisible ? '0' : '1';
        popover.style.visibility = isVisible ? 'hidden' : 'visible';
        popover.style.transform = isVisible ? 'translateY(8px)' : 'translateY(0)';
      }
    });
  }

  // ==========================================================================
  // Homepage Horizontal Slices Arrow Controller
  // - Seta na última imagem visível para avançar para a direita (→).
  // - Quando avança um, aparece a seta da esquerda na primeira imagem para recuar (←).
  // ==========================================================================
  const slicesPanel = document.getElementById('slicesPanel');
  const sliceNavPrev = document.getElementById('sliceNavPrev');
  const sliceNavNext = document.getElementById('sliceNavNext');

  if (slicesPanel && sliceItems.length > 0) {
    function updateSliceArrows() {
      const scrollPos = slicesPanel.scrollLeft;
      const maxScroll = slicesPanel.scrollWidth - slicesPanel.clientWidth;

      // Se todas as fotos cabem (ex: desktop >= 1200px), oculta ambas
      if (maxScroll <= 5) {
        if (sliceNavPrev) sliceNavPrev.style.display = 'none';
        if (sliceNavNext) sliceNavNext.style.display = 'none';
        return;
      }

      // Seta esquerda (←): só aparece quando o utilizador já avançou para a direita
      if (sliceNavPrev) {
        if (scrollPos > 12) {
          sliceNavPrev.style.display = 'flex';
          sliceNavPrev.style.opacity = '1';
        } else {
          sliceNavPrev.style.display = 'none';
        }
      }

      // Seta direita (→): visível na última imagem enquanto houver imagens para a frente
      if (sliceNavNext) {
        if (scrollPos < maxScroll - 12) {
          sliceNavNext.style.display = 'flex';
          sliceNavNext.style.opacity = '1';
        } else {
          sliceNavNext.style.display = 'none';
        }
      }
    }

    if (sliceNavNext) {
      sliceNavNext.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const step = sliceItems[0].offsetWidth || 300;
        slicesPanel.scrollBy({ left: step, behavior: 'smooth' });
      });
    }

    if (sliceNavPrev) {
      sliceNavPrev.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const step = sliceItems[0].offsetWidth || 300;
        slicesPanel.scrollBy({ left: -step, behavior: 'smooth' });
      });
    }

    slicesPanel.addEventListener('scroll', updateSliceArrows, { passive: true });
    window.addEventListener('resize', updateSliceArrows);

    // Suporte ao Wheel vertical do rato convertido em scroll horizontal suave
    slicesPanel.addEventListener('wheel', (e) => {
      if (slicesPanel.scrollWidth > slicesPanel.clientWidth + 5) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          slicesPanel.scrollBy({ left: e.deltaY, behavior: 'smooth' });
        }
      }
    }, { passive: false });

    // Suporte a arrasto do rato no desktop (Drag-to-scroll)
    let isMouseDown = false;
    let startX = 0;
    let initialScrollLeft = 0;
    let wasDragged = false;

    slicesPanel.addEventListener('mousedown', (e) => {
      if (slicesPanel.scrollWidth <= slicesPanel.clientWidth + 5) return;
      if (e.target.closest('.slice-nav-arrow')) return;

      isMouseDown = true;
      wasDragged = false;
      startX = e.pageX;
      initialScrollLeft = slicesPanel.scrollLeft;
      slicesPanel.style.cursor = 'grabbing';
      slicesPanel.style.userSelect = 'none';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
      const walk = e.pageX - startX;
      if (Math.abs(walk) > 6) {
        wasDragged = true;
        slicesPanel.scrollLeft = initialScrollLeft - walk;
      }
    });

    window.addEventListener('mouseup', () => {
      if (isMouseDown) {
        isMouseDown = false;
        slicesPanel.style.cursor = '';
        slicesPanel.style.userSelect = '';
        setTimeout(() => { wasDragged = false; }, 80);
      }
    });

    // Evitar navegação indevida ao arrastar
    sliceItems.forEach(item => {
      item.addEventListener('click', (e) => {
        if (wasDragged) {
          e.preventDefault();
          e.stopPropagation();
        }
      });
    });

    // Inicialização
    setTimeout(updateSliceArrows, 80);
  }
});
