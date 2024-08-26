// Helper function to update the actual number with count-up animation
function updateCount(el, count) {
    let current = 0;
    const increment = Math.ceil(count / 100); // Increment step
    const interval = setInterval(() => {
        if (current >= count) {
            el.textContent = count;
            clearInterval(interval);
        } else {
            current += increment;
            el.textContent = current;
        }
    }, 10);
}

// Function to handle the fetching and updating process
async function fetchDataAndUpdate(url, elementId, isCountNeeded = true) {
    const element = document.getElementById(elementId);
    const preloader = element.previousElementSibling; // .card-preloader

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const count = data.length;

        // Update count with animation
        if (isCountNeeded) {
            updateCount(element, count);
        } else {
            element.textContent = count;
        }

        // Hide preloader and show number
        preloader.style.display = 'none';
        element.style.display = 'flex';
    } catch (error) {
        // Show 'failed to load' message with icon
        element.innerHTML = '<i class="bi bi-emoji-tear-fill"></i> Failed to load!';
        element.style.display = 'flex';
        preloader.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelector(".nav-links");
    const navLinkBtn = document.querySelector(".minize-btn");

    // Toggle nav-links when minimize-btn is clicked
    navLinkBtn.addEventListener("click", function() {
        navLinks.classList.toggle("active");
    });

    // Close nav-links when clicking outside of it
    document.addEventListener("click", function(event) {
        const isClickInside = navLinks.contains(event.target) || navLinkBtn.contains(event.target);

        if (!isClickInside && navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
        }
    });
});

function init() {
    fetchDataAndUpdate('https://whitebook-engine.kuala.io/get-vehicle-makes', 'load-vehicle-make');
    fetchDataAndUpdate('https://whitebook-engine.kuala.io/model', 'load-vehicle-model');
    fetchDataAndUpdate('https://whitebook-engine.kuala.io/get-vehicle-variants/24', 'load-vehicle-variant');
}

// Initialize data fetching on window load
window.addEventListener('load', init); // Call minized function on page load. 1st argument is the minize button, 2nd argument is the navigation links container. 1st argument is the class name of the minize button, 2nd argument is the class name of the navigation links container. 1st argument is the class name of the minize button, 2nd argument is the class name of the navigation links container.
