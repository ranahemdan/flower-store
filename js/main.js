
//loading page
window.addEventListener("load", () =>{
  const loader = document.querySelector(".loader-section");
  loader.classList.add("hidden");
});

/////toggle navigation
let toggle = () => {
  let navigation = document.querySelector(".navigation");
  let h1 = document.querySelector("h1 a");
  let menuBtn = document.querySelector(".menu-btn i")
  navigation.classList.toggle("active");
  navigation.classList.contains("active") ? (h1.style.color = "#eee") : (h1.style.color = `var(--main-color)`)
  navigation.classList.contains("active") ? (menuBtn.style.color="#eee") : (menuBtn.style.color=`var(--main-color)`)
  
}

//selecting all required elements of main navbar
let ourItems = document.querySelector('.navigation');
ourItems.onclick = (select) => {
  if (select.target.classList.contains('item')) {
    ourItems.querySelector('.active').classList.remove('active');
    select.target.classList.add('active');
  }
};

/////altrenate img
let myImg = document.querySelectorAll("img");
for (let i = 0; i < myImg.length; i++) {
    myImg[i].setAttribute("alt","here is a picture")
}


/////////////////////////////
//SHOP AND CART
//////////////////////////////

//variables
let shop = document.getElementById("shop");
let iconCart = document.querySelector(".nums-cart");
let cartProducts = document.getElementById("product-cart");
let label = document.getElementById("label");
let priceAll = document.querySelector(".total-price");
let checkView = document.querySelector(".check-view");
let totalAmount = document.querySelector(".price-amount");
let shopCart = document.querySelector(".cart");
let cart = JSON.parse(localStorage.getItem("data")) || []
let productSingl = JSON.parse(localStorage.getItem("product")) || []
let generateShop = () => { };
let newGenerateShop = () => { };
let cartView = () => { };


//caculation func
let caculation = () => {
  let innerIconCart = cart.map((x) => x.number).reduce((x, y) => x + y, 0);
  iconCart.innerHTML = innerIconCart;
}
caculation();

//add the Products to the basket

let addProducts = (id) => {
  let selectItem;
  id[0] === undefined ? selectItem = id.id : selectItem = id[0].id;
  let search = cart.find((x) => x.id === selectItem);
    if (search === undefined) {
      cart.push({
        id: selectItem,
        number: 1
      })
    } else {
      document.querySelector(".pop-product").classList.add("active");
      let mypopupTime = setTimeout(hiddenPopup, 5000);
      return mypopupTime;
  }
  localStorage.setItem("data", JSON.stringify(cart))
  caculation()
  totalPrice()
  cartItems()
  label.style.display = "none";
}


////////////////////////////////////////////
// Creat Cart Items
//////////////////////////////////////////
let cartItems = () => {
  if (cart.length !== 0) {
    priceAll.style.display = "flex";
    checkView.style.display = "flex";
    return (cartProducts.innerHTML = cart.map((x) => {
      let { id, number } = x
      let search = myAllShopsAndPlants.find((y) => y.id === id, [])
      return `
        <div id=myCart-${id} class = "cart-item"> 
          <img src = "${{...search}.imgSrc}" alt = ${{...search}.name}/>
          <div class="details">
            <div class="title-price">
              <h4>${{...search}.name}</h4>
              <span class=price>$${{...search}.price}.00</span>
            </div>
            <div class="shop-nums">
              <i class="fas fa-minus" onclick="decrement(${id})"></i>
              <div id="${id}" class="quantity">${number}</div>
              <i class="fas fa-plus" onclick="increment(${id})"></i>
            </div> 
            <div class=price-trash>
              <div class=price-items>$${number * {...search}.price}.00</div>
              <i class="fas fa-trash" onclick=removeItem(${id})></i>
            </div>
          </div>
        </div>`
    }).join(""))
  } else {
    priceAll.style.display = "none";
    checkView.style.display = "none";
    label.style.display = "block";
    label.innerHTML =`
      <p class=alert >You have no items in your shopping cart.</p>
    `
  }
}
cartItems()


////////////////////////////////////////////
// Creat search Items
//////////////////////////////////////////

let shoppingSearch = document.getElementById("product-search");
let mainSearch = document.getElementById("main-search");
let searchItem = document.querySelector(".search-item");
// hide home search 
document.body.addEventListener('click', function (e) {
  if (!e.target.classList.contains('search-item')) {
      searchItem.classList.remove("active")
  }
});
//////////////////
//func
////////////
let searchMainProducts = () => {
  myAllShopsAndPlants.forEach((x) => {
    let searchBox = (mainSearch.value.toUpperCase()).trim();
    let noResult = document.querySelector(".no-result");
    let result = myAllShopsAndPlants.filter((i) => (i.name.toUpperCase()).includes(searchBox))
    // move to details page
    result.forEach((y) => {
      document.querySelectorAll(".search-products").forEach((item) => {
        item.onclick = () => {
        window.location.href = "details.html";
        productSingl .push({
          id: y.id,
          number: 1
        })
        localStorage.setItem("product", JSON.stringify(productSingl));
      }
    })
    })
    // show search items
    if (mainSearch.value.length > 2) {
      searchItem.classList.add("active")
      if (result.length === 0) {
        noResult.style.display = "block";
        shoppingSearch.style.display = "none";
        document.querySelector(".number-of-items").style.display = "none";
      }else {
        noResult.style.display = "none";
        shoppingSearch.style.display = "block";
        document.querySelector(".number-of-items").style.display = "block";
      }
      if ((x.name.toUpperCase()).indexOf(searchBox) > -1) {
        document.querySelector(".number-of-items").innerHTML = `
        search result(s): ${result.length} item(s)
        `
        return (shoppingSearch.innerHTML = result.map((x) => {
          let { id, dataName, imgSrc, name, price, description } = x;
          return `<div id=myCart-${id} class = "search-products" 
          data-name = "${dataName}"> 
            <img src = "${imgSrc}" alt = ${name}/>
            <div class=details >
              <div class=title-price>
                <h4>${name}</h4>
                <span class=price>$${price}.00</span>
              </div>
              <div class="description">${description}</div>
            </div>
        </div>`
        }).join(""))
      }
    } else {
        searchItem.classList.remove("active")  
    }  
  })
};

  // //////////////////
// popup functions
let hiddenPopup = () => {
  return document.querySelector(".pop-product").classList.remove("active");
}
let hiddenPopQuantity = () => {
  return document.querySelector(".quantity").classList.remove("active");
}

//function increment
let increment = (id) => {
  let selectedItem;
  id[0] === undefined ? selectedItem = id.id : selectedItem = id[0].id;
  let search = cart.find((x) => x.id === selectedItem);

  if (search === undefined) {
    cart.push({
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
  cartItems()
  cartView()
  updateCart(selectedItem)
  generateShop()
  newGenerateShop()
  localStorage.setItem("data", JSON.stringify(cart))
}

//function decrement
let decrement = (id) => {
  let selectedItem;
  id[0] === undefined ? selectedItem = id.id : selectedItem= id[0].id;
  let search = cart.find((x) => x.id === selectedItem);
  if (search === undefined) return
  else if (search.number === 0) return
  else {
    search.number -= 1;
  }
  updateCart(selectedItem)
  cart = cart.filter((x) => x.number !== 0);
  cartItems()
  cartView()
  removeAllItems()
  generateShop()
  newGenerateShop()
  localStorage.setItem("data", JSON.stringify(cart))
}

//   updateCart
let updateCart = (id) => {
  let search = cart.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.number;
  caculation();
  totalPrice()
}

//remove item from cart
let removeItem = (id) => {
  let selectedItem;
  id[0] === undefined ? selectedItem = id.id : selectedItem= id[0].id;
  cart = cart.filter((x) => x.id !== selectedItem)
  cartItems()
  cartView()
  caculation()
  removeAllItems()
  totalPrice()
  localStorage.setItem("data", JSON.stringify(cart))
}
  
//removeAllItems & total price
let removeAllItems = () => {
  let iconCart = document.querySelector(".nums-cart");
  if (iconCart.innerHTML === "0") {
    cartProducts.innerHTML = ""
  } 
}
removeAllItems()

//calc total price
let totalPrice = () => {
  if (cart.length !==0) {
    let allPrice = cart.map((x) => {
      let { id, number } = x
      let search = myAllShopsAndPlants.find((y) => y.id === id) || [];
      return number * search.price;
    }).reduce((x, y) => x + y || 0);
    totalAmount.innerHTML = `$ ${allPrice}`;
  }else {
    totalAmount.innerHTML = `$0`;
  }
}
totalPrice()
////////////////////////////////////////////
//function to show and remove icon-cart
///////////////////////////////////////////// 
document.querySelector(".icon-cart").addEventListener("click", () => {
  shopCart.classList.toggle("active")
  document.querySelector(".home-cart").classList.toggle("active");
})
document.querySelector(".close").addEventListener("click", () => {
  shopCart.classList.toggle("active")
  document.querySelector(".home-cart").classList.toggle("active");
})



///////////////////////////////////////////
//function to move birthday flowers//
//when on click birthDay button in home page
////////////////////////////////////////////
let birthData = JSON.parse(localStorage.getItem("birth")) || []
let moveBirthFlower = () => {
  window.location.href = "shop.html#birth";
  birthData.push({
    connect: true,
  })
  localStorage.setItem("birth", JSON.stringify(birthData))
}
//delete birthData from localstorage
let deleteBirthData = () => localStorage.removeItem('birth')

////////////////////////////////////////
//move To Product details page
///////////////////////////////

window.addEventListener(('load'), () => {
  document.querySelectorAll(".item-product .img").forEach((x) => {
    x.onclick = () => {
      window.location.href = "details.html";
      productSingl .push({
        id: (x.parentElement).id,
        number: 1
      })
      localStorage.setItem("product", JSON.stringify(productSingl));
    }
  })
})

if (productSingl .length > 1) {
  productSingl = [productSingl[(productSingl.length) - 1]]
  localStorage.setItem("product", JSON.stringify(productSingl));
}

//////////////////////////////////////////////////////////////////////////
//move To Product shop page and plants from click collection picture
///////////////////////////////////////////////////////////////////
let moveToShop = () => window.location.href = "shop.html";
let moveToPlants = () => window.location.href = "plants.html";
// move to our company services from click btn-services
let moveToCompany = () => window.location.href = "aboutUs.html";
//move to account page from checkout buttom
let moveToAccount = () => window.location.href = "account.html";
//move to view cart page from view cart buttom
let moveToViewCart =() => window.location.href = "viewCart.html";
///////////////////////
// creating year
//////////////////////////
let creatYear = document.querySelector(".creating-year");
const myDate = new Date();
let year = myDate.getFullYear();
creatYear.innerHTML = year;
