if(browser) {
  const scripts = browser.runtime.getManifest().web_accessible_resources;

  const scriptDom = document.createElement('script');
  scriptDom.setAttribute('src', browser.extension.getURL(scripts[0]));
  document.documentElement.appendChild(scriptDom);
} else {
  console.error('[favoritone] Error: This browser is not supported');
}
