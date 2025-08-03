<template>
    <!--<Weather Info />-->
    <!-- <Left Side /> -->
    <div class="flex flex-row justify-between min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 p-4 m-5 rounded-2xl shadow-lg">
        <div class="max-w-7xl mx-auto">
          <div class="bg-black/20 backdrop-blur-sm rounded-3xl p-8 min-h-[80vh] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div class="flex-1 space-y-6">
            <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">Taguig, Metro Manila</h1>
        <div class="flex flex-row items-center space-x-4 mb-4 text-white">
            <div class="text-lg font-medium">
                <div>{{ currentDate }}</div>
            </div>
            <div class="text-lg font-medium">
                <div>Update As Of {{ currentTime }}</div>
            </div>
        </div>
        </div>

        <!-- Weather Details -->
        <div class="bg-white/90 backdrop-blur-sm rounded-2xl p-6 max-w-md flex flex-col space-y-3 w-2/3">
            <div class="flex items-center gap-2 rounded-lg px-3 py-2">
            <p class="text-md">Wind 10 km/h</p>
            <p class="text-md">Humidity 82%</p>
             <p class="text-md">Precipitation 10%</p>
            <p class="text-md">Rain Chance 20%</p>
            </div>
        </div>
        </div>
        
        <div class="weather-info flex-shrink-0">
            <div class="bg-black/10 text-white backdrop-blur-md rounded-2xl p-6 max-w-md flex flex-col space-y-3 w-2/3">
                <div class="text-2xl font-semibold">Current Temperature: 25°C</div>
                <div class="text-md">Condition: Sunny</div>
            </div>
        </div>
        </div>
    </div>

</template>

<script lang="js">

export default {
    name: 'WeatherHeader',
    data() {
        return {
            currentDate: '',
            currentTime: '',
            isLoading: true,
            error: null,
            weatherData: {
                location: 'Loading...',
                temperature: '--',
                minTemp: '--',
                maxTemp: '--',
                humidity: '--',
                windSpeed: '--',
                feelsLike: '--',
                visibility: '--',
                condition: 'Loading...'
            }
        };
    },
    async mounted() {
        this.updateDateTime();
        await this.fetchWeatherData();
        setInterval(this.updateDateTime, 60000);
        // Refresh weather data every 10 minutes
         setInterval(this.getUserLocationWeather, 600000);
    },
    methods: {
        updateDateTime() {
            const now = new Date();
            this.currentDate = now.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            this.currentTime = now.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        },
        async getUserLocationWeather() {
            try {
                this.isLoading = true;
                this.error = null;

                const position = await this.getCurrentPosition();
                const{ latitude, longitude } = position.coords;

                await this.fetchWeatherCoordinates(latitude, longitude);
            } catch (error) {
                console.error('Error getting weather: ', error);
                this.error = error.message || 'Failed to fetch weather data';
                await this.fetchWeatherByCity('Manila, Philippines');
            } finally {
                this.isLoading = false;
            }
        },
        async fetchWeatherData() {
            // Placeholder for fetching weather data
            const API_KEY = 'your_api_key';
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        }
    }
};
</script>
