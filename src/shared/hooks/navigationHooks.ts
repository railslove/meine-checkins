import React from 'react';
import {NavigationContainerRef} from '@react-navigation/core';

export const navigationRef = React.createRef<NavigationContainerRef>();

type NavigateParams = Parameters<NavigationContainerRef['navigate']>;

const navigate = (name: string, params?: NavigateParams) => {
  navigationRef.current?.navigate(name, params);
};

type DispatchArgs = Parameters<NavigationContainerRef['dispatch']>;

const dispatch = (...args: DispatchArgs) => {
  navigationRef.current?.dispatch(...args);
};

export const useAppNavigation = () => {
  return {
    navigate,
    dispatch,
  };
};
