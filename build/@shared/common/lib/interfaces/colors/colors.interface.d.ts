export declare class Colors {
    private static _isDarkTheme;
    private static _isBigFonts;
    static success: any;
    static danger: any;
    static warning: any;
    static black: any;
    static light: any;
    static stable: any;
    static hexToRgb(hex: string, opacity?: number): string;
    static getKeys(): string[];
    static getCssColor(color: string, defaultValue?: string): any;
    static lightenDarkenColor(color: string, amount: number): string;
    static toggleDarkTheme(): void;
    static isDarkTheme(): boolean;
    static setDarkTheme(enabled: any): void;
    static toggleBigFonts(): void;
    static isBigFonts(): boolean;
    static setBigFonts(enabled: any): void;
}
