<template>
  <div class="app" id="app">
    <div class="app__setting">
      <div class="app__date">{{ dateBuilder() }}</div>
      <div
        class="app__setting-icon"
        :class="{ 'app__setting-icon_close': showSetting }"
        @click="openSetting"
      ></div>
    </div>

    <Setting v-show="showSetting" />

    <template v-if="weathers && !showSetting">
      <Weather
        v-for="(weather, idx) in weathers"
        :key="idx"
        :weather="weather"
      />
    </template>
  </div>
</template>

<script>
import Setting from "./components/Setting.vue";
import Weather from "./components/Weather.vue";

export default {
  name: "App",
  data() {
    return {
      showSetting: false,
      weathers: [],
    };
  },
  created() {
    // localStorage.weathers = "";
    if (localStorage.weathers) {
      this.$store.dispatch("downloadWeathers");
      this.weathers = this.$store.getters.weathers;
    }

    if (navigator.geolocation) {
      console.log("Геолокация доступна");
      navigator.geolocation.getCurrentPosition(
        function (position) {
          /*
        position = {
            coords: {
                latitude - Широта.
                longitude - Долгота.
                altitude - Высота в метрах над уровнем моря.
                accuracy - Погрешность в метрах.
                altitudeAccuracy - Погрешность высоты над уровнем моря в метрах.
                heading - Направление устройства по отношению к северу.
                speed - Скорость в метрах в секунду.
            }
            timestamp - Время извлечения информации.
        }
        */
          console.log("Геолокация доступна");
          this.$store.dispatch("fetchWeatherByLL", [
            position.coords.latitude,
            position.coords.longitude,
          ]);
          this.weathers = this.$store.getters.weathers;
        },

        function (error) {
          console.log("Геолокация не доступна", error);
        }
      );
    } else {
      console.log("Геолокация не доступна");
    }

    window.addEventListener("beforeunload", this.leaving);
  },
  methods: {
    openSetting() {
      if (this.showSetting) this.weathers = this.$store.getters.weathers;
      this.showSetting = !this.showSetting;
    },
    leaving() {
      localStorage.weathers = JSON.stringify(this.$store.getters.weathers);
      // localStorage.setItem("weathers", this.$store.getters.weathers);
    },
    dateBuilder() {
      let d = new Date();
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
    },
  },
  components: {
    Weather,
    Setting,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  transition: 0.4s;
  padding: 10px 25px;

  &__setting {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__date {
    font-size: 20px;
    font-weight: 300;
  }
  &__setting-icon {
    width: 35px;
    height: 35px;
    background: url("./assets/settings.svg") no-repeat center;
    background-size: cover;
    &_close {
      background: url("./assets/close.svg") no-repeat center;
    }
  }
}

@media (max-width: 640px) {
  .app {
    padding: 10px 5px;
  }
}
</style>
