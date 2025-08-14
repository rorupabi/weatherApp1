<template>
    <div>
  <!-- Background with blur effect -->
  <div class="min-h-[60vh] relative overflow-hidden">
    <!-- Blurred background image -->
    <div class="absolute inset-0 bg-cover bg-center transform scale-110" :style="{ backgroundImage: `url(${Trees})`, filter: 'blur(3px)' }"></div>
    
    <!-- Content container -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full text-white p-8 min-h-[50vh]">
      <!-- Animated badge/tag -->
      <div class="mb-6 animate-fade-in">
        <span class="bg-green-500 bg-opacity-20 backdrop-blur-sm border border-green-400 text-white px-4 py-2 rounded-full text-sm font-medium">
          🌱 Environmental Initiative
        </span>
      </div>
      
      <!-- Main title with better typography -->
      <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-6 text-white leading-tight animate-slide-up">
        Plastic, <span class="relative underline decoration-green-400 decoration-4 underline-offset-4">without the pollution<span class="text-green-400">.</span></span>
      </h1>
      
      <!-- Enhanced subtitle with better spacing and readability -->
      <div class="max-w-4xl mx-auto text-center animate-slide-up-delay">
        <p class="text-gray-100 font-medium text-lg md:text-xl lg:text-2xl leading-relaxed mb-8">
          Forecast.27 isn't just about weather forecasting—it's about 
          <span class="text-green-300 font-medium">taking care of our environment</span>. 
          We provide the latest insights on environmental topics that matter most.
        </p>
        
        <!-- Call-to-action buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <button class="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Explore Topics
          </button>
          <button class="border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
            Watch Videos
          </button>
        </div>
      </div>

      <!-- Scroll indicator 
      <div class="absolute bottom-1 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div class="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
      -->
    </div>

    <!--Video Section-->
    <div></div>
  </div> 
  </div>
</template>

<script>
import Trees from '../assets/trees.jpg';

export default {
  data() {
    return {
      Trees,
      title: "Environmental Topics",
      topics: [
        { id: 1, name: "Climate Change" },
        { id: 2, name: "Pollution" },
        { id: 3, name: "Deforestation" },
      ],
      videos: [
        { src:'../assets/Videos/EnvironmentalVid.mp4', title: "Environmental Awareness" },
        { src:'../assets/Videos/cleannature.mp4', title: "Cleaning and helping mother nature" },
        { src:'../assets/Videos/CLEANAIR.mp4', title: "Cleaner Air" },
        { src:'../assets/Videos/PlasticGather.mp4', title: "Plastic Recycling" },
      ],
    };
  },
};
</script>

<style scoped>
h2 {
  color: green;
}

/* Animation classes */
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-slide-up {
  animation: slideUp 1s ease-out 0.2s both;
}

.animate-slide-up-delay {
  animation: slideUp 1s ease-out 0.4s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scroll indicator animation */
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate(-50%, 0);
  }
  40%, 43% {
    transform: translate(-50%, -10px);
  }
  70% {
    transform: translate(-50%, -5px);
  }
  90% {
    transform: translate(-50%, -2px);
  }
}
</style>