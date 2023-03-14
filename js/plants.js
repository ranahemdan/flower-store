//selecting required element of main navbar
window.addEventListener(("load"), () => {
  ourItems.querySelector('.active').classList.remove('active');
  document.getElementById("store").classList.add("active")
})
//////////////////////////////////////
//function to create the shop items
////////////////////////////////
let shopPlants = document.getElementById("shop-plants");
let plantsProducts = () => {
  return (shopPlants.innerHTML = plantsData.map((item) => {
    let { id, dataName, imgSrc, name, price } = item;
    return `
    <div id=${id} class="item-plant item-product" data-name=${dataName}>
      <div class="img">
        <img class="transition" src="${imgSrc}" alt=${name}/>
      </div>
      <div class="contain">    
        <h3 class="flower-name upper-case">${name}</h3> 
        <div class="price">     
          <span class = "main-price">  $${price}  </span>
        </div>  
        <div class="btn-add-cart upper-case transition" id="${id}" onclick = addProducts(${id})> add to cart </div>
      </div>
    </div>
`

  }).join("")
  )
}
plantsProducts()


////////get Random For Order Item/////////////
function getRndForOrderItem(min, max) {
  let itemPlant = document.querySelectorAll(".item-plant");
  itemPlant.forEach((item) => {
    item.style.order=`${Math.floor(Math.random() * (max - min + 1) ) + min}`
  })
}
getRndForOrderItem(1, 25)
////////////////////////////
//show less and more products
//////////////////////////////
let productPlants = document.querySelectorAll(".item-plant");
let btnSeeMore = document.querySelector(".see-more");
function moreAndLessP() {
  if (productPlants.length >= 8) {
    for (let i = 8; i < productPlants.length; i++) {
      let element = productPlants[i];
      element.classList.add("hide");
      btnSeeMore.addEventListener('click', () => {
        element.classList.toggle("hide");
        element.classList.toggle("show");
        element.classList.contains("hide") ? btnSeeMore.innerHTML = "see more" : btnSeeMore.innerHTML = "see less";
      })
    }
  } 
}
moreAndLessP()

////////////////////////////////////////
//function for search about products
////////////////////////////////////////
let search = document.getElementById("search-products");
//func
let searchProducts = () => {
  plantsData.forEach((x, y) => {
    let searchBox = (search.value.toUpperCase()).trim();
    let noResult = document.querySelector(".search .no-result");
    let result = plantsData.filter((i) => (i.name.toUpperCase()).includes(searchBox))
    // ////hide and show result message 
    console.log(noResult);
    if (result.length === 0) {
      noResult.classList.remove('hide');
      noResult.classList.add('show');
    } else {
      noResult.classList.add('hide');
      noResult.classList.remove('show');
    }
    //hide and show products through search
    if ((x.name.toUpperCase()).indexOf(searchBox) > -1) {
      productPlants[y].classList.remove('hide');
      productPlants[y].classList.add('show');
    } else {
      productPlants[y].classList.add('hide');
      productPlants[y].classList.remove('show');
      btnSeeMore.style.display = "none";
    }
  })
};
document.getElementById("btn-for-search").onclick = (e) => {
  e.preventDefault()
  searchProducts()
}
