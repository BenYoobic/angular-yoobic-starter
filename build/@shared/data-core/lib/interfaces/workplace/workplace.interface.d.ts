import { IWorkplaceGroups, IWorkplacePost } from '@shared/stencil';
export declare class WorkplaceGroups extends IWorkplaceGroups {
    name: string;
    icon: string;
    cover: string;
    description: string;
}
export declare class WorkplacePost extends IWorkplacePost {
    comments: string;
    workplaceGroups: any;
}
