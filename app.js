let data = [];

function addData(iValue, urlInput) {
  let newID = Math.floor(Math.random() * 1000) + 1;
  data.push({
    title: iValue,
    url: urlInput,
    id: newID,
  });
  updateStorage();
  emptyUI();
  addBookmarkUI(newID, iValue, urlInput);
}

function deleteHandler(target, id) {
  let position = data.findIndex((e) => {
    return e.id == id;
  });
  data.splice(position, 1);
  updateStorage();
  document
    .querySelector(".allLinks")
    .removeChild(target.closest(".singleLink"));
  emptyUI();
}

function addBookmarkUI(id, name, url) {
  let div = document.createElement("div");
  div.innerHTML = `
  <div id="linkText">${name}</div>
  <div>
      <a target="_blank" href="${url}" class="btn visitBtn">Visit</a>
      <button class="btn delteBtn" id=${id}>Delete</button>
  </div>
  `;
  div.classList.add("singleLink");
  div.querySelector(".delteBtn").addEventListener("click", (e) => {
    deleteHandler(e.target, id);
  });
  document.querySelector(".allLinks").appendChild(div);
}

function inputHandler() {
  let iValue = document.getElementById("bookmarkInput").value.trim();
  let urlInput = document.getElementById("urlInput").value.trim();
  if (iValue == "" || urlInput == "") {
    alert("All field Neccessary");
  } else {
    addData(iValue, urlInput);
  }
}

function updateStorage() {
  localStorage.setItem("data", JSON.stringify(data));
}
function emptyUI() {
  if (data.length == 0) {
    $(".allLinks h2").css("display", "block");
  } else {
    $(".allLinks h2").css("display", "none");
  }
}
$(document).ready(function () {
  let r = localStorage.getItem("data");
  console.log(r);
  if (r != null) {
    data = JSON.parse(r);
    console.log(data);
    data.forEach((e) => {
      addBookmarkUI(e.id, e.title, e.url);
    });
  }

  $("#bform").submit(function (e) {
    e.preventDefault();
    inputHandler();
  });
  emptyUI();
});
