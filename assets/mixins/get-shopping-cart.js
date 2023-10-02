import { fetchCart, addItemToCart, getCartTotalItems } from '@/services/cart-service.js';

export default {
    data() {
        return {
            cart: null,
            addToCartLoading: false,
            addToCartSuccess: false,
        };
    },

    async created() {
        this.cart = await fetchCart();
    },
    methods: {
        async addToCart(product, selectedColorIri, quantity) {
            if (product.colors.length && !selectedColorIri) {
                alert('Please select color');
                return;
            }

            this.addToCartLoading = true;
            this.addToCartSuccess = false;
            await addItemToCart(this.cart, {
                product: product['@id'],
                color: selectedColorIri,
                quantity,
            });
            this.addToCartLoading = false;
            this.addToCartSuccess = true;
            document.getElementById('js-cart-item-count').innerHTML = getCartTotalItems(this.cart);
        },

    },
};
