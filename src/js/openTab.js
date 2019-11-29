import {addTemplate} from "./renderingFunctions";

let activeTab = 1;

export const openTab = (i, results) => {
  let currentActiveTab = document.getElementById(`tab${activeTab}`);
  let newActiveTab = document.getElementById(`tab${i + 1}`);
  const templateParams = {
    src: results[i + 1][3],
    city: results[0][0],
    tab: results[i + 1][0],
    res: results[i + 1][1],
    unit: results[i + 1][2]
  };
  currentActiveTab.classList.remove('active-tab');
  newActiveTab.classList.add('active-tab');
  activeTab = i + 1;
  addTemplate(templateParams);
};