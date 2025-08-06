<template>
  <div class="bg-gray-50 p-6 min-h-[50vh]">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="flex flex-col lg:flex-row justify-between items-start mb-8">
        <div class="flex-1 p-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Global Weather Dashboard</h1>
          <p class="text-gray-600 max-w-md">
            Real-time weather information from major cities around the world. 
            Data updates automatically to give you the most current conditions.
            Developers standard time usage Singapore (GMT+8).
          </p>
        </div>

        <!-- Weather Comparison Panel -->
        <div class="bg-white p-6 rounded-2xl shadow-lg mt-6 lg:mt-0 lg:ml-8 min-w-64">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">Weather Comparison</h2>
          <div class="space-y-3">
            <div 
              v-for="(weather, index) in weatherData.slice(0, 3)" 
              :key="`comparison-${weather.city}-${weather.temp}`" 
              class="flex justify-between items-center"
            >
              <span class="font-medium text-gray-700">{{ weather.country }}</span>
              <div class="flex items-center space-x-2">
                <component :is="getWeatherIcon(weather.condition)" class="w-5 h-5" />
                <span class="font-semibold text-gray-800">{{ weather.temp }}°C</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex space-x-4 overflow-x-auto pb-4">
        <div 
          v-for="i in 8" 
          :key="`loading-${i}`" 
          class="flex-shrink-0 w-72 h-40 bg-gray-200 rounded-2xl animate-pulse"
        ></div>
      </div>

      <!-- Weather Cards -->
      <div v-else class="flex space-x-4 overflow-x-auto pb-4">
        <div
          v-for="(weather, index) in weatherData"
          :key="`weather-${weather.city}-${weather.temp}-${weather.condition}`"
          :class="`flex-shrink-0 w-72 h-40 bg-gradient-to-br ${getBackgroundGradient(weather.condition)} rounded-2xl p-4 text-white shadow-lg relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer`"
        >
          <!-- Background decoration -->
          <div class="absolute -top-6 -right-7 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
          <div class="absolute -bottom-8 -left-2 w-12 h-12 bg-white bg-opacity-10 rounded-full"></div>
          
          <!-- Content -->
          <div class="relative z-10 p-2 h-full flex flex-col justify-between">
            <div>
              <div class="mb-2">
                <component :is="getWeatherIcon(weather.condition)" class="w-8 h-8" />
              </div>
              <div class="text-lg font-medium opacity-100">
                {{ weather.city }}
              </div>
              <div class="text-xs opacity-75 capitalize">
                {{ weather.description }}
              </div>
              <div class="text-xs opacity-60 mt-1">
                {{ weather.country }}
              </div>
            </div>
            
            <div class="text-4xl font-bold">
              {{ weather.temp }}°C
            </div>
          </div>
        </div>
      </div>

      <!-- Refresh Button -->
      <div class="mt-6 text-center">
        <button
          @click="refreshWeather"
          :disabled="loading"
          class="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium flex items-center space-x-2 mx-auto"
        >
          <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ loading ? 'Loading...' : 'Refresh Weather Data' }}</span>
        </button>
      </div>

      <!-- Last Updated -->
      <div class="mt-2 text-center text-sm text-gray-500">
        Last updated: {{ lastUpdated }}
      </div>

      <!-- Error Message -->
      <div v-if="error" class="mt-4 bg-red-50 border-l-4 border-red-400 p-4 rounded">
        <p class="text-red-700">{{ error }}</p>
      </div>

      <!-- API Notice -->
      <div v-if="!apiKey" class="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <p class="text-blue-700">
          <strong>Demo Mode:</strong> Using realistic mock data that updates on each refresh. Add your OpenWeatherMap API key to .env file as VITE_OPENWEATHER_API_KEY for real-time data.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Weather Icons
const SunIcon = {
  template: '<svg viewBox="0 0 24 24" fill="currentColor" class="text-yellow-400"><circle cx="12" cy="12" r="5"/><path d="m12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
}
const CloudIcon = {
  template: '<svg viewBox="0 0 24 24" fill="currentColor" class="text-gray-300"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>'
}
const RainIcon = {
  template: '<svg viewBox="0 0 24 24" fill="currentColor" class="text-blue-300"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/><path d="m12 19l-2-3h4l-2 3zm-4-6l-2-3h4l-2 3zm8 0l-2-3h4l-2 3z"/></svg>'
}
const SnowIcon = {
  template: '<svg viewBox="0 0 24 24" fill="currentColor" class="text-blue-200"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/><path d="M12 17h.01M8 17h.01M16 17h.01M12 21h.01M8 21h.01M16 21h.01"/></svg>'
}
const StormIcon = {
  template: '<svg viewBox="0 0 24 24" fill="currentColor" class="text-yellow-300"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/><path d="M13 13l-4 7 6-4-2-3z"/></svg>'
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

// Helper functions
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
    sunny: 'from-orange-400 to-yellow-400',
    clear: 'from-orange-400 to-yellow-400',
    cloudy: 'from-gray-400 to-gray-600',
    overcast: 'from-gray-400 to-gray-600',
    rainy: 'from-blue-400 to-blue-600',
    snowy: 'from-blue-200 to-blue-400',
    stormy: 'from-purple-500 to-gray-700'
  }
  return gradients[condition] || 'from-gray-400 to-gray-600'
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
      await new Promise(resolve => setTimeout(resolve, 1000))
      
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
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>