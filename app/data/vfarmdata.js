var orderbook =
    [
        {
            day: '1',
            morningOrders:
                    [
                        {
                            orderid:1,product_name: 'Cow Milk',
                            userid : 5,
                            unit: '500 ML',
                            quantity: '1',
                            unitprice: '20',
                            deliveryStatus: 'Y'
                        },
                        {
                            orderid:2,product_name: 'Buffalo Milk',
                            userid : 1,
                            unit: '500 ML',
                            quantity: '1',
                            unitprice: '20',
                            deliveryStatus: 'Y'
                        }
                    ],
            eveningOrders:
                    [
                        {
                            orderid:3,product_name: 'Paneer',
                            userid : 5,
                            unit: '500 GM',
                            quantity: '1',
                            unitprice: '60',
                            deliveryStatus: 'N'
                        },
                        {
                            orderid:4,product_name: 'Veg Mutter',
                            userid : 5,
                            unit: '100 GM',
                            quantity: '1',
                            unitprice: '35',
                            deliveryStatus: 'N'
                        }
                    ]
        },
        {
            day: '2',
            morningOrders:
                    [
                        {
                            orderid:5,product_name: 'Cow Milk',
                            userid : 5,
                            unit: '500 ML',
                            quantity: '1',
                            unitprice: '20',
                            deliveryStatus: 'N'
                        },
                        {
                            orderid:6,product_name: 'Buffalo Milk',
                            userid : 1,
                            unit: '500 ML',
                            quantity: '1',
                            unitprice: '20',
                            deliveryStatus: 'Y'
                        }
                    ],
            eveningOrders:
                    [
                        {
                            orderid:7,product_name: 'Paneer',
                            userid : 5,
                            unit: '500 GM',
                            quantity: '1',
                            unitprice: '60',
                            deliveryStatus: 'N'
                        },
                        {
                            orderid:8,product_name: 'Veg Mutter',
                            userid : 5,
                            unit: '100 GM',
                            quantity: '1',
                            unitprice: '35',
                            deliveryStatus: 'N'
                        }
                    ]
        }
    ];


var products =
    [
        {
            productid: 'd1',
            productname: 'Cow Milk',
            category: 'Dairy',
            status: 'In Stock',
            img:'images/milk.jpg',
            subproducts: [
                {
                    unit: '250 ML',
                    price: '12'
                },
                {
                    unit: '500 ML',
                    price: '20'
                },
                {
                    unit: '1 L',
                    price: '38'
                }
            ]
        },
        {
            productid: 'd2',
            productname: 'Buffalo Milk',
            category: 'Dairy',
            status: 'In Stock',
            img:'images/bmilk.jpg',
            subproducts: [
                {
                    unit: '250 ML',
                    price: '12'
                },
                {
                    unit: '500 ML',
                    price: '20'
                },
                {
                    unit: '1 L',
                    price: '38'
                }
            ]
        },
        {
            productid: 'd3',
            productname: 'Curd',
            category: 'Dairy',
            status: 'In Stock',
            img:'images/curd.jpg',
            subproducts: [
                {
                    unit: '250 ML',
                    price: '12'
                },
                {
                    unit: '500 ML',
                    price: '20'
                },
                {
                    unit: '1 L',
                    price: '38'
                }
            ]
        },
        {
            productid: 'd4',
            productname: 'Paneer',
            category: 'Dairy',
            status: 'In Stock',
            img:'images/paneer.jpg',
            subproducts: [
                {
                    unit: '250 GM',
                    price: '52'
                },
                {
                    unit: '500 GM',
                    price: '80'
                }
            ]
        },
        {
            productid: 'd5',
            productname: 'Peeyush',
            category: 'Dairy',
            status: 'In Stock',
            img:'images/peeyush.jpg',
            subproducts: [
                {
                    unit: '250 ML',
                    price: '12'
                },
                {
                    unit: '500 ML',
                    price: '20'
                },
                {
                    unit: '1 L',
                    price: '38'
                }
            ]
        },
        {
            productid: 'd6',
            productname: 'Cheese',
            category: 'Dairy',
            status: 'In Stock',
            img:'images/cheese.jpg',
            subproducts: [
                {
                    unit: '250 GM',
                    price: '48'
                },
                {
                    unit: '500 GM',
                    price: '96'
                }
            ]
        },
        {
            productid: 'd7',
            productname: 'Ghee',
            category: 'Dairy',
            status: 'In Stock',
            img:'images/ghee.jpg',
            subproducts: [
                {
                    unit: '500 GM',
                    price: '155'
                },
                {
                    unit: '1 KG',
                    price: '300'
                }
            ]
        },
        {
            productid: 'd8',
            productname: 'Shrikhand',
            category: 'Dairy',
            status: 'Out of Stock',
            img:'images/shrikhand.jpg',
            subproducts: [
                {
                    unit: '250 GM',
                    price: '52'
                },
                {
                    unit: '500 GM',
                    price: '80'
                }
            ]
        }
    ];