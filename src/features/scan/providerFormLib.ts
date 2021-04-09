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

  type FillInputProps = {
    el: HTMLInputElement;
    user: User;
    index: number;
  };

  function fillInput(props: FillInputProps): (keyof User)[] {
    const {el, index, user} = props;

    const name = el.getAttribute('autocomplete') as AutoCompleteValues;
    const timeout = index * 100;

    switch (name) {
      case 'name': {
        setTimeout(() => {
          el.click();
          el.value = [user.firstName, user.lastName].join(' ');
        }, timeout);
        return ['firstName', 'lastName'];
      }
      case 'given-name': {
        setTimeout(() => {
          el.click();
          el.value = user.firstName;
        }, timeout);

        return ['firstName'];
      }
      case 'family-name': {
        setTimeout(() => {
          el.click();
          el.value = user.lastName;
        }, timeout);

        return ['lastName'];
      }
      case 'tel': {
        setTimeout(() => {
          el.click();
          el.value = user.phoneNumber;
        }, timeout);

        return ['phoneNumber'];
      }
      case 'street-address': {
        setTimeout(() => {
          el.click();
          el.value = user.address;
        }, timeout);

        return ['address'];
      }
      default: {
        return [];
      }
    }
  }

  function fillForm() {
    const inputs = Array.from(
      document.body.querySelectorAll<HTMLInputElement>('input[autocomplete]')
    );

    const filled = inputs
      .map((el, index) => fillInput({el, user, index}))
      .filter(v => v)
      .flat();

    return {
      success: filled.length === Object.keys(user).length,
    };
  }

  function sendCheckInMessage(wasSuccess: boolean) {
    if (wasSuccess) {
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
        const result = fillForm();
        hasCheckedIn = result.success;

        function waitForCheckIn() {
          sendCheckInMessage(hasCheckedIn);

          if (hasCheckedIn) {
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
