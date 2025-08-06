<template>
    <div :style="{ backgroundImage: `url(${AuroraBorealis})` }" class="bg-cover bg-center h-screen">
        <Navbar/>
        <WeatherHeader/>
        <HourlyForecast/>
        <WeatherDiffCountries/>
        <EnvironmentalistTopic/>
        <Footer/>
    </div>
  
</template>

<script setup>
// import { ref } from 'vue';
// import { useRoute } from 'vue-router';
import AuroraBorealis from '../assets/aurora-borealis.jpg';
import Navbar from '../components/navBar.vue';
import WeatherHeader from '../components/weatherHeader.vue';
import Footer from '../components/footer.vue';
import HourlyForecast from '../components/hourlyWeeklyForecast.vue';
import WeatherDiffCountries from '../components/weatherDiffCountries.vue';
import EnvironmentalistTopic from '../components/environmentTopic.vue';


</script>