/**
 * Basic TypeScript compilation tests for Amadeus type definitions
 * This file tests that the type definitions compile correctly and match the expected API surface
 */

import Amadeus = require('../lib/amadeus');
import { 
  AmadeusConfig, 
  Response, 
  ResponseError,
  NetworkError,
  AuthenticationError 
} from '../lib/amadeus';

// Test basic instantiation
const amadeus1 = new Amadeus();

const amadeus2 = new Amadeus({
  clientId: 'test-id',
  clientSecret: 'test-secret',
  hostname: 'test',
  logLevel: 'debug'
});

// Test configuration typing
const config: AmadeusConfig = {
  clientId: 'test',
  clientSecret: 'secret',
  hostname: 'production',
  logLevel: 'warn',
  ssl: true,
  port: 443,
  customAppId: 'myapp',
  customAppVersion: '1.0.0'
};

const amadeus3 = new Amadeus(config);

// Test main class properties
const client = amadeus1.client;
const version: string = amadeus1.version;

// Test namespace access
const referenceData = amadeus1.referenceData;
const shopping = amadeus1.shopping;
const booking = amadeus1.booking;
const travel = amadeus1.travel;
const eReputation = amadeus1.eReputation;
const media = amadeus1.media;
const ordering = amadeus1.ordering;
const airport = amadeus1.airport;
const schedule = amadeus1.schedule;
const analytics = amadeus1.analytics;
const location = amadeus1.location;
const airline = amadeus1.airline;

// Test pagination methods
async function testPagination() {
  const response: Response = {} as Response;
  
  const prev: Response | null = await amadeus1.previous(response);
  const next: Response | null = await amadeus1.next(response);
  const first: Response | null = await amadeus1.first(response);
  const last: Response | null = await amadeus1.last(response);
}

// Test static constants
const airportType: 'AIRPORT' = Amadeus.location.airport;
const cityType: 'CITY' = Amadeus.location.city;
const anyType: 'AIRPORT,CITY' = Amadeus.location.any;

const arriving: 'ARRIVING' = Amadeus.direction.arriving;
const departing: 'DEPARTING' = Amadeus.direction.departing;

// Test error types
function handleError(error: any) {
  if (error instanceof ResponseError) {
    console.log(error.code);
    console.log(error.response.statusCode);
  }
  
  if (error instanceof NetworkError) {
    console.log('Network error:', error.code);
  }
  
  if (error instanceof AuthenticationError) {
    console.log('Auth error:', error.code);
  }
}

// Test client methods
async function testClient() {
  const response1: Response = await amadeus1.client.get('/test');
  const response2: Response = await amadeus1.client.post('/test', { data: 'test' });
  const response3: Response = await amadeus1.client.delete('/test');
}

// Export to prevent "unused" errors
export { 
  amadeus1, 
  amadeus2, 
  amadeus3, 
  config, 
  testPagination, 
  testClient, 
  handleError 
};