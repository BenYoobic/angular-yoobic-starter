import { Authentication } from './authentication.service';
import { Session } from '../session/session.service';
import { Network } from '@shared/common';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
export declare class CurrentSessionResolver implements Resolve<any> {
    private authentication;
    private network;
    constructor(authentication: Authentication, network: Network);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Session>;
}
