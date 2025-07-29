import React, { useState } from 'react';
import api from '../../../api/index.jsx';
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

export default function General() {
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (content) => {
        setModalContent(content);
        setEditIsOpen(true);
    };

    const closeModal = () => {
        setEditIsOpen(false);
        setModalContent('');
    };

    const renderRow = (label, icon, onClick, color = '#345c6f') => (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                <Typography variant="body1" sx={{ color: '#333' }}>
                    {label}
                </Typography>
                <IconButton onClick={onClick} sx={{ color: color }}>
                    <FontAwesomeIcon icon={icon} />
                </IconButton>
            </Box>
            <Divider sx={{ my: 1 }} />
        </>
    );

    return (
        <>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100%' }}>
                <Card sx={{ width: '100%', maxWidth: 600, borderRadius: 2, boxShadow: 3 }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, pb: 1 }}>
                            <Typography variant="h6" sx={{ borderBottom: '1px solid #eee', fontWeight: 'bold', color: '#333' }}>
                                Name
                            </Typography>
                            <Typography variant="h6" sx={{ borderBottom: '1px solid #eee', fontWeight: 'bold', color: '#333' }}>
                                Action
                            </Typography>
                        </Box>

                        {renderRow('Website name', faEdit, () => openModal('Website name'))}
                        {renderRow('Add logo', faPlusCircle, () => openModal('logo'), "#318934ff")}
                        {renderRow('Description to my website', faEdit, () => openModal('description'))}
                        {renderRow('Contact information', faPhone, () => openModal('contact'), "#369f3aff")}
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
                            type={modalContent === 'contact' ? 'tel' : 'text'}
                            name={modalContent}
                            placeholder={modalContent}
                             onInput={modalContent === 'contact'?(e) => {
                                e.target.value = e.target.value.replace(/[^\d+]/g, '');
                            }:{}}
                            inputProps={
                                modalContent === 'contact'
                                    ? {
                                        pattern: '^\\+?\\d{9,10}$', 
                                        maxLength: 15,
                                        title: 'Please enter a valid phone number',
                                    }
                                    : {}
                            }
                            required={modalContent === 'contact'}
                        />

                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button variant="contained" sx={{ backgroundColor: '#345c6f', color: '#fff' }}>
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
