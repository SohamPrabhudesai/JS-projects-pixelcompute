document.addEventListener("DOMContentLoaded", () => {
  const newNoteText = document.getElementById("newNote");
  const addNoteBtn = document.getElementById("addNote");
  const notesBox = document.getElementById("notes");
  let bgColor = "#d1e1ff";
  addNoteBtn.addEventListener("click", () => {
    const noteText = newNoteText.value.trim();
    console.log(noteText);
    if (noteText !== "") {
      const noteElement = document.createElement("div");
      noteElement.classList.add("note");
      noteElement.style.backgroundColor = bgColor;
      
      const closeButton = document.createElement("span");
      closeButton.classList.add("noteCloseBtn");
      closeButton.innerHTML = "<span>x</span>";
      closeButton.addEventListener("click", () => {
        notesBox.removeChild(noteElement);
      });
      
      const noteContent = document.createElement("p");
      noteContent.textContent = noteText;
      
      noteElement.appendChild(closeButton);
      noteElement.appendChild(noteContent);
      notesBox.appendChild(noteElement);
      
      if (bgColor === "#d1e1ff") bgColor = "#fefffe";
      else bgColor = "#d1e1ff";
      newNoteText.value = "";
    }
  });
});
