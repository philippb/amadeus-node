// Clean TypeScript definitions for Amadeus Node SDK
// Test compilation with a minimal but complete structure

export interface AmadeusConfig {
  clientId?: string;
  clientSecret?: string;
  hostname?: 'production' | 'test';
  logLevel?: 'debug' | 'warn' | 'silent';
  ssl?: boolean;
  port?: number;
}

export interface Response {
  statusCode: number;
  body: string;
  result: any;
  data: any;
  parsed: boolean;
}

export declare class Amadeus {
  constructor(config?: AmadeusConfig);
  
  client: {
    get(path: string, params?: any): Promise<Response>;
    post(path: string, params?: any): Promise<Response>;
    delete(path: string, params?: any): Promise<Response>;
  };
  
  shopping: {
    flightOffersSearch: {
      get(params?: {
        originLocationCode: string;
        destinationLocationCode: string;
        departureDate: string;
        adults: number;
        returnDate?: string;
        children?: number;
        infants?: number;
      }): Promise<Response>;
    };
    hotelOffersSearch: {
      get(params?: {
        checkInDate: string;
        checkOutDate: string;
        adults: number;
        hotelIds?: string;
        cityCode?: string;
      }): Promise<Response>;
    };
  };
  
  referenceData: {
    locations: {
      airports: {
        get(params?: {
          latitude: number;
          longitude: number;
          radius?: number;
        }): Promise<Response>;
      };
    };
  };
  
  static location: {
    airport: 'AIRPORT';
    city: 'CITY';
    any: 'AIRPORT,CITY';
  };
}
