//selecting required element of main navbar
window.addEventListener(("load"), () => {
  ourItems.querySelector('.active').classList.remove('active');
  document.getElementById("store").classList.add("active")
})

//////////////////////////
//create my select product
////////////////////////////
let singleItem = document.querySelector(".single-product");
let createMyProduct = () => {
  return (singleItem.innerHTML = productSingl.map((x) => {
    let { id, number } = x;
    let search = myAllShopsAndPlants.find((y) => y.id === id, [])
    return `
    <div id=myProduct-${id} class="my-product"> 
      <div class="img">
        <img src = "${{ ...search }.imgSrc}" alt = ${{ ...search }.name}/>
      </div>
      <div class=details >
        <h2>${{ ...search }.name}</h2>
        <span class=price>$${{ ...search }.price}.00</span>
        <div class="shop-nums">
          <i class="fas fa-minus" onclick="decrementDetails(${id})"></i>
          <div id="${id}" class="quantity">${number}</div>
          <i class="fas fa-plus" onclick="incrementDetails(${id})"></i>
        </div> 
        <button class = "add-cart" onclick = "addProductsDetails(${id})"> Add to cart</button>
        <button class = "buy-product" onclick="moveToAccount()"> buy now </button>
      </div>
    </div>
    <div class="description">
    <h3>description</h3>
    <p class= "description-text">${{ ...search }.description}</p>
  </div>
    `
  }).join("")
  )
}
createMyProduct()

//////////////////////////
//create my related product
////////////////////////////
let relatedProduct = document.querySelector(".related-products");
let descrItem = document.querySelector(".description-text").innerHTML;
let popularProducts = [];

let createMyRelatedProducts = () => {
  myAllShopsAndPlants.map( (y) => {
    if (y.description == descrItem) {
      popularProducts.push({
        id: y.id,
        number: 1
      })
      popularProducts.length == 0 ? (document.querySelector(".related-item")).style.display = "none" : (document.querySelector(".related-item")).style.display = "block";
      idSingleProduct = productSingl.map((x) => x.id);
      idSingleProduct = idSingleProduct.join('');
      popularProducts = popularProducts.filter((x) => x.id != idSingleProduct)
      return (relatedProduct.innerHTML = popularProducts.map((x) => {
        let { id, number } = x;
        let search = myAllShopsAndPlants.find((y) => y.id === id, [])      
        return `
          <div class="related-popular">
            <div class="item-product" id=${id} data-name=${{...search}.dataName}>
              <div class="img">
                ${{...search}.dataName === "new" ? `<span class="new" > new </span>` : ""}
                <img src="${{...search}.imgSrc}" alt=${{...search}.name}/>
              </div>
              <div class="contain-popular">    
                <h3 class="capitalize">${{...search}.name}</h3> 
                <div class="price">     
                  <span class = "main-price">  $${{...search}.price}  </span>
                </div>  
              </div>
            </div>
          </div>
          `
      }).join("")
        
      )
    } else if (popularProducts.length>1) {
      document.querySelector(".related-item .title").style.display = "block";
    }
    })
}
createMyRelatedProducts()

//////////////////////////
//update  
let updateCartDetails = (id) => {
  let search = productSingl.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.number;
  caculation();
}
// increment
let incrementDetails = (id) => {
  let selectedItem;
  id[0] === undefined ? selectedItem = id.id : selectedItem = id[0].id;
  let search = productSingl.find((x) => x.id === selectedItem);

  if (search === undefined) {
    productSingl.push({
      id: selectedItem,
      number: 1
    })
  } else if (search.number >= 5) {
    document.querySelector(".quantity").classList.add("active");
    let mypopupTime = setTimeout(hiddenPopQuantity, 5000);
    return mypopupTime;
  }
  else {
    search.number += 1;
  }
  updateCartDetails(selectedItem)
  createMyProduct()
  localStorage.setItem("product", JSON.stringify(productSingl));
}
//function decrement
let decrementDetails = (id) => {
  let selectedItem;
  id[0] === undefined ? selectedItem = id.id : selectedItem= id[0].id;
  let search = productSingl.find((x) => x.id === selectedItem);
  if (search === undefined) return
  else if (search.number === 1) return
  else {
    search.number -= 1;
  }
  updateCartDetails(selectedItem)
  createMyProduct()
  productSingl = productSingl.filter((x) => x.number !== 0);
  localStorage.setItem("product", JSON.stringify(productSingl));
}

// add products to basket
let addProductsDetails = (id) => {
  let selectItem;
  id[0] === undefined ? selectItem = id.id : selectItem = id[0].id;
  let search = cart.find((x) => x.id === selectItem);
    if (search === undefined) {
      cart.push({
        id: selectItem,
        number: productSingl[0].number
      })
    } else {
      document.querySelector(".pop-product").classList.add("active");
      let mypopupTime = setTimeout(hiddenPopup, 5000);
      return mypopupTime;
  }
  localStorage.setItem("data", JSON.stringify(cart))
  caculation()
  cartItems()
}
