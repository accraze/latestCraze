db.dropDatabase();
var Product ={
  name: 'SWC Album',
  featured: true,
  description: 'Music made by telekinetic sound-makers dwelling in the desert. Take a listen at southwestcircular.com',
  pricing: {
      retail: 5,
      cost: 5
  },
};
db.products.save(Product);