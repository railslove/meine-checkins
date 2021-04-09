import WebView from 'react-native-webview';

import User from 'src/shared/models/User';
import {AutoCompleteValues} from 'src/shared/types/autoComplete';
import {PROVIDER_SITE_MESSAGE} from 'src/features/scan/constants';

declare global {
  interface Window {
    ReactNativeWebView: WebView;
  }
}

type InjectJSValues = {
  user: User;
  messages: typeof PROVIDER_SITE_MESSAGE;
};

/**
 * function used inside of the webview for:
 *  - filling forms
 *  - signaling status
 **/

export function injectJS(values: InjectJSValues) {
  const {user, messages} = values;
  let hasCheckedIn = false;

  function getButton() {
    return (
      document.body.querySelector<HTMLButtonElement>('button[type=submit]') ||
      document.createElement('button')
    );
  }

  function fillInputs() {
    const inputs = Array.from(
      document.body.querySelectorAll<HTMLInputElement>('input[autocomplete]')
    );

    inputs[0]?.focus();

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

  function sendCheckInMessage(wasFillSuccess: boolean) {
    if (wasFillSuccess) {
      window.ReactNativeWebView.postMessage(messages.checkInSuccess);
    } else {
      window.ReactNativeWebView.postMessage(messages.checkInFailure);
    }
  }

  function waitForCheckOut() {
    window.ReactNativeWebView.postMessage(messages.checkOutSuccess);
    getButton().removeEventListener('click', waitForCheckOut);
  }

  try {
    setTimeout(() => {
      if (!hasCheckedIn) {
        const wasFillSuccess = fillInputs();
        hasCheckedIn = wasFillSuccess;

        function waitForCheckIn() {
          sendCheckInMessage(wasFillSuccess);

          if (wasFillSuccess) {
            getButton().removeEventListener('click', waitForCheckIn);
            getButton().addEventListener('click', waitForCheckOut);
          }
        }

        getButton().addEventListener('click', waitForCheckIn);
      }
    }, 1000);
  } catch (error) {
    // @ts-ignore
    window.ReactNativeWebView.postMessage(messages.checkInFailure);
  }
}

/**
 * Makes an immediately invoked function expression
 * with the arguments we have from the app
 *
 * It works from typescript because
 * - Function.prototype.toString contains the function body
 * - the function body is already transpiled when is run on the device
 */
export const injectJSString = (user: User) => {
  const values: InjectJSValues = {
    user,
    messages: PROVIDER_SITE_MESSAGE,
  };

  const injectFnBody = injectJS.toString();
  const serializedArguments = JSON.stringify(values);

  return `(${injectFnBody})(${serializedArguments});`;
};
