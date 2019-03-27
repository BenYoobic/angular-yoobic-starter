import { IMission, IMissiondata, IProductBatch, ILocation, IBadgeEntry, IMissionDescription } from '../../interfaces';
export declare function getCampaignStateBadges(campaign: IMissionDescription): IBadgeEntry[];
export declare function getMissionStateBadges(mission: IMission, includeVIPText?: boolean): IBadgeEntry[];
export declare function getMissionDataStateBadge(missiondata: IMissiondata): {
    text: string;
    cssClass: string;
    progressClass: string;
};
export declare function getProductBatchDateBadge(productBatch: IProductBatch, size?: string): {
    text: string;
    cssClass: string;
    progressClass: string;
};
export declare function getProductBatchDelayInHours(productBatch: IProductBatch): number;
export declare function getMissionStatusIconClass(mission: IMission): {
    class: string;
    style: string;
    text: string;
};
export declare function getProductBatchProgressColor(progress: number): "success" | "danger" | "warning";
export declare function getGoogleMapStreeView(loc: ILocation, width: number, height: number): string;
