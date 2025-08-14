<template>
    <nav class="bg-gradient-to-br from-purple-800 to-indigo-400 flex items-center text-white p-12 mb-4 justify-between w-full py-8 top-0 fixed z-50 transition duration-300">
      <button @click="scrollToTop" class="text-2xl font-semibold cursor-pointer hover:text-3xl duration-300">
        <span class="text-white font-bold">Forecast</span><span class="text-yellow-300 text-2xl">.27</span>
      </button>
      
      <ul class="hidden md:flex space-x-6 text-lg font-semibold">
        <li class="hover:text-2xl duration-300">
          <router-link to="/" class="cursor-pointer">Home</router-link>
        </li>
        <li class="hover:text-2xl duration-300">
          <router-link to="/news" class="cursor-pointer">News</router-link>
        </li>
        <li class="hover:text-2xl duration-300">
          <router-link to="/contacts" class="cursor-pointer">Contact</router-link>
        </li>
        <li class="hover:text-2xl duration-300">
          <router-link to="/aboutus" class="cursor-pointer">About Us</router-link>
        </li>
      </ul>


      <button @click="toggleMobileMenu" class="md:hidden p-2 rounded-lg text-purple-600 cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-500 duration-200">
        <span class="text-xl">{{ isMobileMenuOpen ? '✕' : '☰' }}</span>
      </button>

      <div v-if="isMobileMenuOpen" class="absolute top-full left-0 right-0 md:hidden bg-blue-900 text-white shadow-lg">
        <ul class="flex flex-row space-y-2 p-4">
          <ul class="">
            <li>
              <router-link to="/" class="block py-2 px-4 hover:bg-purple-500 transition duration-300">Home</router-link>
            </li>
            <li>
              <router-link to="/news" class="block py-2 px-4 hover:bg-purple-500 transition duration-300">News</router-link>
            </li>
            <li>
              <router-link to="/contacts" class="block py-2 px-4 hover:bg-purple-500 transition duration-300">Contact</router-link>
            </li>
            <li>
              <router-link to="/aboutus" class="block py-2 px-4 hover:bg-purple-500 transition duration-300">About Us</router-link>
            </li>
          </ul>
        </ul>
      </div>
    </nav>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const isMobileMenuOpen = ref(false);

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      isMobileMenuOpen.value = false;
    };

    const scrollToSection = (sectionId) => {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          // Account for fixed navbar height
          const navHeight = 100; 
          const elementPosition = element.offsetTop - navHeight;
          
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        } else {
          console.log(`Element with ID '${sectionId}' not found`);
        }
        isMobileMenuOpen.value = false;
      }, 100);
    };

    return {
      isMobileMenuOpen,
      toggleMobileMenu,
      scrollToTop,
      scrollToSection
    };
  }
};
</script>