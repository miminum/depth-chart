import React from 'react';
import './Chart.css';
import { ISport, IDepthChartEntry, DepthChartSpot, DepthChartSpots } from '../../models/model';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { bumpSpot } from '../../utils/hepler';


export interface IChartProps {
    sport: ISport;
    onSave?: (updatedSport: ISport) => void;
    showEditForm?: boolean;
}

export function Chart(props: IChartProps) {
    const [currentSport, setCurrentSport] = React.useState<ISport>(props.sport);
    const [selectedPosition, setSelectedPosition] = React.useState<string >("");
    const [selectedSpot, setSelectedSpot] = React.useState<string >("");
    const [playersName, setPlayersName] = React.useState<string >("");

    React.useEffect(() => {
        setCurrentSport(props.sport);
    }, [props.sport]);

    const onHandleSavePlayer = () => {
        if (!selectedPosition || !playersName) return;
    
        const position = currentSport.positions.find(p => p.name === selectedPosition);
        if (!position) return;
    
        const entries: IDepthChartEntry[] = [...(position.depthChartEntries || [])];
    
        const landingSpot: DepthChartSpot =
          (selectedSpot as DepthChartSpot) ||
          ([...DepthChartSpots]
            .reverse()
            .find(s => !entries.some(e => e.spot === s)) ??
           DepthChartSpots[DepthChartSpots.length - 1]);
    
        function cascadeBump(spot: DepthChartSpot) {
            const i = entries.findIndex(e => e.spot === spot);
            if (i < 0) return;               
            const bumped = entries.splice(i, 1)[0];
            const next = bumpSpot(spot);
            if (!next) {

                return;
            }

            cascadeBump(next);

            bumped.spot = next;
            entries.push(bumped);
        }

        if (entries.some(e => e.spot === landingSpot)) {
          cascadeBump(landingSpot);
        }
    
        entries.push({
          spot: landingSpot,
          player: { name: playersName },
        });
    
        position.depthChartEntries = entries;
    
        setCurrentSport({ ...currentSport });
        setSelectedPosition("");
        setSelectedSpot("");
        setPlayersName("");
    
        props.onSave?.(currentSport);
    };
    
    const handleDeletePlayer = (positionName: string, spot: DepthChartSpot) => {
        const position = currentSport.positions.find(p => p.name === positionName);
        if (!position) return;

        const entries = position.depthChartEntries || [];
        const index = entries.findIndex(e => e.spot === spot);
        if (index >= 0) {
            entries.splice(index, 1);
            position.depthChartEntries = entries;
            setCurrentSport({ ...currentSport });
            props.onSave?.(currentSport);
        }
    };

    return (
        <div className="chartContainer">
            <h2>{currentSport.name}</h2>
            <Box
                sx={{ minWidth: 120 }}
                display={props.showEditForm ? 'block' : 'none'}
            >   
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <TextField label="Name" variant="standard" value={playersName || ''} onChange={event => {
                        const value = event.target.value;
                        setPlayersName(value as string);
                    }}/>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="position-simple-select-label">Position</InputLabel>
                    <Select   
                        label="Position"
                        labelId="position-simple-select-label"
                        id="position-simple-select"
                        value={selectedPosition || ''}
                        onChange={(event: SelectChangeEvent) => {
                            const value = event.target.value;
                            setSelectedPosition(value as string);
                        }}
                    >
                        {currentSport.positions.map((position) => (
                            <MenuItem key={position.name} value={position.name}>
                                {position.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="position-simple-select-label">Depth</InputLabel>
                    <Select   
                        label="Depth"
                        value={selectedSpot || ''}
                        onChange={(event: SelectChangeEvent) => {
                            const value = event.target.value;
                            setSelectedSpot(value as string);
                        }}
                    >
                        {DepthChartSpots.map((spot) => (
                            <MenuItem key={spot} value={spot}>
                                {spot}
                            </MenuItem>
                        ))}
                    </Select>
                
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <Button onClick={onHandleSavePlayer} variant="contained" disabled={!(!!selectedPosition && !!playersName)} >Save Player</Button>
                </FormControl>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, maxWidth: 1200 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>P</TableCell>
                            {DepthChartSpots.map((spot) => (
                                <TableCell key={spot} align="left">{spot}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {currentSport.positions.map((position) => (
                                <TableRow key={position.name}>
                                    <TableCell component="th" scope="row">
                                        {position.name}
                                    </TableCell>
                                    {DepthChartSpots.map((spot) => {
                                        const entry = position.depthChartEntries?.find(e => e.spot === spot);
                                        return (
                                        <TableCell key={spot} align="left">
                                            {entry?.player.name ?? "–"}
                                            {!!props.showEditForm && !!entry?.player.name && <IconButton aria-label="delete" size="small" onClick={() => {
                                                handleDeletePlayer(position.name, spot);
                                            }}>
                                                <DeleteIcon fontSize="inherit" />
                                            </IconButton>}
                                        </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

