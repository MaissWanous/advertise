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
} from '@mui/material';
import { MdAdd, MdEdit, MdGroup, MdSave, MdCalendarToday, MdSearch, MdNotifications, MdFavorite, MdFavoriteBorder, MdBookmark, MdBookmarkBorder, MdComment, MdDelete, MdPhone, MdReply } from 'react-icons/md';

import "./Profile.css";
import profileImg from "./image/profileImg.jpg";
import im1 from "./image/im1.jpg";
import Navbar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

let nextCommentId = 1;

export default function Profile() {
  const navigate = useNavigate();
// /photo_2023-03-05_18-48-02_8zSGEfY.jpg
// useEffect(() => {
     
//         const fetchProfileData = async () => {

//             try {

//                 const response = await api.get(`/media/news/photos/photo_2023-03-05_18-48-02_8zSGEfY.jpg`);
//               console.log(response)
              
//                     // if (response?.data?.img) {
//                     //     setSelectedImage(response.data.img || profileImage);
//                     // }
              
//             } catch (error) {
//                 console.error('Error fetching profile data:', error);
//                 if (error.response?.status === 403) {
//                     // setToken(null);
//                     // localStorage.removeItem(`token${username}`)
//                     // navigate('/login');
//                 }}
//             // } finally {
//             //     // setLoading(false);
//             // }
//         };

//         fetchProfileData();
//     },[]);
  // Profile
  const [displayName, setDisplayName] = useState("Advertiser");
  const [editingName, setEditingName] = useState(false);
  const nameRef = useRef();
  const profilePickerRef = useRef();
  const adPickerRef = useRef();

  const [imageProfile, setImageProfile] = useState(profileImg)

  // Ad Search
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  // Ad Data
  const [ads, setAds] = useState([
    {
      id: 1,
      title: "Mathematics Course",
      desc: "...",
      img: im1,
      phone: "123 456 7890",
      rating: 5,
      isLiked: false,
      isBookmarked: false,
      comments: [],
    },
  ]);

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

  const handleAdPicChange = (adId, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setAds(prev =>
      prev.map(ad =>
        ad.id === adId ? { ...ad, img: imageUrl } : ad
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
        ad.id === id ? { ...ad, isLiked: !ad.isLiked } : ad
      )
    );
  };

  const toggleBookmark = (id) => {
    setAds(prevAds =>
      prevAds.map(ad =>
        ad.id === id ? { ...ad, isBookmarked: !ad.isBookmarked } : ad
      )
    );
  };

  // Edit Modal
  const [editingAdId, setEditingAdId] = useState(null);
  const openEditModal = (ad) => {
    setEditingAdId(ad.id);
    setEditTitle(ad.title);
    setEditDesc(ad.desc);
    setShowEditModal(true);
  };

  const closeEditModal = () => setShowEditModal(false);
  const handleEditSave = () => {
    setAds(prev =>
      prev.map(ad =>
        ad.id === editingAdId
          ? { ...ad, title: editTitle.trim(), desc: editDesc.trim() }
          : ad
      )
    );
    closeEditModal();
  };


  // Delete Modal
  const openDeleteModal = () => setShowDeleteModal(true);
  const closeDeleteModal = () => setShowDeleteModal(false);
  const handleDeleteConfirm = () => {
    setIsDeleted(true);
    closeDeleteModal();
  };

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

  const postComment = () => {
    const text = commentText.trim();
    if (!text) return;

    setAds(prevAds =>
      prevAds.map(ad => {
        if (ad.id !== activeCommentAdId) return ad;

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
        if (ad.id !== activeCommentAdId) return ad;

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



  // const fillterd = isDeleted
  //   ? []
  //   : ad.filter(item =>
  //       item.title.toLowerCase().includes(q.toLowerCase())
  //     );


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

              <Grid item size={{ xs: 12, md: 12 }} key={ad.id}>
                <Card sx={{ display: 'flex', borderRadius: 3, boxShadow: 3, position: 'relative' }}>
                  {/* Edit/Delete Actions */}
                  <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 2, display: 'flex', gap: 1 }}>
                    <IconButton onClick={() => openEditModal(ad)} sx={{ color: '#0d1f44' }}>
                      <MdEdit />
                    </IconButton>

                    <IconButton onClick={openDeleteModal} sx={{ color: '#ef4444' }}>
                      <MdDelete />
                    </IconButton>
                  </Box>

                  {/* Image section with add button */}
                  <Box sx={{ minWidth: 250, position: 'relative' }}>
                    <img
                      src={ad.img}
                      alt={ad.title}
                      style={{ width: '250px', height: '100%', objectFit: 'cover' }}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute', bottom: 8,
                        right: 8,
                        bgcolor: 'white',
                        boxShadow: 1,
                      }}
                      onClick={() => adPickerRef.current.click()}>
                      <MdAdd />
                    </IconButton>
                    <Input
                      type="file"
                      inputRef={adPickerRef}
                      sx={{ display: 'none' }}
                      onChange={(e) => handleAdPicChange(ad.id, e)}
                    />

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
                    <Typography variant="body2" mt={0.5}>{ad.desc}</Typography>

                    {/* Action Buttons + Phone + Details */}
                    <Stack direction="row" justifyContent="space-between" mt={2}>
                      <Stack direction="row" spacing={2}>
                        <IconButton onClick={() => toggleLike(ad.id)}>
                          {ad.isLiked ? (
                            <MdFavorite style={{ color: '#e63946' }} />
                          ) : (
                            <MdFavoriteBorder />
                          )}
                        </IconButton>

                        <IconButton onClick={() => toggleBookmark(ad.id)}>
                          {ad.isBookmarked ? (
                            <MdBookmark style={{ color: '#457b9d' }} />
                          ) : (
                            <MdBookmarkBorder />
                          )}
                        </IconButton>

                        <IconButton onClick={() => openComment(ad.id)}>
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
                          to={`/Detials`}
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
              {ads.find(ad => ad.id === activeCommentAdId)?.comments.map(c => (
                <li key={c.id}>
                  <div>
                    {c.text}
                    <div className="comment-controls">
                      <MdReply className="ctrl-icon" onClick={() => openComment(activeCommentAdId, c.id)} />
                      <MdDelete className="ctrl-icon" onClick={() => deleteComment(c.id)} />
                    </div>
                  </div>
                  <ul className="reply-list">
                    {c.replies.map(r => (
                      <li key={r.id}>
                        {r.text}
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

      <Footer />
    </>
  );
}
