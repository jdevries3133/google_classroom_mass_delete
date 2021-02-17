/**
 * Script running in the context of the classroom tab with access
 * to the classroom dom
 */
import { deleteAssignment } from "./delete_assignment";
import { getMany } from "./xpath_utils";

const getTopicElements = () => {
  return getMany('//*[@id="c1"]/div/div/div[4]/ol/li/div[1]/div/a');
};

const getTopicNames = () => {
  return getTopicElements().map((i) => i.innerText);
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const topicNames = getTopicNames();
  sendResponse(topicNames);
  deleteAssignment();
});