async function getdata() {
  const city = document.getElementById("city").value;
  if (city.trim() === "") return;

  let apiKey = "b101bf98f8a04a6b881184850250609";

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
    );
    const data = await response.json();
    let tempc = data.current.temp_c;

    if (tempc > 0) {
      document.getElementById("temp-val").textContent = `+${tempc}°C`;
    } else if (tempc < 0) {
      document.getElementById("temp-val").textContent = `-${tempc}°C`;
    } else {
      document.getElementById("temp-val").textContent = `${tempc}°C`;
    }

    document.getElementById("cityname").textContent = `${data.location.name}`;
    document.getElementById("state").textContent = `${data.location.region}`;

    document.getElementById("tempf").textContent = `Temperature in F : ${data.current.temp_f}`;
    document.getElementById("humidity").textContent = `Humidity : ${data.current.humidity}%`;
    document.getElementById("cloud").textContent = `Cloud : ${data.current.cloud}`;
    document.getElementById("wind").textContent = `Wind : ${data.current.wind_kph} km/h`;
    document.getElementById("uv").textContent = `UV : ${data.current.uv}`;
    document.getElementById("time-bar").textContent = `${data.location.localtime}`;
    document.getElementById("weather-level").textContent = `${data.current.condition.text}`;

    let img = document.getElementById("photo_");
    if (!img) {
      img = document.createElement("img");
      img.id = "photo_";
      document.getElementById("photo").appendChild(img);
    }
    img.src = data.current.condition.icon;
  } catch {
    alert("can't fetch weather for your location");
  }

  document.getElementById("city").value = "";
}

let input = document.getElementById("city");
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getdata();
  }
});
