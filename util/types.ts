export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export type Session = {
  id: number;
  token: string;
  expiryTimestamp: Date;
  userId: number;
};

export type Trips = {
  id: number;
  date_trip: string;
  temp_forecast: number;
  forecast_trip: string;
  icon_forecast: string;
  user_id: number;
};

export type Cities = {
  id: number;
  city: string;
  country: string;
};

export type TripsCities = {
  id: number;
  trip_id: number;
  city_id: number;
};

export type WishList = {
  id: number;
  trip_id: number;
  city_id: number;
};
