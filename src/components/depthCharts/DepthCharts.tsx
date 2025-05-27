
import React from 'react';
import './DepthCharts.css';
import { ISport } from '../../models/model'; 
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Chart } from '../chart/Chart';

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
            <Stack 
                className="Stack" 
                spacing={2} 
                direction="row"
                justifyContent="center" 
                alignItems="center"
                >
                    <Button onClick={() => setFilteredSportId(null)} variant={ !filteredSportId ? "contained" : "text"}>All</Button>
                    {sports.map((sport) =>
                        <Button onClick={() => setFilteredSportId(sport.id)} variant={filteredSportId === sport.id ? "contained" : "text"}>{sport.name}</Button>
                    )}
            </Stack>
            {sports.map((sport) => {
                    if (filteredSportId && sport.id !== filteredSportId) {
                        return null;
                    }
                    return <Chart 
                        key={sport.id} 
                        sport={sport} 
                        showEditForm={!!filteredSportId} 
                        onSave={(updatedSport) => {
                            setSports(prevSports => 
                                prevSports.map(s => s.id === updatedSport.id ? updatedSport : s)
                            );
                        }}
                        />;
            })}           
        </div>  
    )
}