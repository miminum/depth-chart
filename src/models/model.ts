export interface ISport {
    id: string;
    name: string;
    positions: IPosition[];
}

export interface IPlayer {
    name: string;
}

export interface IPosition {
    name: string;
    depthChartEntries?: IDepthChartEntry[];
}

export interface IDepthChartEntry {
    spot: IDepthChartSpots;
    player: IPlayer;
}

export enum IDepthChartSpots {
    Starter = 1,
    Second = 2,
    Third = 3,
    Fourth = 4,
    NotSelected = 5
}