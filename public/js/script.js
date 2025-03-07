const currentPage = document.getElementById("current");
const dropdown = document.getElementById("dropdown");
const nav = document.getElementsByTagName("nav")[0];

function updateDropdown() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 565) {
    if (dropdown.style.display === "block") {
      dropdown.style.position = "relative";
      dropdown.style.backgroundColor = "rgb(0, 162, 255)";
      nav.style.backgroundColor = "rgb(0, 162, 255)";
    } else {
      dropdown.style.display = "none";
      dropdown.style.backgroundColor = "rgb(140, 213, 255)";
      nav.style.backgroundColor = "rgb(140, 213, 255)";
    }
  } else {
    dropdown.style.display = "flex";
    dropdown.style.flexDirection = "row";
    dropdown.style.justifyContent = "center";
    dropdown.style.position = "relative";
    dropdown.style.width = "100%";
    nav.style.backgroundColor = "rgb(140, 213, 255)";
  }

  currentPage.addEventListener("click", () => {
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
      nav.style.backgroundColor = "rgb(140, 213, 255)";
    } else {
      dropdown.style.display = "block";
      updateDropdown();
    }
  });
}

window.addEventListener("resize", updateDropdown);

// Initial call to set the correct state on page load
updateDropdown();