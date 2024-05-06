<script setup>
import {ref} from "vue";
import {useRoute} from "vue-router";
import {useAdminStore} from "../../stores/admin.js";

const adminStore = useAdminStore();

const route = useRoute()

const props = defineProps({
  data: {
    type: Object,
  },
  loading: {
    type: Boolean,
  },
  validate: {
    type: Object,
  },
});

const emits = defineEmits(["saveData"]);

const titleTypes = ref([
  { id: 'Mr', name:'Mr'},
  { id: 'Mrs', name:'Mrs'},
  { id: 'Ms', name:'Ms'},
  { id: 'Dr', name:'Dr'}
])

const genderTypes = ref([
  { id: 'Male', name:'Male'},
  { id: 'Female', name:'Female'},
])

</script>
<template>
  <div class="flex flex-col">
    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <form class="space-y-8 divide-y divide-gray-200">
          <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div class=" space-y-6  sm:space-y-5">

              <div class="space-y-6 sm:space-y-5">
                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                  <label for="first_name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    First Name
                  </label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <input type="text" name="first_name" id="first_name"
                           v-model="validate.first_name.$model"
                           class="max-w-lg h-8 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-gray-300 rounded-md"/>
                    <template v-if="validate.first_name.$error" class="text-left">
                      <div
                          v-for="(error, index) in validate.first_name.$errors"
                          :key="index"
                          class="mt-2 text-red-600 text-sm"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                    <div
                        v-if="adminStore.errors?.errors?.first_name"
                        class="mt-2 text-red-600 text-sm text-left"
                    >
                      {{ adminStore.errors?.errors?.first_name[0] }}
                    </div>
                  </div>
                </div>

                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                  <label for="last_name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Last Name
                  </label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <input type="text" name="last_name" id="last_name"
                           v-model="validate.last_name.$model"
                           class="max-w-lg h-8 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-gray-300 rounded-md"/>
                    <template v-if="validate.last_name.$error" class="text-left">
                      <div
                          v-for="(error, index) in validate.last_name.$errors"
                          :key="index"
                          class="mt-2 text-red-600 text-sm"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                    <div
                        v-if="adminStore.errors?.errors?.last_name"
                        class="mt-2 text-red-600 text-sm text-left"
                    >
                      {{ adminStore.errors?.errors?.last_name[0] }}
                    </div>
                  </div>
                </div>

                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
                  <label for="email" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Email
                  </label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <input type="email" name="email" id="email"
                           v-model="validate.email.$model"
                           disabled
                           class="max-w-lg h-8 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-gray-300 rounded-md"/>
                    <template v-if="validate.email.$error" class="text-left">
                      <div
                          v-for="(error, index) in validate.email.$errors"
                          :key="index"
                          class="mt-2 text-red-600 text-sm"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                    <div
                        v-if="adminStore.errors?.errors?.email"
                        class="mt-2 text-red-600 text-sm text-left"
                    >
                      {{ adminStore.errors?.errors?.email[0] }}
                    </div>
                  </div>
                </div>

                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                  <label for="phone_number" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Phone Number
                  </label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <input type="text" name="phone_number" id="phone_number"
                           v-model="validate.phone_number.$model"
                           disabled
                           class="max-w-lg h-8 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-gray-300 rounded-md"/>
                    <template v-if="validate.phone_number.$error" class="text-left">
                      <div
                          v-for="(error, index) in validate.phone_number.$errors"
                          :key="index"
                          class="mt-2 text-red-600 text-sm"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                    <div
                        v-if="adminStore.errors?.errors?.phone_number"
                        class="mt-2 text-red-600 text-sm text-left"
                    >
                      {{ adminStore.errors?.errors?.phone_number[0] }}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div class="pt-5">
            <div class="flex justify-end">
              <router-link :to="{ name: 'home'}">
                <button type="button"
                        class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Cancel
                </button>
              </router-link>
              <button
                  type="button"
                  @click="emits('saveData', data, validate)"
                  :disabled="loading"
                  class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <svg v-if="loading" class="w-4 h-5 text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none"
                     xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path
                      d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                      stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path
                      d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                      stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-900">
                  </path>
                </svg>
                {{' '}}{{ loading? 'Saving...' : 'Save' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>



