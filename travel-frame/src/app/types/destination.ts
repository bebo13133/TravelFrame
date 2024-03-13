export interface Destination {
    image: File | null;
    title: string;
    _id: string;
    
    paragraph: string;
    "title-desc": string;
    "info-desc": string;
    images: File[] | null;
    dateRange: {
      start: string;
      end: string;
    };
    price: string;
    conditions: {
      ticketsIncluded: boolean;
      allTransportCosts: boolean;
      accommodations: boolean;
      allMeals: boolean;
      practices: boolean;
      atvTour: boolean;
      spaAccess: boolean;
      guidesIncluded: boolean;
      medicalInsurance: boolean;
      personalExpenses: boolean;
      alcoholicBeverages: boolean;
      unspecifiedServices: boolean;
      additionalActivitiesFee: boolean;
      cancellationInsurance: boolean;
    };
    days: Day[];
  }
  
  export interface Day {
    dayImage: File | null;
    dayTitle: string;
    dayInfo: string;
  }
  