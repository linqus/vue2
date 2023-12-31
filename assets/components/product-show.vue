<template>
    <div>
        <loading v-if="loading" />
        <div v-if="product">
            <title-component :text="product.name" />
        </div>
        <div
            v-if="product"
            :class="$style.product"
            class="row"
        >
            <div class="col-4 pt-3">
                <img
                    class="d-block"
                    :src="product.image"
                    :alt="product.name"
                >
                <div class="p-2">
                    <small>brought to you by </small>
                    <small
                        class="d-inline"
                        v-text="product.brand"
                    />
                </div>
            </div>
            <div class="col-8 p-3">
                <div v-text="product.description" />
                <div class="row mt-4 align-items-center">
                    <div class="col-4">
                        Price: <strong>${{ price }}</strong>
                    </div>
                    <div class="col-8 p-3">
                        <div class="d-flex align-items-center justify-content-center">
                            <color-selector
                                v-if="product.colors.length !== 0"
                                @color-selected="colorChange"
                            />
                            <input
                                v-model.number="quantity"
                                class="form-control mx-3"
                                type="number"
                                min="1"
                            >
                            <button
                                class="btn btn-info btn-sm"
                                :disabled="cart === null"
                                @click="addToCart(product, colorIri, quantity)"
                            >
                                Add to Cart
                                <i
                                    v-show="addToCartLoading"
                                    class="fa fa-spinner fa-spin"
                                />
                                <i
                                    v-show="addToCartSuccess"
                                    class="fa fa-check"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchProductById } from '@/services/products-service';
import {

} from '@/services/cart-service.js';
import formatPrice from '@/helpers/format-price';
import Loading from '@/components/loading';
import TitleComponent from '@/components/title';
import ColorSelector from '@/components/color-selector';
import ShoppingCartMixin from '@/mixins/get-shopping-cart.js';

export default {
    name: 'ProductShow',
    components: {
        Loading,
        TitleComponent,
        ColorSelector,
    },
    mixins: [
        ShoppingCartMixin,
    ],
    props: {
        currentProductId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            product: null,
            colorIri: null,
            quantity: 1,
            loading: true,
        };
    },
    computed: {
        price() {
            return formatPrice(this.product.price);
        },
    },
    async created() {
        try {
            this.product = (await fetchProductById(this.currentProductId)).data;
        } finally {
            this.loading = false;
        }
    },
    methods: {
        colorChange(event) {
            this.colorIri = event;
        },
    },
};
</script>

<style lang="scss" module>
@import '~styles/components/light-component';
.product {
    @include light-component;
    img {
        max-width:100%;
        max-height:100%;
    }
    input {
        width: 60px;
    }
}
</style>
