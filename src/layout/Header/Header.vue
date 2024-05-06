<script setup>
import { ref } from 'vue'
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/vue'
import { MenuIcon, QuestionMarkCircleIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/vue/outline'
import {useRoute} from "vue-router";
import {useAuthStore} from "../../stores/auth.js";

const route = useRoute();
const authStore = useAuthStore();
const mobileMenuOpen = ref(false)

const handleSignOut = async () => {
  await authStore.handleLogout();
  localStorage.clear();
};

</script>

<template>
  <!-- Hero section -->
  <div class="relative bg-gray-900">
    <!-- Decorative image and overlay -->
    <div aria-hidden="true" class="absolute inset-0 overflow-hidden">
      <img src="../../assets/Slider/slider.jpeg" alt="" class="w-full h-full object-center object-cover" />
    </div>
    <div aria-hidden="true" class="absolute inset-0 bg-gray-900 opacity-50" />

    <!-- Navigation -->
    <header class="relative z-10">
      <nav aria-label="Top">
        <!-- Top navigation -->
        <div class="bg-gray-900">
          <div class="max-w-7xl mx-auto h-10 px-4 flex items-center justify-between sm:px-6 lg:px-8">
            <!-- Currency selector -->
            <form>
              <div>
              </div>
            </form>

            <div class="flex items-center space-x-6">
              <div v-if="authStore.user">
                <router-link :to="{ name: 'profile', params: { id: authStore.user.id } }" href="#" class="text-sm font-medium text-white hover:text-gray-100">
                  {{ authStore.user.first_name }}</router-link>
                <router-link :to="{ name: 'orders'}" class="text-sm ml-5 font-medium text-white hover:text-gray-100">Orders</router-link>
                <button @click="handleSignOut" type="button" class="text-sm ml-5 font-medium text-white hover:text-gray-100">Logout</button>
              </div>
              <div v-else>
                <router-link :to="{ name: 'login'}" href="#" class="text-sm font-medium text-white hover:text-gray-100">Sign in</router-link>
                <router-link :to="{ name: 'register'}" class="text-sm ml-5 font-medium text-white hover:text-gray-100">Create an account</router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Secondary navigation -->
        <div class="backdrop-blur-md backdrop-filter bg-opacity-10 bg-white">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div>
              <div class="h-16 flex items-center justify-between">
                <!-- Logo (lg+) -->
                <div class="hidden lg:flex-1 lg:flex lg:items-center">
                  <a href="#">
                    <span class="sr-only">Workflow</span>
                    <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white" alt="" />
                  </a>
                </div>

                <div class="hidden h-full lg:flex">
                  <!-- Flyout menus -->
                  <PopoverGroup class="px-4 bottom-0 inset-x-0">
                    <div class="h-full flex justify-center space-x-8">
                      <router-link :to="{ name: 'home' }" class="flex items-center text-sm font-medium text-white"> Home </router-link>
                    </div>
                  </PopoverGroup>
                </div>

                <!-- Mobile menu and search (lg-) -->
                <div class="flex-1 flex items-center lg:hidden">
                  <button type="button" class="-ml-2 p-2 text-white" @click="mobileMenuOpen = true">
                    <span class="sr-only">Open menu</span>
                    <MenuIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div class="flex-1 flex items-center justify-end">
                  <div class="flex items-center lg:ml-8">
                    <!-- Cart -->
                    <div class="ml-4 flow-root lg:ml-8">
                      <router-link :to="{ name:'cards' }" class="group -m-2 p-2 flex items-center">
                        <ShoppingBagIcon class="flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
                        <span class="sr-only">items in cart, view bag</span>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <div v-if="route.name === 'home'"  class="relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0">
      <h1 class="text-4xl font-extrabold tracking-tight text-white lg:text-6xl">Diamond Cosmetics</h1>
      <p class="mt-4 text-xl text-white">Sparkle with elegance at Diamond Cosmetics' premier online boutique.</p>
    </div>
  </div>

</template>



