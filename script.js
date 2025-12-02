let btnAdd = document.querySelector(".add-btn .add-label");
let main = document.querySelector(".container");
let inp = document.querySelector("input");
let lbl = document.querySelector("label");
let contain = document.createElement("div");
let newDiv = document.querySelector(".tasks-box");
let plus = document.querySelector(".add-icon");
let list = document.createElement("ul");
let xBtn = document.querySelector(".clear-btn");
let sort1 = document.querySelector(".sort-icon");

list.style.listStyleType = "none";
newDiv.appendChild(contain);
contain.appendChild(list);

let counter = 0;
let temp = true;

btnAdd.addEventListener("click", () => {
  counter++;
  contain.style.width = "286px";
  contain.style.minHeight = "43.5px";
  contain.style.borderRadius = "10px";
  contain.style.border = "1px solid #c4c4c4";
  contain.style.display = "none";
  contain.style.marginTop = "42px";
  contain.style.paddingTop = "10px";
  contain.style.paddingLeft = "30px";
  contain.style.marginLeft = "20px";

  lbl.style.display = "none";
  contain.style.display = "block";

  let newLi = document.createElement("li");
  let img = document.createElement("img");
  let span = document.createElement("span");

  span.classList.add("newSpan");
  span.dataset.id = counter;
  span.textContent = span.dataset.id + ". " + inp.value;

  inp.value = "";

  list.appendChild(newLi);
  newLi.appendChild(span);
  newLi.appendChild(img);

  img.src = "./Group 77 (7).svg";
  img.style.position = "absolute";
  img.style.right = "10px";
  img.style.bottom = "10px";
  img.style.cursor = "pointer";

  newLi.style.position = "relative";
  newLi.style.paddingBottom = "10px";

  img.addEventListener("click", () => {
    newLi.remove();
    if (list.children.length == 0) {
      lbl.style.display = "block";
      xBtn.style.display = "none";
      contain.style.display = "none";
    }
  });

  img.addEventListener("mouseenter", () => {
    img.src = "./Group 70 (6).svg";
  });

  img.addEventListener("mouseleave", () => {
    img.src = "./Group 77 (7).svg";
  });
});

plus.addEventListener("click", () => {
  lbl.style.display = "block";
  xBtn.style.display = "none";
});

sort1.addEventListener("click", () => {
  let lis = [...document.querySelectorAll("li")];

  let items = lis.map(li => {
    let span = li.querySelector("span");
    return {
      element: li,
      id: span.dataset.id,
      value: span.textContent.split(". ")[1]
    };
  });

  items.sort((a, b) => {
    let aNum = Number(a.value);
    let bNum = Number(b.value);

    if (!isNaN(aNum) && !isNaN(bNum)) {
      return temp ? aNum - bNum : bNum - aNum;
    } else {
      return temp
        ? a.value.localeCompare(b.value)
        : b.value.localeCompare(a.value);
    }
  });

  list.innerHTML = "";
  items.forEach(item => list.appendChild(item.element));

  let icon = document.querySelector(".sort-icon");

  icon.addEventListener("mouseenter", () => {
    icon.src = temp ? "./Group 73.svg" : "./Group 91 (2).svg";
  });

  icon.addEventListener("mouseleave", () => {
    icon.src = temp ? "./Group 74 (4).svg" : "./Group 90 (3).svg";
  });

  icon.src = temp ? "./Group 90 (3).svg" : "./Group 74 (4).svg";

  temp = !temp;
});
