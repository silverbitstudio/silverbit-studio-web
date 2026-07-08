/**
 * Silverbit Studio — mobile nav + small UX helpers
 */
(function () {
  'use strict';

  var LANGUAGE_PROMPT_STORAGE_KEY = 'silverbit:language-prompt';

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  function initNavToggle() {
    var toggles = document.querySelectorAll('[data-nav-toggle]');
    toggles.forEach(function (btn) {
      var panelId = btn.getAttribute('aria-controls');
      if (!panelId) return;
      var panel = document.getElementById(panelId);
      if (!panel) return;
      btn.addEventListener('click', function () {
        var isHidden = panel.classList.contains('hidden');
        if (isHidden) {
          panel.classList.remove('hidden');
          btn.setAttribute('aria-expanded', 'true');
        } else {
          panel.classList.add('hidden');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  function getStoredLanguagePromptChoice() {
    try {
      return window.localStorage.getItem(LANGUAGE_PROMPT_STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function storeLanguagePromptChoice(value) {
    try {
      window.localStorage.setItem(LANGUAGE_PROMPT_STORAGE_KEY, value);
    } catch (error) {
      // Ignore storage failures so the language prompt can still work.
    }
  }

  function prefersVietnamese() {
    var languages = [];

    if (Array.isArray(window.navigator.languages)) {
      languages = window.navigator.languages.slice();
    }

    if (window.navigator.language) {
      languages.push(window.navigator.language);
    }

    return languages.some(function (locale) {
      var normalizedLocale = String(locale).toLowerCase();
      return normalizedLocale === 'vi' ||
        normalizedLocale.indexOf('vi-') === 0 ||
        normalizedLocale.indexOf('vi_') === 0;
    });
  }

  function initLanguagePrompt() {
    var prompt = document.querySelector('[data-language-prompt]');
    if (!prompt || !prefersVietnamese() || getStoredLanguagePromptChoice()) return;

    var dismissButton = prompt.querySelector('[data-language-prompt-dismiss]');
    var acceptLink = prompt.querySelector('[data-language-prompt-accept]');
    var focusTarget = acceptLink || dismissButton;
    var previousFocus = document.activeElement;

    function closePrompt() {
      storeLanguagePromptChoice('dismissed');
      prompt.classList.add('hidden');
      prompt.classList.remove('flex');
      prompt.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('overflow-hidden');

      if (previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus();
      }
    }

    function openPrompt() {
      prompt.classList.remove('hidden');
      prompt.classList.add('flex');
      prompt.setAttribute('aria-hidden', 'false');
      document.body.classList.add('overflow-hidden');

      if (focusTarget && typeof focusTarget.focus === 'function') {
        focusTarget.focus();
      }
    }

    if (dismissButton) {
      dismissButton.addEventListener('click', closePrompt);
    }

    if (acceptLink) {
      acceptLink.addEventListener('click', function () {
        storeLanguagePromptChoice('accepted');
      });
    }

    prompt.addEventListener('click', function (event) {
      if (event.target === prompt) {
        closePrompt();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (!prompt.classList.contains('hidden') && event.key === 'Escape') {
        closePrompt();
      }
    });

    openPrompt();
  }

  onReady(function () {
    initNavToggle();
    initLanguagePrompt();
  });
})();
