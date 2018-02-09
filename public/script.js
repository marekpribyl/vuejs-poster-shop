new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [
            { id: 1, title: 'one', price: 19.90 },
            { id: 2, title: 'two', price: 49.90 }
        ],
        cart: []
    },
    methods: {
        addItemToCart: function(index) {
            var item = this.items[index];
            this.total += item.price;
            var found = false;
            for (var i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === item.id) {
                    this.cart[i].qty++;
                    found = true;
                }
            }

            if (!found) {
                this.cart.push({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    qty: 1
                });
            }
        }
    }
});