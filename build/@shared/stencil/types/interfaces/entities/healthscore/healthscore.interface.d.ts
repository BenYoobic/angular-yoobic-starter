export interface IHealthscore {
    healthscore: IHealthscoreValue;
    reactivity: IHealthscoreValue;
    compliance: IHealthscoreValue;
    accuracy: IHealthscoreValue;
    review: IHealthscoreValue;
    evolution: IHealthscoreEvolution;
}
export interface IHealthscoreEvolution {
    lowest: number;
    current: number;
    highest: number;
    evolution: Array<{
        date: string;
        value: number;
    }>;
    comparison: {
        chartSettings: {
            numberOfGroups: number;
            startPoint: number;
            groupRange: number;
        };
        numberOfStoresInGroup: Array<IHealthscoreEvolutionValue>;
        average: IHealthscoreEvolutionValue;
        myStore: IHealthscoreEvolutionValue;
    };
}
export interface IHealthscoreValue {
    today: number;
    yesterday: number;
    change: number;
    isPercent: boolean;
}
export interface IHealthscoreEvolutionValue {
    groupNumber: number;
    value: number;
}
