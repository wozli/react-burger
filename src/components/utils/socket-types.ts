export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export type TStatusOrder = 'done' | 'created' | 'pending';

export type TLiveFeedOrder = {
    ingredients: string[],
    _id: string,
    status: TStatusOrder,
    number: number,
    name: string,
    createdAt: string,
    updatedAt: string,
}

export type TLiveFeed = {
    success: boolean,
    orders: TLiveFeedOrder[],
    total: number,
    totalToday: number,
}

export type TLiveFeedStore = {
    status: WebsocketStatus;
    connectionError: string;
    feed: TLiveFeed | null;
}