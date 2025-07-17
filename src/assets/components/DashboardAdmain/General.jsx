import React, { useState } from 'react';
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
    TextField,
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
    const [editIsOpen, seteditsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const openModal = (content) => {
        setModalContent(content);
        seteditsOpen(true);
    };

    const closeModal = () => {
        seteditsOpen(false);
        setModalContent('');
    };

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
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 2,
                            pb: 1,
                           
                        }}>
                            <Typography variant="h6" sx={{ borderBottom: '1px solid #eee', fontWeight: 'bold', color: '#333' }}>
                                Name
                            </Typography>
                            <Typography variant="h6" sx={{  borderBottom: '1px solid #eee',fontWeight: 'bold', color: '#333' }}>
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
                                Website name
                            </Typography>
                            <IconButton onClick={() => openModal(' Website name')} aria-label="edit postly" sx={{ color: '#345c6f' }}>
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
                            <IconButton aria-label="add logo" sx={{ color: '#318934ff' }}>
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
                                <IconButton onClick={() => openModal('description')} aria-label="edit description" sx={{ color: '#345c6f' }}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </IconButton>
                            {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton aria-label="add description" sx={{ color: '#318934ff' }}>
                                    <FontAwesomeIcon icon={faPlusCircle} />
                                </IconButton>
                            </Box> */}
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
                            <IconButton onClick={() => openModal('contact')}  aria-label="contact info" sx={{ color: '#33ac37ff' }}>
                                <FontAwesomeIcon icon={faPhone} />
                            </IconButton>
                        </Box>
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
                        top: 'auto',
                        left: 'auto',
                        right: 'auto',
                        bottom: 'auto',
                        background: '#fff',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '30px',
                        maxWidth: '500px',
                        width: '90%',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        outline: 'none',
                    }
                }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                }}>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
                        Edit {modalContent.charAt(0).toUpperCase() + modalContent.slice(1)}
                    </Typography>
                    {modalContent=="contact"?
                         <TextField
                        label="Contact"
                        variant="outlined"
                        fullWidth
                        type='number'
                        name="Contact"
                        placeholder="Contact"
                        sx={{ mb: 2 }}
                    />:
                    <TextField
                        label={modalContent=="description"?"Description":"Name"}
                        variant="outlined"
                        fullWidth
                        
                        name={modalContent=="description"?"Description":"Name"}
                        placeholder={modalContent=="description"?"Description":"Name"}
                        sx={{ mb: 2 }}
                    />
                    }

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
                        <Button variant="contained" sx={{
                            backgroundColor: '#345c6f',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#2a4b5d',
                            },
                        }}>
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
};
