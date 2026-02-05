
export interface RSVP {
  id: string;
  name: string;
  attending: boolean;
  class: '11th' | '12th';
  message?: string;
  timestamp: Date;
}