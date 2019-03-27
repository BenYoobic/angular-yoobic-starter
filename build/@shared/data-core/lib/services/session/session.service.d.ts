import { Currency } from '../../interfaces/currency/currency.interface';
import { Location } from '../../interfaces/location/location.interface';
import { Tenant } from '../../interfaces/tenant/tenant.interface';
import { Config } from '../config/config.service';
import { MissionDescription } from '../../interfaces/mission-description/mission-description.interface';
import { LocalForageService } from '@shared/common';
import { IUser, ISessionService, ITranslation } from '@shared/stencil';
export declare class Session implements ISessionService {
    protected localForage: LocalForageService;
    protected config: Config;
    token: string;
    user: IUser;
    userId: string;
    currencies: Array<Currency>;
    groups: Array<string>;
    roles: Array<string>;
    tenant: Tenant;
    photoAnnotationTranslations: Array<ITranslation>;
    cameraStarted: boolean;
    hasScandit: boolean;
    hideWalkthrough: boolean;
    localPendingBadges: any;
    debugEvent: boolean;
    openedChannels: Array<string>;
    selectedMissionDescription: MissionDescription;
    selectedLocation: Location;
    constructor(localForage: LocalForageService, config: Config);
    readonly apiUrl: string;
    clear(clearUser?: boolean): Promise<void>;
}