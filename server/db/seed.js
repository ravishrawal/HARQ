const db = require('./conn');
const { Sequelize } = db;

//Models
const Product = require('./Product');
const LineItem = require('./LineItem');
const Order = require('./Order');
const User = require('./User');

const seed = () => {
    return Promise.all([
    Product.create({ name: 'Anger' }),
    Product.create({ name: 'Joy' }),
    Product.create({ name: 'Sadness' }),
    Product.create({ name: 'Disgust' }),
    Product.create({ name: 'Fear' }),
    User.create({ name: 'Rav', email: 'ravsworld@gmail.com', password: 'password' }),
    User.create({ name: 'Annie', email: 'annielovescode@gmail.com', password: 'password' })
  ])
		.then(([anger, joy, sadness, disgust, fear, Rav, Annie]) => {
			Order.create({userId : Rav.id, active : true}) // creates an initial cart for Rav
				.then((order)=> {
					LineItem.create({ orderId: order.id, productId: fear.id }) //adds fear to Rav's cart
				})
    })
    .then(console.log('seeded!'))
}


module.exports = seed;
