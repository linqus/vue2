import axios from 'axios';

/**
 * @param {string|null} categoryIri
 * @param {string|null} searchTerm
 * @returns {Promise}
 */
export function fetchProducts(categoryIri, searchTerm) {
    const params = {};
    if (categoryIri) {
        params.category = categoryIri;
    }

    if (searchTerm) {
        params.name = searchTerm;
    }

    return axios.get('/api/products', {
        params,
    });
}

export function fetchFeaturedProducts() {
    return axios.get('/api/products', {
        params: { featured: 1 },
    });
}
/**
 *
 * @param {string|null} productIri
 * @returns {Promise}
 */
export function fetchProductById(productIri) {
    return axios.get(productIri);
}

/**
 * Retrieves a set of products identified by an array of IRIs
 *
 * @param {string[]} ids
 * @return {Promise}
 */
export function fetchProductsById(ids) {
    if (!ids.length) {
        return Promise.resolve({ data: { 'hydra:member': [] } });
    }
    return axios.get(
        '/api/products',
        {
            params: { id: ids },
        },
    );
}
