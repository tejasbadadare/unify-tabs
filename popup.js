removeDuplicates();

function removeDuplicates () {

  var queryInfo = {windowId: chrome.windows.WINDOW_ID_CURRENT};
  chrome.tabs.query(queryInfo, function(tabs) {

    console.debug("Tabs array length: " + tabs.length);

    var dupIDs = [];     // List of tabId's of duplicates found
    var dupNames = [];   // List of tabId's of duplicates found
    var dupCount = [];


    // Cycle through all tabs and check for duplicates
    for (var i = 0; i < tabs.length; i++) {
      duplicateName = "";
      duplicateCount = 0;

      for (var j = 0; j < tabs.length; j++) {

        // Skip current tab when searching for duplicates
        console.debug("Looking at (j)" + j + "from (i) " + i);

        if (j == i) {
          console.debug("On current("+i+") Skipping.");
          continue;
        }

        // Check for undefined object (already deleted duplicate)
        if (!tabs[j] || !tabs[i]) {
          console.debug("On prev deleted ("+j+") Skipping.");
          continue;
        }

        if (tabs[i].url === tabs[j].url) {
          console.debug("Duplicate found, adding:" + j);
          console.debug("\t" + tabs[j].url);

          duplicateName = tabs[j].title;
          duplicateCount++;

          dupIDs.push(tabs[j].id);
          delete tabs[j];
        }
      }
      dupNames[i] = duplicateName;
      dupCount[i] = duplicateCount;
    }

    // Remove the tabs
    chrome.tabs.remove(dupIDs);

    printResults(dupNames, dupCount);

  });
}

// Print the results of the duplicate removal.
function printResults(dupNames, dupCount) {
  var out = "";
  for (var i = 0; i < dupNames.length; i++) {
    // Print singular result
    if (dupCount[i] == 1) {
      out += dupCount[i] + " duplicate of " + dupNames[i] + "\n";
    }
    // Print multiple results
    else if (dupCount[i] != 0) {
      out += dupCount[i] + " duplicates of " + dupNames[i] + "\n";
    }
  }

  if (out === "") {
    document.getElementById("title").innerHTML = "No duplicates found!";
  }

  document.getElementById("text").innerHTML = out;

}
