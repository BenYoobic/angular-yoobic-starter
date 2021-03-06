import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IMapEntry, IMarker, IFilterGroup } from '../../../interfaces';
export declare class YooAmapComponent {
    filterGroups: IFilterGroup[];
    mapEntry: IMapEntry;
    filterGroupsChanged: EventEmitter<IFilterGroup[]>;
    select: EventEmitter<IMarker[]>;
    isLoading: boolean;
    host: HTMLStencilElement;
    private amapKey;
    private amapUrl;
    private map;
    private layers;
    private markersByLayer;
    private clusterByLayer;
    private isLoaded;
    private isDestroyed;
    private legendsOld;
    onMapEntryChanged(newMapEntry: IMapEntry, oldMapEntry: IMapEntry): void;
    componentDidLoad(): Promise<void>;
    componentDidUnload(): void;
    onToggleFilterGroup(filterGroup: IFilterGroup, ev: CustomEvent): void;
    getAMap(): Promise<any>;
    initMap(): Promise<void>;
    initMarkers(): void;
    populateLayers(): void;
    clearClusters(): void;
    addCluster(layerId: string, markers: IMarker[], iconUrl: string): void;
    attachMarkerClickHandler(aMarker: any): void;
    onFilterGroupsChange(visible: boolean, filterGroup: IFilterGroup): void;
    toggleMarkers(visibility: string, layerId: string, useCluster: boolean): void;
    getIconUrl(layerId: string): string;
    render(): JSX.Element;
}
