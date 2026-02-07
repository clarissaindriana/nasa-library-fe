import React from 'react';

export const InputField = React.lazy(() => import('./InputField'));
export const SelectField = React.lazy(() => import('./SelectField'));
export const Button = React.lazy(() => import('./Button'));
export const ErrorMessage = React.lazy(() => import('./ErrorMessage'));
export const Loading = React.lazy(() => import('./LoadingSpinner'));

export { default as InputField } from './InputField';
export { default as SelectField } from './SelectField';
export { default as Button } from './Button';
export { default as ErrorMessage } from './ErrorMessage';
export { default as Loading } from './LoadingSpinner';
