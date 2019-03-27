import { Broker, Requestor } from '@shared/data-core';
import { Message } from '../../interfaces/message/message.model';
import { Observable } from 'rxjs';
export declare class Messages {
    private broker;
    private rq;
    constructor(broker: Broker, rq: Requestor);
    getJsonMessage(message: Message): {
        to: string[];
        content: {
            title: string;
            body: string;
            actionURL: string;
            actionText: string;
            action: boolean;
            thankyou: string;
        };
    };
    sendMail(message: Message): any;
    unblockEmails(emails: Array<string>): Observable<any>;
    private readonly apiUrl;
}
