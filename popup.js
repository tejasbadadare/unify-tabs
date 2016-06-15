console.log("hello");
removeDuplicates();

function removeDuplicates () {

  var queryInfo = {windowId: chrome.windows.WINDOW_ID_CURRENT};
  chrome.tabs.query(queryInfo, function(tabs) {

    console.log("Tabs array length: " + tabs.length);

    var dupIDs = [];     // List of tabId's of duplicates found

    // Cycle through all tabs and check for duplicates
    for (var i = 0; i < tabs.length; i++) {
      for (var j = 0; j < tabs.length; j++) {
        // Skip current tab when searching for duplicates

        console.log("Looking at (j)" + j + "from (i) " + i);

        if (j == i) {
          console.log("On current("+i+") Skipping.");
          continue;
        }

        // Check for undefined object (already deleted duplicate)
        if (!tabs[j] || !tabs[i]) {
          console.log("On prev deleted ("+j+") Skipping.");
          continue;
        }

        if (tabs[i].url === tabs[j].url) {
          console.log("Duplicate found, adding:" + j);
          console.log("\t" + tabs[j].url);
          dupIDs.push(tabs[j].id);
          delete tabs[j];
        }
      }
    }

    console.log("DupID's: " + dupIDs);

    // Remove the tabs
    chrome.tabs.remove(dupIDs);

  });
}
