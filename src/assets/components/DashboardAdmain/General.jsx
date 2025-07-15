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
    faEdit,
    faPhone
} from '@fortawesome/free-solid-svg-icons';


export default function General() {
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



                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 2,
                        pb: 1,
                    }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', borderBottom: '1px solid #eee', }}>
                            Name
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', borderBottom: '1px solid #eee', }}>
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
                            postly
                        </Typography>
                        <IconButton aria-label="edit duration" sx={{ color: '#345c6f' }}>
                            <FontAwesomeIcon icon={faEdit} />
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
                            add logo
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
                            description to my website
                        </Typography>
                        <p>
                            <IconButton aria-label="add section" sx={{ color: '#318934ff' }}>
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </IconButton>
                            <IconButton aria-label="edit duration" sx={{ color: '#345c6f' }}>
                                <FontAwesomeIcon icon={faEdit} />
                            </IconButton>

                        </p>
                    </Box>
                    <Divider sx={{ my: 1 }} />


                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1,
                    }}>
                        <Typography variant="body1" sx={{ color: '#333' }}>
                            contact information
                        </Typography>
                        <IconButton aria-label="add section" sx={{ color: '#33ac37ff' }}>
                            <FontAwesomeIcon icon={faPhone} />
                        </IconButton>
                    </Box>
                  
                </CardContent>
            </Card>
        </Box>
    );
};
