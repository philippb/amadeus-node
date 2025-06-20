/**
 * API methods type checking tests
 * Tests that all API methods have correct signatures and return types
 */

import Amadeus = require('../lib/amadeus');
import { Response } from '../lib/amadeus';

const amadeus = new Amadeus();

// Test Reference Data APIs
async function testReferenceData() {
  // Airlines
  const airlines: Response = await amadeus.referenceData.airlines.get();
  const airlinesFiltered: Response = await amadeus.referenceData.airlines.get({
    airlineCodes: 'AA,BA'
  });

  // Locations
  const locations: Response = await amadeus.referenceData.locations.get({
    keyword: 'Paris',
    subType: 'CITY',
    countryCode: 'FR',
    page: { offset: 0, limit: 10 },
    sort: 'analytics.travelers.score',
    view: 'FULL'
  });

  // Specific location
  const location: Response = await amadeus.referenceData.location('CPARIS').get();

  // Airports
  const airports: Response = await amadeus.referenceData.locations.airports.get({
    latitude: 48.8566,
    longitude: 2.3522,
    radius: 50,
    page: { offset: 0, limit: 10 },
    sort: 'relevance'
  });

  // Cities
  const cities: Response = await amadeus.referenceData.locations.cities.get({
    keyword: 'Paris',
    countryCode: 'FR',
    max: 10,
    include: ['AIRPORTS']
  });

  // Hotels
  const hotelsByCity: Response = await amadeus.referenceData.locations.hotels.byCity.get({
    cityCode: 'PAR',
    radius: 5,
    radiusUnit: 'KM',
    chainCodes: 'AC,BW',
    amenities: 'SWIMMING_POOL,SPA',
    ratings: '4,5',
    hotelSource: 'ALL'
  });

  const hotelsByGeocode: Response = await amadeus.referenceData.locations.hotels.byGeocode.get({
    latitude: 48.8566,
    longitude: 2.3522,
    radius: 5,
    radiusUnit: 'KM'
  });

  const hotelsByIds: Response = await amadeus.referenceData.locations.hotels.byHotels.get({
    hotelIds: 'ACPAR245,ACPAR246',
    hotelSource: 'ALL'
  });

  // Specific hotel (hotel is a property, not a method)
  const hotel: Response = await amadeus.referenceData.locations.hotel.get();

  // Points of Interest
  const pois: Response = await amadeus.referenceData.locations.pointsOfInterest.get({
    latitude: 48.8566,
    longitude: 2.3522,
    radius: 1,
    page: { offset: 0, limit: 10 },
    categories: ['SIGHTS', 'RESTAURANT']
  });

  const poisBySquare: Response = await amadeus.referenceData.locations.pointsOfInterest.bySquare.get({
    north: 48.8641,
    west: 2.3393,
    south: 48.8491,
    east: 2.3651,
    categories: ['SIGHTS']
  });

  // Specific POI
  const poi: Response = await amadeus.referenceData.locations.pointOfInterest('8DA7B6CDCA').get();

  // Recommended locations
  const recommended: Response = await amadeus.referenceData.recommendedLocations.get({
    cityCodes: 'PAR,LON',
    travelerCountryCode: 'FR',
    destinationCountryCodes: 'ES,IT'
  });

  // Check-in links
  const checkinLinks: Response = await amadeus.referenceData.urls.checkinLinks.get({
    airlineCode: 'AF',
    language: 'EN'
  });
}

// Test Shopping APIs
async function testShopping() {
  // Flight offers search
  const flightOffersGet: Response = await amadeus.shopping.flightOffersSearch.get({
    originLocationCode: 'NYC',
    destinationLocationCode: 'MAD',
    departureDate: '2024-07-01',
    returnDate: '2024-07-15',
    adults: 2,
    children: 1,
    infants: 0,
    travelClass: 'ECONOMY',
    includedAirlineCodes: 'AA,BA',
    excludedAirlineCodes: 'LH',
    nonStop: false,
    currencyCode: 'USD',
    maxPrice: 1000,
    max: 250
  });

  const flightOffersPost: Response = await amadeus.shopping.flightOffersSearch.post({
    currencyCode: 'USD',
    originDestinations: [{
      id: '1',
      originLocationCode: 'NYC',
      destinationLocationCode: 'MAD',
      departureDateTimeRange: {
        date: '2024-07-01'
      }
    }],
    travelers: [{
      id: '1',
      travelerType: 'ADULT'
    }],
    sources: ['GDS'],
    searchCriteria: {
      maxFlightOffers: 50
    }
  });

  // Flight offers pricing
  const pricing: Response = await amadeus.shopping.flightOffers.pricing.post({
    data: {
      type: 'flight-offers-pricing',
      flightOffers: []
    }
  });

  // Flight offers prediction
  const prediction: Response = await amadeus.shopping.flightOffers.prediction.post({
    data: {
      type: 'flight-offers-prediction',
      flightOffers: []
    }
  });

  // Flight offers upselling
  const upselling: Response = await amadeus.shopping.flightOffers.upselling.post({
    data: {
      type: 'flight-offers-upselling',
      flightOffers: []
    }
  });

  // Flight destinations
  const destinations: Response = await amadeus.shopping.flightDestinations.get({
    origin: 'NYC',
    departureDate: '2024-07-01',
    oneWay: true,
    duration: '1-7',
    nonStop: false,
    maxPrice: 500,
    currency: 'USD',
    viewBy: 'COUNTRY'
  });

  // Flight dates
  const dates: Response = await amadeus.shopping.flightDates.get({
    origin: 'NYC',
    destination: 'MAD',
    departureDate: '2024-07-01',
    oneWay: false,
    duration: '5-10',
    nonStop: false,
    maxPrice: 800,
    currency: 'EUR',
    viewBy: 'DATE'
  });

  // Hotel offers search
  const hotelOffers: Response = await amadeus.shopping.hotelOffersSearch.get({
    hotelIds: 'ACPAR245,ACPAR246',
    cityCode: 'PAR',
    checkInDate: '2024-07-01',
    checkOutDate: '2024-07-03',
    roomQuantity: 1,
    adults: 2,
    childAges: '3,7',
    currency: 'EUR',
    priceRange: '100-300',
    paymentPolicy: 'NONE',
    boardType: 'BREAKFAST',
    includeClosed: false,
    bestRateOnly: true,
    view: 'FULL',
    sort: 'PRICE',
    page: { offset: 0, limit: 20 }
  });

  // Specific hotel offer
  const hotelOffer: Response = await amadeus.shopping.hotelOfferSearch('offer123').get();

  // Activities
  const activities: Response = await amadeus.shopping.activities.get({
    latitude: 48.8566,
    longitude: 2.3522,
    radius: 1
  });

  const activitiesBySquare: Response = await amadeus.shopping.activities.bySquare.get({
    north: 48.8641,
    west: 2.3393,
    south: 48.8491,
    east: 2.3651
  });

  // Specific activity
  const activity: Response = await amadeus.shopping.activity('activity123').get();

  // Flight availability
  const availability: Response = await amadeus.shopping.availability.flightAvailabilities.post({
    originDestinations: [{
      id: '1',
      originLocationCode: 'NYC',
      destinationLocationCode: 'MAD',
      departureDateTime: {
        date: '2024-07-01',
        time: '08:00:00'
      }
    }],
    travelers: [{
      id: '1',
      travelerType: 'ADULT'
    }],
    sources: ['GDS']
  });

  // Seatmaps
  const seatmapsGet: Response = await amadeus.shopping.seatmaps.get({
    'flight-orderId': 'order123'
  });

  const seatmapsPost: Response = await amadeus.shopping.seatmaps.post({
    data: [{
      type: 'flight-offer',
      flightOffers: []
    }]
  });

  // Transfer offers
  const transfers: Response = await amadeus.shopping.transferOffers.post({
    startLocationCode: 'CDG',
    endLocationCode: 'PAR',
    transferType: 'PRIVATE',
    startDateTime: '2024-07-01T10:00:00',
    passengers: 2
  });
}

// Test Booking APIs
async function testBooking() {
  // Flight orders
  const flightOrder: Response = await amadeus.booking.flightOrders.post({
    data: {
      type: 'flight-order',
      flightOffers: [],
      travelers: []
    }
  });

  // Specific flight order
  const orderDetails: Response = await amadeus.booking.flightOrder('order123').get();
  const cancelOrder: Response = await amadeus.booking.flightOrder('order123').delete();

  // Hotel bookings
  const hotelBooking: Response = await amadeus.booking.hotelBookings.post({
    data: {
      type: 'hotel-booking',
      hotelOffer: {},
      guests: []
    }
  });

  // Hotel orders  
  const hotelOrder: Response = await amadeus.booking.hotelOrders.post({
    data: {
      type: 'hotel-order',
      hotelOffer: {},
      guests: []
    }
  });
}

// Test Travel APIs
async function testTravel() {
  // Air traffic analytics
  const traveled: Response = await amadeus.travel.analytics.airTraffic.traveled.get({
    originCityCode: 'NYC',
    period: '2023-01',
    max: 10
  });

  const booked: Response = await amadeus.travel.analytics.airTraffic.booked.get({
    originCityCode: 'NYC', 
    period: '2023-01',
    max: 10
  });

  const busiestPeriod: Response = await amadeus.travel.analytics.airTraffic.busiestPeriod.get({
    cityCode: 'NYC',
    period: '2023',
    direction: 'DEPARTING'
  });

  // Predictions
  const flightDelay: Response = await amadeus.travel.predictions.flightDelay.get({
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

  const tripPurpose: Response = await amadeus.travel.predictions.tripPurpose.get({
    originLocationCode: 'NYC',
    destinationLocationCode: 'MAD',
    departureDate: '2024-07-01',
    returnDate: '2024-07-15'
  });
}

// Test remaining APIs
async function testOtherAPIs() {
  // Airport APIs
  const destinations: Response = await amadeus.airport.directDestinations.get({
    departureAirportCode: 'JFK',
    max: 50
  });

  const onTime: Response = await amadeus.airport.predictions.onTime.get({
    airportCode: 'JFK',
    date: '2024-07-01'
  });

  // Airline APIs
  const airlineDestinations: Response = await amadeus.airline.destinations.get({
    airlineCode: 'AA',
    max: 50
  });

  // Analytics APIs
  const priceMetrics: Response = await amadeus.analytics.itineraryPriceMetrics.get({
    originIataCode: 'NYC',
    destinationIataCode: 'MAD',
    departureDate: '2024-07-01',
    currencyCode: 'USD',
    oneWay: 'false'
  });

  // E-Reputation APIs
  const sentiments: Response = await amadeus.eReputation.hotelSentiments.get({
    hotelId: 'ACPAR245'
  });

  // Location APIs
  const categoryRated: Response = await amadeus.location.analytics.categoryRatedAreas.get({
    latitude: 48.8566,
    longitude: 2.3522,
    radius: 1
  });

  // Ordering APIs
  const transferOrder: Response = await amadeus.ordering.transferOrders.post({
    startLocationCode: 'CDG',
    endLocationCode: 'PAR'
  });

  const cancellation: Response = await amadeus.ordering.transferOrder('order123').transfers.cancellation.post({
    confirmNbr: 'conf123'
  });

  // Schedule APIs
  const flights: Response = await amadeus.schedule.flights.get({
    carrierCode: 'AA',
    flightNumber: '100',
    scheduledDepartureDate: '2024-07-01',
    operationalSuffix: 'A'
  });
}

// Export to prevent unused errors
export {
  testReferenceData,
  testShopping,
  testBooking,
  testTravel,
  testOtherAPIs
};