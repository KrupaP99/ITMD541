/**
 * app.js – Solar Dashboard
 * ITMD 441/541 Lab 6
 *
 * Handles:
 *  - City select list (441 requirement)
 *  - Geolocation / Current Location button (541 requirement)
 *  - Fetch from SunriseSunset.io API (today + tomorrow)
 *  - Dynamic UI updates without page reload
 *  - Error handling with descriptive messages
 */

"use strict";

/* ─────────────────────────────────────────
   API helper
───────────────────────────────────────── */
const BASE_URL = "https://api.sunrisesunset.io/json";

/**
 * Fetch sunrise/sunset data for a given date.
 * @param {number} lat  - Latitude
 * @param {number} lng  - Longitude
 * @param {string} date - 'today' | 'tomorrow' | 'YYYY-MM-DD'
 * @returns {Promise<Object>} API results object
 */
async function fetchSolarData(lat, lng, date) {
  const url = `${BASE_URL}?lat=${lat}&lng=${lng}&date=${date}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Network response was not OK (status ${response.status})`);
  }
  const json = await response.json();
  if (json.status !== "OK") {
    throw new Error(`API returned status: ${json.status}`);
  }
  return json.results;
}

/* ─────────────────────────────────────────
   DOM References
───────────────────────────────────────── */
const citySelect     = document.getElementById("city-select");
const btnCity        = document.getElementById("btn-city");
const btnGeo         = document.getElementById("btn-geo");
const errorBanner    = document.getElementById("error-banner");
const errorMessage   = document.getElementById("error-message");
const errorClose     = document.getElementById("error-close");
const loadingEl      = document.getElementById("loading");
const locationLabel  = document.getElementById("location-label");
const locationName   = document.getElementById("location-name-text");

/* ─────────────────────────────────────────
   UI State Helpers
───────────────────────────────────────── */
function showError(msg) {
  errorMessage.textContent = msg;
  errorBanner.classList.remove("hidden");
  loadingEl.classList.add("hidden");
}

function hideError() {
  errorBanner.classList.add("hidden");
}

function showLoading() {
  hideError();
  loadingEl.classList.remove("hidden");
}

function hideLoading() {
  loadingEl.classList.add("hidden");
}

function showLocationLabel(name) {
  locationName.textContent = name;
  locationLabel.classList.remove("hidden");
}

/**
 * Set a stat value with a small animation.
 * @param {string} statId - ID of the parent .stat element
 * @param {string} value  - Text to display
 */
function setStat(statId, value) {
  const el = document.querySelector(`#${statId} .stat__value`);
  if (!el) return;
  el.classList.remove("updated", "placeholder");
  // Force reflow to restart animation
  void el.offsetWidth;
  el.textContent = value || "—";
  el.classList.add("updated");
}

/**
 * Populate all stats for one day card.
 * @param {string} prefix  - 'today' | 'tomorrow'
 * @param {Object} results - API results object
 */
function populateDayCard(prefix, results) {
  // Date display
  const dateEl = document.getElementById(`${prefix}-date`);
  if (dateEl) dateEl.textContent = results.date || "";

  setStat(`${prefix}-sunrise`,    results.sunrise    || "N/A");
  setStat(`${prefix}-sunset`,     results.sunset     || "N/A");
  setStat(`${prefix}-dawn`,       results.dawn       || "N/A");
  setStat(`${prefix}-dusk`,       results.dusk       || "N/A");
  setStat(`${prefix}-solar-noon`, results.solar_noon || "N/A");
  setStat(`${prefix}-day-length`, results.day_length || "N/A");
  setStat(`${prefix}-timezone`,   results.timezone   || "N/A");
}

/**
 * Reset all stats back to placeholder dashes.
 * Called before a new fetch so there is never stale data visible.
 */
function resetCards() {
  const allValues = document.querySelectorAll(".stat__value");
  allValues.forEach(el => {
    el.textContent = "—";
    el.classList.remove("updated");
    el.classList.add("placeholder");
  });
  document.getElementById("today-date").textContent    = "—";
  document.getElementById("tomorrow-date").textContent = "—";
  locationLabel.classList.add("hidden");
}

/* ─────────────────────────────────────────
   Main fetch + render pipeline
───────────────────────────────────────── */
async function loadData(lat, lng, displayName) {
  resetCards();
  showLoading();

  try {
    // Fetch today and tomorrow in parallel
    const [todayResults, tomorrowResults] = await Promise.all([
      fetchSolarData(lat, lng, "today"),
      fetchSolarData(lat, lng, "tomorrow"),
    ]);

    populateDayCard("today",    todayResults);
    populateDayCard("tomorrow", tomorrowResults);
    showLocationLabel(displayName);
  } catch (err) {
    console.error(err);
    showError(
      `Could not fetch solar data: ${err.message}. ` +
      `Please check your connection and try again.`
    );
  } finally {
    hideLoading();
  }
}

/* ─────────────────────────────────────────
   Event: City Select button
───────────────────────────────────────── */
btnCity.addEventListener("click", () => {
  hideError();
  const val = citySelect.value;
  if (!val) {
    showError("Please select a city from the list before clicking Get Data.");
    return;
  }

  const [lat, lng] = val.split(",").map(Number);
  const cityName   = citySelect.options[citySelect.selectedIndex].text;
  loadData(lat, lng, cityName);
});

// Also allow triggering via Enter on the select element
citySelect.addEventListener("change", () => {
  // Auto-trigger fetch on selection change for quick UX
  if (citySelect.value) {
    btnCity.click();
  }
});

/* ─────────────────────────────────────────
   Event: Geolocation button (541 requirement)
───────────────────────────────────────── */
btnGeo.addEventListener("click", () => {
  hideError();

  if (!navigator.geolocation) {
    showError("Geolocation is not supported by your browser. Please use the city select list instead.");
    return;
  }

  showLoading();

  navigator.geolocation.getCurrentPosition(
    // Success
    (position) => {
      const { latitude: lat, longitude: lng } = position.coords;
      loadData(lat, lng, `Your Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
    },
    // Error
    (geoError) => {
      hideLoading();
      let msg = "Could not retrieve your location. ";
      switch (geoError.code) {
        case geoError.PERMISSION_DENIED:
          msg += "Location access was denied. Please allow location access in your browser settings.";
          break;
        case geoError.POSITION_UNAVAILABLE:
          msg += "Location information is unavailable at this time.";
          break;
        case geoError.TIMEOUT:
          msg += "The location request timed out. Please try again.";
          break;
        default:
          msg += "An unknown error occurred.";
      }
      showError(msg);
    },
    // Options
    { timeout: 10000, maximumAge: 60000 }
  );
});

/* ─────────────────────────────────────────
   Event: Dismiss error
───────────────────────────────────────── */
errorClose.addEventListener("click", hideError);
