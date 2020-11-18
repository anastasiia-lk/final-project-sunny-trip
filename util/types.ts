export type User = {
  id: number;
  passwordHash: string;
  username: string;
  firstName: string;
  lastName: string;
};

export type Session = {
  id: number;
  token: string;
  expiryTimestamp: Date;
  userId: number;
};

export type Trips = {
  id: number;
  name: string;
  user_id: number;
};
export type Weathers = {
  id: number;
  temp: number;
  long: string;
  trip_id: number;
};
export type Cities = {
  id: number;
  date: string;
  trip_id: number;
};
export type Dates = {
  id: number;
  date: string;
  trip_id: number;
};
