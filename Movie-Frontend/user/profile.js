const url = 'https://kinoticket.herokuapp.com';
const token = localStorage.getItem("jwt");
let body = document.querySelector("body");
let status = 0;
fetch(`${url}/user/show_user`,{
    method : "POST",
    headers : {
        authorization: token
    }
}).then((res) => {
    if(res.status!=200)
    location.href = '../index.html'
    else{
        let signin = document.getElementById("signin_link");
        let hamburger_signin = document.getElementById("hamburger_signin");
        let user_logo = document.getElementById("user_logo");
        let hamburger_after_login = document.getElementById("hamburger_after_login");
        signin.style.display = "none";
        hamburger_signin.style.display = "none";
        user_logo.style.display = "block";
        hamburger_after_login.style.display = "block"
    }
    return res.json()
}).then((data) => {
console.log(data)

let container = document.createElement("div");
container.classList.add("container")
container.innerHTML = `
<div class="user_logo">
<img src="../assets/user_logo.png" alt="">
</div>
<div class="details">
<div class="row">
    <div class="category">Name :</div>
    <div class="value">${data[0].name}</div>
</div>
<div class="row">
    <div class="category">Email :</div>
    <div class="value">${data[0].email}</div>
</div>
<div class="row">
    <div class="category">Contact :</div>
    <div class="value">${data[0].contact}</div>
</div>

</div>
<div class="change_password">
<div class = "warning">
</div>
<div class="heading">
    <h1>Reset Password</h1>
</div>
<div class="password_row">
  <div class="password_category">Old Password :</div>
  <input type="password" class="password_value" id = "old_password">
</div>
<div class="password_row">
  <div class="password_category">New Password :</div>
  <input type="password" class="password_value" id = "new_password">
</div>
<div class="submit">
  <button>Reset</button>
</div>
</div>`;

body.appendChild(container);

}).then(() => {
let old_password = document.getElementById("old_password");
let new_password = document.getElementById("new_password");
let reset_button = document.querySelector(".submit button");
let warning = document.querySelector(".warning");
let old_password_value = "";
let new_password_value = "";

old_password.addEventListener("change",(event) => {
    old_password_value = event.target.value;
});
     
new_password.addEventListener("change",(event) => {
    new_password_value = event.target.value;
});

reset_button.addEventListener("click",() => {
warning.style.display = "none";
old_password.classList.remove("no_entry")
new_password.classList.remove("no_entry")
 if(old_password_value == "")
 {
     warning.innerHTML = `<h1>Enter Old Password</h1>`;
     warning.style.display = "block";
     old_password.classList.add("no_entry")
     return;
 }
 if(new_password_value == "")
 {
     warning.innerHTML = `<h1>Enter New Password</h1>`;
     warning.style.display = "block";
     new_password.classList.add("no_entry")
     return;
 }
 obj = {
    oldPass : old_password_value,
    newPass : new_password_value
}
fetch(`${url}/auth/changePassword`,{
   method : "POST",
   body: JSON.stringify(obj),
   headers : {
        authorization: token,
        "Content-Type" : "application/json"
   }
}).then((res) => {
//    status = res.status;
   return res.json();
}).then((data) => {
    console.log(data)
         warning.innerHTML = `<h1>${data.message}</h1>`;
         warning.style.display = "block";
})
})
})

// ----------------------------------------- navbar 2 ------------------------------------------------
{
    let i=0,j=0;
    let search = document.querySelector(".search").children[0];
    let str = ["Cruella...","Wrath of Man...","Army of The Dead..."]
    setInterval(() => {
        search.placeholder = str[j].slice(0,i);
        i=(i+1)%(str[j].length+1);
        if(i==0)
        j= (j+1)%str.length;
    }, 200);
    }
    // ---------------------------------------- navbar 2 end ----------------------------------------------

// ----------------------------------------- navbar 3 ---------------------------------------------------
function logout_user()
{
    localStorage.removeItem("jwt");
    location.reload();
}
// ---------------------------------------- navbar 3 end ------------------------------------------------

// --------------------------------------------- navbar 4 -----------------------------------------------
const searchbutton=document.querySelector(".fa");
searchbutton.addEventListener("click",()=>{
      var value=document.querySelector(".search input").value.toLowerCase();
      let search=document.querySelector(".search input");
    if(value===""){
        search.style.borderColor="red";
}
else{
fetch(`https://api.themoviedb.org/3/list/7100885?api_key=65bdc6e47dd2725b55a936c4b0242e7b&language=en-US`)
.then((res)=>{
    return res.json();
}).then((data)=>{
    for(let x=0;x<data.items.length;x++){
        let i=data.items[x].title.toLowerCase();
     if(i.includes(value)){
        location.href = `../movies/index.html?id=${data.items[x].id}`
        }
    }
})
}
});
// --------------------------------------- navbar 4 end -------------------------------------------------