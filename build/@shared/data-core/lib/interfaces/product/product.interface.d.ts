import { IProduct } from '@shared/stencil';
export declare class Product extends IProduct {
    _id: string;
    catalog: any;
    catalogRef: string;
    title: string;
    reference: string;
    color: string;
    price: number;
    step: number;
    outofstock: boolean;
    image: any;
    description: string;
    shortdescription: string;
    tags?: Array<string>;
}
