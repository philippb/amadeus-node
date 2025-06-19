/**
 * Runtime compatibility tests
 * Tests that the TypeScript definitions match the actual JavaScript runtime behavior
 */

const Amadeus = require('../lib/amadeus');

describe('TypeScript definitions runtime compatibility', () => {
  let amadeus;

  beforeEach(() => {
    amadeus = new Amadeus({
      clientId: 'test-client-id',
      clientSecret: 'test-client-secret',
      hostname: 'test'
    });
  });

  describe('Main class structure', () => {
    test('should have all expected properties', () => {
      expect(amadeus).toHaveProperty('client');
      expect(amadeus).toHaveProperty('version');
      expect(amadeus).toHaveProperty('referenceData');
      expect(amadeus).toHaveProperty('shopping');
      expect(amadeus).toHaveProperty('booking');
      expect(amadeus).toHaveProperty('travel');
      expect(amadeus).toHaveProperty('eReputation');
      expect(amadeus).toHaveProperty('media');
      expect(amadeus).toHaveProperty('ordering');
      expect(amadeus).toHaveProperty('airport');
      expect(amadeus).toHaveProperty('pagination');
      expect(amadeus).toHaveProperty('schedule');
      expect(amadeus).toHaveProperty('analytics');
      expect(amadeus).toHaveProperty('location');
      expect(amadeus).toHaveProperty('airline');
    });

    test('should have pagination methods', () => {
      expect(typeof amadeus.previous).toBe('function');
      expect(typeof amadeus.next).toBe('function');
      expect(typeof amadeus.first).toBe('function');
      expect(typeof amadeus.last).toBe('function');
    });

    test('should have static constants', () => {
      expect(Amadeus.location).toEqual({
        airport: 'AIRPORT',
        city: 'CITY',
        any: 'AIRPORT,CITY'
      });

      expect(Amadeus.direction).toEqual({
        arriving: 'ARRIVING',
        departing: 'DEPARTING'
      });
    });
  });

  describe('Client structure', () => {
    test('should have client methods', () => {
      expect(typeof amadeus.client.get).toBe('function');
      expect(typeof amadeus.client.post).toBe('function');
      expect(typeof amadeus.client.delete).toBe('function');
      expect(typeof amadeus.client.request).toBe('function');
    });

    test('should have client properties', () => {
      expect(amadeus.client).toHaveProperty('clientId');
      expect(amadeus.client).toHaveProperty('clientSecret');
      expect(amadeus.client).toHaveProperty('host');
      expect(amadeus.client).toHaveProperty('port');
      expect(amadeus.client).toHaveProperty('ssl');
      expect(amadeus.client).toHaveProperty('version');
    });
  });

  describe('Reference Data namespace', () => {
    test('should have expected structure', () => {
      expect(amadeus.referenceData).toHaveProperty('airlines');
      expect(amadeus.referenceData).toHaveProperty('locations');
      expect(amadeus.referenceData).toHaveProperty('recommendedLocations');
      expect(amadeus.referenceData).toHaveProperty('urls');
      
      expect(typeof amadeus.referenceData.location).toBe('function');
    });

    test('should have locations sub-structure', () => {
      expect(amadeus.referenceData.locations).toHaveProperty('airports');
      expect(amadeus.referenceData.locations).toHaveProperty('cities');
      expect(amadeus.referenceData.locations).toHaveProperty('hotel');
      expect(amadeus.referenceData.locations).toHaveProperty('hotels');
      expect(amadeus.referenceData.locations).toHaveProperty('pointsOfInterest');
      
      expect(typeof amadeus.referenceData.locations.get).toBe('function');
      expect(typeof amadeus.referenceData.locations.hotel).toBe('object');
      expect(typeof amadeus.referenceData.locations.pointOfInterest).toBe('function');
    });

    test('should have hotels sub-structure', () => {
      expect(amadeus.referenceData.locations.hotels).toHaveProperty('byCity');
      expect(amadeus.referenceData.locations.hotels).toHaveProperty('byGeocode');
      expect(amadeus.referenceData.locations.hotels).toHaveProperty('byHotels');
    });
  });

  describe('Shopping namespace', () => {
    test('should have expected structure', () => {
      expect(amadeus.shopping).toHaveProperty('activities');
      expect(amadeus.shopping).toHaveProperty('availability');
      expect(amadeus.shopping).toHaveProperty('flightDates');
      expect(amadeus.shopping).toHaveProperty('flightDestinations');
      expect(amadeus.shopping).toHaveProperty('flightOffers');
      expect(amadeus.shopping).toHaveProperty('flightOffersSearch');
      expect(amadeus.shopping).toHaveProperty('hotelOffersSearch');
      expect(amadeus.shopping).toHaveProperty('seatmaps');
      expect(amadeus.shopping).toHaveProperty('transferOffers');
      
      expect(typeof amadeus.shopping.activity).toBe('function');
      expect(typeof amadeus.shopping.hotelOfferSearch).toBe('function');
    });

    test('should have flight offers sub-structure', () => {
      expect(amadeus.shopping.flightOffers).toHaveProperty('prediction');
      expect(amadeus.shopping.flightOffers).toHaveProperty('pricing');
      expect(amadeus.shopping.flightOffers).toHaveProperty('upselling');
    });
  });

  describe('Booking namespace', () => {
    test('should have expected structure', () => {
      expect(amadeus.booking).toHaveProperty('flightOrders');
      expect(amadeus.booking).toHaveProperty('hotelBookings');
      expect(amadeus.booking).toHaveProperty('hotelOrders');
      
      expect(typeof amadeus.booking.flightOrder).toBe('function');
    });

    test('should create flight order instances', () => {
      const flightOrder = amadeus.booking.flightOrder('test-order-id');
      expect(typeof flightOrder.get).toBe('function');
      expect(typeof flightOrder.delete).toBe('function');
    });
  });

  describe('Travel namespace', () => {
    test('should have expected structure', () => {
      expect(amadeus.travel).toHaveProperty('analytics');
      expect(amadeus.travel).toHaveProperty('predictions');
    });

    test('should have analytics sub-structure', () => {
      expect(amadeus.travel.analytics).toHaveProperty('airTraffic');
      expect(amadeus.travel.analytics.airTraffic).toHaveProperty('booked');
      expect(amadeus.travel.analytics.airTraffic).toHaveProperty('busiestPeriod');
      expect(amadeus.travel.analytics.airTraffic).toHaveProperty('traveled');
    });

    test('should have predictions sub-structure', () => {
      expect(amadeus.travel.predictions).toHaveProperty('flightDelay');
      expect(amadeus.travel.predictions).toHaveProperty('tripPurpose');
    });
  });

  describe('Other namespaces', () => {
    test('should have airport namespace', () => {
      expect(amadeus.airport).toHaveProperty('directDestinations');
      expect(amadeus.airport).toHaveProperty('predictions');
      expect(amadeus.airport.predictions).toHaveProperty('onTime');
    });

    test('should have airline namespace', () => {
      expect(amadeus.airline).toHaveProperty('destinations');
    });

    test('should have analytics namespace', () => {
      expect(amadeus.analytics).toHaveProperty('itineraryPriceMetrics');
    });

    test('should have eReputation namespace', () => {
      expect(amadeus.eReputation).toHaveProperty('hotelSentiments');
    });

    test('should have location namespace', () => {
      expect(amadeus.location).toHaveProperty('analytics');
      expect(amadeus.location.analytics).toHaveProperty('categoryRatedAreas');
    });

    test('should have ordering namespace', () => {
      expect(amadeus.ordering).toHaveProperty('transferOrders');
      expect(typeof amadeus.ordering.transferOrder).toBe('function');
    });

    test('should have schedule namespace', () => {
      expect(amadeus.schedule).toHaveProperty('flights');
    });

    test('should have media namespace', () => {
      expect(amadeus.media).toHaveProperty('files');
    });
  });

  describe('Dynamic resource creation', () => {
    test('should create location instances', () => {
      const location = amadeus.referenceData.location('test-location-id');
      expect(typeof location.get).toBe('function');
      expect(location.locationId).toBe('test-location-id');
    });

    test('should create hotel instances', () => {
      const hotel = amadeus.referenceData.locations.hotel;
      expect(typeof hotel.get).toBe('function');
      expect(hotel).toHaveProperty('client');
    });

    test('should create POI instances', () => {
      const poi = amadeus.referenceData.locations.pointOfInterest('test-poi-id');
      expect(typeof poi.get).toBe('function');
      expect(poi._poiId).toBe('test-poi-id');
    });

    test('should create activity instances', () => {
      const activity = amadeus.shopping.activity('test-activity-id');
      expect(typeof activity.get).toBe('function');
      expect(activity.activityId).toBe('test-activity-id');
    });

    test('should create hotel offer instances', () => {
      const hotelOffer = amadeus.shopping.hotelOfferSearch('test-offer-id');
      expect(typeof hotelOffer.get).toBe('function');
      expect(hotelOffer.offerId).toBe('test-offer-id');
    });

    test('should create transfer order instances', () => {
      const transferOrder = amadeus.ordering.transferOrder('test-order-id');
      expect(transferOrder).toHaveProperty('transfers');
      expect(transferOrder.transfers).toHaveProperty('cancellation');
      expect(typeof transferOrder.transfers.cancellation.post).toBe('function');
    });
  });

  describe('Method signatures', () => {
    test('should have correct get method signatures', () => {
      expect(amadeus.referenceData.airlines.get.length).toBe(0); // params have defaults
      expect(amadeus.referenceData.locations.get.length).toBe(0); // params have defaults
      expect(amadeus.shopping.flightOffersSearch.get.length).toBe(0); // params have defaults
    });

    test('should have correct post method signatures', () => {
      expect(amadeus.booking.flightOrders.post.length).toBe(0); // params have defaults
      expect(amadeus.shopping.flightOffersSearch.post.length).toBe(0); // params have defaults
    });
  });
});