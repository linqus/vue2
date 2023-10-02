<template>
    <div :class="[$style.component, 'container-fluid']">
        <div class="row">
            <aside class="col-xs-12 col-lg-3" />

            <div class="col-xs-12 col-lg-9">
                <title-component text="Shopping Cart" />
                <loading v-if="cart === null" />
                <div class="content p-3">
                    <div v-if="cart !== null">
                        <div
                            v-for="(item, index) in cart.items"
                            :key="index"
                        >
                            {{ item.product }} {{ item.quantity }} {{ index }}
                        </div>
                        <div v-if="cart.items.length === 0">
                            Do some shopping!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TitleComponent from '@/components/title';
import ShoppingCartMixin from '@/mixins/get-shopping-cart.js';
import Loading from '@/components/loading';
import { fetchProductsById } from '@/services/products-service';

export default {
    name: 'ShoppingCart',
    components: {
        TitleComponent,
        Loading,
    },
    mixins: [
        ShoppingCartMixin,
    ],
    watch: {
        async cart() {
            const productIds = this.cart.items.map((item) => item.product);
            const products = (await fetchProductsById(productIds)).data['hydra:member'];
            const completeItems = this.cart.items.map((item) => (
                {
                    product: products.find((i) => item.product === i['@id']),
                    color: item.color,
                    quantity: item.quantity,
                }
            ));
            console.log(completeItems, products);
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
