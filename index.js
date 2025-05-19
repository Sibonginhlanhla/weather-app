async function getWeather(name) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${name}?key=TVVHQTE3VSX82P54FBNEX9RPK`
  );
  const locationName = await response.json();
  return locationName.currentConditions;
}

function displayCurrentConditions(current) {
  const content = document.querySelector("#content");
  content.innerHTML = ""; // clear old data

  const container = document.createElement("div");
  container.className = "weather-card";

  // Create icon
  const icon = document.createElement("img");
  icon.src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${current.icon}.png`;
  icon.alt = current.conditions;
  icon.className = "weather-icon";

  // Create text nodes
  const condition = document.createElement("h2");
  condition.textContent = current.conditions;

  const temp = document.createElement("p");
  temp.textContent = `Feels Like: ${current.feelslike}°F`;

  const humidity = document.createElement("p");
  humidity.textContent = `Humidity: ${current.humidity}%`;

  const pressure = document.createElement("p");
  pressure.textContent = `Pressure: ${current.pressure} hPa`;

  const dew = document.createElement("p");
  dew.textContent = `Dew Point: ${current.dew}°F`;

  const cloud = document.createElement("p");
  cloud.textContent = `Cloud Cover: ${current.cloudcover}%`;

  const time = document.createElement("p");
  time.textContent = `Time: ${current.datetime}`;

  const precip = document.createElement("p");
  precip.textContent = `Precipitation: ${current.precip} mm`;

  // Append all to container
  container.appendChild(icon);
  container.appendChild(condition);
  container.appendChild(temp);
  container.appendChild(humidity);
  container.appendChild(pressure);
  container.appendChild(dew);
  container.appendChild(cloud);
  container.appendChild(time);
  container.appendChild(precip);

  // Append to content
  content.appendChild(container);
}

const search = document.querySelector("button");
search.addEventListener("click", () => {
  const location = document.querySelector("input").value.trim();
  if (!location) {
    alert("Please enter a location.");
    return;
  }

  getWeather(location)
    .then(displayCurrentConditions)
    .catch(() => alert("Failed to fetch weather: Invalid location"));
});
