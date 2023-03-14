//////////////////////////////
//create view cart
/////////////////////////
let labelCart= document.querySelector(".label-cart")
let containViewCart = document.querySelector(".contain-view-cart");
cartView = () => {
  if (cart.length !== 0) {
    return (containViewCart.innerHTML = cart.map((x) => {
      let { id, number } = x;
      let search = myAllShopsAndPlants.find((y) => y.id === id, [])
      return `
      <div class="my-choose-product">
        <div id=myViewCart-${id} class = "cart-item"> 
          <div class="product details">
            <img src = "${{ ...search }.imgSrc}" alt = ${{ ...search }.name}/>
            <div class=title-price>
              <h4>${{...search}.name}</h4>
              <span class=price>$${{...search}.price}.00</span>
            </div>
          </div>
          <div class="quant">
            <div class="shop-nums">
              <i class="fas fa-minus" onclick="decrement(${id})"></i>
              <div id="${id}" class="quantity">${number}</div>
              <i class="fas fa-plus" onclick="increment(${id})"></i>
            </div> 
          </div>
          <div class="total">
            <div class=price-items>$${number * {...search}.price}.00</div>
          </div>
          <div class="action">
            <i class="fas fa-trash transition" onclick=removeItem(${id})></i>
          </div>
        </div>
      </div>
      `
    }).join(""))
  } else {
    labelCart.style.display = "block";
    labelCart.innerHTML =`
      <p class=alert >cart is empty! <i class="fas fa-frown"></i></p>
    `
  }
}
cartView()

//removeAllItems & total price
removeAllItems = () => {
  let iconCart = document.querySelector(".nums-cart");
  if (iconCart.innerHTML === "0") {
    containViewCart.innerHTML = ""
  } 
}
removeAllItems()

//remove all Item From Clear Btn
let removeItemFromClearBtn = () => {
  localStorage.removeItem("data");
  document.querySelector(".nums-cart").innerHTML = "0";
  containViewCart.innerHTML = "";
  labelCart.style.display = "block";
  document.querySelector(".subtotal .price").innerHTML = `$0`;
  labelCart.innerHTML =`
  <p class=alert >cart is empty! <i class="fas fa-frown"></i></p>
`
}

//calc total price
totalPrice = () => {
  if (cart.length !==0) {
    let allPrice = cart.map((x) => {
      let { id, number } = x
      let search = myAllShopsAndPlants.find((y) => y.id === id) || [];
      return number * search.price;
    }).reduce((x, y) => x + y || 0);
    document.querySelector(".subtotal .price").innerHTML = `$ ${allPrice}`;
  } else {
    document.querySelector(".subtotal .price").innerHTML = `$0`;
  }
}
totalPrice()