import {createApp, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {useToast} from 'vue-toast-notification';


export default function useOrders() {
    const order = ref([]);
    const orders = ref([]);
    const meta = ref(null);
    const errors = ref([]);
    const router = useRouter();
    const $toast = useToast();

    const getOrders = async (page,per_page) => {
        page = page || 1;
        per_page = per_page || 15;
        try {
            const response = await axios.get(
                `/api/web/orders?page=${page}&per_page=${per_page}`
            );
            orders.value = response.data.data;
            meta.value = response.data.meta;
        } catch (error) {

        }
    };

    const getAllOrders = async () => {
        try {
            const response = await axios.get(
                `/api/web/orders/all`
            );
            orders.value = response.data.data;
        } catch (error) {

        }
    };

    const getOrder = async (id) => {
        try {
            const response = await axios.get(
                `api/web/orders/${id}`
            );
            order.value = response.data.data;
        } catch (error) {

        }
    };

    const storeOrder = async (data) => {
        try {
            errors.value = [];
            await axios.post(`api/web/orders`, data);
            await router.push({name: 'orders'})
            $toast.success('Order created successfully',
                {
                    position: 'top-right'
                });
        } catch (error) {
            errors.value = error.response.data.errors;
            $toast.error('The quantity is greater than available stock.',
                {
                    position: 'top-right'
                });
        }
    };

    return {
        order,
        orders,
        getOrder,
        getOrders,
        getAllOrders,
        storeOrder,
        meta,
        errors,
    };
}
