import React, { useState, useEffect } from 'react';
import api from '../../../api/index.jsx';
 import Swal from 'sweetalert2';
import Modal from 'react-modal';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Divider,
    IconButton,
    Button,
    TextField,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEdit,
    faPlusCircle,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import Loading from '../../loading/loading.jsx';

export default function General() {
    const [loading, setLoading] = useState(true);
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentValue, setCurrentValue] = useState('');
    const [info, setInfo] = useState({
        name: 'postly',
        logo: '',
        description: 'Our platform connects buyers and sellers, offering a wide range of advertising opportunities. We aim to empower individuals and businesses to reach their target audience effectively',
        contact: '092345678',
    });

    const handleEditSubmit = async () => {
        try {
            setLoading(true)
            const payload = modalContent === 'logo' && selectedImage
                ? { [modalContent]: selectedImage }
                : { [modalContent]: currentValue };

            const config = modalContent === 'logo'
                ? { headers: { 'Content-Type': 'multipart/form-data' } }
                : {};

            const endpoint = `/api/general-info/${modalContent}`;

            await api.put(endpoint, payload, config);

            setInfo(prev => ({ ...prev, [modalContent]: payload[modalContent] }));
             Swal.fire('Success', `Your ${modalContent} has been updated successfully!`, 'success');

            closeModal();
        } catch (err) {
            console.error('Error updating info:', err);
             Swal.fire('Error', `Failed to update your ${modalContent}!`, 'error');
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const res = await api.get('/api/general-info');
                const data = res.data;

                setInfo({
                    name: data.name || 'postly',
                    logo: data.logo || '',
                    description: data.description || 'Our platform connects buyers and sellers, offering a wide range of advertising opportunities. We aim to empower individuals and businesses to reach their target audience effectively',
                    contact: data.contact || 'kk',
                });
            } catch (err) {
                setInfo({
                    name: 'postly',
                    logo: '',
                    description: 'Our platform connects buyers and sellers, offering a wide range of advertising opportunities. We aim to empower individuals and businesses to reach their target audience effectively',
                    contact: '092345678',
                });
                console.error('Error fetching general info:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchInfo();
    }, []);

    const openModal = (content) => {
        setModalContent(content);
        setEditIsOpen(true);
        setSelectedImage(null);
        setCurrentValue(info[content] || '');
    };

    const closeModal = () => {
        setEditIsOpen(false);
        setModalContent('');
        setSelectedImage(null);
    };

    const renderRow = (label, icon, onClick, value = '', color = '#345c6f') => (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                <Box>
                    <Typography variant="body1" sx={{ color: '#333' }}>{label}</Typography>
                    <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>{value || 'N/A'}</Typography>
                </Box>
                <IconButton onClick={onClick} sx={{ color }}>
                    <FontAwesomeIcon icon={icon} />
                </IconButton>
            </Box>
            <Divider sx={{ my: 1 }} />
        </>
    );

    if (loading) return <Loading />;

    return (
        <>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100%' }}>
                <Card sx={{ width: '100%', maxWidth: 600, borderRadius: 2, boxShadow: 3 }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, pb: 1 }}>
                            <Typography variant="h6" sx={{ borderBottom: '1px solid #eee', fontWeight: 'bold' }}>
                                Item
                            </Typography>
                            <Typography variant="h6" sx={{ borderBottom: '1px solid #eee', fontWeight: 'bold' }}>
                                Action
                            </Typography>
                        </Box>

                        {renderRow('Website name', faEdit, () => openModal('name'), info.name)}
                        {renderRow('Add logo', faPlusCircle, () => openModal('logo'), "logo", "#318934ff")}
                        {renderRow('Description to my website', faEdit, () => openModal('description'), info.description)}
                        {renderRow('Contact information', faPhone, () => openModal('contact'), info.contact, "#369f3aff")}
                    </CardContent>
                </Card>
            </Box>

            <Modal
                isOpen={editIsOpen}
                onRequestClose={closeModal}
                contentLabel={`Edit ${modalContent}`}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    content: {
                        position: 'relative',
                        background: '#fff',
                        borderRadius: '12px',
                        padding: '30px',
                        maxWidth: '500px',
                        width: '90%',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        outline: 'none',
                    },
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
                        Edit {modalContent.charAt(0).toUpperCase() + modalContent.slice(1)}
                    </Typography>

                    {modalContent === 'logo' ? (
                        <Box>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setSelectedImage(e.target.files[0])}
                            />
                            {selectedImage && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle1">Preview:</Typography>
                                    <img
                                        src={URL.createObjectURL(selectedImage)}
                                        alt="Preview"
                                        style={{
                                            width: '100%',
                                            maxHeight: '200px',
                                            objectFit: 'contain',
                                            borderRadius: '8px',
                                        }}
                                    />
                                </Box>
                            )}
                        </Box>
                    ) : (
                        <TextField
                            label={
                                modalContent === 'contact'
                                    ? 'Contact'
                                    : modalContent === 'description'
                                        ? 'Description'
                                        : 'Name'
                            }
                            variant="outlined"
                            fullWidth
                            value={currentValue}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (modalContent === 'contact') {
                                    setCurrentValue(val.replace(/[^\d+]/g, ''));
                                } else {
                                    setCurrentValue(val);
                                }
                            }}
                            type={modalContent === 'contact' ? 'tel' : 'text'}
                            inputProps={modalContent === 'contact'
                                ? {
                                    pattern: '^\\+?\\d{9,10}$',
                                    maxLength: 15,
                                    title: 'Please enter a valid phone number',
                                }
                                : {}}
                            required={modalContent === 'contact'}
                        />



                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button
                            variant="contained"
                            onClick={handleEditSubmit}
                            sx={{ backgroundColor: '#345c6f', color: '#fff' }}
                        >
                            Edit
                        </Button>

                        <Button variant="outlined" onClick={closeModal} sx={{
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
