<template>
  <div class="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 relative overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-32 h-32 bg-blue-500 opacity-10 rounded-full blur-xl animate-pulse"></div>
      <div class="absolute top-40 right-20 w-24 h-24 bg-purple-500 opacity-10 rounded-full blur-xl animate-pulse" style="animation-delay: 2s;"></div>
      <div class="absolute bottom-20 left-1/4 w-40 h-40 bg-indigo-500 opacity-10 rounded-full blur-xl animate-pulse" style="animation-delay: 4s;"></div>
      <div class="absolute bottom-40 right-1/3 w-28 h-28 bg-cyan-500 opacity-10 rounded-full blur-xl animate-pulse" style="animation-delay: 6s;"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Header Section -->
      <div class="flex flex-col lg:flex-row justify-between items-start mb-8 gap-6">
        <div class="flex-1 p-8">
          <h1 class="text-4xl font-bold text-white mb-3 drop-shadow-lg">Global Weather Dashboard</h1>
          <p class="text-slate-300 max-w-md text-lg leading-relaxed">
            Real-time weather information from major cities around the world. 
            Data updates automatically to give you the most current conditions.
          </p>
          <p class="text-slate-400 text-sm mt-2">
            Developers standard time usage Singapore (GMT+8).
          </p>
        </div>

        <!-- Weather Comparison Panel -->
        <div class="backdrop-blur-md bg-gradient-to-br from-blue-800 to-purple-800 bg-opacity-10 p-6 rounded-3xl shadow-2xl mt-6 lg:mt-0 lg:ml-8 min-w-72 transition-all duration-300 hover:bg-opacity-15">
          <h2 class="text-xl font-semibold mb-4 text-white flex items-center">
            <svg class="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            Weather Comparison
          </h2>
          <div class="space-y-3">
            <div 
              v-for="(weather, index) in weatherData.slice(0, 3)" 
              :key="`comparison-${weather.city}-${weather.temp}`" 
              class="flex justify-between items-center p-2 rounded-xl bg-gray-50 bg-opacity-10 backdrop-blur-sm transition-all duration-300 hover:bg-opacity-20"
            >
              <span class="font-medium text-black">{{ weather.country }}</span>
              <div class="flex items-center space-x-3">
                <component :is="getWeatherIcon(weather.condition)" class="w-5 h-5" />
                <span class="font-bold text-black text-lg">{{ weather.temp }}°C</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex space-x-6 overflow-x-auto pb-6">
        <div 
          v-for="i in 8" 
          :key="`loading-${i}`" 
          class="flex-shrink-0 w-80 h-48 bg-white bg-opacity-10 backdrop-blur-md rounded-3xl animate-pulse border border-white border-opacity-20"
        ></div>
      </div>

      <!-- Weather Cards -->
      <div v-else class="flex space-x-6 overflow-x-auto pb-6 mb-8">
        <div
          v-for="(weather, index) in weatherData"
          :key="`weather-${weather.city}-${weather.temp}-${weather.condition}`"
          :class="`flex-shrink-0 w-80 h-48 bg-gradient-to-br ${getBackgroundGradient(weather.condition)} rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-3xl cursor-pointer`"
          style="box-shadow: 0 8px 32px rgba(0,0,0,0.3);"
        >
          <!-- Background decoration with glassmorphism -->
          <div class="absolute -top-8 -right-8 w-20 h-20 bg-white bg-opacity-20 rounded-full backdrop-blur-sm"></div>
          <div class="absolute -bottom-10 -left-4 w-16 h-16 bg-white bg-opacity-15 rounded-full backdrop-blur-sm"></div>
          <div class="absolute top-1/2 right-4 w-12 h-12 bg-white bg-opacity-10 rounded-full backdrop-blur-sm"></div>
          
          <!-- Content -->
          <div class="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <component :is="getWeatherIcon(weather.condition)" class="w-10 h-10 drop-shadow-lg" />
                <div class="text-right">
                  <div class="text-sm opacity-80 font-medium">{{ weather.country }}</div>
                  <div class="text-xs opacity-60">{{ new Date().toLocaleDateString() }}</div>
                </div>
              </div>
              
              <div class="text-2xl font-bold mb-2 drop-shadow-md">
                {{ weather.city }}
              </div>
              <div class="text-sm opacity-90 capitalize font-medium">
                {{ weather.description }}
              </div>
            </div>
            
            <div class="flex items-end justify-between">
              <div class="text-5xl font-bold drop-shadow-lg">
                {{ weather.temp }}°C
              </div>
              <div class="text-right">
                <div class="text-xs opacity-70">Feels like</div>
                <div class="text-sm font-semibold opacity-90">{{ weather.temp + Math.floor(Math.random() * 4 - 2) }}°C</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Refresh Button -->
      <div class="mt-6 text-center">
        <button
          @click="refreshWeather"
          :disabled="loading"
          class="backdrop-blur-md bg-slate-800 bg-opacity-40 border border-white border-opacity-20 hover:bg-opacity-60 disabled:bg-opacity-20 text-white px-8 py-4 rounded-2xl transition-all duration-300 font-semibold flex items-center space-x-3 mx-auto shadow-xl hover:shadow-2xl hover:scale-105"
        >
          <svg v-if="loading" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          <span>{{ loading ? 'Loading...' : 'Refresh Weather Data' }}</span>
        </button>
      </div>

      <!-- Last Updated -->
      <div class="mt-4 text-center text-sm text-slate-300">
        Last updated: {{ lastUpdated }}
      </div>

      <!-- Error Message -->
      <div v-if="error" class="mt-6 backdrop-blur-md bg-red-900 bg-opacity-30 border border-red-400 border-opacity-50 p-4 rounded-xl">
        <div class="flex">
          <svg class="w-5 h-5 text-red-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-red-200">{{ error }}</p>
        </div>
      </div>

      <!-- API Notice -->
      <div v-if="!apiKey" class="mt-6 backdrop-blur-md bg-blue-900 bg-opacity-30 border border-blue-400 border-opacity-50 p-4 rounded-xl">
        <div class="flex">
          <svg class="w-5 h-5 text-blue-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <p class="text-blue-200 font-semibold">Demo Mode</p>
            <p class="text-blue-300 text-sm mt-1">
              Using realistic mock data that updates on each refresh. Add your OpenWeatherMap API key to .env file as VITE_OPENWEATHER_API_KEY for real-time data.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Weather Icons - Enhanced with better styling
const SunIcon = {
  template: '<svg viewBox="0 0 24 24" fill="currentColor" class="text-yellow-300 drop-shadow-lg"><circle cx="12" cy="12" r="5"/><path d="m12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
}
const CloudIcon = {
  template: '<svg viewBox="0 0 24 24" fill="currentColor" class="text-slate-200 drop-shadow-lg"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>'
}
const RainIcon = {
  template: '<svg viewBox="0 0 24 24" fill="currentColor" class="text-blue-200 drop-shadow-lg"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/><path d="m12 19l-2-3h4l-2 3zm-4-6l-2-3h4l-2 3zm8 0l-2-3h4l-2 3z"/></svg>'
}
const SnowIcon = {
  template: '<svg viewBox="0 0 24 24" fill="currentColor" class="text-blue-100 drop-shadow-lg"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/><path d="M12 17h.01M8 17h.01M16 17h.01M12 21h.01M8 21h.01M16 21h.01"/></svg>'
}
const StormIcon = {
  template: '<svg viewBox="0 0 24 24" fill="currentColor" class="text-yellow-200 drop-shadow-lg"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/><path d="M13 13l-4 7 6-4-2-3z"/></svg>'
}

// Reactive data
const weatherData = ref([])
const loading = ref(true)
const error = ref(null)
const lastUpdated = ref('')
const apiKey = ref(import.meta.env?.VITE_OPENWEATHER_API_KEY || null)

// Countries list
const countries = [
  { name: 'Canada', city: 'Toronto' },
  { name: 'Australia', city: 'Sydney' },
  { name: 'Japan', city: 'Tokyo' },
  { name: 'UK', city: 'London' },
  { name: 'France', city: 'Paris' },
  { name: 'USA', city: 'New York' },
  { name: 'Germany', city: 'Berlin' },
  { name: 'India', city: 'Mumbai' },
  { name: 'Brazil', city: 'Rio de Janeiro' },
  { name: 'Singapore', city: 'Singapore' },
  { name: 'Russia', city: 'Moscow' },
  { name: 'UAE', city: 'Dubai' }
]

// Base mock data with seasonal variations
const baseMockData = [
  { country: 'Canada', city: 'Toronto', baseTemp: 18, condition: 'cloudy', description: 'Partly Cloudy' },
  { country: 'Australia', city: 'Sydney', baseTemp: 22, condition: 'sunny', description: 'Clear Sky' },
  { country: 'Japan', city: 'Tokyo', baseTemp: 24, condition: 'cloudy', description: 'Partly Cloudy' },
  { country: 'UK', city: 'London', baseTemp: 15, condition: 'rainy', description: 'Light Rain' },
  { country: 'France', city: 'Paris', baseTemp: 20, condition: 'sunny', description: 'Clear Sky' },
  { country: 'USA', city: 'New York', baseTemp: 26, condition: 'sunny', description: 'Sunny' },
  { country: 'Germany', city: 'Berlin', baseTemp: 17, condition: 'cloudy', description: 'Overcast' },
  { country: 'India', city: 'Mumbai', baseTemp: 31, condition: 'sunny', description: 'Hot and Humid' },
  { country: 'Brazil', city: 'Rio de Janeiro', baseTemp: 28, condition: 'sunny', description: 'Tropical Sun' },
  { country: 'Singapore', city: 'Singapore', baseTemp: 29, condition: 'stormy', description: 'Thunderstorms' },
  { country: 'Russia', city: 'Moscow', baseTemp: 12, condition: 'snowy', description: 'Light Snow' },
  { country: 'UAE', city: 'Dubai', baseTemp: 37, condition: 'sunny', description: 'Very Hot' }
]

// Generate realistic varying mock data
const generateMockWeatherData = () => {
  const conditions = ['sunny', 'cloudy', 'rainy', 'snowy', 'stormy']
  const descriptions = {
    sunny: ['Clear Sky', 'Sunny', 'Bright Sun', 'Perfect Weather'],
    cloudy: ['Partly Cloudy', 'Overcast', 'Cloudy', 'Grey Skies'],
    rainy: ['Light Rain', 'Heavy Rain', 'Drizzle', 'Shower'],
    snowy: ['Light Snow', 'Heavy Snow', 'Snow Flurries', 'Blizzard'],
    stormy: ['Thunderstorms', 'Storm', 'Lightning', 'Severe Weather']
  }

  return baseMockData.map(city => {
    // Add some temperature variation (-5 to +5 degrees)
    const tempVariation = Math.floor(Math.random() * 11) - 5
    const newTemp = city.baseTemp + tempVariation
    
    // Randomly change conditions sometimes (70% keep original, 30% random)
    const keepOriginalCondition = Math.random() > 0.3
    const newCondition = keepOriginalCondition 
      ? city.condition 
      : conditions[Math.floor(Math.random() * conditions.length)]
    
    const newDescription = descriptions[newCondition][
      Math.floor(Math.random() * descriptions[newCondition].length)
    ]

    return {
      country: city.country,
      city: city.city,
      temp: Math.max(-10, Math.min(50, newTemp)), // Keep realistic temperature range
      condition: newCondition,
      description: newDescription
    }
  })
}

// Helper functions - Enhanced color gradients
const getWeatherIcon = (condition) => {
  const icons = {
    sunny: SunIcon,
    clear: SunIcon,
    cloudy: CloudIcon,
    overcast: CloudIcon,
    rainy: RainIcon,
    snowy: SnowIcon,
    stormy: StormIcon
  }
  return icons[condition] || CloudIcon
}

const getBackgroundGradient = (condition) => {
  const gradients = {
    sunny: 'from-amber-400 via-orange-500 to-red-500',
    clear: 'from-amber-400 via-orange-500 to-red-500',
    cloudy: 'from-slate-500 via-slate-600 to-slate-700',
    overcast: 'from-slate-500 via-slate-600 to-slate-700',
    rainy: 'from-sky-500 via-blue-600 to-indigo-700',
    snowy: 'from-sky-300 via-blue-400 to-blue-500',
    stormy: 'from-purple-600 via-indigo-700 to-slate-800'
  }
  return gradients[condition] || 'from-slate-500 via-slate-600 to-slate-700'
}

const getCondition = (weatherMain) => {
  const conditions = {
    clear: 'sunny',
    clouds: 'cloudy',
    rain: 'rainy',
    drizzle: 'rainy',
    snow: 'snowy',
    thunderstorm: 'stormy'
  }
  return conditions[weatherMain.toLowerCase()] || 'cloudy'
}

const updateLastUpdated = () => {
  const now = new Date()
  lastUpdated.value = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// Fetch weather data with proper reactivity
const fetchWeatherData = async () => {
  loading.value = true
  error.value = null
  
  try {
    if (!apiKey.value) {
      console.log('No API key found. Using dynamic mock data.')
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1200))
      
      // Generate new mock data each time
      const newMockData = generateMockWeatherData()
      weatherData.value = [...newMockData] // Force reactivity with spread operator
      updateLastUpdated()
      
    } else {
      // Real API call
      const promises = countries.map(async (country) => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${country.city}&appid=${apiKey.value}&units=metric`
          )
          const data = await response.json()
          
          if (response.ok) {
            return {
              country: country.name,
              city: country.city,
              temp: Math.round(data.main.temp),
              condition: getCondition(data.weather[0].main),
              description: data.weather[0].description
            }
          } else {
            throw new Error(data.message)
          }
        } catch (cityError) {
          console.error(`Error fetching ${country.city}:`, cityError)
          // Return mock data for this specific city
          const mockCity = baseMockData.find(mock => mock.city === country.city)
          return {
            country: country.name,
            city: country.city,
            temp: mockCity ? mockCity.baseTemp : 20,
            condition: mockCity ? mockCity.condition : 'cloudy',
            description: 'Data unavailable'
          }
        }
      })

      const results = await Promise.all(promises)
      weatherData.value = [...results] // Force reactivity
      updateLastUpdated()
    }
  } catch (err) {
    console.error('Weather fetch error:', err)
    error.value = 'Failed to fetch weather data. Please try again.'
    // Fallback to mock data
    weatherData.value = [...generateMockWeatherData()]
    updateLastUpdated()
  } finally {
    loading.value = false
  }
}

const refreshWeather = () => {
  fetchWeatherData()
}

// Lifecycle
onMounted(() => {
  fetchWeatherData()
})
</script>

<style scoped>
/* Custom scrollbar for horizontal scroll */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>