// Restaurant Search Module
const restaurants = [
    'Domino\'s Pizza', 'McDonald\'s', 'KFC', 'Subway', 'Pizza Hut',
    'Burger King', 'Starbucks', 'Cafe Coffee Day', 'Biryani Blues',
    'Haldiram\'s', 'Barbeque Nation', 'Taj Mahal Restaurant',
    'Paradise Biryani', 'Wow! Momo', 'Faasos', 'Behrouz Biryani',
    'The Belgian Waffle Co.', 'Chaayos', 'Rolls Mania', 'Mad Over Donuts'
];

function initSearch() {
    const searchInput = document.getElementById('restaurant-search');
    const suggestionsList = document.getElementById('suggestions-list');
    const searchContainer = document.querySelector('.search-container');

    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        suggestionsList.innerHTML = '';

        if (searchTerm.length === 0) {
            suggestionsList.style.display = 'none';
            return;
        }

        const filtered = restaurants.filter(restaurant => 
            restaurant.toLowerCase().includes(searchTerm)
        );

        if (filtered.length > 0) {
            suggestionsList.style.display = 'block';
            filtered.slice(0, 5).forEach(restaurant => {
                const li = document.createElement('li');
                li.textContent = restaurant;
                li.className = 'suggestion-item';
                
                li.addEventListener('click', function() {
                    searchInput.value = restaurant;
                    suggestionsList.style.display = 'none';
                    showRestaurantNotFound(restaurant);
                });
                
                suggestionsList.appendChild(li);
            });
        } else {
            suggestionsList.style.display = 'block';
            const li = document.createElement('li');
            li.textContent = 'No restaurants found';
            li.className = 'suggestion-item no-results';
            suggestionsList.appendChild(li);
        }
    });

    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target)) {
            suggestionsList.style.display = 'none';
        }
    });

    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                showRestaurantNotFound(searchTerm);
            }
        });
    }

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.trim();
            if (searchTerm) {
                suggestionsList.style.display = 'none';
                showRestaurantNotFound(searchTerm);
            }
        }
    });
}

function showRestaurantNotFound(restaurantName) {
    alert(`Searching for "${restaurantName}"... This is a demo - restaurant details page would load here!`);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
} else {
    initSearch();
}
