<template>
    <!--<Weather Info />-->
    <div class="flex flex-col lg:flex-row gap-4 m-4 max-w-6xl mx-auto">
        <!-- Main Weather Card -->
        <div class="bg-gradient-to-br from-purple-600 via-blue-500 to-teal-600 p-4 rounded-2xl shadow-lg flex-1 max-h-64 hover:shadow-xl transition-shadow duration-300">
            <div class="bg-black/20 backdrop-blur-sm rounded-3xl p-4 h-full">
                
                <!-- Header Section -->
                <div class="mb-3">
                    <h1 class="text-2xl font-bold text-white mb-2">{{ weatherData.location }}</h1>
                    
                    <div class="flex flex-row items-center space-x-4 mb-2 text-white text-xs">
                        <div>{{ currentDate }}</div>
                        <div>Updated {{ currentTime }}</div>
                    </div>
                    
                    <!-- Error/Loading Messages -->
                    <div v-if="error && !isLoading" class="bg-red-500/20 text-white p-2 rounded-lg border border-red-500/30 text-xs">
                        <p>{{ error }}</p>
                    </div>
                    
                    <div v-if="isLoading" class="bg-blue-500/20 text-white p-2 rounded-lg border border-blue-500/30 text-xs">
                        <p>Getting your weather...</p>
                    </div>
                </div>
                
                <!-- Main Content - Compact Layout -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                    
                    <!-- Temperature Section -->
                    <div class="text-white">
                        <div class="text-4xl font-bold mb-1">{{ weatherData.temperature }}°C</div>
                        <div class="text-sm mb-1">{{ weatherData.condition }}</div>
                        <div class="text-xs opacity-80">H: {{ weatherData.maxTemp }}° L: {{ weatherData.minTemp }}°</div>
                    </div>
                    
                    <!-- Weather Details - Compact Grid -->
                    <div class="bg-white/90 backdrop-blur-sm rounded-xl p-3">
                        <div class="grid grid-cols-2 gap-2 text-xs">
                            <div class="text-center">
                                <div class="text-gray-500">Wind</div>
                                <div class="font-semibold">{{ weatherData.windSpeed }} km/h</div>
                            </div>
                            <div class="text-center">
                                <div class="text-gray-500">Humidity</div>
                                <div class="font-semibold">{{ weatherData.humidity }}%</div>
                            </div>
                            <div class="text-center">
                                <div class="text-gray-500">Visibility</div>
                                <div class="font-semibold">{{ weatherData.visibility }} km</div>
                            </div>
                            <div class="text-center">
                                <div class="text-gray-500">Feels Like</div>
                                <div class="font-semibold">{{ weatherData.feelsLike }}°C</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Compact Search Weather Card -->
        <div class="bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 p-4 rounded-2xl shadow-lg w-full lg:w-80 max-h-64 hover:shadow-xl transition-shadow duration-300 relative">
            <div class="bg-black/20 backdrop-blur-sm rounded-3xl p-4 h-full flex flex-col">
                
                <!-- Header -->
                <div class="mb-2">
                    <h2 class="text-lg font-bold text-white mb-1">🔍 Search Weather</h2>
                    <p class="text-white/80 text-xs">Find weather for any city</p>
                </div>
                
                <!-- Search Form -->
                <div class="space-y-3">
                    <form @submit.prevent="searchWeather" class="space-y-2">
                        <div class="relative">
                            <input 
                                v-model="searchQuery"
                                type="text"
                                placeholder="Enter city name..."
                                class="w-full px-3 py-2 rounded-lg bg-white/90 backdrop-blur-sm border-0 focus:ring-2 focus:ring-white/50 focus:outline-none text-gray-800 placeholder-gray-500 text-sm"
                                :disabled="isSearching"
                            >
                            <button 
                                v-if="searchQuery && !isSearching"
                                type="button"
                                @click="clearSearchInput"
                                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg"
                                title="Clear search"
                            >
                                ×
                            </button>
                            <div v-if="isSearching" class="absolute right-2 top-1/2 transform -translate-y-1/2">
                                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                            </div>
                        </div>
                        
                        <button 
                            type="submit"
                            :disabled="!searchQuery.trim() || isSearching"
                            class="w-full py-2 px-3 bg-white/20 hover:bg-white/30 disabled:bg-white/10 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/30 text-sm"
                        >
                            {{ isSearching ? 'Searching...' : 'Search Weather' }}
                        </button>
                    </form>
                    
                    <!-- Quick Search - Compact -->
                    <div>
                        <p class="text-white/70 text-xs mb-1">Quick searches:</p>
                        <div class="flex flex-wrap gap-1">
                            <button 
                                v-for="city in quickCities.slice(0, 4)" 
                                :key="city"
                                @click="quickSearch(city)"
                                :disabled="isSearching"
                                class="px-2 py-1 bg-white/20 hover:bg-white/30 disabled:bg-white/10 text-white text-xs rounded-md transition-all duration-200 disabled:cursor-not-allowed"
                            >
                                {{ city.split(',')[0] }}
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Error Message -->
                <div v-if="searchError" class="mt-2 bg-red-500/20 text-white p-2 rounded-lg border border-red-500/30 text-xs">
                    <p>{{ searchError }}</p>
                </div>
                
                <!-- Search Results Popup - Positioned to the right -->
                <div 
                    v-if="searchResult" 
                    ref="searchPopup"
                    class="absolute top-[-1rem] left-full ml-6 w-72 bg-white rounded-3xl shadow-2xl border border-gray-200 p-4 text-gray-800 z-50 animate-in slide-in-from-left-2 duration-200"
                    style="animation: slideInRight 0.3s ease-out;"
                    @click.stop
                >
                    <!-- Close button -->
                    <button 
                        @click="clearSearch"
                        class="absolute top-2 right-2 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium"
                        title="Close"
                    >
                        ×
                    </button>
                    
                    <div class="pr-6">
                        <!-- Location and main temp -->
                        <div class="mb-3">
                            <h3 class="font-bold text-lg text-gray-900">{{ searchResult.location }}</h3>
                            <p class="text-sm text-gray-600 mb-2">{{ searchResult.condition }}</p>
                            <div class="flex items-center gap-3">
                                <div class="text-3xl font-bold text-blue-600">{{ searchResult.temperature }}°C</div>
                                <div class="text-sm text-gray-500">Feels like {{ searchResult.feelsLike }}°C</div>
                            </div>
                        </div>
                        
                        <!-- Weather details grid -->
                        <div class="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
                            <div class="flex items-center gap-2">
                                <span class="text-blue-500">💨</span>
                                <div>
                                    <p class="text-xs text-gray-500">Wind Speed</p>
                                    <p class="font-semibold">{{ searchResult.windSpeed }} km/h</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-blue-500">💧</span>
                                <div>
                                    <p class="text-xs text-gray-500">Humidity</p>
                                    <p class="font-semibold">{{ searchResult.humidity }}%</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Action button -->
                        <div class="mt-4 pt-3 border-t border-gray-200">
                            <button 
                                @click="setAsMainWeather"
                                class="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm"
                            >
                                Set as Main Weather
                            </button>
                        </div>
                    </div>
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
            },
            // Search functionality
            searchQuery: '',
            isSearching: false,
            searchError: null,
            searchResult: null,
            quickCities: ['Tokyo, Japan', 'London, UK', 'New York, US', 'Sydney, AU']
        };
    },
    async mounted() {
        console.log('Environment check:');
        console.log('API Key exists:', !!import.meta.env.VITE_OPENWEATHER_API_KEY);
        
        this.updateDateTime();
        
        console.log('Loading default weather...');
        try {
            await this.fetchWeatherByCity('Manila, Philippines');
            console.log('Default weather loaded successfully');
        } catch (error) {
            console.error('Even default weather failed:', error);
        }
        
        setTimeout(() => {
            this.getUserLocationWeather();
        }, 1000);
        
        setInterval(this.updateDateTime, 60000);
        setInterval(this.getUserLocationWeather, 600000);
    },
    methods: {
        updateDateTime() {
            const now = new Date();
            this.currentDate = now.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
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
                const { latitude, longitude } = position.coords;
                
                await this.fetchWeatherByCoordinates(latitude, longitude);
                
            } catch (error) {
                console.log('User location failed, keeping default weather');
                this.error = null;
                
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
                    (error) => {
                        let message = 'Location unavailable';
                        switch(error.code) {
                            case error.PERMISSION_DENIED:
                                message = 'Location permission denied';
                                break;
                            case error.POSITION_UNAVAILABLE:
                                message = 'Location information unavailable';
                                break;
                            case error.TIMEOUT:
                                message = 'Location request timed out';
                                break;
                        }
                        reject(new Error(message));
                    }, 
                    { 
                        enableHighAccuracy: true, 
                        timeout: 10000, 
                        maximumAge: 300000 
                    }
                );
            });      
        }, 
        async fetchWeatherByCoordinates(lat, lon) {
            const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
            
            if (!API_KEY) {
                throw new Error('API key missing from environment');
            }

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

            try {
                const response = await fetch(url);
                
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`API returned ${response.status}: ${errorText}`);
                } 
                
                const data = await response.json();
                this.updateWeatherData(data);
            } catch (error) {
                throw error;
            }
        },
        async fetchWeatherByCity(cityName) {
            const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
            if (!API_KEY) {
                this.weatherData.condition = 'Service configuration error';
                return;
            }

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`API returned ${response.status}`);
                }
                const data = await response.json();
                this.updateWeatherData(data);
            } catch (error) {
                this.weatherData = {
                    location: 'Weather Unavailable',
                    temperature: '--',
                    minTemp: '--',
                    maxTemp: '--',
                    humidity: '--',
                    windSpeed: '--',
                    feelsLike: '--',
                    visibility: '--',
                    condition: 'Service temporarily unavailable'
                };
                throw error;
            }
        },
        updateWeatherData(data) {
            this.weatherData = {
                location: `${data.name}, ${data.sys.country}`,
                temperature: Math.round(data.main.temp),
                minTemp: Math.round(data.main.temp_min),
                maxTemp: Math.round(data.main.temp_max),
                humidity: data.main.humidity,
                windSpeed: Math.round(data.wind.speed * 3.6),
                feelsLike: Math.round(data.main.feels_like),
                visibility: Math.round(data.visibility / 1000),
                condition: data.weather[0].description.charAt(0).toUpperCase() + 
                          data.weather[0].description.slice(1)
            };
        },
        async searchWeather() {
            if (!this.searchQuery.trim()) return;
            
            this.isSearching = true;
            this.searchError = null;
            this.searchResult = null;
            
            try {
                const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
                if (!API_KEY) {
                    throw new Error('API key not configured');
                }
                
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(this.searchQuery)}&appid=${API_KEY}&units=metric`;
                const response = await fetch(url);
                
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('City not found. Please check spelling and try again.');
                    }
                    throw new Error(`Search failed: ${response.status}`);
                }
                
                const data = await response.json();
                this.searchResult = {
                    location: `${data.name}, ${data.sys.country}`,
                    temperature: Math.round(data.main.temp),
                    feelsLike: Math.round(data.main.feels_like),
                    humidity: data.main.humidity,
                    windSpeed: Math.round(data.wind.speed * 3.6),
                    condition: data.weather[0].description.charAt(0).toUpperCase() + 
                              data.weather[0].description.slice(1)
                };
                
            } catch (error) {
                this.searchError = error.message;
            } finally {
                this.isSearching = false;
            }
        },
        
        quickSearch(city) {
            this.searchQuery = city;
            this.searchWeather();
        },
        
        clearSearch() {
            this.searchResult = null;
            this.searchError = null;
            this.searchQuery = '';
        },

        clearSearchInput() {
            this.searchQuery = '';
            this.searchResult = null;
            this.searchError = null;
        },

        setAsMainWeather() {
            if (this.searchResult) {
                // Update main weather data with search result
                this.weatherData = {
                    location: this.searchResult.location,
                    temperature: this.searchResult.temperature,
                    minTemp: this.searchResult.temperature - 2, // Approximate
                    maxTemp: this.searchResult.temperature + 3, // Approximate  
                    humidity: this.searchResult.humidity,
                    windSpeed: this.searchResult.windSpeed,
                    feelsLike: this.searchResult.feelsLike,
                    visibility: this.weatherData.visibility, // Keep current
                    condition: this.searchResult.condition
                };
                
                // Clear search
                this.clearSearch();
            }
        }
    }
};
</script>