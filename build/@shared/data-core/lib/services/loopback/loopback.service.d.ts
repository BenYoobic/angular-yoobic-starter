import { Session } from '../session/session.service';
export declare class Loopback {
    private session;
    private _client;
    constructor(session: Session);
    readonly client: any;
}
