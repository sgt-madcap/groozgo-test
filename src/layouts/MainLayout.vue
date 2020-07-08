<template>
  <div class="app-main-layout">

    <header>
      <Navbar @click="isOpen = !isOpen" />
    </header>

    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <Footer />

  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Footer from "@/components/app/Footer";

export default {
  name: "main-layout",
  data: () => ({
    isOpen: true
  }),
  async mounted() {
    await this.$store.dispatch("fetchInfo");
  },
  components: {
    Navbar,
    Footer
  }
};
</script>
