<template>
    <div class="bg-gradient-to-br from-purple-500 m-5 p-4 rounded-xl to-indigo-300 flex flex-col">
        <nav class="relative bg-gradient-to-br  rounded-2xl from-purple-500 to-indigo-300 flex items-center text-white p-4 mb-4 justify-between w-full py-8 top-0">
            <button class="text-xl font-semibold cursor-pointer hover:text-2xl duration-300">
                <span class="text-white">Hourly Forecast</span>
            </button>
        </nav>

        <!-- Forecast Navigation -->
        <div class="px-12 mb-6">
            <div class="flex items-center justify-between">
                <div class="flex space-x-6">
                    <button class="text-white text-lg font-semibold border-b-2 border-white pb-1">Today</button>
                    <button class="text-white/70 text-lg font-medium hover:text-white transition-colors">Weekly</button>
                </div>
                <div class="flex space-x-4">
                    <button @click="scrollLeft" class="text-white/70 hover:text-white transition-colors p-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <button @click="scrollRight" class="text-white/70 hover:text-white transition-colors p-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Swiper Container -->
        <div class="p-10 px-12">
            <div ref="swiperContainer" class="overflow-x-auto scroll-smooth scrollbar-hide">
                <div class="flex space-x-8 pb-4" style="width: max-content;">
                    <div 
                        v-for="(forecast, index) in hourlyForecast" 
                        :key="index"
                        class="flex-shrink-0 bg-white/20 backdrop-blur-md rounded-3xl p-6 min-w-[320px] text-center hover:bg-white/40 transition-all duration-500 cursor-pointer"
                    >
                        <!-- Time badges -->
                        <div class="flex justify-center space-x-1 mb-4">
                            <span class="bg-indigo-600 text-white text-lg px-5 py-1 rounded-full font-medium">
                                {{ forecast.day }}
                            </span>
                            <span class="bg-indigo-600 text-white text-lg px-3 py-1 rounded-full font-medium">
                                {{ forecast.time }}
                            </span>
                        </div>

                        <!-- Weather Icon -->
                        <div class="mb-2 flex justify-center">
                            <div class="relative">
                                <div 
                                    class="w-24 h-24 rounded-full flex items-center justify-center text-5xl"
                                    :class="getWeatherIconBg(forecast.condition)"
                                >
                                    {{ getWeatherIcon(forecast.condition) }}
                                </div>
                            </div>
                        </div>

                        <!-- Temperature -->
                        <div class="mb-4">
                            <div class="text-white text-4xl font-bold mb-1 ml-3">{{ forecast.temp }}°</div>
                            <div class="text-white/70 text-md">{{ forecast.feelsLike }}°</div>
                        </div>

                        <!-- Weather details -->
                        <div class="space-y-2 text-white/80 text-xs">
                            <div class="flex items-center justify-center space-x-1">
                                <svg class="w-3 h-3" fill="currentColor" viewBox="0 -5 24 24">
                                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                                </svg>
                                <span>{{ forecast.windSpeed }} km/h</span>
                            </div>
                            <div class="flex items-center justify-center space-x-1">
                                <svg class="w-3 h-3" fill="currentColor" viewBox="0 -1 20 20">
                                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                                </svg>
                                <span>{{ forecast.humidity }}%</span>
                            </div>
                        </div>

                        <!-- Condition -->
                        <div class="mt-2">
                            <div class="text-white/90 text-sm font-medium">{{ forecast.condition }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HourlyForecast',
    data() {
        return {
            hourlyForecast: [
                {
                    day: 'SUN',
                    time: '4:00PM',
                    temp: 23,
                    feelsLike: 30,
                    condition: 'Light rain',
                    windSpeed: 45,
                    humidity: 70,
                    location: 'Manila'
                },
                {
                    day: 'SUN',
                    time: '5:00PM',
                    temp: 22,
                    feelsLike: 28,
                    condition: 'Light Sun',
                    windSpeed: 45,
                    humidity: 70,
                    location: 'Manila'
                },
                {
                    day: 'SUN',
                    time: '6:00PM',
                    temp: 20,
                    feelsLike: 25,
                    condition: 'Light Rain',
                    windSpeed: 45,
                    humidity: 70,
                    location: 'Manila'
                },
                {
                    day: 'SUN',
                    time: '7:00PM',
                    temp: 20,
                    feelsLike: 25,
                    condition: 'Cloudy',
                    windSpeed: 45,
                    humidity: 70,
                    location: 'Manila'
                },
                {
                    day: 'MON',
                    time: '8:00AM',
                    temp: 24,
                    feelsLike: 28,
                    condition: 'Sunny',
                    windSpeed: 35,
                    humidity: 65,
                    location: 'Manila'
                },
                {
                    day: 'MON',
                    time: '12:00PM',
                    temp: 28,
                    feelsLike: 32,
                    condition: 'Partly Cloudy',
                    windSpeed: 40,
                    humidity: 60,
                    location: 'Manila'
                }
            ]
        }
    },
    methods: {
        scrollLeft() {
            this.$refs.swiperContainer.scrollBy({
                left: -200,
                behavior: 'smooth'
            });
        },
        scrollRight() {
            this.$refs.swiperContainer.scrollBy({
                left: 200,
                behavior: 'smooth'
            });
        },
        getWeatherIcon(condition) {
            const iconMap = {
                'Light rain': '🌦️',
                'Light Sun': '🌤️',
                'Light Rain': '🌧️',
                'Cloudy': '🌙',
                'Sunny': '☀️',
                'Partly Cloudy': '⛅'
            };
            return iconMap[condition] || '☀️';
        },
        getWeatherIconBg(condition) {
            const bgMap = {
                'Light rain': 'bg-blue-400/30',
                'Light Sun': 'bg-yellow-400/30',
                'Light Rain': 'bg-blue-500/30',
                'Cloudy': 'bg-purple-500/30',
                'Sunny': 'bg-yellow-500/30',
                'Partly Cloudy': 'bg-gray-400/30'
            };
            return bgMap[condition] || 'bg-yellow-500/30';
        }
    }
}
</script>

<style scoped>
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>