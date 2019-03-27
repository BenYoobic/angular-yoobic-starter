export interface IAbstractGameEntry {
    fieldId: string;
    assetDir?: string;
}
export interface IInputGameEntry {
    name: string;
    props: IAbstractGameEntry;
}
