let toDoList = [];
const loadedToDoList = localStorage.getItem("toDoList");

function paintToDo(toDo) {
  const list = document.createElement("div");
  const input = document.createElement("input");
  const activeDiv = document.createElement("div");
  const retextButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  input.placeholder = toDo;
  retextButton.innerText = "수정";
  deleteButton.innerText = "삭제";

  activeDiv.appendChild(retextButton);
  activeDiv.appendChild(deleteButton);

  list.appendChild(input);
  list.appendChild(activeDiv);
  lists.appendChild(list);

  list.classList.add("list");
  retextButton.classList.add("retextButton");
  deleteButton.classList.add("deleteButton");

  input.disabled = true;
}

function saveToDo(toDo) {
  const toDoObj = {
    text: toDo,
  };
  toDoList.push(toDoObj);
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

function createToDo(event) {
  // event.preventDefault();
  const toDo = document.querySelector("form.toDoForm > input").value;
  // form 태그안 input 값
  console.log(toDo);
  paintToDo(toDo);
  saveToDo(toDo);
  document.querySelector("form.toDoForm > input").value = "";
}

function loadToDoList() {
  if (loadedToDoList.length !== 0) {
    const parsedToDoList = JSON.parse(loadedToDoList);
    for (let toDo of parsedToDoList) {
      const { text } = toDo;
      paintToDo(text);
      saveToDo(text);
    }

    // 텍스트 수정
    const a = document.querySelectorAll(".retextButton");
    const b = document.querySelectorAll(".list > input");

    // 텍스트 삭제
    const c = document.querySelectorAll(".deleteButton");

    for (let i = 0; i < a.length; i++) {
      // 수정
      a[i].addEventListener("click", () => {
        if (a[i].innerText === "수정") {
          a[i].innerText = "저장";
          b[i].disabled = false;
          b[i].focus();
        } else {
          a[i].innerText = "수정";
          b[i].disabled = true;
          parsedToDoList.splice(i, 1, { text: b[i].value });
          localStorage.setItem("toDoList", JSON.stringify(parsedToDoList));
          location.reload();
        }
      });

      // 삭제
      c[i].addEventListener("click", () => {
        parsedToDoList.splice(i, 1);
        localStorage.setItem("toDoList", JSON.stringify(parsedToDoList));
        location.reload();
      });
    }
  }
}

function init() {
  loadToDoList();
  document.querySelector(".toDoForm").addEventListener("submit", createToDo);
}

init();
