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
            products.value = [];
            const response = await axios.get(
                `/api/web/products?page=${page}&per_page=${per_page}`
            );
            products.value = response.data.data;
            meta.value = response.data.meta;
        } catch (error) {

        }
    };

    const getAllProducts = async () => {
        try {
            const response = await axios.get(
                `/api/web/products/all`
            );
            products.value = response.data.data;
        } catch (error) {

        }
    };

    const getProduct = async (id) => {
        try {
            const response = await axios.get(
                `api/web/products/${id}`
            );
            product.value = response.data.data;
        } catch (error) {

        }
    };

    return {
        product,
        products,
        getProduct,
        getProducts,
        getAllProducts,
        meta,
        errors,
    };
}
