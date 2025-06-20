/**
 * DTSLint tests for comprehensive type checking
 * These tests use TypeScript compiler API to verify type accuracy
 */

// Test that required parameters are enforced
import Amadeus = require('../lib/amadeus');

const amadeus = new Amadeus();

// Test: Required parameters should cause compilation errors when missing
// $ExpectError
amadeus.shopping.flightOffersSearch.get({
  // Missing required originLocationCode
  destinationLocationCode: 'MAD',
  departureDate: '2024-07-01',
  adults: 2
});

// $ExpectError  
amadeus.shopping.flightOffersSearch.get({
  originLocationCode: 'NYC',
  // Missing required destinationLocationCode
  departureDate: '2024-07-01',
  adults: 2
});

// $ExpectError
amadeus.shopping.flightOffersSearch.get({
  originLocationCode: 'NYC',
  destinationLocationCode: 'MAD',
  // Missing required departureDate
  adults: 2
});

// $ExpectError
amadeus.shopping.flightOffersSearch.get({
  originLocationCode: 'NYC',
  destinationLocationCode: 'MAD',
  departureDate: '2024-07-01'
  // Missing required adults
});

// Test: Valid calls should not cause errors
amadeus.shopping.flightOffersSearch.get({
  originLocationCode: 'NYC',
  destinationLocationCode: 'MAD', 
  departureDate: '2024-07-01',
  adults: 2
});

// Test: Hotel offers required parameters
// $ExpectError
amadeus.shopping.hotelOffersSearch.get({
  // Missing required checkInDate
  checkOutDate: '2024-07-03',
  adults: 2
});

// $ExpectError
amadeus.shopping.hotelOffersSearch.get({
  checkInDate: '2024-07-01',
  // Missing required checkOutDate  
  adults: 2
});

// $ExpectError
amadeus.shopping.hotelOffersSearch.get({
  checkInDate: '2024-07-01',
  checkOutDate: '2024-07-03'
  // Missing required adults
});

// Valid hotel search
amadeus.shopping.hotelOffersSearch.get({
  checkInDate: '2024-07-01',
  checkOutDate: '2024-07-03',
  adults: 2
});

// Test: Airport locations required parameters
// $ExpectError
amadeus.referenceData.locations.airports.get({
  // Missing required latitude
  longitude: 2.3522
});

// $ExpectError  
amadeus.referenceData.locations.airports.get({
  latitude: 48.8566
  // Missing required longitude
});

// Valid airports search
amadeus.referenceData.locations.airports.get({
  latitude: 48.8566,
  longitude: 2.3522
});

// Test: Travel predictions required parameters
// $ExpectError
amadeus.travel.predictions.flightDelay.get({
  // Missing multiple required parameters
  departureDate: '2024-07-01'
});

// Valid flight delay prediction
amadeus.travel.predictions.flightDelay.get({
  originLocationCode: 'NYC',
  destinationLocationCode: 'MAD',
  departureDate: '2024-07-01',
  departureTime: '08:00:00',
  arrivalDate: '2024-07-01', 
  arrivalTime: '20:00:00',
  aircraftCode: '321',
  carrierCode: 'AA',
  flightNumber: '100',
  duration: 'PT12H00M'
});

// Test: Configuration type checking
// $ExpectError: Invalid hostname
new Amadeus({
  hostname: 'invalid-hostname'
});

// $ExpectError: Invalid logLevel
new Amadeus({
  logLevel: 'invalid-log-level'
});

// Valid configuration
new Amadeus({
  clientId: 'test',
  clientSecret: 'secret',
  hostname: 'production',
  logLevel: 'debug',
  ssl: true,
  port: 443
});

// Test: Static constants type checking
const airportType: 'AIRPORT' = Amadeus.location.airport;
const cityType: 'CITY' = Amadeus.location.city;
const anyType: 'AIRPORT,CITY' = Amadeus.location.any;

// $ExpectError: Wrong type assignment
const wrongType1: 'CITY' = Amadeus.location.airport;

// $ExpectError: Wrong type assignment  
const wrongType2: 'AIRPORT' = Amadeus.location.city;

const arrivingType: 'ARRIVING' = Amadeus.direction.arriving;
const departingType: 'DEPARTING' = Amadeus.direction.departing;

// $ExpectError: Wrong direction type
const wrongDirection: 'ARRIVING' = Amadeus.direction.departing;

// Test: Response and error types
async function testResponseTypes() {
  const response = await amadeus.referenceData.airlines.get();
  
  // Response should have correct properties
  const statusCode: number = response.statusCode;
  const body: string = response.body;
  const result: any = response.result;
  const data: any = response.data;
  const parsed: boolean = response.parsed;
  
  // $ExpectError: statusCode should be number, not string
  const wrongStatusCode: string = response.statusCode;
  
  // $ExpectError: parsed should be boolean, not number
  const wrongParsed: number = response.parsed;
}

// Test: Promise return types
async function testPromiseTypes() {
  // All API methods should return Promise<Response>
  const flightResponse = amadeus.shopping.flightOffersSearch.get({
    originLocationCode: 'NYC',
    destinationLocationCode: 'MAD',
    departureDate: '2024-07-01', 
    adults: 2
  });
  
  // Should be a Promise
  const result = await flightResponse;
  
  // $ExpectError: Cannot assign Promise to Response directly
  const wrongAssignment: typeof result = flightResponse;
}

// Test: Error handling types
function testErrorTypes(error: any) {
  if (error instanceof Amadeus.NetworkError) {
    // Should have correct error properties
    const code: 'NetworkError' = error.code;
    const response = error.response;
    
    // $ExpectError: code should be specific string literal
    const wrongCode: 'AuthenticationError' = error.code;
  }
}

// Test: Dynamic resource methods
function testDynamicResources() {
  // Flight order methods
  const flightOrder = amadeus.booking.flightOrder('order123');
  
  // Should return Response promises
  const getPromise = flightOrder.get();
  const deletePromise = flightOrder.delete();
  
  // Location methods  
  const location = amadeus.referenceData.location('location123');
  const locationPromise = location.get();
  
  // Hotel methods (hotel is a property, not a method)
  const hotel = amadeus.referenceData.locations.hotel;
  const hotelPromise = hotel.get();
  
  // POI methods
  const poi = amadeus.referenceData.locations.pointOfInterest('poi123');
  const poiPromise = poi.get();
  
  // Activity methods
  const activity = amadeus.shopping.activity('activity123');
  const activityPromise = activity.get();
  
  // Hotel offer methods
  const hotelOffer = amadeus.shopping.hotelOfferSearch('offer123');
  const hotelOfferPromise = hotelOffer.get();
}

// Test: Pagination types
async function testPaginationTypes() {
  const response = await amadeus.referenceData.locations.get({
    keyword: 'Paris'
  });
  
  // Pagination methods should return Promise<Response | null>
  const nextPage = await amadeus.next(response);
  const prevPage = await amadeus.previous(response);
  const firstPage = await amadeus.first(response);
  const lastPage = await amadeus.last(response);
  
  // All should be Response or null
  if (nextPage !== null) {
    const statusCode: number = nextPage.statusCode;
  }
  
  // $ExpectError: Cannot assign null to Response
  const wrongAssignment: typeof response = nextPage;
}