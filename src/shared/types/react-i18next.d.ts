import {resources} from 'src/shared/i18n';
declare module 'react-i18next' {
  type DefaultResources = typeof resources['de'];
  interface Resources extends DefaultResources {}
}
