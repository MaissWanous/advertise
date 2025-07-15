import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Divider,
    Button, 
} from '@mui/material';


export default function PaySettings() {
    
    const paymentGateways = [
        {
            name: 'syriatel cash',
            startDate: '1/12/2022',
            endDate: '11/5/2025',
            price: '3000k'
        },
        {
            name: 'MTN cash',
            startDate: '1/6/2024',
            endDate: '9/2/2025',
            price: '1000k'
        }
    ];

    return (
        
        <Box sx={{
            flexGrow: 1, 
            p: 2, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start', 
            height: '100%', 
        }}>
        
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
                    Add a payment gateway +
                </Button>
            </Box>

          
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap', 
                gap: '20px', 
                justifyContent: 'flex-start',
                width: '100%',
            }}>
                {paymentGateways.map((gateway, index) => (
                    <Card key={index} sx={{
                        width: { xs: '100%', sm: 'calc(50% - 10px)', md: 'calc(33% - 13.33px)' }, 
                        minWidth: '280px', 
                        borderRadius: 2,
                        boxShadow: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1, 
                    }}>
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                            <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold',textAlign:'center', color: '#345c6f', textTransform: 'uppercase' }}>
                                {gateway.name}
                            </Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body1" sx={{ color: '#333' }}>
                                    start date
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600, color: '#333' }}>
                                    {gateway.startDate}
                                </Typography>
                            </Box>
                            <Divider sx={{ my: 1 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body1" sx={{ color: '#333' }}>
                                    End date
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600, color: '#333' }}>
                                    {gateway.endDate}
                                </Typography>
                            </Box>
                            <Divider sx={{ my: 1 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body1" sx={{ color: '#333' }}>
                                    price
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600, color: '#333' }}>
                                    {gateway.price}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};
