import { Broker } from '../broker/broker.service';
import { Requestor } from '../requestor/requestor.service';
import { User } from '../../interfaces/user/user.interface';
import { Group } from '../../interfaces/group/group.interface';
export * from '../../interfaces/group/group.interface';
import { Config } from '../config/config.service';
import { Observable } from 'rxjs';
export declare class Security {
    protected broker: Broker;
    protected rq: Requestor;
    protected config: Config;
    static ROLES: string[];
    static ROLES_ASK: string[];
    constructor(broker: Broker, rq: Requestor, config: Config);
    /**
      Return the list of groups and roles for a specific user
      */
    getUserSession(userId: string): Observable<any>;
    /**
      Add the specified users to the group
      */
    addGroupUsers(group: Group, users: User[]): Observable<any>;
    /**
      Remove the specified users to the group
      */
    removeGroupUsers(group: Group, users: User[]): Observable<any>;
    /**
         Add the specified groups to the group
         */
    addGroupGroups(group: Group, groups: Group[]): Observable<any>;
    /**
     Remove the specified groups to the group
     */
    removeGroupGroups(group: Group, groups: Group[]): Observable<any>;
    updateGroup(id: string, addedUsers: Array<User>, removedUsers?: Array<User>, addedGroups?: Array<Group>, removedGroups?: Array<Group>): Observable<any>;
    initGroup(group: Group): void;
    /**
          Returns the subquery used in the group's tab user grid
          */
    getGroupUserSubQuery(group: Group): {
        collectionName: string;
        where: {
            _id: string;
        };
        field: string;
        values: string;
    };
    /**
      Returns the subquery used in the group's tab sub group grid
      */
    getGroupGroupSubQuery(group: Group): {
        collectionName: string;
        where: {
            _id: string;
        };
        field: string;
        values: string;
    };
    getAncestry(groupIds: string[], mode?: 'ancestors' | 'descendants' | 'both'): Observable<any[]>;
}
