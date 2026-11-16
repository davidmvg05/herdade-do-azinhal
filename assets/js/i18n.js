/**
 * Herdade do Azinhal - Internationalization (i18n) Controller
 * Provides bilingual support (Português / English).
 * Note: The estate name "Herdade do Azinhal" remains untranslated by design.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'herdade_preferred_lang';

  // Comprehensive bilingual translations dictionary
  const translations = {
    // Navigation Drawer
    'nav_herdade': {
      pt: 'Herdade do Azinhal',
      en: 'Herdade do Azinhal' // Untranslated as specified
    },
    'nav_coudelaria': {
      pt: 'A Coudelaria',
      en: 'The Stud Farm'
    },
    'nav_lusitanos': {
      pt: 'Lusitanos',
      en: 'Lusitanos'
    },
    'nav_sorraias': {
      pt: 'Sorraias',
      en: 'Sorraias'
    },
    'nav_gado': {
      pt: 'Gado',
      en: 'Cattle'
    },
    'nav_galeria': {
      pt: 'Galeria',
      en: 'Gallery'
    },
    'nav_links': {
      pt: 'Links',
      en: 'Links'
    },
    'nav_contactos': {
      pt: 'Contactos',
      en: 'Contacts'
    },

    // Drawer Footer & Policies
    'footer_terms': {
      pt: 'Termos e políticas',
      en: 'Terms & Policies'
    },
    'footer_privacy': {
      pt: 'Política de privacidade',
      en: 'Privacy Policy'
    },
    'footer_cookies': {
      pt: 'Política de Cookies',
      en: 'Cookie Policy'
    },
    'footer_copyright': {
      pt: '© 2026 Coudelaria Herdade do Azinhal',
      en: '© 2026 Coudelaria Herdade do Azinhal'
    },

    // Homepage Hero & Slices
    'home_brand_tag': {
      pt: 'Herdade do Azinhal • Coudelaria',
      en: 'Herdade do Azinhal • Stud Farm'
    },
    'home_hero_title': {
      pt: 'Coudelaria de Tradição e Excelência',
      en: 'Stud Farm of Tradition & Excellence'
    },
    'home_hero_desc': {
      pt: 'Herança Genética e Paixão Equestre no Coração do Alentejo.',
      en: 'Genetic Heritage & Equestrian Passion in the Heart of Alentejo.'
    },
    'home_hero_cta': {
      pt: 'Conhecer a Coudelaria',
      en: 'Discover the Stud Farm'
    },
    'slice_coudelaria': {
      pt: 'A Coudelaria',
      en: 'The Stud Farm'
    },
    'slice_lusitanos': {
      pt: 'Lusitanos',
      en: 'Lusitanos'
    },
    'slice_sorraias': {
      pt: 'Sorraias',
      en: 'Sorraias'
    },
    'slice_gado': {
      pt: 'Gado',
      en: 'Cattle'
    },

    // Deck Controls & Hints
    'deck_scroll_hint': {
      pt: 'Role ou use as setas para explorar',
      en: 'Scroll or use arrows to explore'
    },
    'deck_prev': {
      pt: 'Carta anterior',
      en: 'Previous card'
    },
    'deck_next': {
      pt: 'Próxima carta',
      en: 'Next card'
    },
    'menu_open': {
      pt: 'Abrir menu de navegação',
      en: 'Open navigation menu'
    },
    'menu_close': {
      pt: 'Fechar menu de navegação',
      en: 'Close navigation menu'
    },

    // Page Tags & Headers
    'tag_coudelaria': {
      pt: 'Herdade do Azinhal • Coudelaria',
      en: 'Herdade do Azinhal • Stud Farm'
    },
    'title_coudelaria': {
      pt: 'A Coudelaria',
      en: 'The Stud Farm'
    },
    'desc_coudelaria': {
      pt: 'Tradição secular na criação do Cavalo Puro Sangue Lusitano e Sorraia.',
      en: 'Secular tradition in breeding Pure Blood Lusitano and Sorraia horses.'
    },

    'tag_lusitanos': {
      pt: 'Herdade do Azinhal • Coudelaria',
      en: 'Herdade do Azinhal • Stud Farm'
    },
    'title_lusitanos': {
      pt: 'Lusitanos',
      en: 'Lusitanos'
    },
    'desc_lusitanos': {
      pt: 'Nobreza, funcionalidade e temperamento excecional de uma raça milenar.',
      en: 'Nobility, athleticism, and exceptional temperament of an ancient breed.'
    },

    'tag_sorraias': {
      pt: 'Herdade do Azinhal • Coudelaria',
      en: 'Herdade do Azinhal • Stud Farm'
    },
    'title_sorraias': {
      pt: 'Sorraias',
      en: 'Sorraias'
    },
    'desc_sorraias': {
      pt: 'A preservação do cavalo primitivo ibérico em estado semisselvagem.',
      en: 'The preservation of the primitive Iberian horse in semi-feral habitat.'
    },

    'tag_gado': {
      pt: 'Herdade do Azinhal • Agropecuária',
      en: 'Herdade do Azinhal • Livestock'
    },
    'title_gado': {
      pt: 'Gado Bovino',
      en: 'Cattle'
    },
    'desc_gado': {
      pt: 'Criação extensiva em montado alentejano com respeito pelo ecossistema.',
      en: 'Extensive breeding in the Alentejo cork oak pastures with respect for the ecosystem.'
    },

    'tag_galeria': {
      pt: 'Herdade do Azinhal • Galeria Multimédia',
      en: 'Herdade do Azinhal • Multimedia Gallery'
    },
    'title_galeria': {
      pt: 'Galeria Visual',
      en: 'Visual Gallery'
    },
    'desc_galeria': {
      pt: 'Experiência imersiva em vídeo com som ambiente dos nossos animais e herdade.',
      en: 'Immersive video experience with ambient soundscapes of our horses and estate.'
    },

    'tag_links': {
      pt: 'Herdade do Azinhal • Ligações Úteis',
      en: 'Herdade do Azinhal • Useful Links'
    },
    'title_links': {
      pt: 'Ligações Úteis',
      en: 'Useful Links'
    },
    'desc_links': {
      pt: 'Associações do setor equestre, registos genealógicos e portais de referência.',
      en: 'Equestrian breed associations, studbooks, and reference portals.'
    },

    'tag_contactos': {
      pt: 'Atendimento • Localização • Informações',
      en: 'Customer Care • Location • Information'
    },
    'title_contactos': {
      pt: 'Contactos',
      en: 'Contacts'
    },
    'desc_contactos': {
      pt: 'Estamos disponíveis para informações sobre poldros, reprodutores Lusitanos e o projeto de conservação do Sorraia.',
      en: 'We are available for inquiries regarding foals, Lusitano stallions, and the Sorraia conservation project.'
    },

    // Contact Form & Cards
    'contact_loc_title': {
      pt: 'Portalegre • Alentejo',
      en: 'Portalegre • Alentejo'
    },
    'contact_loc_desc': {
      pt: 'Situada num enquadramento natural único de montado e pastagens ricas, a cerca de 10 minutos de Portalegre.',
      en: 'Situated in a unique natural setting of cork oak woodlands and fertile pastures, just 10 minutes from Portalegre.'
    },
    'contact_loc_tag': {
      pt: 'Alto Alentejo',
      en: 'Upper Alentejo'
    },
    'contact_mail_title': {
      pt: 'Correio Eletrónico',
      en: 'Email Address'
    },
    'contact_mail_desc': {
      pt: 'Para esclarecimentos sobre a coudelaria, animais disponíveis ou projetos de preservação:',
      en: 'For inquiries regarding the stud farm, available animals, or conservation projects:'
    },
    'contact_mail_btn': {
      pt: 'Enviar Email',
      en: 'Send Email'
    },
    'contact_mail_tag': {
      pt: 'Resposta Rápida',
      en: 'Quick Response'
    },
    'contact_form_title': {
      pt: 'Envie uma Mensagem',
      en: 'Send a Message'
    },
    'contact_form_name': {
      pt: 'O seu nome...',
      en: 'Your name...'
    },
    'contact_form_email': {
      pt: 'O seu email...',
      en: 'Your email address...'
    },
    'contact_form_msg': {
      pt: 'Como podemos ajudar?',
      en: 'How can we help you?'
    },
    'contact_form_submit': {
      pt: 'Enviar Mensagem',
      en: 'Send Message'
    },
    'contact_hours_title': {
      pt: 'Visitas & Marcações',
      en: 'Visits & Appointments'
    },
    'contact_hours_desc': {
      pt: 'Visitas técnicas e de criadores mediante marcação prévia.',
      en: 'Technical and breeder visits strictly by prior appointment.'
    },
    'contact_hours_tag': {
      pt: 'Sob Marcação',
      en: 'By Appointment'
    },

    // Return to Home
    'back_to_home': {
      pt: 'Voltar ao Início',
      en: 'Back to Home'
    }
  };

  // Direct phrase replacement dictionary for deep text nodes
  const phraseDictionary = {
    'A Coudelaria': 'The Stud Farm',
    'Lusitanos': 'Lusitanos',
    'Sorraias': 'Sorraias',
    'Gado': 'Cattle',
    'Galeria': 'Gallery',
    'Links': 'Links',
    'Contactos': 'Contacts',
    'Termos e políticas': 'Terms & Policies',
    'Política de privacidade': 'Privacy Policy',
    'Política de Cookies': 'Cookie Policy',
    'Role ou use as setas para explorar': 'Scroll or use arrows to explore',
    'Conhecer a Coudelaria': 'Discover the Stud Farm',
    'Coudelaria de Tradição e Excelência': 'Stud Farm of Tradition & Excellence',
    'Herança Genética e Paixão Equestre no Coração do Alentejo.': 'Genetic Heritage & Equestrian Passion in the Heart of Alentejo.',
    'Tradição secular na criação do Cavalo Puro Sangue Lusitano e Sorraia.': 'Secular tradition in breeding Pure Blood Lusitano and Sorraia horses.',
    'Nobreza, funcionalidade e temperamento excecional de uma raça milenar.': 'Nobility, athleticism, and exceptional temperament of an ancient breed.',
    'A preservação do cavalo primitivo ibérico em estado semisselvagem.': 'The preservation of the primitive Iberian horse in semi-feral habitat.',
    'Criação extensiva em montado alentejano com respeito pelo ecossistema.': 'Extensive breeding in the Alentejo cork oak pastures with respect for the ecosystem.',
    'Experiência imersiva em vídeo com som ambiente dos nossos animais e herdade.': 'Immersive video experience with ambient soundscapes of our horses and estate.',
    'Associações do setor equestre, registos genealógicos e portais de referência.': 'Equestrian breed associations, studbooks, and reference portals.',
    'Estamos disponíveis para informações sobre poldros, reprodutores Lusitanos e o projeto de conservação do Sorraia.': 'We are available for inquiries regarding foals, Lusitano stallions, and the Sorraia conservation project.',
    'Gado Bovino': 'Cattle',
    'Galeria Visual': 'Visual Gallery',
    'Ligações Úteis': 'Useful Links',
    'Voltar ao Início': 'Back to Home',
    'Envie uma Mensagem': 'Send a Message',
    'Correio Eletrónico': 'Email Address',
    'Visitas & Marcações': 'Visits & Appointments',
    'Enviar Email': 'Send Email',
    'Enviar Mensagem': 'Send Message',
    'Resposta Rápida': 'Quick Response',
    'Sob Marcação': 'By Appointment',
    'Alto Alentejo': 'Upper Alentejo'
  };

  // Reverse mapping for restoring Portuguese
  const reversePhraseDictionary = {};
  Object.keys(phraseDictionary).forEach(pt => {
    reversePhraseDictionary[phraseDictionary[pt]] = pt;
  });

  let currentLang = 'pt';

  function getStoredLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'pt';
    } catch (e) {
      return 'pt';
    }
  }

  function setLanguage(lang) {
    if (lang !== 'pt' && lang !== 'en') lang = 'pt';
    currentLang = lang;

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // Storage unavailable fallback
    }

    // Set document lang attribute
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-PT';

    // Update active class on all language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // 1. Translate elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key] && translations[key][lang]) {
        el.textContent = translations[key][lang];
      }
    });

    // 2. Translate placeholders with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[key] && translations[key][lang]) {
        el.setAttribute('placeholder', translations[key][lang]);
      }
    });

    // 3. Translate aria-labels with data-i18n-aria attribute
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (translations[key] && translations[key][lang]) {
        el.setAttribute('aria-label', translations[key][lang]);
      }
    });

    // 4. Translate common menu links, badges, hints if not explicitly tagged
    applyFallbackTranslations(lang);

    // Dispatch global event for other components if needed
    window.dispatchEvent(new CustomEvent('herdadeLanguageChanged', { detail: { language: lang } }));
  }

  function applyFallbackTranslations(lang) {
    // Menu drawer links
    document.querySelectorAll('.drawer-link span:first-child').forEach(span => {
      const text = span.textContent.trim();
      if (text === 'Herdade do Azinhal') return; // NEVER translate the estate name

      if (lang === 'en' && phraseDictionary[text]) {
        span.textContent = phraseDictionary[text];
      } else if (lang === 'pt' && reversePhraseDictionary[text]) {
        span.textContent = reversePhraseDictionary[text];
      }
    });

    // Policy links in drawer popover
    document.querySelectorAll('.drawer-policy-link').forEach(link => {
      const text = link.textContent.trim();
      if (lang === 'en' && phraseDictionary[text]) {
        link.textContent = phraseDictionary[text];
      } else if (lang === 'pt' && reversePhraseDictionary[text]) {
        link.textContent = reversePhraseDictionary[text];
      }
    });

    // Policy trigger button text
    const policyTrigger = document.querySelector('.drawer-policies-trigger span');
    if (policyTrigger) {
      const text = policyTrigger.textContent.trim();
      if (lang === 'en' && phraseDictionary[text]) {
        policyTrigger.textContent = phraseDictionary[text];
      } else if (lang === 'pt' && reversePhraseDictionary[text]) {
        policyTrigger.textContent = reversePhraseDictionary[text];
      }
    }

    // Scroll hint
    const scrollHint = document.querySelector('.deck-scroll-hint span');
    if (scrollHint) {
      scrollHint.textContent = lang === 'en' ? 'Scroll or use arrows to explore' : 'Role ou use as setas para explorar';
    }

    // Deck prev/next buttons aria-labels
    const prevBtn = document.getElementById('deckPrev');
    const nextBtn = document.getElementById('deckNext');
    if (prevBtn) prevBtn.setAttribute('aria-label', lang === 'en' ? 'Previous card' : 'Carta anterior');
    if (nextBtn) nextBtn.setAttribute('aria-label', lang === 'en' ? 'Next card' : 'Próxima carta');
  }

  // Initialize on load
  function init() {
    const initialLang = getStoredLanguage();

    // Attach click listeners to language toggle buttons
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.lang-btn');
      if (btn) {
        e.preventDefault();
        const targetLang = btn.getAttribute('data-lang');
        if (targetLang && targetLang !== currentLang) {
          setLanguage(targetLang);
        }
      }
    });

    setLanguage(initialLang);
  }

  // Expose to window for direct calls if required
  window.setSiteLanguage = setLanguage;
  window.getCurrentLanguage = () => currentLang;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
