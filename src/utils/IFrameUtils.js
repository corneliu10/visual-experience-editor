import { Change } from "../model/Change";

function loadExperienceInIFrame(experience, iframe) {
  if (!experience) {
    return;
  }
  setTimeout(() => {
    const { _metadata, _changes_list } = experience;
    for(let i = 0; i < _changes_list.length; ++i) {
      sendChangeToIFrame(_changes_list[i], iframe);
    }
  }, 1000);
  
  /*_changes_list.forEach(change => {
    sendChangeToIFrame(change, iframe);
  });*/
}

function sendChangeToIFrame(change, iframe) {
  iframe.contentWindow.postMessage({ change }, "*");
}

function editElementInIFrame(path, attributes, iframe) {
  var change = new Change(Change.CHANGE_TYPES.EDIT, path, { attributes });
  sendChangeToIFrame(change, iframe);
}

function removeElementInIFrame(path, attributes, iframe) {
  var change = new Change(Change.CHANGE_TYPES.REMOVE, path, attributes);
  sendChangeToIFrame(change, iframe);
}

function addElementInIFrame(path, innerHTML, iframe) {
  var change = new Change(Change.CHANGE_TYPES.ADD, path, { innerHTML });
  sendChangeToIFrame(change, iframe);
}

export {
  loadExperienceInIFrame,
  sendChangeToIFrame,
  editElementInIFrame,
  removeElementInIFrame,
  addElementInIFrame
};
