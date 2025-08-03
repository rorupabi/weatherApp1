<template>
    <div class="bg-gray-200">
        <Navbar/>
        <WeatherHeader/>
        <HourlyForecast/>
        <Footer/>
    </div>
  
</template>

<script setup>
// import { ref } from 'vue';
// import { useRoute } from 'vue-router';
import Navbar from '../components/navBar.vue';
import WeatherHeader from '../components/weatherHeader.vue';
import Footer from '../components/footer.vue';
import HourlyForecast from '../components/hourlyForecast.vue';


</script>