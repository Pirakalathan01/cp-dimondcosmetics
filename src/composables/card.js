import {createApp, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {useToast} from 'vue-toast-notification';


export default function useCards() {
    const card = ref([]);
    const cards = ref([]);
    const meta = ref(null);
    const errors = ref([]);
    const router = useRouter();
    const $toast = useToast();

    const getCards = async (page,per_page) => {
        page = page || 1;
        per_page = per_page || 15;
        try {
            const response = await axios.get(
                `/api/web/cards?page=${page}&per_page=${per_page}`
            );
            cards.value = response.data.data;
            meta.value = response.data.meta;
        } catch (error) {

        }
    };

    const getAllCards = async () => {
        try {
            const response = await axios.get(
                `/api/web/cards/all`
            );
            cards.value = response.data.data;
        } catch (error) {

        }
    };

    const getCard = async (id) => {
        try {
            const response = await axios.get(
                `api/web/cards/${id}`
            );
            card.value = response.data.data;
        } catch (error) {

        }
    };

    const storeCard = async (data) => {
        try {
            errors.value = [];
            await axios.post(`api/web/cards`, data);
            $toast.success('Product added successfully',
                {
                    position: 'top-right'
                });
        } catch (error) {
            // errors.value = error.response.data.errors;
            console.log(error.response.status,".response.data.errors")
            if(error.response.status === 422){
                $toast.error('The selected product is already assigned to cards.',
                    {
                        position: 'top-right'
                    });
            }


            if(error.response.status === 401){
                $toast.error('Please login first.',
                    {
                        position: 'top-right'
                    });
            }
        }
    };

    const destroyProduct = async (id) => {
        try {
            await axios.delete(`api/web/cards/${id}`);
            $toast.success('Product removed successfully',
                {
                    position: 'top-right'
                });
        } catch (error) {

        }
    };

    return {
        card,
        cards,
        getCard,
        getCards,
        getAllCards,
        storeCard,
        destroyProduct,
        meta,
        errors,
    };
}
