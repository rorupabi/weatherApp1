<!--ROOT COMPONENT-->

<template>
  <div :style="{ backgroundImage: `url(${AuroraBorealis})` }" class="bg-cover bg-center min-h-screen">
    <Navbar />
    <router-view /> <!--Render-->
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/navBar.vue'
import Footer from './components/footer.vue'
import AuroraBorealis from './assets/aurora-borealis.jpg'

export default {
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      AuroraBorealis
    }
  }
}
</script>
