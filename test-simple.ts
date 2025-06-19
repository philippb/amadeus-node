import Amadeus = require('./amadeus-clean');

// Test basic instantiation
const amadeus = new Amadeus({
  clientId: 'test',
  clientSecret: 'secret',
  hostname: 'test',
  logLevel: 'debug'
});

// Test static constants
const airportType: 'AIRPORT' = Amadeus.location.airport;

// Test valid API calls
async function test() {
  await amadeus.shopping.flightOffersSearch.get({
    originLocationCode: 'NYC',
    destinationLocationCode: 'MAD',
    departureDate: '2024-07-01',
    adults: 2
  });
}

export { amadeus, test };