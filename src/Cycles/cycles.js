
const LoadUi = (item) => {
 return    `<div class="ItemsContainer">
            <div id=${item.id} class="itemContainer">
            
            <img src="${item.imgUrl}" alt=${item.name} class="itemImg" height="150">
            
            <p class="itemTitle">${item.name}</p>
            <div class="pricesContainer">
                <span class="oldPrice">&#8377; ${item.oldPrice}</span>
                <span class="newPrice">&#8377; ${item.newPrice}</span>
            </div> 
            <button class="AddToCart" onclick="AddToCart(${item.id})">Add to cart</button>
            </div>
            </div>`
}

const Helper = (cycles) => {
   return `<div class="allItemsContainer">
   ${cycles.map(LoadUi).join('')}
 </div>`
}

document.querySelector(".cyclesMainContainer").innerHTML = Helper(cyclesData)






//local storage and number of cart items functionality
const cart = JSON.parse(localStorage.getItem("data")) || []

  
function AddToCart(id){
const uniqueId = id;
let search = cart.find((item) => item.id === uniqueId)

if(search === undefined){
 cart.push({
   id : uniqueId,
   quantity : 1,
  })
}else{
 alert(`This product is already in the cart`);
}

  localStorage.setItem("data",JSON.stringify(cart));
 displayCartNumber();
}

const cartNumber = document.getElementById("cartNumber");

const displayCartNumber = () => {
 return cartNumber.innerHTML = cart.length;
}
displayCartNumber()

const searchBtnEl = document.querySelector(".searchBtn")

searchBtnEl.addEventListener("click", (e) => {
   e.preventDefault();
   const searchInput = document.querySelector(".searchInput").value
   const regex = /^[a-z0-9]+$/i

   if(regex.test(searchInput)) {
      window.location.href = `../Search/search.html`

   }else{
      alert("Please enter a valid search term")
   }

   window.localStorage.setItem("search", searchInput)
})

document.querySelector(".searchInput").value = "";


   document.querySelector(".searchInput").addEventListener("keyup", (e) => {
      if(e.keyCode === 13) {
         e.preventDefault();
         const searchInput = document.querySelector(".searchInput").value
         const regex = /^[a-z0-9]+$/i

         if(regex.test(searchInput)) {
            window.location.href = `../Search/search.html`

         }else{
            alert("Please enter a valid search term")
         }

         window.localStorage.setItem("search", searchInput)
      }
   })