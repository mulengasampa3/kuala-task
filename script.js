document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch data from API and update the card count
    function fetchData(url, preloaderId, countId) {
        // Show the preloader and hide the actual number
        document.getElementById(preloaderId).style.display = 'block';
        document.getElementById(countId).style.display = 'none';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Hide the preloader and show the actual number
                document.getElementById(preloaderId).style.display = 'none';
                document.getElementById(countId).style.display = 'block';
                document.getElementById(countId).textContent = data.data.length;
            })
            .catch(error => {
                // Hide the preloader and show the error message with the SVG icon
                document.getElementById(preloaderId).style.display = 'none';
                document.getElementById(countId).style.display = 'block';
                document.getElementById(countId).innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-emoji-tear-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M9.5 3.5a.5.5 0 0 0 .5.5c.838 0 1.65.416 2.053 1.224a.5.5 0 1 0 .894-.448C12.351 3.584 11.162 3 10 3a.5.5 0 0 0-.5.5M7 6.5C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5M4.5 13c.828 0 1.5-.746 1.5-1.667 0-.706-.882-2.29-1.294-2.99a.238.238 0 0 0-.412 0C3.882 9.044 3 10.628 3 11.334 3 12.253 3.672 13 4.5 13M8 11.197c.916 0 1.607.408 2.25.826.212.138.424-.069.282-.277-.564-.83-1.558-2.049-2.532-2.049-.53 0-1.066.361-1.536.824q.126.27.232.535.069.174.135.373A3.1 3.1 0 0 1 8 11.197M10 8c.552 0 1-.672 1-1.5S10.552 5 10 5s-1 .672-1 1.5S9.448 8 10 8M6.5 3c-1.162 0-2.35.584-2.947 1.776a.5.5 0 1 0 .894.448C4.851 4.416 5.662 4 6.5 4a.5.5 0 0 0 0-1"/>
                    </svg> 
                    <br>
                    <span class="failed">Failed to load</span>
                    `;
                console.error('Error fetching data:', error);
            });
    }

    // API endpoints
    const makesUrl = 'https://whitebook-engine.kuala.io/get-vehicle-makes';
    const modelsUrl = 'https://whitebook-engine.kuala.io/model';
    const variantsUrl = 'https://whitebook-engine.kuala.io/get-vehicle-variants/24';

    // Fetch data for each endpoint and update the respective card
    fetchData(makesUrl, 'preloader-vehicle-make', 'load-vehicle-make');
    fetchData(modelsUrl, 'preloader-vehicle-model', 'load-vehicle-model');
    fetchData(variantsUrl, 'preloader-vehicle-variant', 'load-vehicle-variant');
});

/*Small screen dropdown of navbar*/
document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelector(".nav-links");
    const navLinkBtn = document.querySelector(".minize-btn");

    navLinkBtn.addEventListener("click", function() {
        navLinks.classList.toggle("active");
    });

    document.addEventListener("click", function(event) {
        const isClickInside = navLinks.contains(event.target) || navLinkBtn.contains(event.target);

        if (!isClickInside && navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
        }
    });
});