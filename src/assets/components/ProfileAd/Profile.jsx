// src/components/Profile.jsx
import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import api from '../../../api/index.jsx';
import {
  Box,
  Grid,
  Avatar,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
  TextField,
  Typography,
  Input,
  Stack,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Modal,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { MdAdd, MdEdit, MdGroup, MdSave, MdCalendarToday, MdSearch, MdNotifications, MdFavorite, MdFavoriteBorder, MdBookmark, MdBookmarkBorder, MdComment, MdDelete, MdPhone, MdReply } from 'react-icons/md';

import "./Profile.css";
import profileImg from "./image/profileImg.jpg";
import im1 from "./image/im1.jpg";
import Navbar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Swal from "sweetalert2";
import Loading from "../../loading/loading.jsx"; // مكون التحميل

let nextCommentId = 1;

export default function Profile() {
  const navigate = useNavigate();

  const [deletingAdId, setDeletingAdId] = useState(null);
  const [displayName, setDisplayName] = useState("Advertiser");
  const [editingName, setEditingName] = useState(false);
  const nameRef = useRef();
  const profilePickerRef = useRef();
  const adPickerRefs = useRef({});
  const videoPickerRefs = useRef({});


  const [imageProfile, setImageProfile] = useState(profileImg)

  // Ad Search
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  // Ad Data
  const fallback = [
    {
      uuid: 1,
      title: "Mathematics Course",
      description: "...",
      image_url: im1,
      phone: "123 456 7890",
      rating: 5,
      isLiked: false,
      isBookmarked: false,
      comments: [],
      category_name: ""
    },
  ]
  const [ads, setAds] = useState([
    {
      uuid: 1,
      title: "Mathematics Course",
      description: "...",
      image_url: im1,
      phone: "123 456 7890",
      rating: 5,
      isLiked: false,
      isBookmarked: false,
      comments: [],
    },
  ]);

  const [loading, setLoading] = useState(true); // حالة التحميل

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/myAds');
        const serverData = response.data.data;
        serverData.forEach(e => {
          e.userName = "user name"
          e.phone = "123-456-7890"
        });
        console.log(serverData)
        if (serverData && Array.isArray(serverData) && serverData.length > 0) {
          setAds(serverData);
        } else {
          setAds(fallback);
        }
      } catch (error) {
        console.error(' Error fetching data:', error);
        setAds(fallback);
      } finally {
        setLoading(false); // إيقاف التحميل بعد الجلب
      }
    };

    fetchData();
  }, []);

  //commenting
  const [activeCommentAdId, setActiveCommentAdId] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [commentText, setCommentText] = useState("");
  let nextCommentId = useRef(1);

  // Modals
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  // Profile actions
  const saveName = () => {
    const value = nameRef.current.value.trim();
    if (value) setDisplayName(value);
    setEditingName(false);
  };
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageProfile(url);
    }
  };

  const handleOpenFilePicker = (adId) => {
    adPickerRefs.current[adId].click();
  };
  const handleAdPicChange = (adId, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setAds(prev =>
      prev.map(ad =>
        ad.uuid === adId
          ? { ...ad, image_url: imageUrl, imageFile: file } // نخزن الملف
          : ad
      )
    );
  };

  // Toolbar actions
  const toggleSearchBar = () => setShowSearch(prev => !prev);
  const filteredAds = query.trim()
    ? ads.filter(ad =>
      ad.title.toLowerCase().includes(query.toLowerCase())
    )
    : ads;
  const goNewAd = () => navigate("/new-ad");

  // Ad actions
  const toggleLike = (id) => {
    setAds(prevAds =>
      prevAds.map(ad =>
        ad.uuid === id ? { ...ad, isLiked: !ad.isLiked } : ad
      )
    );
  };

  const toggleBookmark = async (id) => {
    setAds(prevAds =>
      prevAds.map(ad =>
        ad.uuid === id ? { ...ad, isBookmarked: !ad.isBookmarked } : ad
      )
    );
    await api.post(`/api/AddFavorite/${id}`);
  };

  // Edit Modal
  const [editingAdId, setEditingAdId] = useState(null);
  const openEditModal = (ad) => {
    setEditingAdId(ad.uuid);
    setEditTitle(ad.title);
    setEditDesc(ad.description);
    setShowEditModal(true);
  };

  const closeEditModal = () => setShowEditModal(false);
  const handleEditSave = async () => {
    const updatedAd = ads.find(ad => ad.uuid === editingAdId);
    if (!updatedAd) {
      console.error("Ad not found");
      return;
    }

    console.log(" Updated Ad:", updatedAd);

    // تحديث الحالة محلياً
    setAds(prev =>
      prev.map(ad =>
        ad.uuid === editingAdId ? { ...ad, ...updatedAd } : ad
      )
    );

    try {
      const formData = new FormData();
      formData.append("title", updatedAd.title);
      formData.append("description", updatedAd.description);
      formData.append("category_name", updatedAd.category_name);
      formData.append("price", updatedAd.price ?? 0);

      if (updatedAd.imageFile) {
        formData.append("images", updatedAd.imageFile);
      }
      if (updatedAd.videoFile) {
        formData.append("video_path", updatedAd.videoFile);
      }

      const res = await api.post(
        `/api/updateAd/${updatedAd.uuid}`,
        formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      );

      console.log(" Update Response:", res.data);

      Swal.fire({
        icon: "success",
        title: "Ad Updated",
        text: "Your ad has been successfully updated."
      });
    } catch (error) {
      console.error(" Failed to update ad:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || "Something went wrong. Please try again."
      });
    } finally {
      closeEditModal();
    }
  };
  const handleAdVideoChange = (adId, e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAds(prev =>
      prev.map(ad =>
        ad.uuid === adId
          ? { ...ad, videoFile: file } // نخزن الملف نفسه
          : ad
      )
    );
  };

  // Delete Modal
  const closeDeleteModal = () => setShowDeleteModal(false);
  const openDeleteModal = (adId) => {
    setDeletingAdId(adId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setAds(prev => prev.filter(ad => ad.uuid !== deletingAdId));
    try {
      console.log("delete ad")
      await api.post(`/api/deleteAd/${deletingAdId}`);
      console.log(deletingAdId)
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
    }
    setDeletingAdId(null);
    setShowDeleteModal(false);
  }

  // Comments
  const openComment = (adId, commentId = null) => {
    setActiveCommentAdId(adId);
    setReplyTo(commentId);
    setCommentText('');
  };
  const closeComment = () => {
    setActiveCommentAdId(null);
    setReplyTo(null);
    setCommentText('');
  };

  const postComment = async () => {
    const text = commentText.trim();
    if (!text) return;
    try {
      const updatedComments = replyTo == null ? await api.post(`/api/createComment/${activeCommentAdId}`, {
        comment: text
      }) : await api.post(`/api/storeComment/${activeCommentAdId}`, {
        comment: text,
        parent_id: replyTo
      })
      console.log(updatedComments)
    } catch (error) {
      console.error('❌ Failed to post comment:', error);
      Swal.fire({
        icon: 'error',
        title: 'Comment Failed',
        text: 'Could not post your comment. Please try again.',
      });
    }
    setAds(prevAds =>
      prevAds.map(ad => {
        if (ad.uuid !== activeCommentAdId) return ad;

        const newCommentId = nextCommentId.current++;
        const updatedComments = replyTo == null
          ? [...ad.comments, { id: newCommentId, text, replies: [] }]
          : ad.comments.map(c =>
            c.id === replyTo
              ? { ...c, replies: [...c.replies, { id: newCommentId, text }] }
              : c
          );

        return { ...ad, comments: updatedComments };
      })
    );

    closeComment();
  };

  const deleteComment = (cid, parentId = null) => {
    setAds(prevAds =>
      prevAds.map(ad => {
        if (ad.uuid !== activeCommentAdId) return ad;

        const updatedComments = parentId == null
          ? ad.comments.filter(c => c.id !== cid)
          : ad.comments.map(c =>
            c.id === parentId
              ? { ...c, replies: c.replies.filter(r => r.id !== cid) }
              : c
          );

        return { ...ad, comments: updatedComments };
      })
    );
  };

  // اشعارات
  const [notifications, setNotifications] = useState([]);
  const [openNotifModal, setOpenNotifModal] = useState(false);
  const handleOpenNotifications = async () => {
    try {
      const res = await api.get('/api/getNotifications');
      console.log(res)
      // إذا الـ backend بيرجع { status: 'success', data: [...] }
      setNotifications(res.data.data || []);

      setOpenNotifModal(true);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };


  const handleCloseNotifications = () => {
    setOpenNotifModal(false);
  };

  if (loading) {
    return <Loading />
  }
  return (
    <>
      <Navbar />

      <Grid container >

        {/* Sidebar */}
        <Grid item size={{ xs: 12, md: 3 }} p={2} bgcolor="#0d1f44" color="white">
          <Stack spacing={3} alignItems="center">
            {/* Profile Image + Upload */}
            <Box position="relative">
              <Avatar src={imageProfile} sx={{ width: 120, height: 120 }} />
              <IconButton
                sx={{ position: 'absolute', bottom: -5, right: -5, bgcolor: 'white' }}
                onClick={() => profilePickerRef.current.click()}>
                <MdAdd />
              </IconButton>
              <Input
                type="file"
                inputRef={profilePickerRef}
                sx={{ display: 'none' }}
                onChange={handleProfilePicChange}
              />

            </Box>


            {/* Display Name */}
            <Box>
              {editingName ? (
                <Stack spacing={1}>
                  <TextField defaultValue={displayName} inputRef={nameRef} size="small" />
                  <Button variant="contained" onClick={saveName}>Save</Button>
                </Stack>
              ) : (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h6">{displayName}</Typography>
                  <IconButton onClick={() => setEditingName(true)} color="inherit">
                    <MdEdit />
                  </IconButton>
                </Stack>
              )}
            </Box>

            {/* Navigation Links */}
            <Stack spacing={1} width="100%">
              <Button component={NavLink} to="/follow" startIcon={<MdGroup />} fullWidth color="inherit">
                Follow
              </Button>
              <Button component={NavLink} to="/saved" startIcon={<MdSave />} fullWidth color="inherit">
                Saved
              </Button>
              <Button component={NavLink} to="/subscription" startIcon={<MdCalendarToday />} fullWidth color="inherit">
                Subscription
              </Button>
            </Stack>
          </Stack>
        </Grid>

        {/* Main Content */}
        <Grid item size={{ xs: 12, md: 9 }} p={3} sx={{ maxHeight: '100vh', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>

          <Stack direction="row" alignItems="center" spacing={2} padding={2}>
            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={toggleSearchBar}
                sx={{
                  color: '#0d1f44',
                  fontSize: '2rem',
                  padding: '1rem',
                  '&:focus, &:active': {
                    outline: 'none',
                    boxShadow: 'none',
                    background: 'transparent',
                  },
                  '&::-moz-focus-inner': {
                    border: 'none',
                  },
                }}
              >
                <MdSearch />
              </IconButton>

              <IconButton
                onClick={handleOpenNotifications}
                sx={{
                  color: '#0d1f44',
                  fontSize: '2rem',
                  padding: '1rem',
                  '&:focus, &:active': {
                    outline: 'none',
                    boxShadow: 'none',
                    background: 'transparent',
                  },
                  '&::-moz-focus-inner': {
                    border: 'none',
                  },
                }}
              >
                <MdNotifications />
              </IconButton>
            </Stack>

            <Button
              variant="contained"
              component={Link}
              to="/CreateAdForm"
              onClick={goNewAd}
              sx={{
                marginLeft: 'auto',
                marginRight: '2rem',
                padding: '0.6rem 1.2rem',
                borderRadius: '1.8rem',
                backgroundColor: '#0d1f44',
                fontSize: '1.2rem',
                '&:hover': {
                  backgroundColor: '#162b55',
                },
              }}
            >
              New Ad
            </Button>
          </Stack>


          {showSearch && (
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Search ads..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ mb: 3 }}
            />
          )}
          <Typography variant="h4" mb={2}>My Ads</Typography>

          <Grid container spacing={3} px={3} py={2}>
            {filteredAds.map((ad) => (
              <Grid item xs={12} md={12} key={ad.uuid}>
                <Card sx={{ display: 'flex', borderRadius: 3, boxShadow: 3, position: 'relative' }}>
                  {/* Edit/Delete Actions */}
                  <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 2, display: 'flex', gap: 1 }}>
                    <IconButton onClick={() => openEditModal(ad)} sx={{ color: '#0d1f44' }}>
                      <MdEdit />
                    </IconButton>
                    <IconButton onClick={() => openDeleteModal(ad.uuid)} sx={{ color: '#ef4444' }}>
                      <MdDelete />
                    </IconButton>
                  </Box>

                  {/* Media Section */}
                  <Box sx={{ minWidth: 250, position: 'relative' }}>
                    {ad.videoFile ? (
                      <video
                        src={URL.createObjectURL(ad.videoFile)}
                        controls
                        style={{ width: '250px', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    ) : ad.video_path ? (
                      <video
                        src={ad.video_path}
                        controls
                        style={{ width: '250px', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    ) : (
                      <img
                        src={ad.image_url}
                        alt={ad.title}
                        style={{ width: '250px', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    )}

                    {/* Hidden Inputs */}
                    <Input
                      type="file"
                      inputRef={(el) => (adPickerRefs.current[ad.uuid] = el)}
                      sx={{ display: 'none' }}
                      onChange={(e) => handleAdPicChange(ad.uuid, e)}
                    />
                    <Input
                      type="file"
                      accept="video/*"
                      inputRef={(el) => (videoPickerRefs.current[ad.uuid] = el)}
                      sx={{ display: 'none' }}
                      onChange={(e) => handleAdVideoChange(ad.uuid, e)}
                    />

                    {/* Action Buttons */}
                    <IconButton onClick={() => videoPickerRefs.current[ad.uuid].click()}>
                      <MdVideoLibrary />
                    </IconButton>
                    <IconButton onClick={() => handleOpenFilePicker(ad.uuid)}>
                      <MdAdd />
                    </IconButton>
                  </Box>

                  {/* Content Section */}
                  <CardContent sx={{ flex: 1 }}>
                    {/* Rating */}
                    <Box display="flex" gap={0.5}>
                      {Array(ad.rating).fill(0).map((_, i) => (
                        <Typography key={i} fontSize="1.2rem">⭐️</Typography>
                      ))}
                    </Box>

                    {/* Title & Description */}
                    <Typography variant="h6" fontWeight="bold" mt={1}>{ad.title}</Typography>
                    <Typography variant="body2" mt={0.5}>{ad.description}</Typography>

                    {/* Actions & Contact */}
                    <Stack direction="row" justifyContent="space-between" mt={2}>
                      <Stack direction="row" spacing={2}>
                        <IconButton onClick={() => toggleLike(ad.uuid)}>
                          {ad.isLiked ? (
                            <MdFavorite style={{ color: '#e63946' }} />
                          ) : (
                            <MdFavoriteBorder />
                          )}
                        </IconButton>
                        <IconButton onClick={() => toggleBookmark(ad.uuid)}>
                          {ad.isBookmarked ? (
                            <MdBookmark style={{ color: '#457b9d' }} />
                          ) : (
                            <MdBookmarkBorder />
                          )}
                        </IconButton>
                        <IconButton onClick={() => openComment(ad.uuid)}>
                          <MdComment />
                        </IconButton>
                      </Stack>

                      <Stack direction="row" spacing={2} alignItems="center">
                        <Stack direction="row" spacing={1} alignItems="center">
                          <MdPhone />
                          <Typography component="a" href={`tel:${ad.phone}`} fontWeight="medium">
                            {ad.phone}
                          </Typography>
                        </Stack>
                        <Button
                          component={Link}
                          to="/Detials"
                          state={{ uuid: ad.uuid }}
                          variant="outlined"
                          sx={{ textTransform: 'none' }}
                        >
                          Details
                        </Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

        </Grid>
      </Grid>

      {/* Edit Modal */}
      <Dialog open={showEditModal} onClose={closeEditModal}>
        <DialogTitle>Edit Ad</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            multiline
            rows={4}
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditSave} variant="contained">Save</Button>
          <Button onClick={closeEditModal} variant="outlined">Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={showDeleteModal} onClose={closeDeleteModal}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this ad?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Yes, Delete
          </Button>
          <Button onClick={closeDeleteModal} variant="outlined">Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* Comment Modal */}
      {activeCommentAdId && (
        <div className="comment-modal-overlay" onClick={closeComment}>
          <div className="comment-modal" onClick={e => e.stopPropagation()}>
            <h3>{replyTo == null ? 'Add Comment' : `Reply to Comment #${replyTo}`}</h3>
            <ul className="comment-list">
              {ads.find(ad => ad.uuid === activeCommentAdId)?.comments.map(c => (
                <li key={c.id}>
                  <div>
                    {c.comment}
                    <div className="comment-controls">
                      <MdReply className="ctrl-icon" onClick={() => openComment(activeCommentAdId, c.id)} />
                      <MdDelete className="ctrl-icon" onClick={() => deleteComment(c.id)} />
                    </div>
                  </div>
                  <ul className="reply-list">
                    {c.replies.map(r => (
                      <li key={r.id}>
                        {r.comment}
                        <MdDelete className="ctrl-icon" onClick={() => deleteComment(r.id, c.id)} />
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <textarea
              className="comment-input"
              placeholder={replyTo == null ? 'Write your comment...' : 'Write your reply...'}
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={postComment}>Post</button>
              <button onClick={closeComment}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {/* مودال الإشعارات */}
      <Modal
        open={openNotifModal}
        onClose={handleCloseNotifications}
        aria-labelledby="notifications-modal-title"
        aria-describedby="notifications-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 3
        }}>
          <Typography id="notifications-modal-title" variant="h6" mb={2}>
            Notifications
          </Typography>
          {notifications.length > 0 ? (
            <List>
              {notifications.map((notif, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={notif.data.title || 'No title'}
                    secondary={notif.message || ''}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No notifications found.</Typography>
          )}
          <Button
            variant="contained"
            onClick={handleCloseNotifications}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>

      <Footer />
    </>
  );
}
