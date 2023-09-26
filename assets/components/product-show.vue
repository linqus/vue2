<template>
    <div>
        <loading v-if="loading" />
        <div v-if="product">
            <h1>{{ product.name }}</h1>
        </div>
    </div>
</template>

<script>
import { fetchProductById } from '@/services/products-service';
import Loading from '@/components/loading';

export default {
    name: 'ProductShow',
    components: {
        Loading,
    },
    props: {
        currentProductId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            product: null,
            loading: true,
        };
    },
    async created() {
        try {
            this.product = (await fetchProductById(this.currentProductId)).data;
        } catch (e) {
            console.log(e);
        } finally {
            this.loading = false;
        }
    },
};
</script>
