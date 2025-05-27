import { ISport,IPosition } from '../models/model'

const sports = [
    {
        id: "1",
        name: "NFL",
        positions: ["QB", "WR", "RB", "TE", "K", "P", "KR", "PR"]
    },
    {
        id: "2",
        name: "Soccer",
        positions: ["GK", "RB", "LB", "CDM", "CAM", "RW", "LW", "SS", "ST"]
    }
];

const mapToIPositions = (position: string): IPosition => ({ name: position });

export const sportsData: ISport[] = sports.map(sport => ({
    ...sport,
    positions: sport.positions.map(mapToIPositions)
}))