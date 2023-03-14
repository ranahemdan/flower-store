//selecting required element of main navbar
window.addEventListener(("load"), () => {
    ourItems.querySelector('.active').classList.remove('active');
    document.getElementById("store").classList.add("active")
})

//variables
let shoppingProducts = document.getElementById("shop-items");
cartItems();
//////////////////////////////////////
//function to create the shop items
////////////////////////////////
let shopProducts = () => {
  return (shoppingProducts.innerHTML = myAllShops.map((item) => {
    let { id, dataName, imgSrc, name, price } = item;
    return `
    <div id=${id} class="item-product" data-name=${dataName}>
      <div class="img">
        ${dataName === "new" ? `<span class="new" > new </span>` : ""}
        <img src="${imgSrc}" alt=${name}/>
        <div class = "quick-view"> 
          <button> quick view </button>
        </div>
      </div>
      <div class="contain">    
        <h3 class="flower-name">${name}</h3> 
        <div class="price">     
          <span class = "main-price">  $${price}  </span>
        </div>  
        <div class="btn-add-cart" id="${id}" onclick = addProducts(${id})> add to cart </div>
      </div>
    </div>
`

  }).join("")
  )
}
shopProducts()


////////get Random For Order Item/////////////
function getRndForOrderItem(min, max) {
  let itemProduct = document.querySelectorAll(".item-product");
  itemProduct.forEach((item) => {
    item.style.order=`${Math.floor(Math.random() * (max - min + 1) ) + min}`
  })
}
getRndForOrderItem(1, 25)

////////////////////////////
//show less and more products
//////////////////////////////
let products = document.querySelectorAll(".item-product");
let btnSeeMore = document.querySelector(".see-more");
function moreAndLess() {
  if (products.length >= 8) {
    for (let i = 8; i < products.length; i++) {
      const element = products[i];
      element.classList.add("hide");
      btnSeeMore.addEventListener('click', () => {
        element.classList.toggle("hide");
        element.classList.toggle("show");
        element.classList.contains("hide") ? btnSeeMore.innerHTML = "see more" : btnSeeMore.innerHTML = "see less";
      })
    }
  } 
}
moreAndLess()
/////////////////////////////////////////////////////////
//selecting all required elements and fillter products
let filterItems = document.querySelector('.all-items');
window.onload = () => {
  filterItems.onclick = (selectedItem) => {
    if (selectedItem.target.classList.contains('itm')) {
      filterItems.querySelector('.active').classList.remove('active');
      selectedItem.target.classList.add('active');
      //filter images
      let filterName = selectedItem.target.getAttribute('data-name');
      products.forEach((item) => {
        let productName = item.getAttribute('data-name');
        if (productName === filterName) {
            item.classList.remove('hide');
            item.classList.add('show');
            btnSeeMore.style.display = "none";
          }
        else if (filterName === "all") {
          item.classList.remove('hide');
          item.classList.add('show');
          btnSeeMore.style.display = "block";
          btnSeeMore.innerHTML = "see less"
        }
        else {
          item.classList.add('hide');
          item.classList.remove('show');
        }
      });
    }
  }
}
///////////////////////////////////////////
//function to move birthday flowers
//when on click birthDay button in home page
////////////////////////////////////////////

let searchConnect = birthData.find((y) => y)
const funcBirthBtn = () => {
  if (searchConnect.connect === true) {
    document.querySelectorAll(".itm").forEach((selectedItem) => {
      selectedItem.classList.remove('active');
      let birthSelect = document.getElementById("birth");
      birthSelect.classList.add('active');
      //filter images
      let filterBirth = birthSelect.getAttribute('data-name');
      products.forEach((item) => {
        let productName = item.getAttribute('data-name');
        if (productName === filterBirth) {
          item.classList.remove('hide');
          item.classList.add('show');
          btnSeeMore.style.display = "none";
        }else {
          item.classList.add('hide');
          item.classList.remove('show');
        }
      })
      })
  }
}
if (searchConnect != undefined) {
  funcBirthBtn()
}

////////////////////////////////////////
//function for search about products
////////////////////////////////////////
let search = document.getElementById("search-products");
//func
let searchProducts = () => {
  myAllShops.forEach((x, y) => {
    let searchBox = (search.value.toUpperCase()).trim();
    let productDataName = (products[y].getAttribute('data-name')).toUpperCase();
    let noResult = document.querySelector(".search .no-result");
    let result = myAllShops.filter((i) => (i.name.toUpperCase()).includes(searchBox))
    ////hide and show result message 
    if (productDataName.indexOf(searchBox) > -1) {
      noResult.classList.add('hide');
      noResult.classList.remove('show');
    } else if (result.length === 0) {
      noResult.classList.add('show');
      noResult.classList.remove('hide');
    } else {
      noResult.classList.add('hide');
      noResult.classList.remove('show');
    }
    //hide and show products through search
    if ((x.name.toUpperCase()).indexOf(searchBox) > -1 || productDataName.indexOf(searchBox) > -1) {
      products[y].classList.remove('hide');
      products[y].classList.add('show');
      if (searchBox === productDataName) {
        filterItems.querySelector('.active').classList.remove('active');
        document.querySelector(`[data-name = "${searchBox.toLowerCase()}"]`).classList.add('active');
      }
    } else {
      products[y].classList.add('hide');
      products[y].classList.remove('show');
      btnSeeMore.style.display = "none";
    }
  })
};
document.getElementById("btn-for-search").onclick = (e) => {
  e.preventDefault()
  searchProducts()
}















