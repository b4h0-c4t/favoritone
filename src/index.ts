import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const widget_html = document.querySelector('.ocean-portal-body-right');

if(widget_html) {
  ReactDOM.render(App(), widget_html);
} else {
  console.error('favoritone widget space is undefined.');
}