import { fetchCart } from '@/services/cart-service.js';

export default {
    data() {
        return {
            cart: null,
        };
    },

    async created() {
        this.cart = await fetchCart();
    },
};
