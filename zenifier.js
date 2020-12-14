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

browser.storage.local
  .get("pcshide")
  .then((items) => {
    if (items.pcshide) {
      const observer = new MutationObserver((mutationList, observer) => {
        for (const mutation of mutationList) {
          if (mutation.type === "childList") {
            setTimeout(() => {
              document.querySelector(".zen-button").click();
              observer.disconnect();
            }, 1000);
          }
        }
      });
      observer.observe(document.querySelector("#user_submissions_enclosure"), {
        childList: true,
      });
    }
  })
  .catch((e) => {
    console.error(e);
  });

let button = document.createElement("button");
button.classList.add("zen-button", "notzen");
button.innerHTML =
  hideSentences[Math.floor(Math.random() * hideSentences.length)];

button.addEventListener("click", () => {
  if (button.classList.contains("notzen")) {
    for (row of document.querySelectorAll("tr[role=row]")) {
      if (row.innerHTML.toUpperCase().includes("NOT ACCEPTED")) {
        //row.style = 'visibility: collapse'
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
        //row.style = 'visibility: visible'
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

// We get the data from the existing table
table = $("#user_submissions").DataTable().data().toArray();
// We look for the yar of the conference in the 4th column of every row
// This should be the Category colum.
table.forEach(function (row) {
  // This regex looks for four digits in a row, hopefully it should be a year.
  // Might cause problems if a conference is named '22 instead of 2022.
  const regex = /((\b\d{4}\b))/;
  const year = regex.exec(row[4])[0];
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

// We recreate the table
$("#user_submissions").DataTable({
  data: table,
  columns: columns,
  paging: false,
});
