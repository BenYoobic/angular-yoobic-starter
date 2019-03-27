import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../config/config.service';
import { Network, Log } from '@shared/common';
export declare class HttpCustomInterceptor implements HttpInterceptor {
    protected config: Config;
    protected network: Network;
    protected log: Log;
    constructor(config: Config, network: Network, log: Log);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
