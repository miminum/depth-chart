
import React from 'react';
import './DepthChart.css';
import { ISport } from '../../models/model'; 

export interface IDepthChartsProps {
    sportsData: ISport[];
}

export function DepthCharts(props: IDepthChartsProps) {
    const [ sports, setSports ] = React.useState<ISport[]>([]);
    const [ filteredSportId, setFilteredSportId ] = React.useState<string | null>(null);
    
    React.useEffect(() => {
        setSports(props.sportsData);
    }, [props.sportsData]);

    return (
        <div className="depthChartsContainer">
            {sports.map((sport) =>
                <div>
                    {sport.name}
                </div>
            )}
        </div>
    )
}