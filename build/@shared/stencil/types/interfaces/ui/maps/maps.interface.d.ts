export interface IMapEntry {
    markers?: IMarker[];
    fitToMarkers?: boolean;
    currentLanguage?: string;
    position?: IPosition;
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    groupBy?: string;
    showLegend?: boolean;
    legendColors?: IMarkerColor[];
    filterGroups?: IFilterGroup[];
    useCluster?: boolean;
    showControls?: boolean;
    showDirections?: boolean;
    disableZoom?: boolean;
    icon?: string;
    showFullscreenControl?: boolean;
}
export interface IPosition {
    latitude: number;
    longitude: number;
}
export interface IMarker {
    _id?: string;
    latitude?: number;
    longitude?: number;
    selected?: boolean;
    title?: string;
    color?: string;
    address?: string;
    status?: string;
    validated?: boolean;
    missionRef?: string;
}
export interface IMarkerColor {
    markerStatus: string;
    color: string;
}
export interface IFilterGroup {
    title: string;
    value: any;
    count: number;
    visible: boolean;
}
