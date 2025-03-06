const currentPage = document.getElementById("current");
currentPage.addEventListener("click", () => {
  const dropdown = document.getElementById("dropdown");

  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
    document.getElementsByTagName("nav")[0].style.backgroundColor = "rgb(140, 213, 255)"; 
  } else {
    dropdown.style.display = "block";
    dropdown.style.position = "relative";
    dropdown.style.backgroundColor = "rgb(0, 162, 255)";
    document.getElementsByTagName("nav")[0].style.backgroundColor = "rgb(0, 162, 255)"; 
  }
});