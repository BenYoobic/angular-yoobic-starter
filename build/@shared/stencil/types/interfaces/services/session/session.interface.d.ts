import { ICurrency } from '../../entities/currency/currency.interface';
import { IUser } from '../../entities/user/user.interface';
import { ITenant } from '../../entities/tenant/tenant.interface';
import { ILocation } from '../../entities/location/location.interface';
import { IMission } from '../../entities/mission/mission.interface';
import { ITranslation } from '../../entities/translation/translation.interface';
export interface ISessionService {
    token: string;
    apiUrl: string;
    user: IUser;
    userId: string;
    currencies: Array<ICurrency>;
    groups: Array<string>;
    roles: Array<string>;
    tenant?: ITenant;
    selectedLocation?: ILocation;
    selectedMissionPage?: number;
    selectedMission?: IMission;
    photoAnnotationTranslations?: ITranslation[];
    cameraStarted?: boolean;
    timerCountDownState?: number;
    hasScandit: boolean;
}
