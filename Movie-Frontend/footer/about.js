const url = 'https://kinoticket.herokuapp.com';
const body=document.querySelector("body");
window.addEventListener('load',()=>{
body.classList.add("visible");
});
const token = localStorage.getItem("jwt");

let search = document.querySelector(".search").children[0];

// ------------------------------------ navbar 1 --------------------------------------------------------

if (token) {
    fetch(`${url}/verify_login`, {
      method: "GET",
      headers: {
        authorization: token,
      },
    }).then((res) => {
        console.log(res)
        if(res.status == 200)
        {
            let signin = document.getElementById("signin_link");
            let hamburger_signin = document.getElementById("hamburger_signin");
            let user_logo = document.getElementById("user_logo");
            let hamburger_after_login = document.getElementById("hamburger_after_login");
            signin.style.display = "none";
            hamburger_signin.style.display = "none";
            user_logo.style.display = "block";
            hamburger_after_login.style.display = "block"
        }
    })
}
// --------------------------------------- navbar 1 end -------------------------------------------------

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

const data=document.querySelectorAll('input');
const button=document.querySelector('.button');
let reason,Name,number,region,organisation,email;

data[1].addEventListener("change",(event)=>{
  reason=event.target.value;
});

data[2].addEventListener("change",(event)=>{
  Name=event.target.value;
});
data[3].addEventListener("change",(event)=>{
  organisation=event.target.value;
});
data[4].addEventListener("change",(event)=>{
  region=event.target.value;
});
data[5].addEventListener("change",(event)=>{
  number=event.target.value;
});
data[6].addEventListener("change",(event)=>{
  email=event.target.value;
});
button.addEventListener("click",()=>{
  if(reason==""||Name==""||region==""||number==""||email==""){
    alert("Form is not completely filled");
    return;
  }

  Obj={
    reason,
    Name,
    organisation,
    region,
    number,
    email,
  }

  fetch(`${url}/user/contactUs`,{
    method:"POST",
    body:JSON.stringify(Obj),
    headers:{
      "Content-type":"application/json",
    },
}).then((res)=>{
  return res.json();
}).then((data)=>{
  if(status!=200){
    alert(data.message);
  }
  else{
    alert("Thanks for your feedback");
}
}).catch((err)=>{
  alert("Error please retry");
})

});