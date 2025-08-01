<template>
    <nav class="relative bg-gradient-to-br from-purple-500 to-indigo-300 flex items-center text-white p-4 mb-4 justify-between w-full py-8 top-0">
      <button class="text-xl font-semibold cursor-pointer hover:text-2xl duration-300">
        <span class="text-white">Forecast</span><span class="text-yellow-300 text-2xl">.27</span>
      </button>
      <ul class="hidden md:flex space-x-6 text-lg font-semibold">
        <li class="hover:text-2xl duration-300"><a href="#home">Home</a></li>
        <li class="hover:text-2xl duration-300"><a href="#about">News</a></li>
        <li class="hover:text-2xl duration-300"><a href="#contact">Contact</a></li>
      </ul>

      <div class="flex items-center space-x-4">
        <input 
        type="text" 
        placeholder="Search..." 
        class="p-2 rounded text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
      </div>

      <button @click="toggleMobileMenu" class="md:hidden p-2 rounded-lg text-purple-600 cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-500 duration-200">
        <span class="text-xl">{{ isMobileMenuOpen ? '✕' : '☰' }}</span>
      </button>

      <div v-if="isMobileMenuOpen" class="absolute top-full left-0 right-0 md:hidden bg-gray-400 text-white shadow-lg border-t border-gray-300">
        <ul class="flex flex-col space-y-2 p-4">
          <li><a href="#home" class="block py-2 px-4 hover:bg-purple-500">Home</a></li>
          <li><a href="#about" class="block py-2 px-4 hover:bg-purple-500">News</a></li>
          <li><a href="#contact" class="block py-2 px-4 hover:bg-purple-500">Contact</a></li>
        </ul>
      </div>
    </nav>
</template>

<script lang="js">
import { ref } from 'vue';

export default {
  setup() {
    const isMobileMenuOpen = ref(false);

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    return {
      isMobileMenuOpen,
      toggleMobileMenu
    };
  }
};
</script>
