const url = 'https://kinoticket.herokuapp.com';
const urlParams = new URLSearchParams(window.location.search);
// console.log(urlParams)
const token = localStorage.getItem("jwt");
if (token) {
fetch(`${url}/verify_login`, {
  method: "GET",
  headers: {
    authorization: token,
  },
}).then((res) => {
    console.log(res)
    if(res.status != 200)
    {
        location.href = `../index.html`
    }
    else
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
else
{
    location.href = `../index.html`
}
let id = urlParams.get("id");
let slot = urlParams.get("slot");
let date = urlParams.get("date");
let status = 0;
let just_display_date = "";
let seat_array = [];
// let id = 337404;
// let slot = "slot1";
// let date = "2021-06-22";
let time = "";
slot_to_time(slot);
check_valid(date,slot);
date_converter(date);
let body = document.querySelector("body");
let movie_details = document.createElement("div");
// let super_container = document.createElement("div");
movie_details.classList.add("movie_details");
fetch(`
https://api.themoviedb.org/3/movie/${id}?api_key=65bdc6e47dd2725b55a936c4b0242e7b&language=en-US`).then((res) => {
    return res.json();
}).then((data) => {
    // console.log(data)

// console.log(movie_details)
movie_details.innerHTML = `
<div class="movie_image">
            <img src="https://image.tmdb.org/t/p/w200${data.poster_path}" alt="">
        </div>
        <div class="description">
            <div class="title">
               <h1>${data.original_title}</h1>
            </div>
            <div class="show_details">
                <ul>
                    <li>Date : ${just_display_date}</li>
                    <li>Time : ${time}</li>
                    <li>Venue : KinoTheatre</li>
                </ul>
            </div>
        <div class="payment_button">
            <button class = "pay_but">Proceed To Pay</button>
        </div>
        </div>`;
        // movie_details.style.display = "flex";
})


obj = {
    movie_id : id,
    slot : slot,
    date : date
}
fetch(`${url}/slots/show_seats`,{
    method : "POST",
    body: JSON.stringify(obj),
    headers : {
         "Content-Type" : "application/json"
    }
}).then((res) => {
    return res.json()
}).then((data) => {
    console.log(data);
    let container = document.createElement("div");
    container.classList.add("container");
    let seat_container = document.createElement("div");
    seat_container.classList.add("seat_container");
    let a = 0;
    for(var i=0;i<data.length/20;i++)
    {
      let row = document.createElement("div")
      row.classList.add("row")
      for(var j=0;j<20;j++)
      {
          let seat = document.createElement("div");
          seat.classList.add("seat");
          seat.setAttribute("id",`${data[a].seat_id}`);

          if(data[a].booked == 1)
          seat.classList.add("booked")
          else if(data[a].blocked == 1)
          seat.classList.add("blocked")
          else
          seat.setAttribute("onclick",`select_seat('${seat.id}')`)
          row.appendChild(seat);
          a++;
      }
      seat_container.appendChild(row);
      if(i==1)
      {
          let seat_category = document.createElement("div");
          seat_category.classList.add("seat_category");
          seat_category.innerHTML = `Lounge-₹280`;
          seat_container.appendChild(seat_category);
          let separation = document.createElement("div");
          separation.classList.add("separation");
          seat_container.appendChild(separation)
      }
      if(i==4)
      {
        let seat_category = document.createElement("div");
        seat_category.classList.add("seat_category");
        seat_category.innerHTML = `Classic-₹180`;
        seat_container.appendChild(seat_category);
          let separation = document.createElement("div");
          separation.classList.add("separation");
          seat_container.appendChild(separation)
      }
      if(i==6)
      {
        let seat_category = document.createElement("div");
        seat_category.classList.add("seat_category");
        seat_category.innerHTML = `Regular-₹120`;
        seat_container.appendChild(seat_category);
      }
    }
    container.appendChild(seat_container)
    let instructions = document.createElement("div");
    instructions.classList.add("instructions");
    instructions.innerHTML = `        
    <div><div class="booked_sign"></div>Booked</div>
    <div><div class="blocked_sign"></div>Blocked</div>
    <div><div class="selected_sign"></div>Selected</div>`;
    container.appendChild(instructions)
    let screen_image = document.createElement("div");
    screen_image.classList.add("screen_image");
    screen_image.innerHTML = `
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6RKyyaX0uuzkUjCK7WOEK_q5Csiw0pxPv0Q&usqp=CAU" alt="">
    Screen`;
    container.appendChild(screen_image)
    body.appendChild(container)
    body.appendChild(movie_details)
    // body.appendChild(super_container)
    let proceed_to_pay = document.querySelector(".payment_button").children[0];
// console.log(proceed_to_pay)
proceed_to_pay.addEventListener("click",() => {

    if(seat_array.length!=0)
    {
    let loading_image = document.querySelector(".loading_image");
    let login_warning = document.querySelector(".login_warning");
    loading_image.style.display = "block";
    window.scrollTo(0,0);
    console.log(seat_array);

    obj = {
        movie_id : id,
        slot : slot,
        date : date,
        seats : seat_array
    }
    const token = localStorage.getItem("jwt");
    fetch(`${url}/booking/block`,{
        method : "POST",
        body: JSON.stringify(obj),
        headers : {
            authorization: token,
             "Content-Type" : "application/json"
        }
    }).then((res) => {
        status = res.status;
       return res.json()
    }).then((data) => {
        if(status!=200)
        {
        //  console.log(data)
         loading_image.style.display = "none";
         login_warning.style.display = "block";
        }
         else
          location.href = `../payment/index.html?id=${data.order_id}`
    })
}
// else
// {
//     let loading_image = document.querySelector(".loading_image");
//     loading_image.style.display = "block";
//     window.scrollTo(0,0);
// }
})
})

function select_seat(id)
{

    // console.log(id);
    let seat = document.getElementById(`${id}`);
    // console.log(seat)
    if(seat.classList.length==2)
    {
    seat.classList.remove("selected");
    // console.log(seat_string.indexOf(id));
    let index = seat_array.indexOf(id);
    if (index > -1) {
    seat_array.splice(index, 1);
    }
    }
    else
    {
    seat.classList.add("selected")
    seat_array.push(id);
    }
    let button = document.querySelector(".payment_button").children[0];
    // console.log(button)
    if(seat_array.length == 0)
    button.classList.remove("active");
    else
    button.classList.add("active");

    // seat_string = seat_string.slice(0,seat_string.lastIndexOf('or')-1);
    // console.log(seat_array);

    // console.log(total);
    // console.log(seat_string.lastIndexOf('or'));
}
function slot_to_time(x)
{
    // console.log(x)
    if(x == "slot1")
    time = "9:00am - 11:00am";
    else if(x == "slot2")
    time = "11:30am - 1:30pm";
    else if(x == "slot3")
    time = "2:00pm - 4:00pm";
    else if(x == "slot4")
    time = "4:30pm - 6:30pm";
    else if(x == "slot5")
    time = "7:00pm - 9:00pm";
    else if(x == "slot6")
    time = "9:30pm - 11:30pm"
    else if(x == "slot7")
    time = "11:50pm - 2:00am";
}
function check_valid(x,y)
{
    let date = new Date;
    let minutes = date.getHours()*60 + date.getMinutes();
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
    date = `${yyyy}-${mm}-${dd}`

    if(date==x)
    {
        // console.log("hii bro")
       if(y=='slot1' && minutes+20>540)
       location.href = `../index.html`;
       else if(y=='slot2' && minutes+20>690)
       location.href = `../index.html`;
       else if(y=='slot3' && minutes+20>840)
       location.href = `../index.html`;
       else if(y=='slot4' && minutes+20>990)
       location.href = `../index.html`;
       else if(y=='slot5' && minutes+20>1140)
       location.href = `../index.html`;
       else if(y=='slot6' && minutes+20>1290)
       location.href = `../index.html`;
       else if(y=='slot7' && minutes+20>1430)
       location.href = `../index.html`;
    }
    // console.log(date);
}
function date_converter(x)
{
    // console.log(x)
    let yyyy = x.slice(0,4);
    let mm = x.slice(5,7);
    let dd = x.slice(8,10);
    just_display_date = `${dd}-${mm}-${yyyy}`;
}

let closebox = document.getElementById("closebox");

closebox.addEventListener("click",() => {
    let login_warning = document.querySelector(".login_warning");
    login_warning.style.display = "none";
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
    location.href = '../index.html'
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