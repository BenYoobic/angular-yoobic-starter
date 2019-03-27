export interface IProgressLine {
    extraLabel?: string;
    extraLabelFontSize?: 'small' | 'medium' | 'large' | 'extra-large';
    hideProgressValue?: boolean;
    generatedScoreDisplay?: string;
    maxValue?: number;
    uploadingMode?: boolean;
    lineWidth?: number;
}
export interface IProgressCircle {
    score?: number;
    scoreDisplay?: string;
    scoreFontSize?: 'small' | 'medium' | 'large' | 'extra-large';
    scoreTextFontColor?: 'stable' | 'dark' | 'text-color';
    scoreTextCase?: 'lowercase' | 'capitalize' | 'uppercase';
    scoreValueFontColor?: 'stable' | 'dark' | 'text-color';
    scoreUnitDisplay?: 'percentage' | 'points' | 'none';
    generatedScoreDisplay?: string;
    circleWidth?: number;
    countDownMode?: boolean;
    countDownStartValue?: number;
}
export interface IProgressSemiCircle {
    score?: number;
    scoreDisplay?: string;
    flipScoreDisplay?: boolean;
    scoreFontSize?: 'small' | 'medium' | 'large' | 'extra-large';
    scoreTextFontColor?: 'stable' | 'dark' | 'text-color';
    scoreTextCase?: 'lowercase' | 'capitalize' | 'uppercase';
    scoreValueFontColor?: 'stable' | 'dark' | 'text-color';
    scoreUnitDisplay?: 'percentage' | 'points' | 'none';
    semiCircleWidth?: number;
    generatedScoreDisplay?: string;
}
export interface IProgressCore {
    trailWidth: number;
}
export interface IProgressPercentColors {
    stable: {
        threshold: number;
        color: string;
    };
    danger: {
        threshold: number;
        color: string;
    };
    warning: {
        threshold: number;
        color: string;
    };
    success: {
        threshold: number;
        color: string;
    };
    dangerlight: {
        threshold: number;
        color: string;
    };
}
export interface IProgressUnitDisplay {
    percentage: string;
    points: Array<string>;
}
