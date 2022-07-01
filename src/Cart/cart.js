let cart = JSON.parse(localStorage.getItem("data")) || [];
const cartNumber = document.getElementById("cartNumber");



const displayCartNumber = () => {
  return (cartNumber.innerHTML = cart.length);
};
displayCartNumber();

const container = document.querySelector(".cartPageContainer");

const productsData = [
  ...MobileData,
  ...TVData,
  ...EarphoneData,
  ...LaptopData,
  ...cyclesData,
];
const loadCartUi = () => {
  if (cart.length !== 0) {
   
    return (container.innerHTML = cart
      .map((x) => {
        const { id } = x;
        const search = productsData.find((y) => y.id === id) || [];
        const totalItems = document.querySelector(".totalCartNumber");
        totalItems.innerHTML = cart.length;


        return `
       <div class="cartItem" id="${search.id}">
         <div class="cartItemImgContainer"> 
          <img class="cartProductImage" src="${search.imgUrl}">
         </div>
         <div class="nameAndPrice">
            <h3 class="cartItemName">${search.name}</h3>
            <h4>&#8377;${search.newPrice}</h4>
         </div>  
         <div class="countContainer">
               <i class="fa-solid fa-plus plus" onclick="increment(${search.id})"></i>
               <p id="quantity">${x.quantity}</p>
               <i class="fa-solid fa-minus minus" onclick="decrement(${search.id})"></i>
         </div>
         <button class="removeBtn" onclick="removeItem(${search.id})">Remove</button>
      </div>

       </div>`;
      })
      .join(""));
  } else {
    container.innerHTML = `
      <div class="cartMainContainer">
         <h2 class="emptyText">Your Cart is empty</h2>
         <img class="cartImg" src="../../assets/images_movie and covid/cart.webp">
         <button class="B2H" onclick="window.location.href='../../index.html'">Continue shopping</button>
      </div>
      `;
  }
 
};

loadCartUi();


const clearCart = () => {
 localStorage.clear()
  cart.length=0
  window.location.reload()
}

const removeBillBar= () => {
  cart.length === 0 ? document.querySelector(".billContainer").style.display = "none" : document.querySelector(".billContainer").style.display != "none"
}
removeBillBar()




const removeItem = (id) => {
  cart.map((x) => {
    if(x.id === id){
      cart.splice(cart.indexOf(x),1)
      localStorage.setItem("data",JSON.stringify(cart))
      displayCartNumber();
      loadCartUi();
      totalBill()
      removeBillBar()
      // window.location.reload()
    }else{
      return []
    }
  })

}

const increment = (id) => {
  const selectedItem = id
  cart.map((x) => {
    if(x.id === selectedItem){
      x.quantity = x.quantity+1
      localStorage.setItem("data",JSON.stringify(cart))
      displayCartNumber();
      loadCartUi();
      totalBill()
    }else{
      return []
    }
  })
loadCartUi();

}

const decrement = (id) => {
  const selectedItem = id
  cart.map((x) => {
    if(x.id === selectedItem){
       x.quantity = x.quantity-1
       if(x.quantity <= 0) x.quantity = 1
       localStorage.setItem("data",JSON.stringify(cart))
       displayCartNumber();
       loadCartUi();
       totalBill()
    }else{
      return []
    }
  })
loadCartUi();

}

const totalBill = () => {
 if(cart.length !== 0){
  const amount = cart.map((x) => {
    const {id,quantity} = x
    const search = productsData.find((y) => y.id === id) || [];
    const price = parseInt((search.newPrice).replace(/\,/g, ''))
    return price*quantity
  }).reduce((x,y) => x+y,0).toLocaleString('en-In')
  localStorage.setItem("amount",amount)
document.querySelector(".totalBillNumber").innerHTML = `&#8377;${amount}`
}
else return
}
totalBill()

window.onscroll = function() {myFunction()};

var navbar = document.querySelector(".billContainer")
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}


const checkOutBtn = document.querySelector(".checkOut")
checkOutBtn.addEventListener("click",()=>{
  alert("Your order has been placed, the bill amount is Rs."+localStorage.getItem("amount"))
})

