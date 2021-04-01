import WebView from 'react-native-webview';
import {PROVIDER_SITE_MESSAGE} from 'src/features/scan/constants';
import User from 'src/shared/models/User';
import {AutoCompleteValues} from 'src/shared/types/autoComplete';

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

  function fillInputs() {
    const inputs = Array.from(
      document.body.querySelectorAll<HTMLInputElement>('input[autocomplete]')
    );

    const filled = inputs
      .map((el): (keyof User | null)[] => {
        const name = el.getAttribute('autocomplete') as AutoCompleteValues;
        switch (name) {
          case 'name': {
            el.value = [user.firstName, user.lastName].join(' ');
            return ['firstName', 'lastName'];
          }
          case 'given-name': {
            el.value = user.firstName;
            return ['firstName'];
          }
          case 'family-name': {
            el.value = user.lastName;
            return ['lastName'];
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
            return [];
          }
        }
      })
      .filter(v => v)
      .flat();

    const wasFillSuccess = filled.length === Object.keys(user).length;
    return wasFillSuccess;
  }

  function checkIn(wasFillSuccess: boolean) {
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
        const wasFillSuccess = fillInputs();

        function waitForCheckIn() {
          checkIn(wasFillSuccess);
          getSubmitButton()?.removeEventListener('click', waitForCheckIn);
          getSubmitButton()?.addEventListener('click', checkOut);
        }

        getSubmitButton()?.addEventListener('click', waitForCheckIn);
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