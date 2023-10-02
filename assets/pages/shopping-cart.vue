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

export default {
    name: 'ShoppingCart',
    components: {
        TitleComponent,
        Loading,
    },
    mixins: [
        ShoppingCartMixin,
    ],
    data() {
        return { loading: true };
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
