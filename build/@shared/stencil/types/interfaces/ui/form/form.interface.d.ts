import { IGridSearch } from '../grid/grid.interface';
import { IFormField } from '../../entities/form-field/form-field.interface';
import { IEntity } from '../../entities/entity/entity.interface';
export interface IFormSearch {
    field: IFormField;
    search: IGridSearch;
    form?: any;
    grid?: any;
}
export interface IFormProgress extends IEntity {
    value?: number;
    takenPhotos?: number;
    totalPhotos?: number;
    missionRef?: string;
}
