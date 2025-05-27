import { DepthChartSpot, DepthChartSpots } from "../models/model";

export function bumpSpot(spot: DepthChartSpot): DepthChartSpot | null {
    const i = DepthChartSpots.indexOf(spot);
    if (i < 0 || i === DepthChartSpots.length - 1) {
        return null;
    }
    return DepthChartSpots[i + 1];
    }