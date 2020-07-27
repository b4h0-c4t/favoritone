const scripts = browser.runtime.getManifest().web_accessible_resources;
/*
const next = () => {
  const script = scripts.shift();
  if (!script) {
    return;
  }
  const f = script.split('.');
  if(f[f.length-1].toLowerCase() === "js"){
    const s = document.createElement("script");
    s.setAttribute("src", browser.extension.getURL(script));
    s.addEventListener("load", next);
    document.documentElement.appendChild(s);
  }else{
    next();
  }
};

const scriptDom = document.createElement('script');
scriptDom.addEventListener("load", next);
document.documentElement.appendChild(scriptDom);
*/
const scriptDom = document.createElement('script');
scriptDom.setAttribute('src', browser.extension.getURL(scripts[0]));
document.documentElement.appendChild(scriptDom);
