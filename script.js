const telegramLink = document.getElementById('telegram-link');
const TELEGRAM_CHANNEL_URL = telegramLink.href;

telegramLink.addEventListener('click', (event) => {
  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', 'TelegramClick');
  }

  // Keep ordinary navigation open briefly so the browser can send the Pixel event.
  if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
    event.preventDefault();
    window.setTimeout(() => {
      window.location.assign(TELEGRAM_CHANNEL_URL);
    }, 180);
  }
});
