let hideSentences = [
  "🌟 Instant & Free academic success 🌟",
  "🏆 Boost my h-index 🏆",
  "✨ Beautify this page ✨",
];
let showSentences = [
  "😩 Let's feel miserable 😩",
  "⛔️ Do not click this ⛔️",
  "💥 I like it when it hurts 💥",
];
let calledOnce = false;


function addYearCol () {
  // We get the data from the existing table
  table = $("#user_submissions").DataTable().data().toArray();
  // We look for the yar of the conference in the 4th column of every row
  // This should be the Category colum.
  table.forEach(function (row) {
    // This regex looks for four digits in a row, hopefully it should be a year.
    // Might cause problems if a conference is named '22 instead of 2022.
    const regex = /.*\b(\d{4})\b.*/;
    const year = regex.exec(row[4])[1];
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
          browser.storage.local
            .get('pcshide')
            .then((items) => {
              if (items.pcshide) {
                document.querySelector(".zen-button").click();
              }
            });
          addYearCol();
        }, 1000);
      }  
    }
  }
});
observer.observe(document.querySelector("#user_submissions_enclosure"), {
  childList: true,
});


let button = document.createElement("button");
button.classList.add("zen-button", "notzen");
button.innerHTML =
  hideSentences[Math.floor(Math.random() * hideSentences.length)];

button.addEventListener("click", () => {
  if (button.classList.contains("notzen")) {
    for (row of document.querySelectorAll("tr[role=row]")) {
      if (row.innerHTML.toUpperCase().includes("NOT ACCEPTED")) {
        row.classList.add("hidden");
      }
    }

    button.innerHTML =
      showSentences[Math.floor(Math.random() * showSentences.length)];

    button.classList.toggle("notzen");
    browser.storage.local.set({ pcshide: true });
  } else {
    for (row of document.querySelectorAll("tr[role=row]")) {
      if (row.innerHTML.toUpperCase().includes("NOT ACCEPTED")) {
        row.classList.remove("hidden");
      }
    }

    button.innerHTML =
      hideSentences[Math.floor(Math.random() * hideSentences.length)];

    button.classList.toggle("notzen");
    browser.storage.local.set({ pcshide: false });
  }
});

document.querySelector("body").append(button);