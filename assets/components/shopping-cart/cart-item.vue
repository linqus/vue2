<template>
    <div :class="[$style.component, 'row', 'p-3']">
        <div class="col-3">
            {{ item.product.name }}
        </div>
        <div class="col-3">
            {{ item.quantity }}
        </div>
        <div class="col-3">
            {{ formattedPrice(item.product.price) }}
        </div>
        <div class="col-3" />
    </div>
</template>

<script>
import formatPrice from '@/helpers/format-price';

export default {
    name: 'SoppingCartItem',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    methods: {
        formattedPrice(price) {
            return formatPrice(price);
        },
    },
};

</script>

<style lang="scss" module>
@import '~styles/variables/colors.scss';

.component {
    border-bottom: 1px solid $light-component-border;
}
</style>
