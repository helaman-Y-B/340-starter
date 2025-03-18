const currentPage = document.getElementById("current");
const navBar = document.getElementById("nav-bar");
const navItems = navBar.querySelectorAll("li:not(#current)");

// Function to update the dropdown menu based on the screen width
function updateDropdown() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 565) {
    navItems.forEach(item => item.style.display = "none");
    currentPage.style.display = "block"; // Always show the current page element
  } else {
    navItems.forEach(item => item.style.display = "inline-block");
    currentPage.style.display = "inline-block"; // Reset to default display for larger screens
  }
}

// Event listener for the current page button
currentPage.addEventListener("click", () => {
  if (navItems[0].style.display === "none") {
    navItems.forEach(item => item.style.display = "block");
  } else {
    navItems.forEach(item => item.style.display = "none");
  }
});

// Event listener for the window resize event
window.addEventListener("resize", updateDropdown);

// Initial call to set the correct state on page load
updateDropdown();