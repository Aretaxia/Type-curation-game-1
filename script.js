const startBtn = document.getElementById("startBtn");
const game = document.getElementById("game");
const cardsContainer = document.getElementById("cardsContainer");
const categories = document.querySelectorAll(".category");
const feedback = document.getElementById("feedback");
const specimens = document.getElementById("specimens");

const fonts = [
  { text: "Times New Roman", family: "Serif", style: "serif" },
  { text: "Arial", family: "Sans Serif", style: "sans-serif" },
  { text: "Roboto Slab", family: "Slab Serif", style: "serif" },
  { text: "Pacifico", family: "Script", style: "cursive" },
];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

startBtn.addEventListener("click", () => {
  startBtn.classList.add("hidden");
  game.classList.remove("hidden");
  feedback.classList.remove("hidden");
  renderCards();
  renderSpecimens();
});

function renderCards() {
  cardsContainer.innerHTML = "";
  shuffle(fonts).forEach((font) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = font.text;
    card.style.fontFamily = font.style;
    card.draggable = true;

    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", font.family);
      e.dataTransfer.setData("text/name", font.text);
    });

    cardsContainer.appendChild(card);
  });
}

categories.forEach((cat) => {
  cat.addEventListener("dragover", (e) => e.preventDefault());

  cat.addEventListener("drop", (e) => {
    e.preventDefault();
    const expected = cat.dataset.family;
    const actual = e.dataTransfer.getData("text/plain");
    const name = e.dataTransfer.getData("text/name");

    if (expected === actual) {
      cat.classList.add("correct");
      feedback.textContent = `✅ ${name} belongs to ${expected}.`;
    } else {
      cat.classList.add("incorrect");
      feedback.textContent = `❌ ${name} is not ${expected}.`;
    }

    setTimeout(() => {
      cat.classList.remove("correct", "incorrect");
    }, 1200);
  });
});

function renderSpecimens() {
  specimens.innerHTML = "";
  fonts.forEach((font) => {
    const box = document.createElement("div");
    box.classList.add("specimen");
    box.innerHTML = `<div style="font-family:${font.style}; font-size:18px;">
      ${font.text}
    </div><small>${font.family}</small>`;
    specimens.appendChild(box);
  });
}
