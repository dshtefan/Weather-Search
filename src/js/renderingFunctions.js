import template from "../template.pug";
import {openTab} from "./openTab";
import {weatherDataDestructuring} from './weatherDataDestructuring'

const el = (elId) => document.getElementById(elId);
const errorMessage = (message) => document.getElementById('tabName').innerText = message;
const tabs = () => (document.getElementsByClassName('tab'));

export const addTemplate = (data = 'empty') => {
  if (data === 'empty')
    el('middleBlock').innerHTML = template({
      src: '',
      city: '',
      tab: '',
      res: '',
      unit: ''
    });
  else
    el('middleBlock').innerHTML = template(data);
};

export const displayIcon = (mode) => {
  if (mode === 'none') {
    el('weatherIcon').style.display = 'none';
    el('verticalLine').style.display = 'none';
  } else {
    el('weatherIcon').style.display = 'block';
    el('verticalLine').style.display = 'block';
  }
};

export const preparingData = (data) => {
  const cleanData = weatherDataDestructuring(data);
  //unlocking tabs
  Array.prototype.slice.call(tabs()).map((tab, i) => tab.onclick = () => openTab(i, cleanData));
  openTab(0, cleanData);
};

export const preparingErrorMessage = (message) => {
  //locking tabs
  Array.prototype.slice.call(tabs()).map((tab) => tab.onclick = () => {});
  addTemplate('empty');
  errorMessage(message);
  displayIcon('none');
};