import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Divider,
    Button,
    TextField,
} from '@mui/material';
import Modal from 'react-modal';
import api from '../../../api';


Modal.setAppElement('#root');

export default function PaySettings() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newGateway, setNewGateway] = useState({
        name: '',
        startDate: '',
        endDate: '',
        price: '',
    });

    const [paymentGateways, setPaymentGateways] = useState([
        {
            name: 'syriatel cash',
            startDate: '1/12/2022',
            endDate: '11/5/2025',
            price: '3000k',
        },
        {
            name: 'MTN cash',
            startDate: '1/6/2024',
            endDate: '9/2/2025',
            price: '1000k',
        },
    ]);


    const connectToAPI = async () => {
        console.log("add")
        try {
            const { data } = await api.post('/', newGateway);

            console.log('✅ Gateway added:', data);

            setPaymentGateways((prev) => [...prev, newGateway]);
            setNewGateway({ name: '', startDate: '', endDate: '', price: '' });
            setModalIsOpen(false);
        } catch (error) {
            console.error('❌ Error connecting to API:', error);
        } finally {
            setModalIsOpen(false)
        }
    };

    const handleAddGateway = () => {
        if (
            newGateway.name.trim() &&
            newGateway.startDate.trim() &&
            newGateway.endDate.trim() &&
            newGateway.price.trim()
        ) {
            connectToAPI();
        }
    };
    useEffect(() => {
        const fetchGateways = async () => {
            try {
                const response = await api.get('/payment-gateways');
                setPaymentGateways(response.data);
            } catch (error) {
                console.error('❌ Error fetching gateways:', error);
            }
        };

        fetchGateways();
    }, [paymentGateways]);

    return (
        <>
            <Box
                sx={{
                    flexGrow: 1,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    height: '100%',
                }}
            >
                <Box sx={{ mb: 3 }}>
                    <Button
                        variant="outlined"
                        onClick={() => setModalIsOpen(true)}
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

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '20px',
                        justifyContent: 'flex-start',
                        width: '100%',
                    }}
                >
                    {paymentGateways.map((gateway, index) => (
                        <Card
                            key={index}
                            sx={{
                                width: {
                                    xs: '100%',
                                    sm: 'calc(50% - 10px)',
                                    md: 'calc(33% - 13.33px)',
                                },
                                minWidth: '280px',
                                borderRadius: 2,
                                boxShadow: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                flexGrow: 1,
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{
                                        mb: 2,
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        color: '#345c6f',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    {gateway.name}
                                </Typography>
                                <Divider sx={{ my: 1 }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body1" sx={{ color: '#333' }}>
                                        Start date
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
                                        Price
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

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    content: {
                        maxHeight: '500px',
                        position: 'relative',
                        background: '#fff',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '30px',
                        maxWidth: '500px',
                        width: '90%',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        overflow: 'auto',
                        overflowX: 'hidden',
                    },
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
                        Add payment gateway
                    </Typography>

                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={newGateway.name}
                        onChange={(e) =>
                            setNewGateway({ ...newGateway, name: e.target.value })
                        }
                    />
                    <TextField
                        label="Start Date"
                        type="date"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={newGateway.startDate}
                        onChange={(e) =>
                            setNewGateway({ ...newGateway, startDate: e.target.value })
                        }
                    />
                    <TextField
                        label="End Date"
                        type="date"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={newGateway.endDate}
                        onChange={(e) =>
                            setNewGateway({ ...newGateway, endDate: e.target.value })
                        }
                    />
                    <TextField
                        label="Price"
                        variant="outlined"
                        fullWidth
                        value={newGateway.price}
                        onChange={(e) =>
                            setNewGateway({ ...newGateway, price: e.target.value })
                        }
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
                        <Button variant="contained" sx={{
                            backgroundColor: '#345c6f',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#2a4b5d',
                            },
                        }}
                            onClick={handleAddGateway}
                        >
                            Add
                        </Button>
                        <Button variant="outlined" onClick={() => setModalIsOpen(false)} sx={{
                            borderColor: '#e0e0e0',
                            color: '#333',
                            '&:hover': {
                                borderColor: '#bdbdbd',
                            },
                        }}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
