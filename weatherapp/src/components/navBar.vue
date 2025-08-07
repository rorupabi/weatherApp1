<template>
    <nav class="bg-gradient-to-br from-purple-500 to-indigo-300 flex items-center text-white p-12 mb-4 justify-between w-full py-8 top-0 sticky z-50">
      <button @click="scrollToTop" class="text-xl font-semibold cursor-pointer hover:text-2xl duration-300">
        <span class="text-white font-bold">Forecast</span><span class="text-yellow-300 text-2xl">.27</span>
      </button>
      
      <ul class="hidden md:flex space-x-6 text-lg font-semibold">
        <li class="hover:text-2xl duration-300">
          <a @click="scrollToTop" href="#" class="cursor-pointer">Home</a>
        </li>
        <li class="hover:text-2xl duration-300">
          <a @click.prevent="scrollToSection('about')" href="#" class="cursor-pointer">News</a>
        </li>
        <li class="hover:text-2xl duration-300">
          <a @click.prevent="scrollToSection('contact')" href="#" class="cursor-pointer">Contact</a>
        </li>
      </ul>

      <button @click="toggleMobileMenu" class="md:hidden p-2 rounded-lg text-purple-600 cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-500 duration-200">
        <span class="text-xl">{{ isMobileMenuOpen ? '✕' : '☰' }}</span>
      </button>

      <div v-if="isMobileMenuOpen" class="absolute top-full left-0 right-0 md:hidden bg-gray-400 text-white shadow-lg border-t border-gray-300">
        <ul class="flex flex-col space-y-2 p-4">
          <li>
            <a @click.prevent="goHome" href="#" class="block py-2 px-4 hover:bg-purple-500 cursor-pointer">Home</a>
          </li>
          <li>
            <a @click.prevent="scrollToSection('about')" href="#" class="block py-2 px-4 hover:bg-purple-500 cursor-pointer">News</a>
          </li>
          <li>
            <a @click.prevent="scrollToSection('contact')" href="#" class="block py-2 px-4 hover:bg-purple-500 cursor-pointer">Contact</a>
          </li>
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

    // Fixed: Move functions inside setup() and fix typo
    const scrollToTop = () => {
      window.scrollTo({  // Fixed: was "windows"
        top: 0,
        behavior: 'smooth'
      });
      isMobileMenuOpen.value = false;
    };

    const goHome = () => {
      window.location.reload();
    };

    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } 
      isMobileMenuOpen.value = false;
    };

    return {
      isMobileMenuOpen,
      toggleMobileMenu,
      scrollToTop,
      goHome,
      scrollToSection
    };
  }
};
</script>