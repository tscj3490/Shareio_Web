const openCloseNav = () => {
  var x = document.querySelector(".navbar-mob");
  document.querySelector(".container").classList.toggle("change");
  const headerCont = document.querySelector(".header-container");
  const navMobCon = document.querySelector(".nav-mob-con");
  if (x.style.display === "block") {
    x.style.display = "none";
    headerCont.style.borderRadius = "20px";
  } else {
    x.style.display = "block";
    headerCont.style.borderRadius = "20px 20px 0px 0px";
    navMobCon.style.borderRadius = "0px 0px 20px 20px";
  }
};

export default openCloseNav;
