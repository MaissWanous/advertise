import React, { useState, useEffect } from 'react';
import api from '../../../api/index.jsx';
import Modal from 'react-modal';
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
    faCancel
} from '@fortawesome/free-solid-svg-icons';

function DividerSection({ label, icon, onClick, iconColor = '#345c6f' }) {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                <Typography variant="body1" sx={{ color: '#333' }}>{label}</Typography>
                <IconButton onClick={onClick} sx={{ color: iconColor }}>
                    <FontAwesomeIcon icon={icon} />
                </IconButton>
            </Box>
            <Divider sx={{ my: 1 }} />
        </>
    );
}

function ActionRow({ label, isUser, id, onClick }) {
    return (
        <>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ color: '#333' }}>{label}</Typography>
                {isUser ? (
                    <Switch
                        defaultChecked
                        sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': { color: '#345c6f' },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#345c6f' },
                        }}
                    />
                ) : (
                    <IconButton
                        onClick={() => onClick(id)}
                        aria-label="delete"
                        sx={{ color: '#b90303ff' }}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </IconButton>
                )}
            </Box>
        </>
    );
}

export default function Adminstrative() {
    const [userdata, setUserdata] = useState([
        { email: "user@gmail.com" },
        { email: "user2@gmail.com" },
    ]);

    const [ads, setAds] = useState([
        { title: "Ad 1" },
        { title: "Ad 2" },
    ]);

    const [reports, setReports] = useState([
        { id: 1, description: "Spam content in Ad 1" },
        { id: 2, description: "Inappropriate language used in Ad 2" },
    ]);


    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [user, setUser] = useState(false);
    const [adsMode, setAdsMode] = useState(false);
    const [reportMode, setReportMode] = useState(false);

    const openModalUser = () => {
        setUser(true);
        setModalIsOpen(true);
    };
    const openModalAds = () => {
        setAdsMode(true);
        setModalIsOpen(true);
    };
    const openModalReport = () => {
        setReportMode(true);
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setUser(false);
        setAdsMode(false);
        setReportMode(false);
        setModalIsOpen(false);
    };
    // ضمن useState
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [selectedAdToDelete, setSelectedAdToDelete] = useState(null);

    // عند الضغط على زر حذف الإعلان داخل ActionRow
    const handleDeleteAdClick = (ad) => {
        setSelectedAdToDelete(ad);
        setConfirmDeleteOpen(true);
    };

    const confirmAdDelete = async () => {
        try {
            await api.delete(`/ads/${selectedAdToDelete.id}`); // تأكد أن لكل إعلان موجود id
            setAds(prev => prev.filter(ad => ad.id !== selectedAdToDelete.id));
        } catch (error) {
            console.error("❌ Failed to delete ad:", error);
        } finally {
            setConfirmDeleteOpen(false);
            setSelectedAdToDelete(null);
        }
    };

    const cancelAdDelete = () => {
        setConfirmDeleteOpen(false);
        setSelectedAdToDelete(null);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersRes = await api.get('/users');
                setUserdata(usersRes.data);
            } catch (err) {
                console.error('❌ Error fetching users:', err);
            }

            try {
                const adsRes = await api.get('/ads');
                setAds(adsRes.data);
            } catch (err) {
                console.error('❌ Error fetching ads:', err);
            }

            try {
                const reportsRes = await api.get('/reports');
                setReports(reportsRes.data);
            } catch (err) {
                console.error('❌ Error fetching reports:', err);
            }
        };

        fetchData();
    }, []);

    return (
        <>
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

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, pb: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', borderBottom: '1px solid #eee' }}>
                                Name
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', borderBottom: '1px solid #eee' }}>
                                Action
                            </Typography>
                        </Box>

                        <DividerSection label="Block users" icon={faCancel} onClick={openModalUser} />
                        <DividerSection label="Delete ad" icon={faTrash} onClick={openModalAds} iconColor="#b90303ff" />
                        <DividerSection label="Review Reports" icon={faExclamationCircle} onClick={openModalReport} iconColor="#ffc107" />
                        <DividerSection label="Add section" icon={faPlusCircle} iconColor="#318934ff" />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                            <Typography variant="body1" sx={{ color: '#333' }}>Ad duration without payment</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>12 h</Typography>
                                <IconButton aria-label="edit duration" sx={{ color: '#345c6f' }}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </IconButton>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    content: {
                        maxHeight: "500px",
                        position: 'relative',
                        background: '#fff',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '30px',
                        maxWidth: '500px',
                        width: '90%',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        overflowY: "auto"
                    }
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
                        {user ? "Block user" : adsMode ? "Delete Ad" : "Review Reports"}
                    </Typography>

                    {user && userdata.map((item, index) => (
                        <ActionRow key={index} label={item.email} isUser id={1} />
                    ))}

                    {adsMode && ads.map((item, index) => (
                        <ActionRow key={index} label={item.title} isUser={false} id={1} onClick={handleDeleteAdClick} />
                    ))}

                    {reportMode && reports.map((report, index) => (
                        <Box key={index} sx={{ border: '1px solid #eee', borderRadius: 2, p: 2 }}>
                            <Typography variant="body1" sx={{ color: '#555' }}>
                                {report.description}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Modal>
            <Modal
                isOpen={confirmDeleteOpen}
                onRequestClose={cancelAdDelete}
                style={{
                    overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
                    content: {
                        backgroundColor: '#fff',
                        padding: '24px',
                        width: '100%',
                        maxWidth: '420px',
                        margin: 'auto',
                        borderRadius: '12px',
                        height: '200px',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    },
                }}
            >
                <Typography variant="h6" sx={{ color: '#333', mb: 3, textAlign: 'center' }}>
                    Are you sure you want to delete this ad?
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button
                        onClick={confirmAdDelete}
                        variant="contained"
                        color="error"
                       
                    >
                        Confirm
                    </Button>
                    <Button
                        onClick={cancelAdDelete}
                        variant="outlined"
                        color="primary"
                        sx={{
                            ml: 1,
                            borderColor: '#e0e0e0',
                            color: '#333',
                            '&:hover': {
                                borderColor: '#bdbdbd',
                            },
                        }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Modal>


        </>
    );
}
