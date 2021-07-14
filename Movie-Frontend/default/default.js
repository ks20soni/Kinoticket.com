const url = 'https://kinoticket.herokuapp.com';
// ------------------------------------ navbar 1 --------------------------------------------------------
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