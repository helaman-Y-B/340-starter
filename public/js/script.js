// Script for the dropdown menu on the mobile version of the website

const currentPage = document.getElementById("current");
const dropdown = document.getElementById("dropdown");
const nav = document.getElementsByTagName("nav")[0];

// Function to update the dropdown menu based on the screen width
function updateDropdown() {
  const screenWidth = window.innerWidth;

  // If the screen width is less than 565px, the dropdown menu will be displayed as a block
  // Otherwise, the dropdown menu will be displayed as a flex container
  if (screenWidth < 565) {

    // If the dropdown menu is already displayed as a block, the position and background color will be changed
    // Otherwise, the dropdown menu will be displayed as a block and the background color will be changed
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

  // Event listener for the current page button
  currentPage.addEventListener("click", () => {

    // If the dropdown menu is displayed as a block, it will be hidden and the background color will change
    // Otherwise, the dropdown menu will be displayed as a block and the background color will be updated
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
      nav.style.backgroundColor = "rgb(140, 213, 255)";
    } else {
      dropdown.style.display = "block";
      updateDropdown();
    }
  });
}

// Event listener for the window resize event
window.addEventListener("resize", updateDropdown);

// Initial call to set the correct state on page load
updateDropdown();