import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const right_widget_html = document.querySelector('.ocean-portal-body-right');

if(right_widget_html) {
  const widget_template_html = `
    <div class="ocean-portal-widget">
      <div class="ocean-portal-assigned">
        <div class="gaia-argoui-widget">
          <div class="gaia-argoui-widget-header gaia-argoui-widget-header-icon" style="background-image: url(&quot;https://static.cybozu.com/contents/k/image/argo/uiparts/widget/threads_56.png&quot;); background-position: left top; background-repeat: no-repeat;">
            <h3 class="gaia-argoui-widget-title">Favoritone</h3>
          </div>
          <div class="gaia-argoui-widget-body">
            <div>
              <div class="gaia-argoui-appscrollinglist">
                <ul id="favoritone" class="gaia-argoui-appscrollinglist-list">
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  right_widget_html.innerHTML = widget_template_html + right_widget_html.innerHTML;
  ReactDOM.render(<App />, document.querySelector('#favoritone'));
} else {
  console.error('favoritone widget space is undefined.');
}