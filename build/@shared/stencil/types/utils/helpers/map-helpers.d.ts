import { IMarker, IFilterGroup, IMapEntry } from '../../interfaces';
export declare function generateFilterGroups(markers: IMarker[], groupBy: string): IFilterGroup[];
export declare function layersFromKeys(filterGroups: IFilterGroup[]): string[];
export declare function isMarkersLayer(layerId: string): boolean;
export declare function isSelectedMarkersLayer(layerId: string): boolean;
export declare function getMapCSSClasses(): {
    available: string;
    booked: string;
    validated: string;
    rejected: string;
    tobevalidated: string;
    archived: string;
};
export declare function hasSameMarkers(newMapEntry: IMapEntry, oldMapEntry: IMapEntry): boolean;
export declare function isWebGLSupported(): boolean;
export declare function showDirectionsActionSheet(latitude: number, longitude: number, title: string, address: string): Promise<string>;
export declare function navigateAppleMaps(latitude: number, longitude: number): void;
export declare function navigateCityMapper(latitude: number, longitude: number, title?: string, address?: string): void;
export declare function navigateGoogleMaps(latitude: number, longitude: number): void;
