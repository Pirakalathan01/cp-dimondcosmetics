<script setup>
import { onMounted, ref } from 'vue'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TabGroup,
  TabPanel,
  TabPanels,
} from '@headlessui/vue'
import {
  MinusSmIcon,
  PlusSmIcon,
} from '@heroicons/vue/outline'
import { StarIcon } from '@heroicons/vue/solid'
import Loader from "../../components/Spinner/Loader.vue"
import useProducts from "../../composables/products.js";
import {useRoute, useRouter} from "vue-router";
import useCards from "../../composables/card.js";


const { product, getProduct, destroyProduct} = useProducts();
const { storeCard } = useCards();

const router = useRouter();
const route = useRoute();

const isLoading = ref(false);
const isGetLoading = ref(false);

const open = ref(false)
// const selectedColor = ref(product.colors[0])

const handleGetProduct = async () => {
  try {
    isGetLoading.value = true;
    await getProduct(route.params.id)
    isGetLoading.value = false;
  } catch (err) {
    isGetLoading.value = false;
  }
}

const handleStoreCardProduct = async () => {
  isLoading.value = true
  await storeCard({
    product_id: route.params.id
  })
  isLoading.value = false
}

onMounted(async () => {
  await handleGetProduct();
});

</script>
<template>
  <div class="bg-white">
    <Loader v-if="isGetLoading"/>
    <main v-else class="max-w-7xl my-10 mx-auto sm:pt-16 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto lg:max-w-none">
        <!-- Product -->
        <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <!-- Image gallery -->
          <TabGroup as="div" class="flex flex-col-reverse">
            <!-- Image selector -->
            <TabPanels class="w-full aspect-w-1 aspect-h-1">
              <TabPanel>
                <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" alt="dddd" class="w-full h-full object-center object-cover sm:rounded-lg" />
              </TabPanel>
            </TabPanels>
          </TabGroup>

          <!-- Product info -->
          <div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">{{ product.name }}</h1>

            <div class="mt-3">
              <h2 class="sr-only">Product information</h2>
              <p class="text-3xl text-gray-900">Rs.{{ product.price }}</p>
            </div>

            <!-- Reviews -->
<!--            <div class="mt-3">-->
<!--              <h3 class="sr-only">Reviews</h3>-->
<!--              <div class="flex items-center">-->
<!--                <div class="flex items-center">-->
<!--                  <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[product.rating > rating ? 'text-indigo-500' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />-->
<!--                </div>-->
<!--                <p class="sr-only">{{ product.rating }} out of 5 stars</p>-->
<!--              </div>-->
<!--            </div>-->

            <div class="mt-6">
              <h3 class="sr-only">Description</h3>

              <div class="text-base text-gray-700 space-y-6" v-html="product.description" />
            </div>

            <form class="mt-6">
              <div class="mt-10 flex sm:flex-col1">
                <button
                    @click="handleStoreCardProduct"
                    type="button"
                    class="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                >
                  <svg v-if="isLoading" class="w-4 h-5 text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none"
                       xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                    <path
                        d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                        stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path
                        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                        stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-900">
                    </path>
                  </svg>
                  {{ isLoading? 'Adding...' : 'Add to card' }}
                </button>
              </div>
            </form>

            <section aria-labelledby="details-heading" class="mt-12">
              <h2 id="details-heading" class="sr-only">Additional details</h2>

              <div class="border-t divide-y divide-gray-200">
                <Disclosure as="div"  v-slot="{ open }">
                  <h3>
                    <DisclosureButton class="group relative w-full py-6 flex justify-between items-center text-left">
                      <span :class="[open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium']">
                        directions
                      </span>
                      <span class="ml-6 flex items-center">
                        <PlusSmIcon v-if="!open" class="block h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                        <MinusSmIcon v-else class="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500" aria-hidden="true" />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel as="div" class="pb-6 prose prose-sm">
                    {{ product.directions }}
                  </DisclosurePanel>
                </Disclosure>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

