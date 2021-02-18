/**
 * Script running in the context of the classroom tab with access
 * to the classroom dom
 */
import { deleteTopics } from "./delete_assignment";
import { getMany } from "./xpath_utils";

const getTopicElements = () => {
  return getMany('//*[@id="c1"]/div/div/div[4]/ol/li/div[1]/div/a');
};

const getTopicNames = () => {
  return getTopicElements().map((i) => i.innerText);
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case "getTopics":
      if (window.location.hostname !== "classroom.google.com") {
        sendResponse("wrongSite");
      } else if (window.location.pathname[1] !== "w") {
        sendResponse("wrongPage");
      } else {
        const topicNames = getTopicNames();
        sendResponse(topicNames);
      }
      break;

    case "deleteTopics":
      console.log(request.payload);
      deleteTopics(request.payload);
      sendResponse();
      break;

    default:
      console.warn(`Unknown message type from popup: ${request.type}`);
  }
});
