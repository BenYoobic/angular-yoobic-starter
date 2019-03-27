import { IEntity } from '../entity/entity.interface';
import { IFile } from '../file/file.interface';
export declare class IProduct extends IEntity {
    title: string;
    reference: string;
    color: string;
    price: number;
    step: number;
    outofstock: boolean;
    image: IFile;
    description: string;
    shortdescription: string;
    tags?: Array<string>;
    catalogRef: string;
    catalog: any;
}
