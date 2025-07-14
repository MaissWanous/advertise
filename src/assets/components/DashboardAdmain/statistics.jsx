import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Divider,
} from '@mui/material';

export default function Statistics () {
  
    return (
        <Card sx={{
            maxWidth: 350, 
            width: '100%', // Full width on smaller screens
            m: 2, // Margin around the card
            borderRadius: 2, // Rounded corners
            boxShadow: 3, // Shadow effect
            display: 'flex',
            flexDirection: 'column',
        }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', fontSize: '0.9rem' }}>
                    <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>Viewer:</Typography>
                    <Typography variant="body2" sx={{ textAlign: 'right' }}>N/A</Typography> {/* استخدم N/A مؤقتاً */}
                    <Divider sx={{ mx: 2 }} />
                    <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>Number Ads:</Typography>
                    <Typography variant="body2" sx={{ textAlign: 'right' }}>N/A</Typography>
                    <Divider sx={{ mx: 2 }} />
                    <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>Most populer:</Typography>
                    <Typography variant="body2" sx={{ textAlign: 'right' }}>N/A</Typography>
                    <Divider sx={{ mx: 2 }} />
                    <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>More active section:</Typography>
                    <Typography variant="body2" sx={{ textAlign: 'right' }}>N/A</Typography>
                    <Divider sx={{ mx: 2 }} />
                    <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>Resturant section:</Typography>
                    <Typography variant="body2" sx={{ textAlign: 'right' }}>N/A</Typography>

                </Box>
            </CardContent>
        </Card>
    );
};
