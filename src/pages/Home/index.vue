<script setup>
import useProducts from "../../composables/products.js";
import {onMounted, ref} from "vue";
import Loader from "../../components/Spinner/Loader.vue"

const {meta, products, getProducts} = useProducts();
const isLoading = ref(false);


const paginationDetail = ref({
  per_page: 8,
  from: 0,
  to: 0,
  total: 0,
})
const page = ref(1)
const handleGetProducts = async (page, per_page) => {
  try {
    isLoading.value = true;
    await getProducts(page, per_page);
    if (meta) {
      paginationDetail.value.per_page = meta.value.per_page;
      paginationDetail.value.from = meta.value.from || 0;
      paginationDetail.value.to = meta.value.to || 0;
      paginationDetail.value.total = meta.value.total;
    }
    isLoading.value = false;
  } catch (err) {
    isLoading.value = false;
  }
}
const onClickHandler = async (page) => {
  await handleGetProducts(page, paginationDetail.value.per_page);
};

onMounted(async () => {
  await handleGetProducts(page.value, paginationDetail.value.per_page);
});

</script>

<template>

  <!-- Collection section -->
  <span class="loading loading-dots loading-md"></span>
  <section aria-labelledby="collection-heading" class="max-w-xl mx-auto pt-10 px-4 sm:pt-10 sm:px-6 lg:max-w-7xl lg:px-8">
    <div class="bg-white">
      <div class="max-w-2xl mx-auto py-16 px-4 sm:py-2 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">Products</h2>
        <Loader v-if="isLoading"/>

        <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <div v-for="product in products" :key="product.id" class="group relative">
            <router-link :to="{ name: 'product-view', params:{ id: product.id }}">
            <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
              <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" :alt="product.imageAlt" class="w-full h-full object-center object-cover lg:w-full lg:h-full" />
            </div>
            <div class="mt-4 flex justify-between">
              <div>
                <h3 class="text-sm text-gray-700">
                  <a :href="product.href">
                    <span aria-hidden="true" class="absolute inset-0" />
                    {{ product.name }}
                  </a>
                </h3>
                <p class="mt-1 text-sm text-gray-500">{{ product.category?.name }}</p>
              </div>
              <p class="text-sm font-medium text-gray-900">{{ product.price }}</p>
            </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          {{ ' ' }}
          <span class="font-medium">{{ paginationDetail?.from }}</span>
          {{ ' ' }}
          to
          {{ ' ' }}
          <span class="font-medium">{{ paginationDetail?.to }}</span>
          {{ ' ' }}
          of
          {{ ' ' }}
          <span class="font-medium">{{ paginationDetail?.total }}</span>
          {{ ' ' }}
          results
        </p>
      </div>
      <div>
        <vue-awesome-paginate
            :total-items="paginationDetail.total"
            :items-per-page="paginationDetail.per_page"
            :max-pages-shown="3"
            v-model="page"
            :on-click="onClickHandler"
        />
      </div>
    </div>
  </section>

  <!-- Featured section -->
  <section aria-labelledby="comfort-heading" class="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
    <div class="relative rounded-lg overflow-hidden">
      <div class="absolute inset-0">
        <img src="../../assets/Slider/slider2.jpeg" alt="" class="w-full h-full object-center object-cover" />
      </div>
      <div class="relative bg-gray-900 bg-opacity-75 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
        <div class="relative max-w-3xl mx-auto flex flex-col items-center text-center">
          <h2 id="comfort-heading" class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Radiate Brilliance</h2>
          <p class="mt-3 text-xl text-white">Where Beauty Meets Precision in Diamond Cosmetics.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.pagination-container {
  display: flex;
  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}

</style>