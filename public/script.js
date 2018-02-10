var PRICE = 19.90;

new Vue({
    el: '#app',
    data: {
        loading: false,
        total: 0,
        items: [],
        cart: [],
        search: 'anime',
        lastSearch: '',
        price: PRICE
    },
    methods: {
        onSearch: function() {
            this.loading = true;
            this.items = [];
            this.$http.get('/search/'.concat(this.search)).then(
                function(res) {
                    this.lastSearch = this.search;
                    this.items = res.data;
                    console.log(res);
                    this.loading = false;
                }
            );
        },
        addItemToCart: function(index) {
            var item = this.items[index];
            this.total += PRICE;
            var found = false;
            for (var i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === item.id) {
                    this.cart[i].qty++;
                    found = true;
                    break;
                }
            }

            if (!found) {
                this.cart.push({
                    id: item.id,
                    title: item.title,
                    price: PRICE,
                    qty: 1
                });
            }
        },
        incItemInCart: function(index) {
            this.cart[index].qty++;
            this.total += PRICE
        },
        decItemInCart: function(index) {
            this.cart[index].qty--;
            this.total -= PRICE
            if (this.cart[index].qty == 0) {
                this.cart.splice(index,1);
            }
        }

    },
    filters: {
      currency: function(price) {
        return '$'.concat(price.toFixed(2));
      }
    },
    mounted: function() {
        this.onSearch();
    }

});