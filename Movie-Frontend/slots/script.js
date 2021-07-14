const url = 'https://kinoticket.herokuapp.com';
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

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


// let input = document.querySelector(".date").children[0]
// const id = 337404;

let date = new Date;
// let x = date.;
let current_min = date.getHours()*60 + date.getMinutes();
// current_min = 700;
let dd = date.getDate();
let mm = date.getMonth()+1;
let yyyy = date.getFullYear();
if(dd<10)
{
    dd = `0${dd}`
}
if(mm<10)
{
    mm = `0${mm}`
}
let current_date = `${yyyy}-${mm}-${dd}`;
date = `${yyyy}-${mm}-${dd}`;
let input = document.querySelector(".date").children[0];
input.addEventListener("change", () => {
    date = input.value;
    show_slot();
})
function change_date(x)
{
    let button = document.querySelector(".book_now").children[0];
    button.classList.remove("active");
    status = 0;
    input.value = x;
    date = input.value;
    show_slot();
}
let final_slot = "";
let status = 0;
let go_book = document.querySelector(".book_now").children[0];
go_book.addEventListener("click",() => {
    if(status!=0)
    {
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
                    location.href = `../book/index.html?id=${id}&slot=${final_slot}&date=${date}`;
                }
                else
                {
                    // console.log("hii")
                    let loading_image = document.querySelector(".loading_image");
                    loading_image.style.display = "block";
                    window.scrollTo(0,0);
                }
            })
        }
        else
        {
            // console.log("hii")
            let loading_image = document.querySelector(".loading_image");
            loading_image.style.display = "block";
            window.scrollTo(0,0);
        }
    }
})
function select_slot(x)
{
    // button.removeAttribute("onclick",go_to_seats());
    let slot = document.querySelector(`#${x}`);
    let button = document.querySelector(".book_now").children[0];
    final_slot = x;
    // console.log(button)
    if(slot.classList.length==2)
    {
        slot.classList.remove("selected")
        button.classList.remove("active");
        status = 0;
    }
    else
    {
    let slot_holder = document.querySelector(".slot_holder");
    for(var i=0;i<slot_holder.children.length;i++)
    slot_holder.children[i].classList.remove("selected");
    slot.classList.add("selected");
    button.classList.add("active");
    status = 1;
    }
    // console.log(slot.classList.length)
}
function leap (year)
{
    if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400))
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

console.log(current_min)
// date = `2021-06-20`;
// input.value = date;
// let container = "j";
let body = document.querySelector("body");

fetch(`
https://api.themoviedb.org/3/movie/${id}?api_key=65bdc6e47dd2725b55a936c4b0242e7b&language=en-US`).then((res) => {
    return res.json();
}).then((data) => {
    // console.log(data)
    let movie_image = document.querySelector(".movie_image");
    movie_image.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="">
    <div class="extra">
    <img src="https://image.tmdb.org/t/p/w200${data.production_companies[0].logo_path}" alt="">
     </div>`;
    let title = document.querySelector(".title");
    title.innerHTML = `<h1>${data.original_title}</h1>`;

    input.value = date;
})

obj2 = {
    movie_id : id
}
fetch(`${url}/slots/show_available`,{
    method : "POST",
    body: JSON.stringify(obj2),
    headers : {
         "Content-Type" : "application/json"
    }
}).then((res) => {
    return res.json()
}).then((data) => {
    // console.log(data);
    let near_dates = document.querySelector(".near_dates");
    // near_dates.classList.add(".near_dates");
    for(var i=0;i<data.length;i++)
    {
    let child_date = document.createElement("div");
    child_date.classList.add("child_date");
    if(data[i].available == 0)
    child_date.classList.add("not_available");
    let yyyy = data[i].date.slice(0,4);
    let mm = data[i].date.slice(5,7);
    let dd = data[i].date.slice(8,10);

    // console.log(Number(dd))
    // dd = Number(dd) + 1;
    dd = Number(dd);
// ------------------------------------------------------------------------------------------------------
    if(Number(mm)%2==0 && dd == 31)
    {
    dd = '01';
    mm = `${Number(mm) + 1}`
    }
    else if(Number(mm)%2!=0 && dd == 32)
    {
      dd = '01';
      mm = `${Number(mm) + 1}`;
    }
    else if(Number(mm)==2 && leap(yyyy)==1 && dd == 30)
    {
      dd = '01';
      mm = `${Number(mm) + 1}`;
    }
    else if(Number(mm)==2 && leap(yyyy)==0 && dd == 29)
    {
      dd = '01';
      mm = `${Number(mm) + 1}`;
    }
    if(Number(mm)<10)
    {
        mm = `0${Number(mm)}`
    }
    if(Number(dd)<10)
    {
        dd = `0${Number(dd)}`
    }
// -----------------------------------------------------------------------------------------------------
    // dd = Number(dd);
    child_date.innerHTML = `${dd}-${mm}-${yyyy}`;
    child_date.setAttribute("onclick",`change_date('${yyyy}-${mm}-${dd}')`);
    // child_date.innerHTML = `${data[i].date.slice(0,10)}`;
    near_dates.appendChild(child_date)
    }

})

let slot_container = document.querySelector(".slot_container");
let book_now = document.querySelector(".book_now");
let slot = document.querySelector(".slot");
function show_slot()
{
if(slot_container.children.length>0)
{
    slot_container.removeChild(slot_container.children[0]);
    slot_container.style.display = "none"
}
obj = {
    date : date,
    movie_id : id
}
fetch(`${url}/slots/show_slots`,{
    method : "POST",
    body: JSON.stringify(obj),
    headers : {
         "Content-Type" : "application/json"
    }
}).then((res) => {
    return res.json()
}).then((data) => {
// console.log(data)
if(data.length==0)
{
    let no_slots = document.querySelector(".no_slots");
no_slots.style.display = "block";
book_now.style.display = "none";
// no_slots.innerHTML = `No Slots Available`;
// slot.appendChild(no_slots);
}
else
{
    slot_container.style.display = "block";
    let no_slots = document.querySelector(".no_slots");
no_slots.style.display = "none";

// slot_container.classList.add("slot_container");
let slot_holder = document.createElement("div");
slot_holder.classList.add("slot_holder");

for(var i=0;i<data.length;i++)
{
    let box = document.createElement("div");
    box.classList.add("box");
    box.setAttribute("id",`${data[i].slot}`);
    if(current_min > data[i].slot_time-20 && current_date == date)
    box.classList.add("missed_show");
    else
    {
       box.setAttribute("onclick",`select_slot('${box.id}')`);
    }
    // console.log("yes")
    box.innerHTML = `${data[i].slot_text}`;
    slot_holder.appendChild(box);
}
slot_container.appendChild(slot_holder)
book_now.style.display = "block";
}
})
}
show_slot();

let closebox = document.getElementById("closebox");

closebox.addEventListener("click",() => {
    let loading_image = document.querySelector(".loading_image");
    loading_image.style.display = "none";
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