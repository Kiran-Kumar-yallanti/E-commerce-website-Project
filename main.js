const cart = JSON.parse(localStorage.getItem("data")) || []
const cartNumber = document.getElementById("cartNumber");

const displayCartNumber = () => {
   return cartNumber.innerHTML = cart.length;
}
displayCartNumber();


const searchBtnEl = document.querySelector(".searchBtn")

searchBtnEl.addEventListener("click", (e) => {
   e.preventDefault();
   const searchInput = document.querySelector(".searchInput").value
   const regex = /^[a-z0-9]+$/i

   if(regex.test(searchInput)) {
      window.location.href = `./src/Search/search.html`

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
            window.location.href = `./src/Search/search.html`

         }else{
            alert("Please enter a valid search term")
         }

         window.localStorage.setItem("search", searchInput)
      }
   })