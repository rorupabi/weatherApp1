<template>
    <div>
  <div class="bg-cover bg-center min-h-[50vh]" :style="{ backgroundImage: `url(${Trees})` }">
    <!-- Content container -->
    <div class="flex flex-col items-center justify-center h-full text-white p-8 min-h-[50vh]">
      <!-- Main title -->
      <h1 class="text-2xl md:text-3xl font-bold text-center mb-3 text-white">
        Plastic, <span class="underline">without the pollution<span class="text-green-500">.</span></span>
      </h1>
      
      <!-- Subtitle positioned below the main title -->
      <p class="text-white font-normal lg:text-lg w-4/5 md:text-xl sm:text-2xl">Forecast.27 isn't just about the weather forecasting but it's also about
        taking care of the environment. We aim to provide you with the latest information on environmental topics that matter most to us. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
      </p>
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
</style>