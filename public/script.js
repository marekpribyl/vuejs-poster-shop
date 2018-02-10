var PRICE = 19.90;
var LOAD_NUM = 5;

new Vue({
    el: '#app',
    data: {
        loading: false,
        total: 0,
        items: [],
        results: [],
        itemsCount: 0,
        cart: [],
        search: '90s',
        lastSearch: '',
        price: PRICE
    },
    computed: {
        noMoreItems: function () {
            return this.items.length === this.results.length && this.results.length > 0;
        }
    },
    methods: {
        onSearch: function() {
            this.items = [];
            if (this.search.length) {
                this.loading = true;
                this.$http.get('/search/'.concat(this.search)).then(
                    function(res) {
                        this.itemsCount = res.data.length;
                        this.lastSearch = this.search;
                        this.results = res.data;
                        this.appendItemsToList();
                        this.loading = false;
                    }
                );
            }
        },
        appendItemsToList: function() {
            var itemsLength = this.items.length;
            var resultsLength = this.results.length;
            console.log('items: '.concat(itemsLength).concat(', results: ').concat(resultsLength));
            if (itemsLength < resultsLength) {
                var b = itemsLength + LOAD_NUM;
                var threshold = (b > resultsLength) ? resultsLength : b;
                console.log('b: '.concat(b).concat(', t: ').concat(threshold));
                for (var i = itemsLength; i < threshold; i++) {
                    this.items.push(this.results[i])
                }
            }
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
        var vueInstance = this;
        var elem = document.getElementById('product-list-bottom');
        var watcher = scrollMonitor.create(elem);
        watcher.enterViewport(function () {
            vueInstance.appendItemsToList();
        });
    }

});