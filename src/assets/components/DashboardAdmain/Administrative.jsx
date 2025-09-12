import React, { useState, useEffect } from 'react';
import Loading from '../../loading/loading.jsx';
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
    TextField,
} from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash,
    faExclamationCircle,
    faPlusCircle,
    faEdit,
    faCancel
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
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

function ActionRow({ label, isUser, uuid, onClick }) {
    return (
        <>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ color: '#333' }}>{label}</Typography>
                {isUser ? (
                    <Switch
                        onChange={() => onClick(uuid)}
                        // checked={1}
                        defaultChecked
                        sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': { color: '#345c6f' },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#345c6f' },
                        }}
                    />
                ) : (
                    <IconButton
                        onClick={() => onClick(uuid)}
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

    const [loading, setLoading] = useState(true);
    // useEffect(()=>{console.log(loading)},[loading])
    //add new admin
    const [addAdminModalOpen, setAddAdminModalOpen] = useState(false);
    const openAddAdminModal = () => setAddAdminModalOpen(true);
    const closeAddAdminModal = () => setAddAdminModalOpen(false);
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const submitAddAdmin = async () => {
        try {
            setLoading(true)
            await api.post('/api/registerAdmin', {name:"Admin", email: adminEmail, password: adminPassword });
            console.log('✅ Admin added!');
            closeAddAdminModal();
        } catch (error) {
            console.error('❌ Error adding admin:', error);
        }
        finally {
            setLoading(false)
        }
    };


    const [userdata, setUserdata] = useState([
        { email: "user@gmail.com" },
        { email: "user2@gmail.com" },
    ]);

    const [ads, setAds] = useState([
        { title: "Ad 1" },
        { title: "Ad 2" },
    ]);

    const [reports, setReports] = useState([
        { uuid: 1, description: "Spam content in Ad 1" },
        { uuid: 2, description: "Inappropriate language used in Ad 2" },
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
        setEditIsOpen(false)
        setModalIsOpen(false);
    };

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedAdToDelete, setSelectedAdToDelete] = useState(null);
    const [selectedUserToBlock, setSelectedUserToBlock] = useState(null);
    const [confirmationType, setConfirmationType] = useState('');
    const [editIsOpen, setEditIsOpen] = useState(false)
    const [modalContent, setModalContent] = useState("section")
    const [currentValue, setCurrentValue] = useState()
    const handleSubmit = async () => {
        try {
            setLoading(true)
         
                let res = await api.post('api/admin/storeCategory', { name: currentValue, title: "...", image: "" });
         
            setCurrentValue("")
            Swal.fire('Success', `Your data has been updated successfully!`, 'success');

            closeModal();
        } catch (err) {
            console.error('Error updating info:', err);
            Swal.fire('Error', `Failed to update your data!`, 'error');
        } finally {
            setLoading(false)
        }
    };
    const openModal = (name = 'section') => {
        setModalContent(name)
        setEditIsOpen(true)
    }
    //when confirm delete /block
    const handleDeleteAdClick = (ad) => {
        setSelectedAdToDelete(ad);
        setConfirmationType('ad');
        setConfirmOpen(true);
    };

    const handleBlockUserClick = (user) => {
        setSelectedUserToBlock(user);
        setConfirmationType('user');
        setConfirmOpen(true);
    };


    const confirmAdDelete = async () => {
        try {
            setLoading(true)
            console.log("delete ad")
            await api.post(`/api/admin/deleteAd/${selectedAdToDelete}`);
            console.log(selectedAdToDelete)
            setAds(prev => prev.filter(ad => ad.uuid !== selectedAdToDelete));
            Swal.fire({
                icon: 'success',
                title: 'delete ad ',
                text: 'Your ad has been successfully deleted.',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'delete Failed',
                text: error,
            });
            console.error("❌ Failed to delete ad:", error);
        } finally {
            setConfirmOpen(false);
            setSelectedAdToDelete(null);
            setLoading(false)
        }
    };
    const confirmBlockUser = async () => {
        try {
            setLoading(true)
            console.log("block user")
            await api.post(`api/admin/usersBlock/${selectedUserToBlock}`);
            // setUser(prev => prev.filter(user => user.uuid !== selectedUserToBlock));
            Swal.fire({
                icon: 'success',
                title: 'block user '
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'block Failed',
                text: error,
            });
            console.error("❌ Failed to block:", error);
        } finally {
            setConfirmOpen(false);
            setLoading(false)
            setSelectedAdToDelete(null);
        }
    };
    const cancelAdDelete = () => {
        setConfirmOpen(false);
        setSelectedAdToDelete(null);
        setSelectedUserToBlock(null)
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersRes = await api.get('/api/admin/listUsers');

                setUserdata(usersRes.data.data);
            } catch (err) {
                console.error('❌ Error fetching users:', err);
            }
            finally {
                setLoading(false)
            }
            try {
                const adsRes = await api.get('/api/advertisements');
                console.log(adsRes)
                setAds(adsRes.data.data);
            } catch (err) {
                console.error('❌ Error fetching ads:', err);
            }
            finally {
                setLoading(false)
            }
            try {
                const reportsRes = await api.get('/reports');
                setReports(reportsRes.data);
            } catch (err) {
                console.error('❌ Error fetching reports:', err);
            }
            finally {
                setLoading(false)
            }
        };

        fetchData();
    }, [selectedAdToDelete, selectedUserToBlock]);
    if (loading) return <Loading />;

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
                                onClick={openAddAdminModal}
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
                        <DividerSection label="Add section" icon={faPlusCircle} onClick={openModal} iconColor="#318934ff" />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                            <Typography variant="body1" sx={{ color: '#333' }}>Ad duration without payment</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>12 h</Typography>
                                <IconButton aria-label="edit duration" sx={{ color: '#345c6f' }} onClick={() => openModal('duration')}>
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
                        <ActionRow key={index} label={item.email} isUser uuid={item.uuid} onClick={handleBlockUserClick} />
                    ))}

                    {adsMode && ads.map((item, index) => (
                        <ActionRow key={index} label={item.title} isUser={false} uuid={item.uuid} onClick={handleDeleteAdClick} />
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
                isOpen={confirmOpen}
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
                    {confirmationType === 'ad'
                        ? 'Are you sure you want to delete this ad?'
                        : 'Are you sure you want to block this user?'}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
                    <Button
                        onClick={confirmationType === 'ad' ? confirmAdDelete : confirmBlockUser}
                        variant="contained"
                        color="error"
                    >
                        Confirm
                    </Button>
                    <Button
                        onClick={cancelAdDelete}
                        variant="outlined"
                        sx={{
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

            <Modal
                isOpen={addAdminModalOpen}
                onRequestClose={closeAddAdminModal}
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
                        Add New Admin
                    </Typography>

                    <TextField
                        type='email'
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button
                            onClick={submitAddAdmin}
                            variant="contained"
                            sx={{ backgroundColor: '#345c6f', textTransform: 'none' }}
                        >
                            Add Admin
                        </Button>
                        <Button
                            onClick={closeAddAdminModal}
                            variant="outlined"
                            sx={{
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
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
                        {modalContent === 'duration' ? 'Edit Ad Duration (hours)' : 'Add Section'}
                    </Typography>

                    <TextField
                        label={modalContent === 'duration' ? 'Duration in Hours' : 'Section Name'}
                        type={modalContent === 'duration' ? 'number' : 'text'}
                        variant="outlined"
                        fullWidth
                        value={currentValue}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (modalContent === 'duration') {

                                setCurrentValue(val.replace(/[^\d]/g, ''));
                            } else {
                                setCurrentValue(val);
                            }
                        }}
                        inputProps={modalContent === 'duration'
                            ? {
                                min: 1,
                                max: 999,
                                title: 'Please enter a valid duration in hours',
                            }
                            : {}}
                        required
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{ backgroundColor: '#345c6f', color: '#fff' }}
                        >
                            Save
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
