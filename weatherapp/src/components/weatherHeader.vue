<template>
    <!--<Weather Info />-->
    <div class=" p-6 bg-gray-500 min-h-screen flex flex-col items-center justify-center">
        <h1 class="text-6xl font-bold mb-4">Weather Forecast</h1>
        <p class="text-lg mb-2">Get the latest weather updates for your location.</p>
        <div class="weather-info bg-white p-4 rounded shadow-md">
            <p class="text-xl font-semibold">Current Temperature: 25°C</p>
            <p class="text-md">Condition: Sunny</p>
        </div>
    </div>


</template>

<script lang="js">
   export default {
       name: 'MainContent',
       data() {
           return {
           };
       },
       methods: {
       }
   };
</script>
