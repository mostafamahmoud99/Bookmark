let siteName = document.getElementById("siteName");
let siteUrl = document.getElementById("siteUrl");
let requireInput=document.getElementById("requireInput");
let addBtn = document.getElementById("addBtn");
let inputs = document.getElementsByClassName("form-control");
let webContainer = [];
let currentIndex=0;

// localStorge
if (localStorage.getItem("websites") != null) {
  webContainer = JSON.parse(localStorage.getItem("websites"));
  display();
}

addBtn.addEventListener("click", add);
function add(){
  if (addBtn.innerHTML == "Submit") {
    addWebsite();
  } else {
    submitUbdate();
  }
}
function addWebsite() {
  if(validation()==true){
    let websites = {
      name: siteName.value,
      url: siteUrl.value,
    };
    webContainer.push(websites);
    localStorage.setItem("websites", JSON.stringify(webContainer));
    display();
    clearInputs();
  }
}

function clearInputs() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

function display() {
  let temp = ``;
  for (let i = 0; i < webContainer.length; i++) {
    temp += `<div class="d-flex justify-content-around bookmark-item text-center my-3">
    <div class=" text-center bookmark-name fw-bold fs-3">
        ${webContainer[i].name}
    </div>
    <div class=" text-center action">
        <button class="btn-sm btn btn-danger" onclick="deleteWebsite(${i})">Delete</button>
        <button class="btn-sm btn btn-warning" onclick="updateWebsite(${i})">Update</button>
        <a class="btn-sm btn btn-info" target="_blank" href='${webContainer[i].url.includes('https') ? webContainer[i].url : `https://${webContainer[i].url}`}'>Visit</a>
    </div>
</div>`;
  }
  document.getElementById("bookmarkList").innerHTML = temp;
}

function deleteWebsite(index) {
  webContainer.splice(index, 1);
  localStorage.setItem("websites", JSON.stringify(webContainer));
  display();
}
function updateWebsite(index) {
  currentIndex=index
  siteName.value = webContainer[index].name,
  siteUrl.value = webContainer[index].url;
  addBtn.innerHTML = "Update";
}

function submitUbdate() {
  webContainer[currentIndex].name=siteName.value,
  webContainer[currentIndex].url=siteUrl.value
  addBtn.innerHTML = "Submit";
  localStorage.setItem("websites", JSON.stringify(webContainer));
  display();
  clearInputs();
}


function validation(){
  if(siteName.value==""||siteUrl.value==""){
    requireInput.classList.replace("d-none","d-block");
    return false;
  }else{
    requireInput.classList.replace("d-block","d-none");
    return true;
  }
}



