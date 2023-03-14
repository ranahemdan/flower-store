//loading page
window.addEventListener("load", () =>{
  const loader = document.querySelector(".loader-section");
  loader.classList.add("hidden");
});
//selecting required element of main navbar
window.addEventListener(("load"), () => {
  ourItems.querySelector('.active').classList.remove('active');
  document.getElementById("company").classList.add("active")
})

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

///////////////////////
// creating year
//////////////////////////
let creatYear = document.querySelector(".creating-year");
const myDate = new Date();
let year = myDate.getFullYear();
creatYear.innerHTML = year;