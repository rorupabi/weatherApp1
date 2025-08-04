<template>
    <div class="bg-gradient-to-br from-purple-500 m-5 p-4 rounded-xl to-indigo-400 flex flex-col">
        <nav class="relative bg-gradient-to-br rounded-2xl from-purple-700 to-indigo-300 flex items-center text-white font-bold p-4 mb-4 justify-between w-full py-8 top-2">
            <button class="text-2xl font-semibold cursor-pointer hover:text-3xl duration-300">
                <span class="text-white">Hourly Forecast</span>
            </button>
        </nav>

        <!-- Forecast Navigation -->
        <div class="px-12 mb-4">
            <div class="flex items-center justify-between">
                <div class="flex space-x-6">
                    <button 
                        @click="switchTab('today')"
                        :class="activeTab === 'today' ? 'text-white text-lg font-semibold border-b-2 border-white pb-1' : 'text-white/70 text-lg font-medium hover:text-white transition-colors'"
                    >
                        Today
                    </button>
                    <button 
                        @click="switchTab('weekly')"
                        :class="activeTab === 'weekly' ? 'text-white text-lg font-semibold border-b-2 border-white pb-1' : 'text-white/70 text-lg font-medium hover:text-white transition-colors'"
                    >
                        Weekly
                    </button>
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

        <!-- Swiper Container with Drag Support -->
        <div class="p-10 px-12">
            <div 
                ref="swiperContainer" 
                class="overflow-x-auto scroll-smooth scrollbar-hide cursor-grab active:cursor-grabbing transition-all duration-300"
                @mousedown="startDrag"
                @mousemove="onDrag"
                @mouseup="endDrag"
                @mouseleave="endDrag"
                @dragstart.prevent
                :style="{ transform: isDragging ? 'scale(0.98)' : 'scale(1)' }"
            >
                <div class="flex space-x-8 pb-4" style="width: max-content;">
                    <!-- Today's Hourly Forecast -->
                    <div 
                        v-if="activeTab === 'today'"
                        v-for="(forecast, index) in hourlyForecast" 
                        :key="'hourly-' + index"
                        class="flex-shrink-0 bg-white/20 backdrop-blur-md rounded-3xl p-6 min-w-[320px] text-center hover:bg-white/40 hover:scale-105 transition-all duration-300 cursor-pointer select-none transform"
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
                                    :class="getWeatherIconBg(forecast.condition, forecast.time)"
                                >
                                    {{ getWeatherIcon(forecast.condition, forecast.time) }}
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

                    <!-- Weekly Forecast -->
                    <div 
                        v-if="activeTab === 'weekly'"
                        v-for="(forecast, index) in weeklyForecast" 
                        :key="'weekly-' + index"
                        class="flex-shrink-0 bg-white/20 backdrop-blur-md rounded-3xl p-6 min-w-[320px] text-center hover:bg-white/40 hover:scale-105 transition-all duration-300 cursor-pointer select-none transform"
                    >
                        <!-- Date badge -->
                        <div class="flex justify-center mb-4">
                            <span class="bg-indigo-600 text-white text-lg px-6 py-2 rounded-full font-medium">
                                {{ forecast.date }}
                            </span>
                        </div>

                        <!-- Weather Icon -->
                        <div class="mb-2 flex justify-center">
                            <div class="relative">
                                <div 
                                    class="w-24 h-24 rounded-full flex items-center justify-center text-5xl bg-yellow-500/30"
                                >
                                    {{ forecast.icon }}
                                </div>
                            </div>
                        </div>

                        <!-- Temperature Range -->
                        <div class="mb-4">
                            <div class="text-white text-3xl font-bold mb-1">{{ forecast.maxTemp }}° / {{ forecast.minTemp }}°</div>
                            <div class="text-white/70 text-sm">High / Low</div>
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
            isDragging: false,
            startX: 0,
            scrollLeft: 0,
            isLoading: false,
            error: null,
            activeTab: 'today', // 'today' or 'weekly'
            hourlyForecast: [],
            weeklyForecast: []
        }
    },
    async mounted() {
        await this.fetchHourlyForecast();
        await this.fetchWeeklyForecast();
    },
    methods: {
        startDrag(e) {
            this.isDragging = true;
            this.startX = e.pageX - this.$refs.swiperContainer.offsetLeft;
            this.scrollLeft = this.$refs.swiperContainer.scrollLeft;
        },
        onDrag(e) {
            if (!this.isDragging) return;
            e.preventDefault();
            const x = e.pageX - this.$refs.swiperContainer.offsetLeft;
            const walk = (x - this.startX) * 2;
            this.$refs.swiperContainer.scrollLeft = this.scrollLeft - walk;
        },
        endDrag() {
            this.isDragging = false;
        },
        switchTab(tab) {
            this.activeTab = tab;
        },
        async fetchWeeklyForecast() {
            try {
                // Try to get user location first
                let lat = 14.5995; // Default Manila coordinates
                let lon = 120.9842;

                try {
                    const position = await this.getCurrentPosition();
                    lat = position.coords.latitude;
                    lon = position.coords.longitude;
                } catch (locationError) {
                    console.log('Using default location (Manila) for weekly forecast');
                }

                const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
                if (!API_KEY) {
                    throw new Error('API key not found');
                }

                // Fetch 5-day forecast from OpenWeatherMap
                const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
                
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }

                const data = await response.json();
                
                // Group data by day and get daily summaries
                const dailyData = this.groupForecastByDay(data.list);
                
                this.weeklyForecast = dailyData.slice(0, 7).map(dayData => {
                    const date = new Date(dayData[0].dt * 1000);
                    const dateString = date.toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                    });

                    // Calculate daily averages and extremes
                    const temps = dayData.map(item => item.main.temp);
                    const conditions = dayData.map(item => item.weather[0]);
                    const windSpeeds = dayData.map(item => item.wind.speed);
                    const humidity = dayData.map(item => item.main.humidity);

                    // Get most common weather condition
                    const mainCondition = this.getMostCommonCondition(conditions);

                    return {
                        date: dateString,
                        maxTemp: Math.round(Math.max(...temps)),
                        minTemp: Math.round(Math.min(...temps)),
                        condition: mainCondition.description.charAt(0).toUpperCase() + 
                                 mainCondition.description.slice(1),
                        icon: this.getDailyWeatherIcon(mainCondition.main),
                        windSpeed: Math.round(windSpeeds.reduce((a, b) => a + b) / windSpeeds.length * 3.6),
                        humidity: Math.round(humidity.reduce((a, b) => a + b) / humidity.length),
                        location: data.city.name
                    };
                });

            } catch (error) {
                console.error('Failed to fetch weekly forecast:', error);
                
                // Fallback to sample weekly data
                this.weeklyForecast = this.getSampleWeeklyData();
            }
        },
        groupForecastByDay(forecastList) {
            const grouped = {};
            
            forecastList.forEach(item => {
                const date = new Date(item.dt * 1000);
                const dateKey = date.toDateString();
                
                if (!grouped[dateKey]) {
                    grouped[dateKey] = [];
                }
                grouped[dateKey].push(item);
            });
            
            return Object.values(grouped);
        },
        getMostCommonCondition(conditions) {
            const conditionCounts = {};
            
            conditions.forEach(condition => {
                const key = condition.main;
                conditionCounts[key] = (conditionCounts[key] || 0) + 1;
            });
            
            const mostCommon = Object.keys(conditionCounts).reduce((a, b) => 
                conditionCounts[a] > conditionCounts[b] ? a : b
            );
            
            return conditions.find(c => c.main === mostCommon);
        },
        getDailyWeatherIcon(mainCondition) {
            const iconMap = {
                'Clear': '☀️',
                'Clouds': '☁️',
                'Rain': '🌧️',
                'Drizzle': '🌦️',
                'Thunderstorm': '⛈️',
                'Snow': '❄️',
                'Mist': '🌫️',
                'Fog': '🌫️'
            };
            return iconMap[mainCondition] || '☀️';
        },
        getSampleWeeklyData() {
            const today = new Date();
            return Array.from({ length: 7 }, (_, index) => {
                const date = new Date(today);
                date.setDate(today.getDate() + index);
                
                return {
                    date: date.toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                    }),
                    maxTemp: Math.round(25 + Math.random() * 10),
                    minTemp: Math.round(18 + Math.random() * 5),
                    condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
                    icon: ['☀️', '⛅', '☁️', '🌧️'][Math.floor(Math.random() * 4)],
                    windSpeed: Math.round(20 + Math.random() * 30),
                    humidity: Math.round(60 + Math.random() * 30),
                    location: 'Manila'
                };
            });
        },
        async fetchHourlyForecast() {
            try {
                this.isLoading = true;
                this.error = null;

                // Try to get user location first
                let lat = 14.5995; // Default Manila coordinates
                let lon = 120.9842;

                try {
                    const position = await this.getCurrentPosition();
                    lat = position.coords.latitude;
                    lon = position.coords.longitude;
                } catch (locationError) {
                    console.log('Using default location (Manila)');
                }

                const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
                if (!API_KEY) {
                    throw new Error('API key not found');
                }

                // Fetch 5-day/3-hour forecast from OpenWeatherMap
                const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
                
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }

                const data = await response.json();
                
                // Process the forecast data (take first 8 entries for next 24 hours)
                this.hourlyForecast = data.list.slice(0, 8).map(item => {
                    const date = new Date(item.dt * 1000);
                    const day = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
                    const time = date.toLocaleTimeString('en-US', { 
                        hour: 'numeric', 
                        minute: '2-digit',
                        hour12: true 
                    });

                    return {
                        day: day,
                        time: time,
                        temp: Math.round(item.main.temp),
                        feelsLike: Math.round(item.main.feels_like),
                        condition: item.weather[0].description.charAt(0).toUpperCase() + 
                                 item.weather[0].description.slice(1),
                        windSpeed: Math.round(item.wind.speed * 3.6), // Convert m/s to km/h
                        humidity: item.main.humidity,
                        location: data.city.name
                    };
                });

            } catch (error) {
                console.error('Failed to fetch hourly forecast:', error);
                this.error = 'Failed to load forecast data';
                
                // Fallback to sample data if API fails
                this.hourlyForecast = this.getSampleData();
            } finally {
                this.isLoading = false;
            }
        },
        getCurrentPosition() {
            return new Promise((resolve, reject) => {
                if (!navigator.geolocation) {
                    reject(new Error('Geolocation not supported'));
                    return;
                }

                navigator.geolocation.getCurrentPosition(
                    resolve,
                    reject,
                    { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
                );
            });
        },
        getSampleData() {
            return [
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
            ];
        },
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
        getWeatherIcon(condition, time) {
            const isNightTime = this.isNightTime(time);
            
            if (isNightTime) {
                const nightIconMap = {
                    'Light rain': '🌧️',
                    'Light Sun': '🌙',
                    'Light Rain': '🌧️',
                    'Cloudy': '🌙',
                    'Sunny': '🌙',
                    'Partly Cloudy': '🌙',
                    'Clear': '🌙',
                    'Overcast clouds': '☁️',
                    'Broken clouds': '☁️',
                    'Scattered clouds': '🌙',
                    'Few clouds': '🌙'
                };
                return nightIconMap[condition] || '🌙';
            } else {
                const dayIconMap = {
                    'Light rain': '🌦️',
                    'Light Sun': '🌤️',
                    'Light Rain': '🌧️',
                    'Cloudy': '☁️',
                    'Sunny': '☀️',
                    'Partly Cloudy': '⛅',
                    'Clear': '☀️',
                    'Overcast clouds': '☁️',
                    'Broken clouds': '⛅',
                    'Scattered clouds': '🌤️',
                    'Few clouds': '🌤️'
                };
                return dayIconMap[condition] || '☀️';
            }
        },
        getWeatherIconBg(condition, time) {
            const isNightTime = this.isNightTime(time);
            
            if (isNightTime) {
                const nightBgMap = {
                    'Light rain': 'bg-blue-600/30',
                    'Light Sun': 'bg-indigo-600/30',
                    'Light Rain': 'bg-blue-600/30',
                    'Cloudy': 'bg-indigo-600/30',
                    'Sunny': 'bg-indigo-600/30',
                    'Partly Cloudy': 'bg-indigo-500/30',
                    'Clear': 'bg-indigo-600/30',
                    'Overcast clouds': 'bg-gray-600/30',
                    'Broken clouds': 'bg-indigo-500/30',
                    'Scattered clouds': 'bg-indigo-500/30',
                    'Few clouds': 'bg-indigo-500/30'
                };
                return nightBgMap[condition] || 'bg-indigo-600/30';
            } else {
                const dayBgMap = {
                    'Light rain': 'bg-blue-400/30',
                    'Light Sun': 'bg-yellow-400/30',
                    'Light Rain': 'bg-blue-500/30',
                    'Cloudy': 'bg-gray-500/30',
                    'Sunny': 'bg-yellow-500/30',
                    'Partly Cloudy': 'bg-gray-400/30',
                    'Clear': 'bg-yellow-500/30',
                    'Overcast clouds': 'bg-gray-500/30',
                    'Broken clouds': 'bg-gray-400/30',
                    'Scattered clouds': 'bg-yellow-400/30',
                    'Few clouds': 'bg-yellow-400/30'
                };
                return dayBgMap[condition] || 'bg-yellow-500/30';
            }
        },
        isNightTime(timeString) {
            // Extract hour from time string (e.g., "6:00PM" -> 18)
            const timeParts = timeString.match(/(\d+):(\d+)(AM|PM)/);
            if (!timeParts) return false;
            
            let hour = parseInt(timeParts[1]);
            const period = timeParts[3];
            
            // Convert to 24-hour format
            if (period === 'PM' && hour !== 12) {
                hour += 12;
            } else if (period === 'AM' && hour === 12) {
                hour = 0;
            }
            
            // Consider night time from 6 PM (18:00) to 6 AM (06:00)
            return hour >= 18 || hour < 6;
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