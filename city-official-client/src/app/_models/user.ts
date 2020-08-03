import { City } from './city';

export class User {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    apiKey: string;
    token: string;
    city: City;
}