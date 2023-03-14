//scroll-up-btn top page & show and hidden scrollBtn
let scrollUpBtn = document.querySelector('.scroll-up'); 
let btnUp = ()=> {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
window.onscroll = () => scrollFunction();

let scrollFunction=() => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollUpBtn.style.opacity = "1";
  } else {
    scrollUpBtn.style.opacity= "0";
  }
}
//////////////////////
//auto slider home
////////////////////////
//auto slider
let count = 1;
let radioCheck = document.querySelectorAll('.slids input').length;
// function auto slider
let myAutoslider = setInterval(function () {
  document.getElementById('rad' + count).checked = true;
  count++;
  if (count > radioCheck) {
    count = 1;
  }
}, 5000);
/////////////////////
//create the items
////////////////////////

//function to create the main items in shop
generateShop = () => {
  return (shop.innerHTML = shopItemsData.map((item) => {
    let { id, dataName, imgSrc, name, price } = item;
    return `
    <div id=${id} class="main-product item-product" data-name=${dataName}>
      <div class="img">
        <img src="${imgSrc}" alt=${name}/>
        <div class = "quick-view"> 
          <button> quick view </button>
        </div>
      </div>
      <div class="contain">    
        <h3>${name}</h3> 
        <div class="price">     
          <span> $${Math.ceil(price*1.2)} </span>
          <span>  $${price}  </span>
        </div>  
        <div class="btn-add-cart" id="btn-${id}" onclick = addProducts(${id})> add to cart </div>
      </div>
    </div>
`
  }).join("")
  )
}
generateShop()


//function to create the new items in shop
let newShop = document.querySelector(".new-shop .container ");

newGenerateShop = () => {
  return (newShop.innerHTML = shopItemsNew.map((item) => {
    let { id, imgSrc, name, price } = item;
    return `
    <div id=${id} class="new item-product transition">
      <div class="img">
        <img src= ${imgSrc} alt=${name}/>
      </div>
      <div class="content2">
        <h3 class="capitalize">${name}</h3>
        <span> $${price} </span>
        <button class="genral-btn capitalize transition"  id=new-btn-"${id}" onclick = addProducts(${id})>add cart</button>
      </div>
    </div>
`
  }).join("")
  )
}
newGenerateShop()

////////get Random For Order Item/////////////
function getRndForOrderItem(min, max) {
  let itemProduct = document.querySelectorAll(".main-product");
  itemProduct.forEach((item) => {
    item.style.order=`${Math.floor(Math.random() * (max - min + 1) ) + min}`
  })
}
getRndForOrderItem(1, 25)

///////////////////////////////////
//A Product Carousel Slider
//////////////////////////////////

//variables
let myItemProduct = document.querySelectorAll(".item-product")
let preBtn = document.querySelector(".fa-chevron-left")
let nxtBtn = document.querySelector(".fa-chevron-right")

  // showing and hiding prev/next icon according to carousel scroll left value
let showHideIcons = () => {
  shop.addEventListener("mousemove", () => {
    let scrollingWidth = shop.scrollWidth - shop.clientWidth; // getting max scrollable width
    let scrollingLeft = shop.scrollLeft; // getting scrollable left
    preBtn.style.display = scrollingLeft == 0 ? "none" : "flex";
    nxtBtn.style.display = Math.ceil(scrollingLeft) == scrollingWidth ? "none" : "flex";
    })
  }
showHideIcons()
  
  //auto play  Carousel slider

let autoPlay = () => {
  let scrollingWidth = shop.scrollWidth - shop.clientWidth;
  if (shop.scrollLeft > (scrollingWidth - 1)) {
    shop.scrollLeft -= scrollingWidth;
    clearInterval(playSlider)
    
  }else {
    shop.scrollLeft += 4;
    shop.style.scrollBehavior="smooth";
  }
}
let playSlider = setInterval(autoPlay, 50);

// //function Carousel Slider
myItemProduct.forEach((item) => {
  item.addEventListener("mouseover", () => clearInterval(playSlider)); //pause the item when hover
  item.addEventListener("mouseout", () => playSlider = setInterval(autoPlay, 50));
  let allContainer = item.getBoundingClientRect()
  let containerWidth = allContainer.width
  preBtn.addEventListener("click", () => {
    clearInterval(playSlider)
    shop.scrollLeft -= containerWidth + 20;

})
  nxtBtn.addEventListener("click", () => {
    clearInterval(playSlider)
    shop.scrollLeft += containerWidth + 20;
})
});







