document.addEventListener('DOMContentLoaded', function() {
    const infoDiv = document.getElementById('info');

    // Function to fetch country data
    function fetchCountryData() {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // For testing: log data to console
                displayCountries(data);
            })
            .catch(e => {
                infoDiv.innerHTML = "Failed to fetch countries: " + e.message;
            });
    }

    // Function to display countries data
    function displayCountries(countries) {
        countries.forEach(country => {
            const div = document.createElement('div');
            div.innerHTML = `Country: ${country.name.common}`;
            infoDiv.appendChild(div);
        });
    }

    fetchCountryData();
});

document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map', {
        center: [51.505, -0.09],  // Center of the map
        zoom: 2,  // Initial zoom level
        maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),  // Setting bounds
        minZoom: 2,
        maxBoundsViscosity: 1.0
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    fetchCountries(map);
});



function fetchCountries(map) {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                const latlng = [country.latlng[0], country.latlng[1]];
                L.marker(latlng).addTo(map)
                    .bindPopup(`<b>${country.name.common}</b><br>Population: ${country.population}`)
                    .openPopup();
            });
        })
        .catch(e => console.error('Error fetching country data: ', e));
}

