<template>
  <div class="setting">
    <div class="setting__title">Settings</div>

    <div class="setting__weathers" v-if="weathers">
      <draggable
        v-model="weathers"
        group="weathers"
        handle=".weather__icon_menu"
        @start="drag = true"
        @end="
          drag = false;
          chgWeather();
        "
      >
        <div
          class="setting__weather weather"
          v-for="(weather, idx) in weathers"
          :key="idx"
        >
          <div class="weather__icon weather__icon_menu"></div>
          <div class="weather__text">
            {{ weather.name }}, {{ weather.sys.country }}
          </div>
          <div
            class="weather__icon weather__icon_trash"
            @click="deleteWeather(weather.name)"
          ></div>
        </div>
      </draggable>
    </div>

    <div class="setting__search">
      <div class="setting__search-text">Add Location:</div>
      <input
        type="text"
        class="setting__search-bar"
        placeholder="Search..."
        v-model="query"
        @keypress="fetchWeather"
      />
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "app",
  data() {
    return {
      query: "",
      weathers: [],
      drag: false,
    };
  },
  components: {
    draggable,
  },
  created() {
    this.weathers = this.$store.getters.weathers;
  },
  methods: {
    async fetchWeather(e) {
      if (e.key == "Enter") {
        await this.$store.dispatch("fetchWeather", this.query);
        this.query = "";
        this.weathers = this.$store.getters.weathers;
      }
    },
    deleteWeather(item) {
      this.$store.dispatch("deleteWeatherByName", item);
      this.weathers = this.$store.getters.weathers;
    },
    chgWeather() {
      this.$store.dispatch("updateWeathers", this.weathers);
    },
  },
};
</script>

<style scoped lang="scss">
.setting {
  text-align: left;
  &__title {
    font-size: 26px;
    font-weight: bold;
    margin: 25px 0 15px;
  }

  &__weathers {
    width: 100%;
    max-width: 400px;
    margin-bottom: 10px;
  }

  &__search {
    width: 100%;
    margin-bottom: 30px;
    &-text {
      font-size: 24px;
      font-weight: normal;
      margin-bottom: 15px;
    }

    &-bar {
      display: block;
      width: 100%;
      max-width: 290px;
      padding: 15px;

      color: #313131;
      font-size: 20px;

      appearance: none;
      border: none;
      outline: none;
      background: none;

      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
      transition: 0.4s;

      &:focus {
        box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
      }

      @media (max-width: 640px) {
        max-width: calc(100% - 30px);
      }
    }
  }
}

.weather {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px 0;
  background-color: #e3dede;
  &__icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
    &_menu {
      background: url("../assets/menu.svg") no-repeat center;
      background-size: cover;
    }
    &_trash {
      background: url("../assets/delete.svg") no-repeat center;
      background-size: cover;
    }
  }
  &__text {
    font-size: 24px;
    font-weight: normal;
    justify-self: flex-start;
    margin-left: 10px;
  }
}
</style>