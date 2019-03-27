import { CanActivate, CanDeactivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Authentication } from './authentication.service';
import { Observable } from 'rxjs';
export declare class AuthenticationGuard implements CanActivate {
    private authentication;
    constructor(authentication: Authentication);
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean;
}
export interface CanComponentDeactivate {
    canDeactivate: (component: CanComponentDeactivate, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => boolean | Observable<boolean>;
}
export declare class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean;
}
