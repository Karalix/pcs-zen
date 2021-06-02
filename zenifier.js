let hideSentences = [
  "🌟 Instant & Free academic success 🌟",
  "🏆 Hide my failures 🏆",
  "✨ Make this page succesful ✨",
];
let showSentences = [
  "😩 Face the truth 😩",
  "⛔️ Stop hiding your mistakes ⛔️",
  "💥 Stop lying to yourself 💥",
];
let calledOnce = false;


// Check if we are on Firefox, otherwise we assume Chrome
let firefox = typeof(browser) != 'undefined'

function addYearCol () {
  // We get the data from the existing table
  table = $("#user_submissions").DataTable().data().toArray();
  datatable = $("#user_submissions").DataTable();
  catIndex = 0
  //Let's find the "Category column"
  for(let i = 0 ; i < datatable.columns().header().length ; i++) {
    if(datatable.columns().header()[i].innerText === 'Category') {
      catIndex = i
      break
    }
  }
  // "Category" columns (intially the 5th)
  let catcol = datatable.columns()[0][catIndex]
  table.forEach(function (row) {
    // This regex looks for four digits in a row, hopefully it should be a year.
    // Might cause problems if a conference is named '22 instead of 2022.
    const regex = /.*\b(\d{4})\b.*/;
    const year = regex.exec(row[catcol])[1];
    // we add the year to each row of submission
    row.push(year);
  });

  // We need the list of column titles / header names
  // to recreate the table later.
  let columns = [];
  theaders = $("#user_submissions").DataTable().columns().header();
  for (let i = 0; i < theaders.length; i++) {
    columns.push({ title: theaders[i].innerText });
  }
  // We add a new column to the list : "Year"
  columns.push({ title: "Year" });

  // We destroy the table
  $("#user_submissions_wrapper").remove();

  // We create a new table element
  let newtable = document.createElement("table");
  newtable.setAttribute("id", "user_submissions");
  newtable.setAttribute(
    "class",
    "dynamictable display compact None dataTable no-footer"
  );
  newtable.setAttribute("width", "100%");

  // We add the new table back to the parent div
  $("#user_submissions_enclosure").append(newtable);
  $("#user_submissions_enclosure").attr('style', $("#user_submissions_enclosure").attr('style') + 'margin-top: 2.5em;' )
  
  // We recreate the table
  $("#user_submissions").DataTable({
    data: table,
    columns: columns,
    paging: false,
  });
}

// Observe filling of the submission table
const observer = new MutationObserver((mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      
      observer.disconnect();
      // Once filling detected, wait 1 second for the DOM to update 
      if (!calledOnce) {
        calledOnce = true
        setTimeout(() => {
          // Check if elements were hidden
          if (firefox) {
            browser.storage.local
              .get('pcshide')
              .then((items) => {
                if (items.pcshide) {
                  document.querySelector(".zen-button").click();
                }
              });
          } else {
            chrome.storage.sync
              .get(['pcshide'], (result) => {
                if(result.pcshide) {
                  document.querySelector(".zen-button").click();
                }
              })
          }
          addYearCol();
        }, 1000);
      }  
    }
  }
});
observer.observe(document.querySelector("#user_submissions_enclosure"), {
  childList: true,
});


function toggleFails(button) {
  if (button.classList.contains("notzen")) {
    for (row of document.querySelectorAll("tbody tr[role=row]")) {
      if (row.innerHTML.toUpperCase().includes("NOT ACCEPTED")) {
        row.classList.add("hidden");
      }
    }
  } else {
    for (row of document.querySelectorAll("tbody tr[role=row]")) {
      if (row.innerHTML.toUpperCase().includes("NOT ACCEPTED")) {
        row.classList.remove("hidden");
      }
    } }
}

function toggleSuccess(button) {
  if (button.classList.contains("notzen")) {
    for (row of document.querySelectorAll("tbody tr[role=row]")) {
      if (!row.innerHTML.toUpperCase().includes("NOT ACCEPTED")) {
        row.classList.add("hidden");
      }
    }
  } else {
    for (row of document.querySelectorAll("tbody tr[role=row]")) {
      if (!row.innerHTML.toUpperCase().includes("NOT ACCEPTED")) {
        row.classList.remove("hidden");
      }
    } }
}


function toggleComplete(button) {
  if (button.classList.contains("notzen")) {
    for (row of document.querySelectorAll("tbody tr[role=row]")) {
      if (!row.innerHTML.toUpperCase().includes("CLASS=\"INCOMPLETE\"")) {
        row.classList.add("hidden");
      }
    }
  } else {
    for (row of document.querySelectorAll("tbody tr[role=row]")) {
      if (!row.innerHTML.toUpperCase().includes("CLASS=\"INCOMPLETE\"")) {
        row.classList.remove("hidden");
      }
    } }
}

let button = document.createElement("button");
button.classList.add("zen-button", "notzen");
button.innerHTML =
  hideSentences[Math.floor(Math.random() * hideSentences.length)];

button.addEventListener("click", () => {
  toggleFails(button)
  if (button.classList.contains("notzen")) {
    button.innerHTML =
      showSentences[Math.floor(Math.random() * showSentences.length)];
      
    if (firefox) {
      browser.storage.local.set({ pcshide: true });
    } else {
      chrome.storage.sync.set({ pcshide: true});
    }
  } else {
    button.innerHTML =
      hideSentences[Math.floor(Math.random() * hideSentences.length)];
    
    if (firefox) {
      browser.storage.local.set({ pcshide: false });
    } else {
      chrome.storage.sync.set({ pcshide: false});
    } 
  }
  
  button.classList.toggle("notzen");
});

document.querySelector("body").append(button);

// Hide Successes variant
let buttonsuccess = document.createElement("button");
buttonsuccess.classList.add("zen-button-success", "notzen");
buttonsuccess.innerHTML = "I just want to see rejects"

  buttonsuccess.addEventListener("click", () => {
  toggleSuccess(buttonsuccess)
  if (buttonsuccess.classList.contains("notzen")) {
    buttonsuccess.innerHTML = "Let me see success again"
      
    if (firefox) {
      browser.storage.local.set({ pcshide: true });
    } else {
      chrome.storage.sync.set({ pcshide: true});
    }
  } else {
    buttonsuccess.innerHTML = "I just want to see rejects"
    
    if (firefox) {
      browser.storage.local.set({ pcshide: false });
    } else {
      chrome.storage.sync.set({ pcshide: false});
    } 
  }
  
  buttonsuccess.classList.toggle("notzen");
});

document.querySelector("body").append(buttonsuccess);


// Hide Incompletes variant
let buttonincomplete = document.createElement("button");
buttonincomplete.classList.add("zen-button-incomplete", "notzen");
buttonincomplete.innerHTML = "Show me work in progress only"

buttonincomplete.addEventListener("click", () => {
  toggleComplete(buttonincomplete)
  if (buttonincomplete.classList.contains("notzen")) {
    buttonincomplete.innerHTML = "Show all"
  } else {
    buttonincomplete.innerHTML = "Show me work in progress only"
  }
  
  buttonincomplete.classList.toggle("notzen");
});

document.querySelector("body").append(buttonincomplete);