let cart = JSON.parse(localStorage.getItem("data")) || [];
const cartNumber = document.getElementById("cartNumber");



const displayCartNumber = () => {
  return (cartNumber.innerHTML = cart.length);
};
displayCartNumber();


const loadSearchUi = () => {
  const searchTerm = localStorage.getItem("search")
  const dataBase =  [
    ...MobileData,
    ...TVData,
    ...EarphoneData,
    ...LaptopData,
    ...cyclesData,
  ];

  if(localStorage.search !== undefined){
       const searchResult = dataBase.filter((x) => {
        return x.searchFor.toLowerCase().includes(searchTerm.toLowerCase());
       }) || []
       if(searchResult.length !== 0){
      return (document.querySelector(".ResultsContainer").innerHTML = searchResult.map((x) => {
      document.getElementById("searchTerm").innerHTML = localStorage.search
    document.querySelector(".errorsMainContainer").style = `display:none`

        return`
        <div class="ItemsContainer">
        <div id=${x.id} class="itemContainer">
        
        <img src="${x.imgUrl}" alt=${x.name} class="itemImg" height="150">
        
        <p class="itemTitle">${x.name}</p>
        <div class="pricesContainer">
            <span class="oldPrice">&#8377; ${x.oldPrice}</span>
            <span class="newPrice">&#8377; ${x.newPrice}</span>
        </div> 
        <button class="AddToCart" onclick="AddToCart(${x.id})">Add to cart</button>
        </div>
        </div>`
       }).join(""))
  }else{
    document.querySelector(".ResultsContainer").style = `display:none`
    return (document.querySelector(".errorsMainContainer").innerHTML =   `
                                                                         <div class="errorContainer">
                                                                           <div class="error">
                                                                             <img src="../../assets/images_movie and covid/noResults.png" alt="" class="itemImg" height="150">
                                                                             <p class="itemTitle">Sorry, no results found! found</p>
                                                                             <p>Please check the spelling or try searching for something else</p>
                                                                           </div>
                                                                          </div>
                                                                        `
    )
  }
}
}

loadSearchUi()


//local storage and number of cart items functionality

  
function AddToCart(id){
const uniqueId = id;

let search = cart.find((item) => item.id === uniqueId)
if(search === undefined){
 cart.push({
   id : uniqueId,
   quantity:1,
  })
}else {
 alert(`This product is already in the cart`)
}

  localStorage.setItem("data",JSON.stringify(cart));
  displayCartNumber();
}

