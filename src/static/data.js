export const orders = [
    {
        orderId: 1,
        products: [
            {
                id: 1,
                name: "Samosa",
                image: "product1.jpg",
                quantity: 2,
                extraIngredients: "Garlic Chutney, Extra Spicy",
                price: 10.99,
            },
            {
                id: 2,
                name: "Dosa",
                image: "product2.jpg",
                quantity: 1,
                extraIngredients: "Extra Chutney",
                price: 8.99,
            },
        ],
        price: 29.97,
        quantity: 3,
        address: "123 Main St, City, State",
        paymentMode: "Credit Card",
        dateTime: "2023-06-07 10:00 AM",
        status: "Pending",
    },
    {
        orderId: 2,
        products: [
            {
                id: 3,
                name: "Pizza",
                image: "product3.jpg",
                quantity: 1,
                extraIngredients: "Pepperoni, Mushrooms, Extra Cheese",
                price: 12.99,
            },
            {
                id: 4,
                name: "Burger",
                image: "product4.jpg",
                quantity: 2,
                extraIngredients: "Bacon, Pickles, Onions",
                price: 9.99,
            },
        ],
        price: 32.97,
        quantity: 3,
        address: "456 Elm St, City, State",
        paymentMode: "Cash",
        dateTime: "2023-06-08 12:30 PM",
        status: "Preparing",
    },
    {
        orderId: 3,
        products: [
            {
                id: 5,
                name: "Pasta",
                image: "product5.jpg",
                quantity: 1,
                extraIngredients: "Garlic Bread",
                price: 11.99,
            },
            {
                id: 6,
                name: "Salad",
                image: "product6.jpg",
                quantity: 1,
                extraIngredients: "Dressing: Ranch",
                price: 7.99,
            },
        ],
        price: 19.98,
        quantity: 2,
        address: "789 Oak St, City, State",
        paymentMode: "Debit Card",
        dateTime: "2023-06-09 03:15 PM",
        status: "On the way",
    },
    {
        orderId: 4,
        products: [
            {
                id: 7,
                name: "Sushi",
                image: "product7.jpg",
                quantity: 3,
                extraIngredients: "Wasabi, Soy Sauce, Ginger",
                price: 14.99,
            },
        ],
        price: 44.97,
        quantity: 3,
        address: "321 Pine St, City, State",
        paymentMode: "PayPal",
        dateTime: "2023-06-10 06:45 PM",
        status: "Delivered",
    }

] 