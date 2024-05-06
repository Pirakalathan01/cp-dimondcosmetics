<script setup>
import {onMounted, reactive, ref, toRefs, watch, watchEffect  } from 'vue'
import {email, helpers, required} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import {useRoute, useRouter} from "vue-router";
import Loader from "../../components/Spinner/Loader.vue"
import {
  Dialog,
  DialogOverlay,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { MenuIcon, QuestionMarkCircleIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/vue/outline'
import { CheckCircleIcon, TrashIcon } from '@heroicons/vue/solid'
import useOrders from "../../composables/order.js";
import useCards from "../../composables/card.js";

const { errors, storeOrder } = useOrders();
const { card, getCard} = useCards();

const router = useRouter();
const route = useRoute();

const $externalResults = reactive({});
const isLoading = ref(false);
const isGetLoading = ref(false);


const total_gross_amount = ref();
const maxNumber =  ref(1);
const selectedQuantity = ref(1)

const subTotal = ref();
const shippingAmount = ref(300.00);
const totalAmount = ref();

const open = ref(false)



const rules = {
  email: {
    required: helpers.withMessage("The email field is required", required),
    email
  },
  first_name: {
    required: helpers.withMessage("The first name field is required", required),
  },
  last_name: {
    required: helpers.withMessage("The last name field is required", required),
  },
  address: {
    required: helpers.withMessage("The address field is required", required),
  },
  city: {
    required: helpers.withMessage("The city field is required", required),
  },
  country: {
    required: helpers.withMessage("The country field is required", required),
  },
  state: {
    required: helpers.withMessage("The state field is required", required),
  },
  post_code: {
    required: helpers.withMessage("The post_code field is required", required),
  },
  phone_number: {
    required: helpers.withMessage("The phone_number field is required", required),
  },
  quantity: {
    required: helpers.withMessage("The quantity field is required", required),
  },
};

const createData = reactive({
  product_id:"",
  email: "",
  first_name: "",
  last_name: "",
  address: "",
  city: "",
  country: "",
  state: "",
  post_code: "",
  phone_number: "",
  quantity: "",
});

const validate = useVuelidate(rules, toRefs(createData), { $externalResults });

const handleCreateOrder = async (data, validate) => {
  console.log('data',data)
  console.log('validate',validate)
  validate.$touch();
  if (!validate.$invalid) {
    try {
      isLoading.value = true;
      await storeOrder(data);
      isLoading.value = false;
    } catch (err) {
      isLoading.value = false;
    }
  }
};

const handleGetCard = async () => {
  try {
    isGetLoading.value = true;
    await getCard(route.params.id);
    createData.product_id = card.value?.product?.id;
    createData.quantity = selectedQuantity.value;
    maxNumber.value = card.value?.product?.in_stock
    subTotal.value = selectedQuantity.value * card.value?.product?.price;
    totalAmount.value = subTotal.value + shippingAmount.value;
    isGetLoading.value = false;
  } catch (err) {
    isGetLoading.value = false;
  }
}

onMounted(async () => {
  await handleGetCard();
});

watch([selectedQuantity], () => {
  createData.quantity = selectedQuantity.value;
  subTotal.value = selectedQuantity.value * card.value?.product?.price;
  totalAmount.value = subTotal.value + shippingAmount.value;
});


</script>



<template>
  <div class="bg-gray-50">
    <Loader v-if="isGetLoading"/>
    <main v-else class="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto lg:max-w-none">
        <h1 class="sr-only">Checkout</h1>

        <form class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16" @submit.prevent="handleCreateOrder(createData,validate)">
          <div>
            <div>
              <h2 class="text-lg font-medium text-gray-900">Contact information</h2>

              <div class="mt-4">
                <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
                <div class="mt-1">
                  <input v-model="validate.email.$model" type="email" id="email-address" name="email-address" autocomplete="email" class="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
              </div>
              <template v-if="validate.email.$error" class="text-left">
                <div
                    v-for="(error, index) in validate.email.$errors"
                    :key="index"
                    class="mt-2 text-red-600 text-sm"
                >
                  {{ error.$message }}
                </div>
              </template>
            </div>

            <div class="mt-10 border-t border-gray-200 pt-10">
              <h2 class="text-lg font-medium text-gray-900">Shipping information</h2>

              <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                  <div class="mt-1">
                    <input v-model="validate.first_name.$model" type="text" id="first-name" name="first-name" autocomplete="given-name" class="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <template v-if="validate.first_name.$error" class="text-left">
                    <div
                        v-for="(error, index) in validate.first_name.$errors"
                        :key="index"
                        class="mt-2 text-red-600 text-sm"
                    >
                      {{ error.$message }}
                    </div>
                  </template>
                </div>

                <div>
                  <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                  <div class="mt-1">
                    <input v-model="validate.last_name.$model" type="text" id="last-name" name="last-name" autocomplete="family-name" class="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <template v-if="validate.last_name.$error" class="text-left">
                    <div
                        v-for="(error, index) in validate.last_name.$errors"
                        :key="index"
                        class="mt-2 text-red-600 text-sm"
                    >
                      {{ error.$message }}
                    </div>
                  </template>
                </div>

                <div class="sm:col-span-2">
                  <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                  <div class="mt-1">
                    <input v-model="validate.address.$model" type="text" name="address" id="address" autocomplete="street-address" class="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <template v-if="validate.address.$error" class="text-left">
                    <div
                        v-for="(error, index) in validate.address.$errors"
                        :key="index"
                        class="mt-2 text-red-600 text-sm"
                    >
                      {{ error.$message }}
                    </div>
                  </template>
                </div>

                <div>
                  <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                  <div class="mt-1">
                    <input v-model="validate.city.$model" type="text" name="city" id="city" autocomplete="address-level2" class="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <template v-if="validate.city.$error" class="text-left">
                    <div
                        v-for="(error, index) in validate.city.$errors"
                        :key="index"
                        class="mt-2 text-red-600 text-sm"
                    >
                      {{ error.$message }}
                    </div>
                  </template>
                </div>

                <div>
                  <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                  <div class="mt-1">
                    <select  v-model="validate.country.$model" id="country" name="country" autocomplete="country-name" class="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option value="Sri lanka">Sri Lanka</option>
                    </select>
                  </div>
                  <template v-if="validate.country.$error" class="text-left">
                    <div
                        v-for="(error, index) in validate.country.$errors"
                        :key="index"
                        class="mt-2 text-red-600 text-sm"
                    >
                      {{ error.$message }}
                    </div>
                  </template>
                </div>

                <div>
                  <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
                  <div class="mt-1">
                    <input v-model="validate.state.$model" type="text" name="region" id="region" autocomplete="address-level1" class="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <template v-if="validate.state.$error" class="text-left">
                    <div
                        v-for="(error, index) in validate.state.$errors"
                        :key="index"
                        class="mt-2 text-red-600 text-sm"
                    >
                      {{ error.$message }}
                    </div>
                  </template>
                </div>

                <div>
                  <label for="postal-code" class="block text-sm font-medium text-gray-700">Postal code</label>
                  <div class="mt-1">
                    <input v-model="validate.post_code.$model" type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <template v-if="validate.post_code.$error" class="text-left">
                    <div
                        v-for="(error, index) in validate.post_code.$errors"
                        :key="index"
                        class="mt-2 text-red-600 text-sm"
                    >
                      {{ error.$message }}
                    </div>
                  </template>
                </div>

                <div class="sm:col-span-2">
                  <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                  <div class="mt-1">
                    <input v-model="validate.phone_number.$model" type="text" name="phone" id="phone" autocomplete="tel" class="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <template v-if="validate.phone_number.$error" class="text-left">
                    <div
                        v-for="(error, index) in validate.phone_number.$errors"
                        :key="index"
                        class="mt-2 text-red-600 text-sm"
                    >
                      {{ error.$message }}
                    </div>
                  </template>
                </div>
              </div>
            </div>

          </div>

          <!-- Order summary -->
          <div class="mt-10 lg:mt-0">
            <h2 class="text-lg font-medium text-gray-900">Order summary</h2>

            <div class="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 class="sr-only">Items in your cart</h3>
              <ul role="list" class="divide-y divide-gray-200">
                <li v-if="card?.product" class="flex py-6 px-4 sm:px-6">
                  <div class="flex-shrink-0">
                    <img src="https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg" alt="dddd" class="w-20 rounded-md" />
                  </div>

                  <div class="ml-6 flex-1 flex flex-col">
                    <div class="flex">
                      <div class="min-w-0 flex-1">
                        <h4 class="text-sm">
                          <a href="#" class="font-medium text-gray-700 hover:text-gray-800">
                            {{ card?.product.name }}
                          </a>
                        </h4>
                        <p class="mt-1 text-sm text-gray-500">
                          {{ card?.product.category.name }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500">
                          In stock {{ card?.product.in_stock }}
                        </p>
                      </div>
                    </div>

                    <div class="flex-1 pt-2 flex items-end justify-between">
                      <p class="mt-1 text-sm font-medium text-gray-900"> Rs.{{ card?.product.price }}</p>

                      <div class="ml-4">
                        <label for="quantity" class="sr-only">Quantity</label>
                        <select v-model="selectedQuantity" id="quantity" name="quantity" class="rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <option v-for="num in maxNumber" :key="num" :value="num">{{ num }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <dl class="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                <div class="flex items-center justify-between">
                  <dt class="text-sm">Subtotal</dt>
                  <dd class="text-sm font-medium text-gray-900">Rs.{{ parseFloat(subTotal).toFixed(2) }}</dd>
                </div>
                <div class="flex items-center justify-between">
                  <dt class="text-sm">Shipping</dt>
                  <dd class="text-sm font-medium text-gray-900">Rs.{{ shippingAmount }}</dd>
                </div>

                <div class="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt class="text-base font-medium">Total</dt>
                  <dd class="text-base font-medium text-gray-900">Rs.{{ parseFloat(totalAmount).toFixed(2) }}</dd>
                </div>
              </dl>

              <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
                <button type="submit" class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">Confirm order</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>

  </div>
</template>

