/// <reference types="socket.io-client" />
declare const GET = "get";
declare const POST = "post";
declare const PUT = "put";
declare const DELETE = "delete";
interface RestResponse {
    success: boolean;
}
declare type RequestTypes = typeof GET | typeof POST | typeof PUT | typeof DELETE;
export default class RestSocket {
    io: SocketIOClient.Socket;
    cbs: Record<string, (data: any) => void>;
    constructor(url: any, options?: {});
    on(msg: string, cb: (val: any) => void): void;
    get<GetResponse extends RestResponse>(url: string, params?: {}, query?: {}): Promise<GetResponse>;
    post<PostResponse extends RestResponse>(url: string, params?: {}, query?: {}): Promise<PostResponse>;
    put<PutResponse extends RestResponse>(url: string, params?: {}, query?: {}): Promise<PutResponse>;
    delete<DeleteResponse extends RestResponse>(url: any, params?: {}, query?: {}): Promise<DeleteResponse>;
    request<T extends RestResponse>(method: RequestTypes, url: string, params?: {}, query?: {}): Promise<T>;
}
export {};
