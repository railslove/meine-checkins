import WebView from 'react-native-webview';
import {PROVIDER_SITE_MESSAGE} from 'src/features/scan/constants';
import User from 'src/shared/models/User';

declare global {
  interface Window {
    ReactNativeWebView: WebView;
  }
}

export const injectJS = function () {
  let user: User;
  let messages: typeof PROVIDER_SITE_MESSAGE;

  function getSubmitButton() {
    return document.body.querySelector<HTMLButtonElement>('button[type=submit]');
  }

  function getSubmitButtonText() {
    return getSubmitButton()?.textContent;
  }

  function isCheckIn() {
    const text = getSubmitButtonText();
    return text != null && /check[-\s]+in/i.test(text);
  }

  function checkIn() {
    const inputs = Array.from(
      document.body.querySelectorAll<HTMLInputElement>('input[autocomplete]')
    );

    const filled = inputs
      .map(el => {
        const name = el.getAttribute('autocomplete');
        switch (name) {
          case 'name': {
            el.value = [user.firstName, user.lastName].join(' ');
            return ['firstName', 'lastName'];
          }
          case 'tel': {
            el.value = user.phoneNumber;
            return ['phoneNumber'];
          }
          case 'street-address': {
            el.value = user.address;
            return ['address'];
          }
          default: {
            return null;
          }
        }
      })
      .filter(v => v)
      .flat();

    const wasFillSuccess = filled.length === Object.keys(user).length;

    if (wasFillSuccess) {
      window.ReactNativeWebView.postMessage(messages.checkInSuccess);
    } else {
      window.ReactNativeWebView.postMessage(messages.checkInFailure);
    }
  }

  function checkOut() {
    window.ReactNativeWebView.postMessage(messages.checkOutSuccess);
    getSubmitButton()?.removeEventListener('click', checkOut);
  }

  try {
    setTimeout(() => {
      if (isCheckIn()) {
        checkIn();
        getSubmitButton()?.addEventListener('click', checkOut);
      }
    }, 1000);
  } catch (error) {
    // @ts-ignore
    window.ReactNativeWebView.postMessage(messages.checkInFailure);
  }
};

/**
 * @param {User} user
 */
export const injectJSString = (user: User) => {
  return `(${injectJS
    .toString()
    .replace('var user;', `var user = ${JSON.stringify(user)};`)
    .replace('var messages;', `var messages = ${JSON.stringify(PROVIDER_SITE_MESSAGE)};`)})();`;
};
