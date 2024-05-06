import {createApp, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {useToast} from 'vue-toast-notification';


export default function useProducts() {
    const product = ref([]);
    const products = ref([]);
    const meta = ref(null);
    const errors = ref([]);
    const router = useRouter();
    const $toast = useToast();

    const getProducts = async (page,per_page) => {
        page = page || 1;
        per_page = per_page || 15;
        try {
            const response = await axios.get(
                `/api/admin/products?page=${page}&per_page=${per_page}`
            );
            products.value = response.data.data;
            meta.value = response.data.meta;
        } catch (error) {

        }
    };

    const getAllProducts = async () => {
        try {
            const response = await axios.get(
                `/api/admin/products/all`
            );
            products.value = response.data.data;
        } catch (error) {

        }
    };

    const getProduct = async (id) => {
        try {
            const response = await axios.get(
                `api/admin/products/${id}`
            );
            product.value = response.data.data;
        } catch (error) {

        }
    };

    const storeProduct = async (data) => {
        try {
            errors.value = [];
            await axios.post(`api/admin/products`, data);
            await router.push({name: "products"});
            $toast.success('Product created successfully',
                {
                    position: 'top-right'
                });
        } catch (error) {
            errors.value = error.response.data.errors;
        }
    };

    const updateProduct = async (id, data) => {
        try {
            errors.value = [];
            await axios.put(`api/admin/products/${id}`, data);
            await router.push({name: "products"});
            $toast.success('Product updated successfully',
                {
                    position: 'top-right'
                });
        } catch (error) {
            // await authStore.clearAuthUser(error.response?.status);
            if (error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    };


    const destroyProduct = async (id) => {
        try {
            await axios.delete(`api/admin/products/${id}`);
            $toast.success('Product deleted successfully',
                {
                    position: 'top-right'
                });
        } catch (error) {
            // await authStore.clearAuthUser(error.response?.status);
            // if (error.response.status === 422) {
            //     const app = createApp(NotDeleteWaringComponentCat);
            //     const container = document.createElement("div");
            //     document.body.appendChild(container);
            //     app.mount(container);
            // }
        }
    };

    return {
        product,
        products,
        getProduct,
        getProducts,
        getAllProducts,
        storeProduct,
        updateProduct,
        destroyProduct,
        meta,
        errors,
    };
}
