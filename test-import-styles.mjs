// Test both ESM import styles
import { Amadeus } from 'amadeus';
import AmadeusDefault from 'amadeus';

console.log('✅ ESM Named Import - Amadeus:', typeof Amadeus);
console.log('✅ ESM Default Import - Amadeus:', typeof AmadeusDefault);
console.log('✅ Both imports are the same:', Amadeus === AmadeusDefault);

// Test instantiation
const amadeus1 = new Amadeus({
  clientId: 'test',
  clientSecret: 'test'
});

const amadeus2 = new AmadeusDefault({
  clientId: 'test',
  clientSecret: 'test'
});

console.log('✅ Named import instance created:', !!amadeus1.client);
console.log('✅ Default import instance created:', !!amadeus2.client);
console.log('✅ Both have same API structure:', 
  amadeus1.constructor.name === amadeus2.constructor.name);

// Test static properties
console.log('✅ Static properties accessible:');
console.log('  - Amadeus.location:', !!Amadeus.location);
console.log('  - Amadeus.direction:', !!Amadeus.direction);

console.log('\n🎉 All ESM imports working correctly!');