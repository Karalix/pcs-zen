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

// columns: [
//     { title: "Status" },
//     { title: "Title" },
//     { title: "Office" },
//     { title: "Extn." },
//     { title: "Start date" },
//     { title: "Salary" }
// ]
table = $("#user_submissions").DataTable().data().toArray();
table.forEach(function (row) {
  const regex = /((\b\d{4}\b))/;
  const year = regex.exec(row[4])[0];
  row.push(year);
});

let columns = [];
theaders = $("#user_submissions").DataTable().columns().header();
for (let i = 0; i < theaders.length; i++) {
  //console.log(i, theaders[i].innerText);
  columns.push({ title: theaders[i].innerText });
}
columns.push({ title: "Year" });
console.log(columns);

$("#user_submissions_wrapper").remove();
let newtable = document.createElement("table");
newtable.setAttribute("id", "user_submissions");
newtable.setAttribute(
  "class",
  "dynamictable display compact None dataTable no-footer"
);
newtable.setAttribute("width", "100%");
$("#user_submissions_enclosure").append(newtable);
$("#user_submissions").DataTable({
  data: table,
  columns: columns,
  paging: false,
});

document.querySelector("body").append(button);
