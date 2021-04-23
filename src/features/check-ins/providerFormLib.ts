import WebView, {WebViewMessageEvent} from 'react-native-webview';

import User from 'src/shared/models/User';
import {MessageKey} from 'src/features/scan/constants';
import {AutoCompleteValues} from 'src/shared/types/autoComplete';

declare global {
  interface Window {
    ReactNativeWebView: WebView;
  }
}

type InjectJSValues = {
  user: User;
};

export type ProviderFormMessage = {
  key: MessageKey;
  value?: string;
};

/**
 * Used inside of the WebView for filling forms and signaling status to the app
 *
 * We can use TypeScript because:
 *
 * - Function.prototype.toString contains the function body
 * - the body is already transformed to JS when is run on the device (you can test this by login it)
 **/

export function fillFormInWebView(values: InjectJSValues) {
  const {user} = values;

  function postMessage(key: MessageKey, value?: string) {
    const message = JSON.stringify({key, value});
    window.ReactNativeWebView.postMessage(message);
  }

  function findProviderLogo() {
    const link = document.querySelector<HTMLLinkElement>('link[type^=image][rel=icon]');

    if (link && link.href) {
      postMessage('setProviderLogo', link.href);
    }
  }

  function getButton() {
    const el = document.body.querySelector<HTMLButtonElement>('button[type=submit]');

    if (el) {
      return el;
    }

    const altEl = document.body.querySelector('button');

    if (altEl && /check[-\s]*(in|out)/i.test(altEl?.outerHTML)) {
      return altEl;
    }

    return document.createElement('button');
  }

  function fillInputAsync(el: HTMLInputElement, index: number, value: string) {
    setTimeout(() => {
      el.setRangeText(value, 0, value.length);
      el.dispatchEvent(new Event('input', {bubbles: true}));
    }, index * 100);
  }

  function getCheckInInputs() {
    return Array.from(document.body.querySelectorAll<HTMLInputElement>('input[autocomplete]'));
  }

  function isCheckInFormReady() {
    return getCheckInInputs().length > 0;
  }

  function fillCheckInForm() {
    const filled = getCheckInInputs()
      .map((el, index): (keyof User)[] => {
        const name = el.getAttribute('autocomplete') as AutoCompleteValues;

        switch (name) {
          case 'name': {
            fillInputAsync(el, index, [user.firstName, user.lastName].join(' '));
            return ['firstName', 'lastName'];
          }
          case 'given-name': {
            fillInputAsync(el, index, user.firstName);

            return ['firstName'];
          }
          case 'family-name': {
            fillInputAsync(el, index, user.lastName);

            return ['lastName'];
          }
          case 'tel': {
            fillInputAsync(el, index, user.phoneNumber);

            return ['phoneNumber'];
          }
          case 'street-address': {
            fillInputAsync(el, index, user.streetAddress);

            return ['streetAddress'];
          }

          case 'postal-code': {
            fillInputAsync(el, index, user.postalCode);

            return ['postalCode'];
          }

          case 'address-level2': {
            fillInputAsync(el, index, user.city);

            return ['city'];
          }
          default: {
            return [];
          }
        }
      })
      .filter(v => v && v.length > 0)
      .flat();

    const isSuccess = filled.length === Object.keys(user).length;

    if (isSuccess) {
      getButton().scrollIntoView(false);
    }

    return {
      isSuccess,
    };
  }

  function waitForCheckOut() {
    // wait a bit for re-rendering and wait for check-out
    setTimeout(() => {
      document.body.addEventListener('click', function wait() {
        getButton().removeEventListener('click', wait);
        postMessage('checkOutSuccess');
      });
    }, 3000);
  }

  try {
    const timer = setInterval(() => {
      if (!isCheckInFormReady()) {
        return;
      }

      clearInterval(timer);

      findProviderLogo();

      const result = fillCheckInForm();

      if (result.isSuccess) {
        // we'll wait for the user to submit the form to signal check-in
        getButton().addEventListener('click', function waitForCheckIn() {
          getButton().removeEventListener('click', waitForCheckIn);

          postMessage('checkInSuccess');

          waitForCheckOut();
        });
      } else {
        postMessage('checkInFailure');
      }
    }, 1000);
  } catch (error) {
    postMessage('checkInFailure', error.message);
  }
}

/**
 * helper method to parse messages coming from the webview
 */
export const parseProviderWebviewMessage = (ev: WebViewMessageEvent): ProviderFormMessage => {
  try {
    const {data} = ev.nativeEvent;
    return JSON.parse(data) as ProviderFormMessage;
  } catch (error) {
    console.warn('parse provider form message error', error.message);
    return {
      key: 'parseMessageError',
      value: error.message,
    };
  }
};

/**
 * Makes an immediately invoked function expression
 * that fills the provider's form with the user data from the app
 */
export const prepareFillFormInWebViewInject = (user: User) => {
  const values: InjectJSValues = {
    user,
  };

  const injectFnBody = fillFormInWebView.toString();
  const globalForSetup = 'window.__WFD_CHECK_IN_SETUP__';
  const serializedArguments = JSON.stringify(values);

  return `
    if (!${globalForSetup}) {
      ${globalForSetup} = true;

      (${injectFnBody})(${serializedArguments});
    }
  `;
};
