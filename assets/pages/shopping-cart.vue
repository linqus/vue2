<template>
    <div :class="[$style.component, 'container-fluid']">
        <div class="row">
            <aside class="col-xs-12 col-lg-3" />

            <div class="col-xs-12 col-lg-9">
                <title-component text="Shopping Cart" />
                <loading v-if="completeCart === null" />
                <cart-list
                    v-if="completeCart"
                    :items="completeCart.items"
                />
            </div>
        </div>
    </div>
</template>

<script>
import TitleComponent from '@/components/title';
import ShoppingCartMixin from '@/mixins/get-shopping-cart.js';
import CartList from '@/components/shopping-cart/';
import Loading from '@/components/loading';
import { fetchProductsById } from '@/services/products-service';
import { fetchColors } from '@/services/colors-service';

export default {
    name: 'ShoppingCart',
    components: {
        TitleComponent,
        Loading,
        CartList,
    },
    mixins: [
        ShoppingCartMixin,
    ],

    data() {
        return {
            products: null,
            colors: null,
        };
    },

    computed: {
        completeCart() {
            if (!this.cart || !this.products || !this.colors) {
                return null;
            }

            const completeItems = this.cart.items.map((item) => (
                {
                    product: this.products.find((i) => item.product === i['@id']),
                    color: this.colors.find((i) => item.color === i['@id']),
                    quantity: item.quantity,
                }
            ));
            return {
                items: completeItems,
            };
        },
    },

    watch: {
        async cart() {
            this.loadProducts();
        },
    },

    async created() {
        const colorsResponse = await fetchColors();
        this.colors = colorsResponse.data['hydra:member'];
    },

    methods: {
        async loadProducts() {
            const productIds = this.cart.items.map((item) => item.product);

            const [productsResponse] = await Promise.all([
                await fetchProductsById(productIds),
            ]);

            this.products = productsResponse.data['hydra:member'];
        },
    },

};
</script>

<style lang="scss" module>
@import '~styles/components/light-component.scss';

.component :global {
    .content {
        @include light-component;
    }
}
</style>
