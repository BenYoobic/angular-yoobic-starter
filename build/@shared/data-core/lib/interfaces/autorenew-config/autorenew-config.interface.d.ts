import { IAutorenewConfig } from '@shared/stencil';
import { MissionDescription } from '../mission-description/mission-description.interface';
export declare class AutorenewConfig extends IAutorenewConfig {
    title: string;
    prefix_title: string;
    priority?: number;
    descriptionSource: MissionDescription;
    descriptionTarget: MissionDescription;
    active: boolean;
}
