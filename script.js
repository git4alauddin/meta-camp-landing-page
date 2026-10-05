const config = window.LANDING_CONFIG || {};
const configuredText = (value) => typeof value === 'string' ? value.trim() : '';

const channelName = configuredText(config.channelName);
const avatar = document.getElementById('join-avatar');
if (channelName) {
  document.getElementById('join-title').textContent = channelName;
  document.title = `${channelName} | Telegram channel`;
  avatar.textContent = channelName.charAt(0).toUpperCase();
}

const description = configuredText(config.description);
if (description) {
  document.getElementById('channel-description').textContent = description;
  document.querySelector('meta[name="description"]').content = description;
}

const activeUsers = configuredText(config.activeUsers);
if (activeUsers) {
  document.getElementById('active-users').textContent = activeUsers;
}

const displayPicture = configuredText(config.displayPicture);
if (displayPicture) {
  const picture = new Image();
  picture.alt = '';
  picture.onload = () => avatar.replaceChildren(picture);
  picture.src = displayPicture;
}

const telegramLink = document.getElementById('telegram-link');
const telegramUrl = configuredText(config.telegramUrl);
if (telegramUrl) {
  telegramLink.href = telegramUrl;
}
const TELEGRAM_CHANNEL_URL = telegramLink.href;

const advertisingManager = configuredText(config.advertisingManager);
const advertisingContactUrl = configuredText(config.advertisingContactUrl);
if (advertisingManager && /^(https:\/\/|mailto:)/i.test(advertisingContactUrl)) {
  document.getElementById('advertising-manager').textContent = advertisingManager;
  document.getElementById('advertising-link').href = advertisingContactUrl;
  document.getElementById('advertising-contact').hidden = false;
}

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
