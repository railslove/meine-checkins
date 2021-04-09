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
  hasCheckedIn: boolean;
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
  const {user, messages, hasCheckedIn} = values;

  function postMessage(value: string) {
    window.ReactNativeWebView.postMessage(value);
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
      el.setRangeText(value);
      el.dispatchEvent(new Event('input', {bubbles: true}));
    }, index * 100);
  }

  function fillForm() {
    const inputs = Array.from(
      document.body.querySelectorAll<HTMLInputElement>('input[autocomplete]')
    );

    const filled = inputs
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
      getButton().addEventListener('click', function wait() {
        getButton().removeEventListener('click', wait);
        postMessage(messages.checkOutSuccess);
      });
    }, 1000);
  }

  try {
    if (hasCheckedIn) {
      waitForCheckOut();
      return;
    }

    setTimeout(() => {
      const result = fillForm();

      if (result.isSuccess) {
        // we'll wait for the user to submit the form to signal check-in
        getButton().addEventListener('click', function waitForCheckIn() {
          getButton().removeEventListener('click', waitForCheckIn);

          postMessage(messages.checkInSuccess);

          waitForCheckOut();
        });
      } else {
        postMessage(messages.checkInFailure);
      }
    }, 1000);
  } catch (error) {
    // @ts-ignore
    postMessage(messages.checkInFailure);
  }
}

/**
 * Makes an immediately invoked function expression
 * that fills the provider's form with the user data from the app
 */
export const prepareFillFormInWebViewInject = (user: User, hasCheckedIn: boolean) => {
  const values: InjectJSValues = {
    user,
    messages: PROVIDER_SITE_MESSAGE,
    hasCheckedIn,
  };

  const injectFnBody = fillFormInWebView.toString();
  const serializedArguments = JSON.stringify(values);

  return `(${injectFnBody})(${serializedArguments});`;
};
