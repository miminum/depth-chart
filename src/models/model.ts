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
    spot: DepthChartSpot;
    player: IPlayer;
}

export const DepthChartSpots = [
    "Starter",
    "Second",
    "Third",
    "Fourth",
  ] as const;
  
export type DepthChartSpot = typeof DepthChartSpots[number];

