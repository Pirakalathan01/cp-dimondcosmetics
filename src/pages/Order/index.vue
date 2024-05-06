<script setup>
import {onMounted, ref} from 'vue'
import useOrders from "../../composables/order.js";
import Loader from "../../components/Spinner/Loader.vue"

const { errors, meta, orders, getOrders} = useOrders();

const isLoading = ref(false);


const paginationDetail = ref({
  per_page: 8,
  from: 0,
  to: 0,
  total: 0,
})


const page = ref(1)

const handleGetOrderProducts = async (page, per_page) => {
  try {
    isLoading.value = true;
    await getOrders(page, per_page);
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
  await handleGetOrderProducts(page, paginationDetail.value.per_page);
};

onMounted(async () => {
  await handleGetOrderProducts(page.value, paginationDetail.value.per_page);
});

</script>

<template>
  <div class="bg-gray-50">

    <main class="max-w-2xl mx-auto pt-8 pb-24 sm:pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="px-4 space-y-2 sm:px-0 sm:flex sm:items-baseline sm:justify-between sm:space-y-0">
        <div class="flex sm:items-baseline sm:space-x-4">
          <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Orders</h1>
        </div>

      </div>
      <Loader v-if="isLoading"/>
      <!-- Products -->
      <section v-else aria-labelledby="products-heading" class="mt-6">
        <div v-if="orders.length === 0">
          <h2>No Orders Available</h2>
        </div>
        <div v-else>
          <h2 id="products-heading" class="sr-only">Products purchased</h2>
          <div class="space-y-8">
          <div v-for="order in orders" :key="order.id" class="bg-white border-t border-b border-gray-200 shadow-sm sm:border sm:rounded-lg">
            <div class="py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
              <div class="sm:flex lg:col-span-7">
                <div class="flex-shrink-0 w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-none sm:w-40 sm:h-40">
                  <img src="https://tailwindui.com/img/ecommerce-images/confirmation-page-03-product-01.jpg" alt="product.imageAlt" class="w-full h-full object-center object-cover sm:w-full sm:h-full" />
                </div>

                <div class="mt-6 sm:mt-0 sm:ml-6">
                  <h3 class="text-base font-medium text-gray-900">
                    <a href="product.href">{{ order.product.name }}</a>
                    <p class=" text-sm text-gray-500">
                      {{ order.product.category?.name }}
                    </p>
                  </h3>
                  <p class="mt-2 text-sm font-medium text-gray-900">Rs.{{ order.total_gross_amount }}</p>
                  <p class="text-sm font-medium text-gray-900">Cash on Delivery</p>
                  <span v-if="order.status === 'Cancelled'" class="inline-flex items-center px-3 mt-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800"> Cancelled </span>
                  <span v-if="order.status === 'Delivered'" class="inline-flex items-center px-3 mt-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"> Delivered </span>
                  <span v-if="order.status === 'Order_Placed'" class="inline-flex items-center px-3 mt-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"> Order Placed </span>
                  <span v-if="order.status === 'Shipped'" class="inline-flex items-center px-3 mt-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"> Shipped </span>
                  <span v-if="order.status === 'Processing'" class="inline-flex items-center px-3 mt-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"> Processing </span>
                </div>
              </div>

              <div class="mt-6 lg:mt-0 lg:col-span-5">
                <dl class="grid grid-cols-2 gap-x-6 text-sm">
                  <div>
                    <dt class="font-medium text-gray-900">Delivery address</dt>
                    <dd class="mt-3 text-gray-500">
                      <span class="block">{{ order.country }}</span>
                      <span class="block">{{ order.city }}</span>
                      <span class="block">{{ order.state }}</span>
                      <span class="block">{{ order.address }}</span>
                      <span class="block">{{ order.post_code }}</span>
                    </dd>
                  </div>
                  <div>
                    <dt class="font-medium text-gray-900">Customer updates</dt>
                    <dd class="mt-3 text-gray-500 space-y-3">
                      <p>
                        {{ order.first_name }}
                      </p>
                      <p>
                        {{ order.last_name }}
                      </p>
                      <p>
                        {{ order.email }}
                      </p>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
          <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
        </div>
        </div>
      </section>

    </main>

  </div>

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