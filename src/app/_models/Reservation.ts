import { Repertoire } from "./Repertoire";
import { User } from "./User";

export interface Reservation {
    repertoire: Repertoire;
    id: number;
    user: User;
    x: number;
    y: number;
}