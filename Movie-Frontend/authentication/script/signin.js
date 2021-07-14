const url = 'https://kinoticket.herokuapp.com';
const token = localStorage.getItem("jwt");
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
        location.href = `../index.html`
    }
})
}
let Email = document.querySelector(".form_input").children[0];
let Password = document.querySelector(".form_input").children[1];
let Submit = document.querySelector(".form_input").children[2];
let Email_value = "";
let Password_value = "";

let warning = document.querySelector(".warning");
let status = 0;
 
Email.addEventListener("change",(event) => {
Email_value = event.target.value;
});
 
Password.addEventListener("change",(event) => {
Password_value = event.target.value;
});

 Submit.addEventListener("click",() => {
    //  let status = 1;
     Email.classList.remove("wrong");
     Password.classList.remove("wrong");
     warning.style.display = "none";
     if(Email_value == "")
     {
          warning.innerHTML = '<h1>Enter Your Email</h1>';
          warning.style.display = "block";
          Email.classList.add("wrong");
          return;
     }
     if(Password_value == "")
     {
          warning.innerHTML = '<h1>Enter Your Password</h1>';
          warning.style.display = "block";
          Password.classList.add("wrong");
          return;
     }


     obj = {
         email : Email_value,
         password : Password_value
     }
     fetch(`${url}/auth/signIn`,{
        method : "POST",
        body: JSON.stringify(obj),
        headers : {
             "Content-Type" : "application/json"
        }
    }).then((res) => {
        status = res.status;
        return res.json();
    }).then((data) => {
        // console.log(data)
        if(status!=200)
        {
            warning.innerHTML = `<h1>${data.error}</h1>`;
            warning.style.display = "block";
        }
        else
        {
            const { token } = data;
            localStorage.setItem("jwt", token);
            location.href = `../index.html`;
        }
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