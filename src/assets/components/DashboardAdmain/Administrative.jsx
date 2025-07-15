import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Divider,
    Switch, 
    IconButton,
    Button,
} from '@mui/material';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash, 
    faExclamationCircle, 
    faPlusCircle, 
    faEdit 
} from '@fortawesome/free-solid-svg-icons';


export default function Adminstrative() {
    return (
        <Box sx={{
            flexGrow: 1,
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: '100%',
        }}>
            <Card sx={{
                width: '100%',
                maxWidth: 600,
                borderRadius: 2,
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
           
                    <Box sx={{ mb: 3 }}>
                        <Button
                            variant="outlined"
                            sx={{
                                borderColor: '#345c6f',
                                color: '#345c6f',
                                textTransform: 'none',
                                fontWeight: 'normal',
                                '&:hover': {
                                    borderColor: '#4c6f7fff',
                                },
                            }}
                        >
                            Add other admin +
                        </Button>
                    </Box>

                   
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 2,
                        pb: 1,
                    }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333',borderBottom: '1px solid #eee', }}>
                            Name
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333',borderBottom: '1px solid #eee', }}>
                            Action
                        </Typography>
                    </Box>

               
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1,
                    }}>
                        <Typography variant="body1" sx={{ color: '#333' }}>
                            block user
                        </Typography>
                        <Switch defaultChecked sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#345c6f',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#345c6f',
                            },
                        }} />
                    </Box>
                    <Divider sx={{ my: 1 }} />

                
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1,
                    }}>
                        <Typography variant="body1" sx={{ color: '#333' }}>
                            delete ad
                        </Typography>
                        <IconButton aria-label="delete" sx={{ color: '#b90303ff' }}>
                            <FontAwesomeIcon icon={faTrash} /> 
                        </IconButton>
                    </Box>
                    <Divider sx={{ my: 1 }} />

                   
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1,
                    }}>
                        <Typography variant="body1" sx={{ color: '#333' }}>
                            Review Reports
                        </Typography>
                        <IconButton aria-label="report" sx={{ color: '#ffc107' }}>
                            <FontAwesomeIcon icon={faExclamationCircle} /> 
                        </IconButton>
                    </Box>
                    <Divider sx={{ my: 1 }} />

                 
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1,
                    }}>
                        <Typography variant="body1" sx={{ color: '#333' }}>
                            Add section
                        </Typography>
                        <IconButton aria-label="add section" sx={{ color: '#318934ff' }}>
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </IconButton>
                    </Box>
                    <Divider sx={{ my: 1 }} />

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1,
                    }}>
                        <Typography variant="body1" sx={{ color: '#333' }}>
                            ad duration without payment
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>
                                12 h
                            </Typography>
                            <IconButton aria-label="edit duration" sx={{ color: '#345c6f' }}>
                                <FontAwesomeIcon icon={faEdit} /> 
                            </IconButton>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};
