import template from "./template.pug";
const body = `<div id="middleBlock">${template({src: '', city: '', tab: '', res: '', unit: ''})}</div><div id="tab1" class="tab active-tab"></div><div id="tab2" class="tab"></div>`;

Object.defineProperty(document, 'currentScript', {
  value: document.createElement('script'),
});
document.body.innerHTML = body;

export { body };