<template>
    <!--<Weather Info />-->
    <!-- <Left Side /> -->
    <div class=" p-8 bg-gray-500 min-h-screen flex flex-row items-between justify-between m-5 rounded-2xl">
        <div class="items-center flex-row">
        <h1 class="text-6xl font-bold mb-4 text-white">Taguig, Metro Manila</h1>
        <div class="flex flex-row items-center space-x-4 mb-4 text-white">
            <div class="text-lg font-medium">
                {{ 
                new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
                }}
            </div>
            
        </div>
        <div class="bg-gray-100 rounded-2xl p-4 flex flex-col space-y-3 w-2/3">
            <div class="flex items-center gap-2 rounded-lg px-3 py-2">
            <p class="text-md">Wind 10 km/h</p>
            <p class="text-md">Humidity 82%</p>
             <p class="text-md">Precipitation 10%</p>
            <p class="text-md">Rain Chance 20%</p>
            </div>
        </div>
        </div>
        
        <div class="weather-info bg-white p-4 rounded shadow-md">
            <p class="text-xl font-semibold">Current Temperature: 25°C</p>
            <p class="text-md">Condition: Sunny</p>
        </div>
    </div>

</template>

<script lang="js">
   export default {
       name: 'WeatherHeader',
       data() {
           return {
           };
       },
       methods: {
       }
   };
</script>
