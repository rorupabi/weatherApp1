<template>
  <weather-header />
  <hourly-weekly-forecast />
  <weather-diff-countries />
  <environment-topic />
</template>

<script>
import WeatherHeader from '../components/weatherHeader.vue'
import WeatherDiffCountries from '../components/weatherDiffCountries.vue'
import EnvironmentTopic from '../components/environmentTopic.vue'
import HourlyWeeklyForecast from '../components/hourlyWeeklyForecast.vue'

export default {
  components: {
    WeatherHeader,
    WeatherDiffCountries,
    HourlyWeeklyForecast,
    EnvironmentTopic
  }
}
</script>
