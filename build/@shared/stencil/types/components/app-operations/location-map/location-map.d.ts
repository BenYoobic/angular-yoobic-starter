import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooLocationMapComponent {
    location: any;
    useAppleMaps: EventEmitter<any>;
    useGoogleMaps: EventEmitter<any>;
    useCityMapper: EventEmitter<any>;
    useCopyAddress: EventEmitter<any>;
    openFullscreen: EventEmitter<any>;
    direction: EventEmitter<any>;
    host: HTMLStencilElement;
    private address;
    private position;
    private marker;
    componentWillLoad(): void;
    setAddress(address: string): void;
    setLocationMarkers(longitude: number, latitude: number, address: string): void;
    setOpeningTimes(): void;
    onGetDirections(): void;
    onOpenFullscreenMap(): void;
    renderAddress(addressLine: string): JSX.Element;
    render(): JSX.Element;
}
