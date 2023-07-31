
export type AnyOption = Record<string, any>;

export interface AlinodeOption {
    enable: boolean;
    appid: string;
    secret: string;
    hotStart?: boolean;
    packages?: string[];
    logdir?: string;
    error_log?: string[];
    disks?: string[];
    agentidMode?: string;
}

