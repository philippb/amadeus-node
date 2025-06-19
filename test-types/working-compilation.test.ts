/**
 * Basic working compilation test that should pass without errors
 */

import Amadeus = require('../lib/amadeus');

// Test basic instantiation
const amadeus = new Amadeus({
  clientId: 'test',
  clientSecret: 'secret',
  hostname: 'test',
  logLevel: 'debug'
});

// Test static constants
const airportType: 'AIRPORT' = Amadeus.location.airport;
const cityType: 'CITY' = Amadeus.location.city;
const anyType: 'AIRPORT,CITY' = Amadeus.location.any;

// Test method calls with correct parameters
async function testValidCalls() {
  // Valid flight search
  await amadeus.shopping.flightOffersSearch.get({
    originLocationCode: 'NYC',
    destinationLocationCode: 'MAD',
    departureDate: '2024-07-01',
    adults: 2
  });

  // Valid hotel search
  await amadeus.shopping.hotelOffersSearch.get({
    checkInDate: '2024-07-01',
    checkOutDate: '2024-07-03',
    adults: 2
  });

  // Valid airports search
  await amadeus.referenceData.locations.airports.get({
    latitude: 48.8566,
    longitude: 2.3522
  });
}

// Test property access
const client = amadeus.client;
const version: string = amadeus.version;
const referenceData = amadeus.referenceData;

export { amadeus, testValidCalls, airportType };