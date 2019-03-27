import { IEntity } from '../entity/entity.interface';
export declare class IAlgorithm extends IEntity {
    channel: string;
    name: string;
    server: string;
    stitch?: boolean;
}
