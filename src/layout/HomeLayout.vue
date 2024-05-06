<script setup>
import FooterMenu from "./Footer/Footer.vue";
import HeaderMenu from "./Header/Header.vue";
</script>

<template>
  <div class="bg-white">
    <HeaderMenu/>
    <main>
      <RouterView/>
    </main>
    <FooterMenu/>
  </div>
</template>



