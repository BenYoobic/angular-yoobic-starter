export interface IConfigService {
    servers: Array<any>;
    serverUrl: string;
    serverName: string;
    apiUrl: string;
    publicApiUrl: string;
    uploadUrl: string;
    uploadProxyUrl: string;
    zapierInstagramUrl: string;
    isTestpen: boolean;
    isSandbox: boolean;
    isE2E: boolean;
    isProduction: boolean;
    isDemo: boolean;
    getCurrentConfig(): any;
}
