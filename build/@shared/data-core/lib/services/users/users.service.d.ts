import { Broker } from '../broker/broker.service';
import { Requestor } from '../requestor/requestor.service';
import { User } from '../../interfaces/user/user.interface';
import { Observable } from 'rxjs';
export declare class Users {
    protected broker: Broker;
    protected rq: Requestor;
    static adminIds: Array<any>;
    static simplifiedFields: Array<string>;
    constructor(broker: Broker, rq: Requestor);
    getSimplifiedProfile(userId: any): Observable<{
        _id?: string;
        imageData?: string;
        firstName?: string;
        lastName?: string;
        email?: string;
        telephone?: string;
        username?: string;
    }>;
    getFreshdeskUrl(): Observable<any>;
    setAcl(user: User, groups: Array<string>): void;
    getCustomFilterNoAdmin(showMe?: boolean): {
        _id: {
            nin: any[];
        };
    };
    isUsernameTaken(username: string): Observable<any>;
    getUsersByLocation(locationId: string): Observable<any[]>;
    getGeofilterUsers(locationId: string, userTags?: Array<string>): Observable<any[]>;
}
