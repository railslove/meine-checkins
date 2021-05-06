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
  __DEV__: boolean;
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
 * - body is already transformed to JS when is run (you can test this by using console.log)
 **/

export function fillFormInWebView(values: InjectJSValues) {
  const {user, __DEV__} = values;
  const state = {hasFilledInputs: isCheckOut(), hasCheckOut: false};

  if (__DEV__) {
    postMessage('start', JSON.stringify(state));
  }

  function postMessage(key: MessageKey, value?: string) {
    const message = JSON.stringify({key, value});
    window.ReactNativeWebView.postMessage(message);
  }

  function findProviderLogo() {
    const link = document.querySelector<HTMLLinkElement>('link[type*=image][rel*=icon]');

    if (link && link.href) {
      postMessage('setProviderLogo', link.href);
    }
  }

  function getButton() {
    const el = document.body.querySelector<HTMLButtonElement>(
      '[type=submit], [data-wfd-action="check-in"], [data-wfd-action="check-out"]'
    );

    if (el) {
      return el;
    }

    const elements = document.body.querySelectorAll<HTMLButtonElement>('a, input, button');

    return Array.from(elements).find(
      el => el.type === 'submit' || /check[-\s]*(in|out)/i.test(el.outerHTML)
    );
  }

  function isElementVisible(el: HTMLElement = document.createElement('div')) {
    // taken from jquery source code
    // https://github.com/jquery/jquery/blob/a684e6ba836f7c553968d7d026ed7941e1a612d8/src/css/hiddenVisibleSelectors.js#L9
    return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  }

  function fillInputAsync(el: HTMLInputElement, index: number, value: string) {
    el.focus();

    setTimeout(() => {
      el.setRangeText(value, 0, value.length);
      el.dispatchEvent(new Event('input', {bubbles: true}));
    }, index * 100);
  }

  function getCheckInInputs() {
    const el = document.body.querySelectorAll<HTMLInputElement>('input[autocomplete]');
    return Array.from(el).filter(isElementVisible);
  }

  function canCheckIn() {
    return getCheckInInputs().length > 0 && getButton() != null;
  }

  function isCheckOut(el = getButton()) {
    return /check[-\s]*out/i.test(el?.outerHTML || '');
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
      state.hasFilledInputs = true;
      getButton()?.scrollIntoView(false);
    }

    return {
      isSuccess,
    };
  }

  function waitForCheckout() {
    if (!state.hasCheckOut) {
      postMessage('checkOutSuccess');
    } else {
      state.hasCheckOut = true;
    }
  }

  try {
    document.body.addEventListener('mousedown', (ev: any) => {
      const el = ev.target?.closest('a, div, button, input');

      if (isCheckOut(el)) {
        setTimeout(waitForCheckout, 500);
        window.addEventListener('unload', waitForCheckout);
      }
    });

    const checkInterval = setInterval(() => {
      if (__DEV__) {
        postMessage('check', JSON.stringify(state));
      }

      if (!state.hasFilledInputs && canCheckIn()) {
        fillCheckInForm();
        findProviderLogo();
      } else if (isCheckOut()) {
        postMessage('checkInSuccess');
        clearInterval(checkInterval);
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
export const prepareFillFormInWebViewInject = (values: InjectJSValues) => {
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
