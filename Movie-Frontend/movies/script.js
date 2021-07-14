const url = 'https://kinoticket.herokuapp.com';
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let status = 1;
// const id = 337404;
// const id = 423108;
// const id = 460465;

function show_slot(id)
{
// console.log(id)
location.href = `../slots/index.html?id=${id}`
}

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

// function show_page()
// {
let body = document.querySelector("body");
fetch(`
https://api.themoviedb.org/3/movie/${id}?api_key=65bdc6e47dd2725b55a936c4b0242e7b&language=en-US`).then((res) => {
    return res.json();
}).then((data) => {
    console.log(data);
        // title.innerHTML = `${data.title}`;
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=65bdc6e47dd2725b55a936c4b0242e7b&language=en-US`).then((res) => {
            return res.json();
        }).then((vid_data) => {
        // console.log(vid_data)
        let vid_key = "wuhuwxx";
        if(id == 423108 || id == 460465)
        {
            vid_key = vid_data.results[1].key
        }
        else{
            vid_key = vid_data.results[0].key
        }
        let container = document.createElement("div");
        container.classList.add("container")
        container.innerHTML = `
        <div class="container1250">
        <div class="movie_img">
            <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="">
        <div class="extra">
            <img src="https://image.tmdb.org/t/p/w200${data.production_companies[0].logo_path}" alt="">
        </div>
        </div>
        <div class="movie_details">
            <div class="heading">
                <h1>${data.original_title}</h1>
                <img src="../assets/star.png" alt="">
                <h2>${data.vote_average}</h2>
            </div>
            <div class="overview">
                <p>${data.overview}</p>
            </div>
            <div class="book_now">
            <button onclick = show_slot(${id})>Book Now</button>
            </div>
        </div>
        </div>
        <div class="trailer">
            <iframe class="trailer_vid" width="560" height="315" src="https://www.youtube.com/embed/${vid_key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>`;
        body.appendChild(container)
        body.appendChild(scroll_container)
})
})
// }

// function show_cast()
// {
    // let body = document.querySelector("body");
    let scroll_container = document.createElement("div");
fetch(`
https://api.themoviedb.org/3/movie/${id}/credits?api_key=65bdc6e47dd2725b55a936c4b0242e7b&language=en-US`).then((res) => {
    return res.json();
}).then((data) => {
    // console.log(data);

    scroll_container.classList.add("scroll_container")
    for(var i=0;i<data.cast.length;i++)
    {
        // console.log(i)
        let box = document.createElement("div");
        box.classList.add("box")
        if(data.cast[i].profile_path!=null)
        {
        // box.innerHTML = `
        // <img src="https://image.tmdb.org/t/p/w200${data.cast[i].profile_path}" alt="">`;
        box.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w200${data.cast[i].profile_path}" alt="">
        <div class="cast_name">
            <h1>${data.cast[i].original_name}</h1>
        </div>
        <div class="cast_character">
            <h1>Character : ${data.cast[i].character}</h1>
        </div>`;
        scroll_container.appendChild(box)
        }
}
// body.appendChild(scroll_container)
})
// }

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