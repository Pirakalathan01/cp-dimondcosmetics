import {defineStore} from "pinia"
import axios from "axios";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();


export const useAdminStore = defineStore('admin',{
    state: () => ({
        adminData: {},
        adminSuccessData: {},
        authErrors: [],
    }),
    getters: {
        admin: (state) => state.adminData,
        successData: (state) => state.adminSuccessData,
        errors: (state) => state.authErrors
    },
    actions: {

        async getAdmin(id) {
            this.authErrors = [];
            await axios.get(`/api/web/customers/${id}`)
                .then((response) => {
                    this.adminData = response.data?.data
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },


        async updateAdmin(id,data) {
            this.authErrors = [];
            await axios.put(`/api/web/customers/${id}`,data)
                .then((response) => {
                    this.adminSuccessData = response.data?.data
                    this.router.push({ name:'dashboard' })
                    $toast.success('Customer updated successfully',
                        {
                            position: 'top-right'
                        });
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

    },
    persist: true,
})