<script setup>
import {onMounted, reactive, ref, toRefs} from "vue";
import {email, helpers, required} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Form from "./form.vue";
import {useRoute, useRouter} from "vue-router";
import Loader from "../../components/Spinner/Loader.vue"
import {useAdminStore} from "../../stores/admin.js";

const router = useRouter();
const route = useRoute();

const adminStore = useAdminStore();

const $externalResults = reactive({});
const isLoading = ref(false);
const isGetLoading = ref(false);

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
};

const createData = reactive({
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
});

const validate = useVuelidate(rules, toRefs(createData), { $externalResults });

const updateUser = async (data, validate) => {
  validate.$touch();
  if (!validate.$invalid) {
    try {
      isLoading.value = true;
      await adminStore.updateAdmin(route.params.id, data);
      // await router.push({ name: 'dashboard' })
      isLoading.value = false;
    } catch (err) {
      isLoading.value = false;
    }
  }
};

const getAdmin = async () => {
  try {
    isGetLoading.value = true;
    await adminStore.getAdmin(route.params.id)
    createData.first_name = adminStore.admin?.first_name;
    createData.last_name = adminStore.admin?.last_name;
    createData.email = adminStore.admin?.email;
    createData.phone_number = adminStore.admin?.phone_number;

    isGetLoading.value = false;
  } catch (err) {
    isGetLoading.value = false;
  }
}



onMounted(async () => {
    await getAdmin()
});

</script>
<template>
  <div class="bg-white">

    <main class="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Profile</h1>

      <form class="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
        <div class="lg:col-span-7" >
          <Loader v-if="isGetLoading"/>
          <Form
              v-else
              :data="createData"
              :loading="isLoading"
              :validate="validate"
              @save-data="updateUser"
          />
        </div>
      </form>
    </main>
  </div>



</template>


