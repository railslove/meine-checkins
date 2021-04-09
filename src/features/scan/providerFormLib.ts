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
 * Used inside of the WebView for filling forms and signaling status to the app
 *
 * We can use TypeScript because:
 *
 * - Function.prototype.toString contains the function body
 * - the body is already transformed to JS when is run on the device (you can test this by login it)
 **/

export function fillCheckInProviderForm(values: InjectJSValues) {
  const {user, messages} = values;

  function postMessage(value: string) {
    window.ReactNativeWebView.postMessage(value);
  }

  function getButton() {
    return (
      document.body.querySelector<HTMLButtonElement>('button[type=submit]') ||
      document.createElement('button')
    );
  }

  function fillForm() {
    const inputs = Array.from(
      document.body.querySelectorAll<HTMLInputElement>('input[autocomplete]')
    );

    const filled = inputs
      .map((el, index) => {
        const name = el.getAttribute('autocomplete') as AutoCompleteValues;

        const fillAsync = (value: string) =>
          setTimeout(() => {
            el.setRangeText(value);
            el.dispatchEvent(new Event('input', {bubbles: true}));
          }, index * 100);

        switch (name) {
          case 'name': {
            fillAsync([user.firstName, user.lastName].join(' '));
            return ['firstName', 'lastName'];
          }
          case 'given-name': {
            fillAsync(user.firstName);

            return ['firstName'];
          }
          case 'family-name': {
            fillAsync(user.lastName);

            return ['lastName'];
          }
          case 'tel': {
            fillAsync(user.phoneNumber);

            return ['phoneNumber'];
          }
          case 'street-address': {
            fillAsync(user.streetAddress);

            return ['streetAddress'];
          }

          case 'postal-code': {
            fillAsync(user.postalCode);

            return ['postalCode'];
          }

          case 'address-level2': {
            fillAsync(user.city);

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

  function waitForCheckout() {
    getButton().removeEventListener('click', waitForCheckout);

    postMessage(messages.checkOutSuccess);
  }

  try {
    setTimeout(() => {
      const result = fillForm();

      if (result.isSuccess) {
        postMessage(messages.checkInSuccess);
        getButton().addEventListener('click', waitForCheckout);
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
 * with the arguments we have from the app
 */
export const prepareFillCheckInProviderFormForInject = (user: User) => {
  const values: InjectJSValues = {
    user,
    messages: PROVIDER_SITE_MESSAGE,
  };

  const injectFnBody = fillCheckInProviderForm.toString();
  const serializedArguments = JSON.stringify(values);

  return `(${injectFnBody})(${serializedArguments});`;
};
