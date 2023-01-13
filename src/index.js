// write your code here
let ramenFetch = fetch("http://localhost:3000/ramens")
    .then((resp) => resp.json())
    .then((ramens = []) => {
        for(let ramen of ramens){
            renderRamen(ramen);
        }
    })

    const ramenList = {}

// Contains the current ramen data

// Promise.all([ramenFetch])
//     .then((ramens) => {
//         ramens.forEach(ramen => renderRamen(ramen));
//     })
//     .catch(err => {
//         console.error(err);
//     })
let firstLoad = true;
function renderRamen(ramen){

    const li = document.createElement("li");
    li.className = "ramenlisting";
    const ramenName = document.createElement("h3");
    ramenName.textContent = ramen.name;
    const restaurant = document.createElement("h4");
    restaurant.textContent = ramen.restaurant;
    const ramenImg = document.createElement("img");
    ramenImg.src = ramen.image;
    ramenImg.setAttribute("class","top-images");
    const rating = document.createElement("p");
    rating.textContent = ramen.rating;
    const comment = document.createElement("p");
    comment.textContent = ramen.comment;

    ramenList[ramenImg.src] = ramen;
    console.log(ramen)
    if(firstLoad === true){
        // Show first ramen item by default
        const imagePlaceholder = document.body.querySelector(".detail-image");
        imagePlaceholder.src = ramen.image;
        const h2Name = document.body.querySelector(".name");
        h2Name.textContent = ramen.name;
        const h3Restaurant = document.body.querySelector(".restaurant");
        h3Restaurant.textContent = ramen.restaurant;
        const spanRating = document.body.querySelector("#rating-display");
        spanRating.textContent = ramen.rating;
        const pComment = document.body.querySelector("#comment-display");
        pComment.textContent = ramen.comment;
        firstLoad = false;
    }
    
    


    // Appends ramen images at "#ramen-menu" div
    const ramenMenu = document.querySelector("#ramen-menu");
    ramenMenu.append(ramenImg);

    
    ramenImg.addEventListener("click", (e) => {
        const imagePlaceholder = document.body.querySelector(".detail-image");
        imagePlaceholder.src = e.target.src;
        const h2Name = document.body.querySelector(".name");
        h2Name.textContent = ramen.name;
        const h3Restaurant = document.body.querySelector(".restaurant");
        h3Restaurant.textContent = ramen.restaurant;
        const spanRating = document.body.querySelector("#rating-display");
        spanRating.textContent = ramen.rating;
        const pComment = document.body.querySelector("#comment-display");
        pComment.textContent = ramen.comment;  
    })
}

const ramenForm = document.querySelector("#new-ramen");
ramenForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formList = document.querySelectorAll("#new-ramen > input");
    
    const newRamen = {
        name: formList[0].value,
        restaurant: formList[1].value,
        image: formList[2].value,
        rating: formList[3].value,
        comment: formList[4].value
    }

    renderRamen(newRamen);

    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newRamen)
    })
    .then(resp => console.log(resp))
    .then(newRamen => console.log(newRamen))

    e.target.reset();
})

// const ramenPage = document.querySelector("body");
// let ramenImageList = [];
// window.addEventListener("load", (e) => {
//     console.log("page is fully loaded");
//     ramenImageList = document.body.querySelectorAll("img.top-images");
// })


// for(let ramenItem of ramenImageList){
//     ramenItem.addEventListener("click", (e) => {
//         const imagePlaceholder = document.body.querySelector(".detail-image");
//         imagePlaceholder.src = e.target.src;
//     })
// }

// ramenImageList.addEventListener("click", (e) => {
//     const imagePlaceholder = document.body.querySelector(".detail-image")
//     imagePlaceholder.src = e.target.src;
// })