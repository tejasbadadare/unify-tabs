console.log("hello");
removeDuplicates();

function removeDuplicates () {

  var queryInfo = {windowId: chrome.windows.WINDOW_ID_CURRENT};
  chrome.tabs.query(queryInfo, function(tabs) {

    console.log("Tabs array length: " + tabs.length);

    var skip = [];  // List of indices of duplicates found in tabs[]
    var dupIDs = [];     // List of tabId's of duplicates found

    // Cycle through all tabs and check for duplicates
    for (var i = 0; i < tabs.length; i++) {
      for (var j = 0; j < tabs.length; j++) {
        // Skip current tab when searching for duplicates

        // DEBUG
        console.log("Looking at " + j);

        if (j == i) {
          console.log("On current("+i+") Skipping.");
          skip.push(j);
          continue;
        }

        if (skip.includes(j)) {
          console.log("Duplicate/seen found, skipping:" + j);
          console.log("\t" + tabs[j].url);
          continue;
        }

        if (tabs[i].url === tabs[j].url) {
          console.log("New duplicate found, adding:" + j);
          console.log("\t" + tabs[j].url);
          skip.push(j);
          dupIDs.push(tabs[j].id);
        }
      }
    }

    console.log("DupID's: " + dupIDs);

    // Remove the tabs
    chrome.tabs.remove(dupIDs);

  });
afdasfda;
}
