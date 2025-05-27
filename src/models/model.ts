export interface ISport {
    id: string;
    name: string;
    positions: string[];
}

export interface IPlayer {
    name: string;
    positions: string;
}

export interface IDepthChart {
    sport: ISport;
    team?: string; // Can be implemented in the future
    position: {
        name: string;
        depth: IDepthChartEntry[]
    }
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