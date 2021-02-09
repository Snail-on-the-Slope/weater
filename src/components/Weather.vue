<template>
  <div class="weather">
    <div class="weather__subtitle">
      {{ weather.name }}, {{ weather.sys.country }}
    </div>

    <div class="weather__wrap">
      <div class="weather__temp">
        <div class="weather__temp_icon">
          <img
            id="wicon"
            :src="`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`"
            alt="Weather icon"
          />
        </div>
        <div class="weather__temp_text">
          {{ Math.round(weather.main.temp) }}°C
        </div>
      </div>
      <div class="weather__text mb">
        Feels like {{ Math.round(weather.main.feels_like) }}°C.
        {{
          weather.weather[0].description[0].toUpperCase() +
          weather.weather[0].description.slice(1).toLowerCase()
        }}
      </div>
      <div class="weather__block">
        <div class="weather__block mr">
          <div class="weather__icon weather__icon_wind"></div>
          <div class="weather__text">
            {{ Math.round(weather.wind.speed) }}m/s SSE
          </div>
        </div>
        <div class="weather__block">
          <div class="weather__icon weather__icon_pressure"></div>
          <div class="weather__text">{{ weather.main.pressure }}hPa</div>
        </div>
      </div>
      <div class="weather__block">
        <div class="weather__text mr">
          Humidity: {{ weather.main.humidity }}%
        </div>
        <div class="weather__text">Clouds: {{ weather.clouds.all }}%</div>
      </div>
      <div class="weather__text">
        Visibility: {{ +(weather.visibility / 1000).toFixed(1) }}km
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Weather",
  props: ["weather"],
};
</script>

<style scoped lang="scss">
.weather {
  width: 100%;
  margin-bottom: 30px;

  &__subtitle {
    font-size: 32px;
    font-weight: 500;
    text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
  }
  &__wrap {
    display: flex;
    flex-direction: column;
  }
  &__temp {
    display: flex;
    justify-content: center;
    align-items: center;
    &_icon {
      width: 100px;
      height: 100px;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    &_text {
      font-size: 52px;
      font-weight: bold;
    }
  }
  &__text {
    font-size: 24px;
    font-weight: normal;
  }
  &__block {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
  &__icon {
    width: 20px;
    height: 20px;
    &_wind {
      background: url("../assets/wind.svg") no-repeat center;
      background-size: cover;
    }
    &_pressure {
      background: url("../assets/barometer.svg") no-repeat center;
      background-size: cover;
    }
  }
}

.mb {
  margin-bottom: 15px;
}
.mr {
  margin-right: 20px;
}
</style>
