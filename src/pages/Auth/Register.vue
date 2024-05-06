<script setup>
import {email, helpers, required} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "../../stores/auth.js";
import AuthLayout from "../../components/AuthLayout/AuthLayout.vue"
import {reactive, ref, toRefs} from "vue";

const router = useRouter();
const route = useRoute();

const authStore = useAuthStore();

const $externalResults = reactive({});
const isLoading = ref(false);

const rules = {
  first_name: {
    required: helpers.withMessage("The first name field is required", required),
  },
  last_name: {
    required: helpers.withMessage("The last name field is required", required),
  },
  email: {
    required: helpers.withMessage("The email field is required", required),
    email
  },
  phone_number: {
    required: helpers.withMessage("The phone_number field is required", required),
  },
  password: {
    required: helpers.withMessage("The password field is required", required),
  },
  password_confirmation: {
    required: helpers.withMessage("The password confirmation field is required", required),
  },
};

const createData = reactive({
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  password: "",
  password_confirmation: "",
});

const validate = useVuelidate(rules, toRefs(createData), { $externalResults });

const handleRegisterUser = async (data, validate) => {
  validate.$touch();
  if (!validate.$invalid) {
    try {
      isLoading.value = true;
      await authStore.handleRegister(data);
      isLoading.value = false;
    } catch (err) {
      isLoading.value = false;
    }
  }
};

</script>

<template>
  <AuthLayout label="Register">
    <form class="space-y-3" @submit.prevent="handleRegisterUser(createData,validate)">
      <div>
        <label for="first_name" class="block text-sm font-medium text-gray-700"> First name </label>
        <div class="mt-1">
          <input id="first_name" name="first_name" type="text"
                 v-model="validate.first_name.$model"
                 class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
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
        <div
            v-if="authStore.errors?.errors?.first_name"
            class="mt-2 text-red-600 text-sm text-left"
        >
          {{ authStore.errors?.errors?.first_name[0] }}
        </div>
      </div>

      <div>
        <label for="last_name" class="block text-sm font-medium text-gray-700"> Last name </label>
        <div class="mt-1">
          <input id="last_name" name="last_name" type="text"
                 v-model="validate.last_name.$model"
                 class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
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
        <div
            v-if="authStore.errors?.errors?.last_name"
            class="mt-2 text-red-600 text-sm text-left"
        >
          {{ authStore.errors?.errors?.last_name[0] }}
        </div>
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
        <div class="mt-1">
          <input id="email" name="email" type="email"
                 v-model="validate.email.$model"
                 class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
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
        <div
            v-if="authStore.errors?.errors?.email"
            class="mt-2 text-red-600 text-sm text-left"
        >
          {{ authStore.errors?.errors?.email[0] }}
        </div>
      </div>

      <div>
        <label for="phone_number" class="block text-sm font-medium text-gray-700"> Phone Number</label>
        <div class="mt-1">
          <input id="phone_number" name="phone_number" type="text"
                 v-model="validate.phone_number.$model"
                 class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
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
        <div
            v-if="authStore.errors?.errors?.phone_number"
            class="mt-2 text-red-600 text-sm text-left"
        >
          {{ authStore.errors?.errors?.phone_number[0] }}
        </div>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
        <div class="mt-1">
          <input id="password" name="password" type="password"
                 v-model="validate.password.$model"
                 class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
        </div>
        <template v-if="validate.password.$error" class="text-left">
          <div
              v-for="(error, index) in validate.password.$errors"
              :key="index"
              class="mt-2 text-red-600 text-sm"
          >
            {{ error.$message }}
          </div>
        </template>
        <div
            v-if="authStore.errors?.errors?.password"
            class="mt-2 text-red-600 text-sm text-left"
        >
          {{ authStore.errors?.errors?.password[0] }}
        </div>
      </div>

      <div>
        <label for="password_confirmation" class="block text-sm font-medium text-gray-700"> Password Confirmation</label>
        <div class="mt-1">
          <input id="password_confirmation" name="password_confirmation" type="password"
                 v-model="validate.password_confirmation.$model"
                 class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
        </div>
        <template v-if="validate.password.$error" class="text-left">
          <div
              v-for="(error, index) in validate.password_confirmation.$errors"
              :key="index"
              class="mt-2 text-red-600 text-sm"
          >
            {{ error.$message }}
          </div>
        </template>
        <div
            v-if="authStore.errors?.errors?.password_confirmation"
            class="mt-2 text-red-600 text-sm text-left"
        >
          {{ authStore.errors?.errors?.password_confirmation[0] }}
        </div>
      </div>

      <div>
        <button type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
          {{ isLoading? 'Sign in...' : 'Sign in' }}
        </button>
      </div>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        {{ ' ' }}
        <router-link :to='{ name: "login" }' class="font-medium text-indigo-600 hover:text-indigo-500"> Login your
          account
        </router-link>
      </p>
    </form>
  </AuthLayout>
</template>