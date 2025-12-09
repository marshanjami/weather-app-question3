// City coordinates mapping
const cityCoordinates = {
  nairobi:     { lat: -1.2864,  lon: 36.8172,  name: "Nairobi, Kenya" },
  london:      { lat: 51.5074,  lon: -0.1278,   name: "London, UK" },
  "new york":  { lat: 40.7128,  lon: -74.0060, name: "New York, USA" },
  tokyo:       { lat: 35.6762,  lon: 139.6503, name: "Tokyo, Japan" },
  sydney:      { lat: -33.8688, lon: 151.2093, name: "Sydney, Australia" },
  paris:       { lat: 48.8566,  lon: 2.3522,   name: "Paris, France" },
  "cape town": { lat: -33.9249, lon: 18.4241, name: "Cape Town, South Africa" },
  mumbai:      { lat: 19.0760,  lon: 72.8777, name: "Mumbai, India" }
};


const PLACEHOLDER_ICON = "https://cdn-icons-png.flaticon.com/512/4052/4052984.png"; // Simple gray cloud

// Weather code descriptions
const weatherDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  61: "Light rain",
  63: "Moderate rain",
  80: "Rain showers",
  95: "Thunderstorm"
};

// DOM Elements
const cityInput     = document.getElementById('cityInput');
const searchBtn      = document.getElementById('searchBtn');
const loading        = document.getElementById('loading');
const weatherResult  = document.getElementById('weatherResult');
const errorMsg       = document.getElementById('errorMsg');
const cityNameEl   = document.getElementById('cityName');
const tempEl         = document.getElementById('temp');
const windEl         = document.getElementById('wind');
const iconEl         = document.getElementById('icon');

// Helper: Reset UI state
const resetUI = () => {
  loading.classList.add('hidden');
  weatherResult.classList.add('hidden');
  errorMsg.classList.add('hidden');
  errorMsg.textContent = '';
};

// Helper: Show error
const showError = (msg) => {
  resetUI();
  errorMsg.textContent = msg;
  errorMsg.classList.remove('hidden');
};

// Main async function
const fetchWeather = async (city) => {
  const query = city.trim().toLowerCase();

  if (!query) {
    showError('Please enter a city name.');
    return;
  }

  const coords = cityCoordinates[query];
  if (!coords) {
    showError('City not supported. Try: Nairobi, London, Tokyo, Paris, etc.');
    return;
  }

  resetUI();
  loading.classList.remove('hidden');

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`;
    const response = await fetch(url);

    if (!response.ok) throw new Error('Server error');

    const data = await response.json();

    // Update UI
    cityNameEl.textContent = coords.name;
    tempEl.textContent = data.current_weather.temperature;
    windEl.textContent = data.current_weather.windspeed;

    iconEl.src = PLACEHOLDER_ICON;
    iconEl.alt = "Weather condition";

    loading.classList.add('hidden');
    weatherResult.classList.remove('hidden');

  } catch (err) {
    let message = 'Failed to fetch weather data.';
    if (!navigator.onLine) message = 'No internet connection.';
    showError(message);
  }
};

// Event Listeners
searchBtn.addEventListener('click', () => fetchWeather(cityInput.value));

cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') fetchWeather(cityInput.value);
});

// Load Nairobi on first visit
window.addEventListener('load', () => {
  cityInput.value = 'Nairobi';
  fetchWeather('Nairobi');
});