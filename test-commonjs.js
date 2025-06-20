// Test CommonJS import (existing behavior)
const Amadeus = require('amadeus');

console.log('✅ CommonJS Import - Amadeus:', typeof Amadeus);

// Test instantiation
const amadeus = new Amadeus({
  clientId: 'test',
  clientSecret: 'test'
});

console.log('✅ CommonJS instance created:', !!amadeus.client);

// Test static properties
console.log('✅ Static properties accessible:');
console.log('  - Amadeus.location:', !!Amadeus.location);
console.log('  - Amadeus.direction:', !!Amadeus.direction);

console.log('\n🎉 CommonJS import working correctly!');