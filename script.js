const addTextBtn = document.querySelector(".add-btn .add-label");
const containerBox = document.querySelector(".container");
const inputEl = document.querySelector("input");
const labelBox = document.querySelector("label");
const tasksRoot = document.querySelector(".tasks-box");
const plusIcon = document.querySelector(".add-icon");
const clearInputIcon = document.querySelector(".clear-btn");
const sortBtn = document.querySelector(".sort-icon");


const tasksContainer = document.createElement("div");
const ul = document.createElement("ul");

tasksContainer.appendChild(ul);
tasksRoot.appendChild(tasksContainer);

ul.style.listStyle = "none";

let taskID = 0;
let sortAscending = true;


addTextBtn.addEventListener("click", function () {
  taskID++;

  Object.assign(tasksContainer.style, {
    width: "286px",
    minHeight: "43.5px",
    borderRadius: "10px",
    border: "1px solid #c4c4c4",
    marginTop: "42px",
    paddingTop: "10px",
    paddingLeft: "30px",
    marginLeft: "20px",
    display: "block"
  });

  labelBox.style.display = "none";
  const li = document.createElement("li");
  const deleteIcon = document.createElement("img");
  const text = document.createElement("span");

  text.dataset.id = taskID;
  text.textContent = `${taskID}. ${inputEl.value}`;
  text.classList.add("newSpan");

  inputEl.value = "";

  deleteIcon.src = "./Group 77 (7).svg";
  deleteIcon.style.cssText = `
    position:absolute;
    right:10px;
    bottom:10px;
    cursor:pointer;
  `;

  li.style.position = "relative";
  li.style.paddingBottom = "10px";

  li.append(text, deleteIcon);
  ul.appendChild(li);

  deleteIcon.addEventListener("click", () => {
    li.remove();

    if (ul.children.length === 0) {
      tasksContainer.style.display = "none";
      clearInputIcon.style.display = "none";
      labelBox.style.display = "block";
    }
  });

  deleteIcon.addEventListener("mouseenter", () => {
    deleteIcon.src = "./Group 70 (6).svg";
  });
  deleteIcon.addEventListener("mouseleave", () => {
    deleteIcon.src = "./Group 77 (7).svg";
  });
});


plusIcon.addEventListener("click", () => {
  labelBox.style.display = "block";
  clearInputIcon.style.display = "none";
});


sortBtn.addEventListener("click", () => {
  const allItems = [...ul.querySelectorAll("li")];

  const mapped = allItems.map(item => {
    const span = item.querySelector("span");
    return {
      node: item,
      id: span.dataset.id,
      content: span.textContent.split(". ")[1]
    };
  });

  mapped.sort((a, b) => {
    const na = Number(a.content);
    const nb = Number(b.content);

    if (!isNaN(na) && !isNaN(nb)) {
      return sortAscending ? na - nb : nb - na;
    }

    return sortAscending
      ? a.content.localeCompare(b.content)
      : b.content.localeCompare(a.content);
  });

  ul.innerHTML = "";
  mapped.forEach(obj => ul.appendChild(obj.node));

  sortBtn.src = sortAscending
    ? "./Group 90 (3).svg"
    : "./Group 74 (4).svg";

  sortBtn.onmouseenter = () => {
    sortBtn.src = sortAscending
      ? "./Group 73.svg"
      : "./Group 91 (2).svg";
  };

  sortBtn.onmouseleave = () => {
    sortBtn.src = sortAscending
      ? "./Group 74 (4).svg"
      : "./Group 90 (3).svg";
  };

  sortAscending = !sortAscending;
});
