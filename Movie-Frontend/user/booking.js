const url = 'https://kinoticket.herokuapp.com';
const token = localStorage.getItem("jwt");
let body = document.querySelector("body");

let a =0;
fetch(`${url}/user/show_bookings`,{
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
// console.log(data);
result = data;
if(data.length==0)
{
let no_bookings = document.createElement("div");
no_bookings.classList.add("no_bookings");
no_bookings.innerHTML = `      
<div class="sad_face">
<img src="../assets/smiley.png" alt="">
</div>
<div class="no_book_message">
<h1>No Bookings</h1>
<a href="">Book Now</a>
</div>`;
body.appendChild(no_bookings);
}
else
{
let container = document.createElement("div");
container.classList.add("container");
container.innerHTML = '<div class = "heading"><h1>Bookings</h1></div>'
for(var i=0;i<data.length;i++)
{
let time = slot_to_time(data[i].slot);
let seats = seat_converter(data[i].seat_text);
let movie_date = date_converter(data[i].date);
let ticket = document.createElement("div");
ticket.classList.add("ticket");
ticket.setAttribute("onclick",`show_ticket('${data[i].order_id}')`)
ticket.innerHTML = `
<div class="movie_image">
<img src="https://image.tmdb.org/t/p/w200${data[i].poster_path}" alt="">
</div>
<div class="details">
<div class="status">
<img src="../assets/booked_logo.png" alt="" class="booked_image">
<img src="../assets/failed_logo.png" alt="" class="failed_image">
</div>
<div class="show_details">
<ul>
<li>Movie : ${data[i].title}</li>
<li>Date : ${movie_date}</li>
<li>Time : ${time}</li>
<li>Seats : ${seats}</li>
</ul>
</div>
</div>`;
container.appendChild(ticket)
if(data[i].status==1)
ticket.children[1].children[0].children[0].style.display = "block";
else
ticket.children[1].children[0].children[1].style.display = "block";
}
body.appendChild(container)
}
})


function show_ticket(x)
{
    // console.log(x);
    location.href = `../ticket/index.html?id=${x}`
}


function slot_to_time(x)
{
    // console.log(x)
    let time = "";
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
    return time;
}
function seat_converter(x)
{
    let seats = "";
    // console.log(x)
    let seat_array = x.split(',');
    // console.log(seat_array);
    for(var i=0;i<seat_array.length;i++)
    {
        let z = Number(seat_array[i].slice(seat_array[i].indexOf('t')+1,seat_array[i].length));
        let y = Math.ceil(Number(seat_array[i].slice(seat_array[i].indexOf('t')+1,seat_array[i].length))/20);
        let alpha = "";
        let number = 0;
        if(z%20==0)
        number = 20;
        else
        number = z%20;
        if(y == 1)
        alpha = 'A';
        else if(y==2)
        alpha = 'B';
        else if(y==3)
        alpha = 'C';
        else if(y==4)
        alpha = 'D';
        else if(y==5)
        alpha = 'E';
        else if(y==6)
        alpha = 'F';
        else if(y==7)
        alpha = 'G';
        seat_array[i] = `${alpha}${number}`
    }
    // console.log(seat_array)
    for(var i=0;i<seat_array.length;i++)
    {
       if(i!=seat_array.length-1)
       {
           seats+=`${seat_array[i]}, `
       }
       else
       {
        seats+=`${seat_array[i]}`
       }
    }
    // console.log(seats);
    return seats;
}
function date_converter(x)
{
    // console.log(x)
    let movie_date = ""
    let yyyy = x.slice(0,4);
    let mm = x.slice(5,7);
    let dd = x.slice(8,10);
    movie_date = `${dd}-${mm}-${yyyy}`;
    return movie_date;
}


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