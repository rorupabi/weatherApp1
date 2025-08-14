<template>
  <div
    class="bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 p-4 m-5 rounded-2xl shadow-lg max-w-full min-h-[400px]">
    <div class="max-w-6xl mx-auto">
      <div class="bg-black/20 backdrop-blur-sm rounded-3xl p-6">

        <!-- Header Section -->
        <div class="text-center mb-8">
          <Transition enter-active-class="transition-all duration-700 ease-out"
            enter-from-class="opacity-0 translate-y-8" enter-to-class="opacity-100 translate-y-0">
            <div v-if="isVisible"
              class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <Send class="w-4 h-4 text-white/80" />
              <h2 class="text-sm font-medium text-white/80 tracking-wide uppercase">Get In Touch</h2>
            </div>
          </Transition>

          <Transition enter-active-class="transition-all duration-700 ease-out delay-200"
            enter-from-class="opacity-0 translate-y-8" enter-to-class="opacity-100 translate-y-0">
            <h1 v-if="isVisible" class="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Contact Us
            </h1>
          </Transition>

          <Transition enter-active-class="transition-all duration-700 ease-out delay-400"
            enter-from-class="opacity-0 translate-y-8" enter-to-class="opacity-100 translate-y-0">
            <p v-if="isVisible" class="text-white/80 text-base max-w-2xl mx-auto leading-relaxed">
              Have questions about the weather app or need support? We'd love to hear from you and help with any
              issues you might have.
            </p>
          </Transition>
        </div>

        <!-- Contact Cards Section -->
        <div class="mb-6">
          <Transition enter-active-class="transition-all duration-700 ease-out delay-600"
            enter-from-class="opacity-0 translate-y-8" enter-to-class="opacity-100 translate-y-0">
            <h2 v-if="isVisible" class="text-2xl font-semibold text-white text-center mb-8 tracking-tight">
              Let's Connect
            </h2>
          </Transition>

          <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Email Card -->
            <Transition enter-active-class="transition-all duration-500 ease-out delay-[800ms]"
              enter-from-class="opacity-0 translate-y-12 scale-90" enter-to-class="opacity-100 translate-y-0 scale-100">
              <div v-if="isVisible"
                class="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 transition-all duration-300 cursor-pointer group hover:bg-white/95 hover:-translate-y-2 hover:shadow-xl"
                @mouseenter="handleCardHover('email')">
                <div
                  class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Mail class="w-8 h-8 text-white" />
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-3 tracking-tight">Email</h3>
                <div class="text-gray-600 space-y-1">
                  <p>rouenpads@gmail.com</p>
                  <p>elagocarl@gmail.com</p>
                  <p>jeantrasporto@gmail.com</p>
                </div>
                <div
                  class="mt-4 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto transition-all duration-300 group-hover:w-20 opacity-60 group-hover:opacity-100" />
              </div>
            </Transition>

            <!-- Location Card -->
            <Transition enter-active-class="transition-all duration-500 ease-out delay-1000"
              enter-from-class="opacity-0 translate-y-12 scale-90" enter-to-class="opacity-100 translate-y-0 scale-100">
              <div v-if="isVisible"
                class="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 transition-all duration-300 cursor-pointer group hover:bg-white/95 hover:-translate-y-2 hover:shadow-xl"
                @mouseenter="handleCardHover('location')">
                <div
                  class="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <MapPin class="w-8 h-8 text-white" />
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-3 tracking-tight">Location</h3>
                <div class="text-gray-600 space-y-1">
                  <p>Philippines</p>
                </div>
                <div
                  class="mt-4 w-12 h-1 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full mx-auto transition-all duration-300 group-hover:w-20 opacity-60 group-hover:opacity-100" />
              </div>
            </Transition>

            <!-- Support Card -->
            <Transition enter-active-class="transition-all duration-500 ease-out delay-[1200ms]"
              enter-from-class="opacity-0 translate-y-12 scale-90" enter-to-class="opacity-100 translate-y-0 scale-100">
              <div v-if="isVisible"
                class="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 transition-all duration-300 cursor-pointer group hover:bg-white/95 hover:-translate-y-2 hover:shadow-xl"
                @mouseenter="handleCardHover('support')">
                <div
                  class="w-16 h-16 bg-gradient-to-r from-teal-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <MessageCircle class="w-8 h-8 text-white" />
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-3 tracking-tight">24/7 Support</h3>
                <div class="text-gray-600 space-y-1">
                  <p>Always here to help</p>
                </div>
                <div
                  class="mt-4 w-12 h-1 bg-gradient-to-r from-teal-500 to-green-500 rounded-full mx-auto transition-all duration-300 group-hover:w-20 opacity-60 group-hover:opacity-100" />
              </div>
            </Transition>
          </div>

          <!-- Call to Action -->
          <Transition enter-active-class="transition-all duration-700 ease-out delay-1000"
            enter-from-class="opacity-0 translate-y-8" enter-to-class="opacity-100 translate-y-0">
            <div v-if="isVisible" class="text-center mt-12">
              <div
                class="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                @click="handleContactClick">
                <Mail class="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
                <span class="text-white font-medium">Ready to connect? Drop us a message!</span>
              </div>
            </div>
          </Transition>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Mail, MapPin, MessageCircle, Send } from 'lucide-vue-next'

// Simple visibility state that starts immediately
const isVisible = ref(false)

// Methods
const handleCardHover = (cardType) => {
  console.log(`Hovered on ${cardType} card`)
}

const handleContactClick = () => {
  console.log('Contact clicked!')
  // You could emit an event, navigate, open modal, etc.
}

// Start animations immediately when component mounts
onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>