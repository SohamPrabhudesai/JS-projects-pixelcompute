document.addEventListener("DOMContentLoaded", () => {
  const dialog = document.querySelector("dialog");
  const closeBtn = document.getElementById("closeDialog");
  const container = document.querySelector(".container");
  const invitationSection = document.querySelector("section");

  invitationSection.classList.add("hidden");
  container.classList.remove("hidden");
  closeBtn.addEventListener("click", () => {
    dialog.style.display = "none";
  });

  document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const date = document.querySelector("#date").value.trim();
    const start = document.querySelector("#start").value.trim();
    const end = document.querySelector("#end").value.trim();
    const location = document.querySelector("#location").value.trim();
    const desc = document.querySelector("#desc").value.trim();
    console.log(start);

    if (!name || !date || !start || !end || !location) {
      dialog.style.display = "flex";
    } else {
      invitationSection.classList.remove("hidden");
      container.classList.add("hidden");
      const formattedDate = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      document.getElementById("eventName").textContent = name;
      document.getElementById("eventDate").textContent = formattedDate;
      document.getElementById("eventTime").textContent = start + " - " + end;
      document.getElementById("eventLocation").textContent = location;
      document.getElementById("eventDesc").textContent = desc;
    }
  });
});
