<script setup>
import {onMounted, ref} from "vue";
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XIcon as XIconSolid, XCircleIcon  } from '@heroicons/vue/solid'
import { ExclamationIcon } from '@heroicons/vue/outline'
import Loader from "../../components/Spinner/Loader.vue"
import useCards from "../../composables/card.js";

const {meta, cards, getCards, destroyProduct} = useCards()
const isLoading = ref(false);
const deleteLoading = ref(false)
const openDeleteModel =  ref(false);

const selectedId = ref('')

const paginationDetail = ref({
  per_page: 8,
  from: 0,
  to: 0,
  total: 0,
})

const page = ref(1)

const handleGetCardProducts = async (page, per_page) => {
  try {
    isLoading.value = true;
    await getCards(page, per_page);
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

const openDelete = async (id) => {
  selectedId.value = id;
  openDeleteModel.value = true;
}


const handleRemoveCardProduct = async () => {
  try {
    deleteLoading.value = true;
    await destroyProduct(selectedId.value)
    await handleGetCardProducts(page, paginationDetail.value.per_page);
    openDeleteModel.value = false;
    deleteLoading.value = false;
  } catch (err) {
    isLoading.value = false;
  }
}

const onClickHandler = async (page) => {
  await handleGetCardProducts(page, paginationDetail.value.per_page);
};

onMounted(async () => {
  await handleGetCardProducts(page.value, paginationDetail.value.per_page);
});

</script>
<template>
  <div class="bg-white">

    <main class="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

      <form class="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
        <section aria-labelledby="cart-heading" class="lg:col-span-7">
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>
          <Loader v-if="isLoading"/>
          <div v-else>
            <div v-if="cards.length === 0">
              <p>No products in Card</p>
            </div>
            <div v-else>
              <ul role="list" class="border-t border-b border-gray-200 divide-y divide-gray-200">
                <li v-for="card in cards" :key="card.id" class="flex py-6 sm:py-10">
                  <div class="flex-shrink-0">
                    <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg" :alt="dddd" class="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48" />
                  </div>

                  <div class="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div class="flex justify-between">
                          <h3 class="text-sm">
                            <a :href="card.product.href" class="font-medium text-gray-700 hover:text-gray-800">
                              {{ card.product.name }}
                            </a>
                          </h3>
                        </div>
                        <div class="mt-1 flex text-sm">
                          <p class="text-gray-500">
                            {{ card.product.name }}
                          </p>
                          <p class="ml-4 pl-4 border-l border-gray-200 text-gray-500">
                            {{ card.product.name }}
                          </p>
                        </div>
                        <p class="mt-1 text-sm font-medium text-gray-900">{{ card.product.price }}</p>
                      </div>

                      <div class="mt-4 sm:mt-0 sm:pr-9">
                        <div class="absolute top-0 right-0">
                          <button @click="() => openDelete(card.id)" type="button" class="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500">
                            <span class="sr-only">Remove</span>
                            <XIconSolid class="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <p class="mt-4 flex text-sm text-gray-700 space-x-2">
                      <CheckIcon v-if="!card.product.out_of_stock" class="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                      <XCircleIcon  v-else class="flex-shrink-0 h-5 w-5 text-red-300" aria-hidden="true" />
                      <span>{{ card.product.out_of_stock ? 'Out of stock' : `In stock` }}</span>
                    </p>
                    <div class="mt-6">
                      <router-link :to="{ name: 'checkout', params: { id: card.id }}">
                      <button type="button" class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">Checkout</button>
                      </router-link>
                    </div>
                  </div>
                </li>
              </ul>
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
          </div>
        </section>
      </form>
    </main>
  </div>
  <div>
    <TransitionRoot as="template" :show="openDeleteModel">
      <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="openDeleteModel = false">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900"> Remove product from card </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">Are you sure you want to remove your product from card? All of your data will be permanently removed from our servers forever. This action cannot be undone.</p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button type="button"
                        @click="() => handleRemoveCardProduct()"
                        :disabled="deleteLoading"
                        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >{{ deleteLoading ? 'Removing...' : 'Remove' }}</button>
                <button type="button"
                        @click="openDeleteModel = false"
                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                        ref="cancelButtonRef">Cancel</button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
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




