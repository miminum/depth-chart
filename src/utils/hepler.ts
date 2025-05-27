import { DepthChartSpot, DepthChartSpots } from "../models/model";

// Returns the next DepthChartSpot in the sequence, or null if there is no next spot.
export function bumpSpot(spot: DepthChartSpot): DepthChartSpot | null {
    const i = DepthChartSpots.indexOf(spot);
    if (i < 0 || i === DepthChartSpots.length - 1) {
        return null;
    }
    return DepthChartSpots[i + 1];
}