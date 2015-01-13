db.dropDatabase();
var Product ={
  name: 'Southwest Circular Cassette Tape',
  featured: true,
  description: 'An album made by telekinetic sound-makers dwelling in the desert. Take a listen at southwestcircular.com',
  pricing: {
      retail: 5,
      cost: 5
  },
};
db.products.save(Product);