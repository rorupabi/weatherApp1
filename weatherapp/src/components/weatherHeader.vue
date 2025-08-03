<template>
    <!--<Weather Info />-->
    <div class="bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 p-4 m-5 rounded-2xl shadow-lg">
        <div class="max-w-7xl mx-auto">
            <div class="bg-black/20 backdrop-blur-sm rounded-3xl p-8 min-h-[80vh] flex flex-col justify-between">
                
                <!-- Header Section -->
                <div class="space-y-6">
                    <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">{{ weatherData.location }}</h1>
                    
                    <div class="flex flex-row items-center space-x-4 mb-4 text-white">
                        <div class="text-lg font-medium">
                            <div>{{ currentDate }}</div>
                        </div>
                        <div class="text-lg font-medium">
                            <div>Update As Of {{ currentTime }}</div>
                        </div>
                    </div>
                    
                    <!-- Simple Error Message Display -->
                    <div v-if="error && !isLoading" class="bg-red-500/20 text-white p-4 rounded-lg border border-red-500/30">
                        <p>{{ error }}</p>
                    </div>
                    
                    <!-- Loading Indicator -->
                    <div v-if="isLoading" class="bg-blue-500/20 text-white p-4 rounded-lg border border-blue-500/30">
                        <p>Getting your weather...</p>
                    </div>

                    <!-- Weather Details Card - positioned near top -->
                    <div class="bg-white/90 backdrop-blur-sm rounded-2xl p-6 max-w-lg">
                        <div class="grid grid-cols-2 gap-4 text-sm md:text-base">
                            <div class="flex flex-col">
                                <span class="text-gray-600 text-xs">Wind</span>
                                <span class="font-medium">{{ weatherData.windSpeed }} km/h</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-gray-600 text-xs">Humidity</span>
                                <span class="font-medium">{{ weatherData.humidity }}%</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-gray-600 text-xs">Feels Like</span>
                                <span class="font-medium">{{ weatherData.feelsLike }}°C</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-gray-600 text-xs">Visibility</span>
                                <span class="font-medium">{{ weatherData.visibility }} km</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Bottom Section - Current Temperature -->
                <div class="mt-auto">
                    <div class="text-white text-center">
                        <div class="text-4xl md:text-5xl font-bold mb-2">Current Temperature: {{ weatherData.temperature }}°C</div>
                        <div class="text-xl">Condition: {{ weatherData.condition }}</div>
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
            }
        };
    },
    async mounted() {
        // Debug: Check if .env is being read
        console.log('Environment check:');
        console.log('API Key exists:', !!import.meta.env.VITE_OPENWEATHER_API_KEY);
        console.log('API Key length:', import.meta.env.VITE_OPENWEATHER_API_KEY?.length);
        
        this.updateDateTime();
        
        // Start with Manila immediately, then try to get user location
        console.log('Loading default weather...');
        try {
            await this.fetchWeatherByCity('Manila, Philippines');
            console.log('Default weather loaded successfully');
        } catch (error) {
            console.error('Even default weather failed:', error);
        }
        
        // Try to get user's actual location in background
        setTimeout(() => {
            this.getUserLocationWeather();
        }, 1000);
        
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
                
                console.log('Trying to get user location...');

                const position = await this.getCurrentPosition();
                const { latitude, longitude } = position.coords;
                
                console.log('User location obtained:', latitude, longitude);

                await this.fetchWeatherByCoordinates(latitude, longitude);
                console.log('User location weather loaded successfully');
                
            } catch (error) {
                console.log('User location failed, keeping default weather');
                console.error('Location error details:', error);
                
                // Don't show error to user, just keep the default weather
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
                        console.error('Geolocation error:', error);
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
            console.log('API Key exists:', !!API_KEY);
            console.log('API Key first 10 chars:', API_KEY ? API_KEY.substring(0, 10) + '...' : 'NOT FOUND');
            
            if (!API_KEY) {
                throw new Error('API key missing from environment');
            }

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            console.log('Making API request to OpenWeather...');

            try {
                const response = await fetch(url);
                console.log('API Response status:', response.status);
                
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('API Error Response:', errorText);
                    throw new Error(`API returned ${response.status}: ${errorText}`);
                } 
                
                const data = await response.json();
                console.log('Weather data received successfully:', data.name, data.main.temp + '°C');
                this.updateWeatherData(data);
            } catch (error) {
                console.error('Weather fetch failed:', error);
                throw error;
            }
        },
        async fetchWeatherByCity(cityName) {
            const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
            if (!API_KEY) {
                console.error('No API key found in environment variables');
                this.weatherData.condition = 'Service configuration error';
                return;
            }

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
            console.log('Fetching fallback weather for:', cityName);

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    console.error('API Response Error:', response.status, response.statusText);
                    throw new Error(`API returned ${response.status}`);
                }
                const data = await response.json();
                console.log('Fallback weather data received:', data);
                this.updateWeatherData(data);
            } catch (error) {
                console.error('Fallback fetch failed:', error);
                // Set basic fallback data
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
                windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
                feelsLike: Math.round(data.main.feels_like),
                visibility: Math.round(data.visibility / 1000), // Convert m to km
                condition: data.weather[0].description.charAt(0).toUpperCase() + 
                          data.weather[0].description.slice(1)
            };
        }
    }
};
</script>