document.addEventListener("DOMContentLoaded", function() {
  var activateButton = document.getElementById("activate");
  activateButton.addEventListener("click", function() {
    console.log("Removing duplicates");
    removeDuplicates();
  });
}

function removeDuplicates () {

  var queryInfo = {windowId: chrome.windows.WINDOW_ID_CURRENT};
  chrome.tabs.query(queryInfo, function(tabs) {

    var duplicate = [];  // List of indices of duplicates found in tabs[]
    var dupIDs = [];     // List of tabId's of duplicates found

    // Cycle through all tabs and check for duplicates
    for (var i = 0; i < tabs.length; i++) {
      for (var j = 0; j < tabs.length; j++) {
          // Skip current tab when searching for duplicates

          console.log(j);

          if (j == i || duplicates.contains(j)) {
            continue;
          }

          if (tabs[i].url === tabs[j].url) {
            duplicates.push(j);
            dupIDs.push(tabs[j].id);
          }
      }
    }

    // Remove the tabs
    chrome.tabs.remove(dupIDs);


  });

}
