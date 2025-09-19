export interface Transport {
    send(data: any): Promise<void>;
    receive(): Promise<any>;
}