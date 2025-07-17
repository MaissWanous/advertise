// src/components/Profile.jsx
import React, { useState, useRef } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {
  MdSearch,
  MdNotifications,
  MdEdit,
  MdDelete,
  MdGroup,
  MdSave,
  MdAdd,
  MdBookmarkBorder,
  MdBookmark,
  MdFavoriteBorder,
  MdFavorite,
  MdComment,
  MdReply,
  MdPhone,
  MdCalendarToday
} from 'react-icons/md';
import './Profile.css';
import profileImg from './image/profileImg.jpg';
import im1 from './image/im1.jpg';
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

let nextCommentId = 1;

export default function Profile() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('Advertiser');
  const [editingName, setEditingName] = useState(false);
  const [thumbs, setThumbs] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [q, setQ] = useState('');
  const nameRef = useRef();
  const pickerRef = useRef();

  const [ad, setAd] = useState({
    id: 1,
    title: 'Mathematics Course',
    desc: 'Improve your math skills with our comprehensive course.',
    img: im1,
    phone: '123 456 7890',
    rating: 5,
    isLiked: false,
    isBookmarked: false,
    comments: []
  });
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const saveName = () => {
    const v = nameRef.current.value.trim();
    if (v) setDisplayName(v);
    setEditingName(false);
  };

  const pick = () => pickerRef.current.click();
  const onPick = e => {
    const urls = Array.from(e.target.files).map(f => URL.createObjectURL(f));
    setThumbs(urls);
  };

  const toggleSearchBar = () => setShowSearch(s => !s);
  const goNewAd = () => navigate('/new-ad');

  const toggleLike = () => setAd(a => ({ ...a, isLiked: !a.isLiked }));
  const toggleBookmark = () =>
    setAd(a => ({ ...a, isBookmarked: !a.isBookmarked }));

  const openEditModal = () => {
    setEditTitle(ad.title);
    setEditDesc(ad.desc);
    setShowEditModal(true);
  };
  const closeEditModal = () => setShowEditModal(false);
  const handleEditSave = () => {
    setAd(a => ({ ...a, title: editTitle.trim(), desc: editDesc.trim() }));
    closeEditModal();
  };

  const openDeleteModal = () => setShowDeleteModal(true);
  const closeDeleteModal = () => setShowDeleteModal(false);
  const handleDeleteConfirm = () => {
    setIsDeleted(true);
    closeDeleteModal();
  };

  const openComment = (commentId = null) => {
    setReplyTo(commentId);
    setCommentText('');
    setActiveCommentId(ad.id);
  };
  const closeComment = () => {
    setActiveCommentId(null);
    setReplyTo(null);
    setCommentText('');
  };

  const postComment = () => {
    if (!commentText.trim()) return;
    setAd(a => {
      let updated = { ...a };
      if (replyTo == null) {
        updated.comments = [
          ...updated.comments,
          { id: nextCommentId++, text: commentText.trim(), replies: [] }
        ];
      } else {
        updated.comments = updated.comments.map(c =>
          c.id === replyTo
            ? {
                ...c,
                replies: [
                  ...c.replies,
                  { id: nextCommentId++, text: commentText.trim() }
                ]
              }
            : c
        );
      }
      return updated;
    });
    closeComment();
  };

  const deleteComment = (cid, parentId = null) => {
    setAd(a => {
      let updated = { ...a };
      if (parentId == null) {
        updated.comments = updated.comments.filter(c => c.id !== cid);
      } else {
        updated.comments = updated.comments.map(c =>
          c.id === parentId
            ? { ...c, replies: c.replies.filter(r => r.id !== cid) }
            : c
        );
      }
      return updated;
    });
  };

  const filtered = isDeleted
    ? []
    : [ad].filter(a => a.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <Navbar />
      <div className="rq1">
        <div className="rq2">
          <aside className="rq3">
            <div className="rq4">
              <div className="rq5">
                <img src={profileImg} alt="Profile" className="rq6" />
                <button className="rq7" onClick={pick}>
                  <MdAdd />
                </button>
                <input
                  type="file"
                  ref={pickerRef}
                  accept="image/*"
                  hidden
                  onChange={onPick}
                />
              </div>
              {thumbs.length > 0 && (
                <div className="rq8">
                  {thumbs.map((u, i) => (
                    <img key={i} src={u} alt={thumb-`${i}`} className="rq9" />
                  ))}
                </div>
              )}
            </div>

            <div
              className={`rq10 ${editingName ? 'rq10--editing' : ''}`} style={{minHeight:'40px'}}
            >
              {editingName ? (
                <>
                  <input
                    defaultValue={displayName}
                    ref={nameRef}
                    className="rq14"
                  />
                  <button onClick={saveName} className="rq13">
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="rq11">{displayName}</span>
                  <button
                    onClick={() => setEditingName(true)}
                    className="rq12"
                  >
                    <MdEdit />
                  </button>
                </>
              )}
            </div>

            <nav className="rq15">
              <NavLink to="/follow" className="rq16">
                <MdGroup /> Follow
              </NavLink>
              <NavLink to="/saved" className="rq16">
                <MdSave /> Saved
              </NavLink>
              <NavLink to="/subscription" className="rq16">
                <MdCalendarToday /> Subscription
              </NavLink>
            </nav>
          </aside>

          <main className="rq17">
            <div className="rq18">
              <button onClick={toggleSearchBar} className="rq19 rq20">
                <MdSearch />
              </button>
              <button className="rq19 rq21">
                <MdNotifications />
              </button>
              
              <button onClick={goNewAd} className="rq22">
                New Ad
              </button>
            </div>

            {showSearch && (
              <div className="rq23">
                <input
                  className="rq24"
                  type="text"
                  placeholder="Search ads..."
                  value={q}
                  onChange={e => setQ(e.target.value)}
                />
              </div>
            )}

            <h1 className="rq25">My Ads</h1>

            <section className="rq26">
              {filtered.map(ad => (
                <div key={ad.id} className="rq27">
                  <div className="rqAdActions">
                    <button
                      className="rqEditBtn"
                      onClick={openEditModal}
                    >
                      <MdEdit />
                    </button>
                    <button
                      className="rqDeleteBtn"onClick={openDeleteModal}
                    >
                      <MdDelete />
                    </button>
                  </div>
                  <div className="rq28-wrapper">
  <img src={ad.img} alt={ad.title} className="rq28" />
  <button className="rq28-add-btn" onClick={pick}>
    <MdAdd />
  </button>
  <input
    type="file"
    ref={pickerRef}
    accept="image/*"
    hidden
    onChange={onPick}
  />
</div>
                  <div className="rq29">
                    <div className="rq30">
                      {Array(ad.rating)
                        .fill(0)
                        .map((_, i) => (
                          <span key={i} className="rq31">
                            ⭐️
                          </span>
                        ))}
                    </div>
                    <h2 className="rq32">{ad.title}</h2>
                    <p className="rq33">{ad.desc}</p>

                    <div className="rq34">
                      <div className="rq35">
                        <button onClick={toggleLike}>
                          {ad.isLiked ? (
                            <MdFavorite className="rq36 filled" />
                          ) : (
                            <MdFavoriteBorder className="rq36 outline" />
                          )}
                        </button>
                        <button onClick={toggleBookmark}>
                          {ad.isBookmarked ? (
                            <MdBookmark className="rq37 filled" />
                          ) : (
                            <MdBookmarkBorder className="rq37 outline" />
                          )}
                        </button>
                        <button onClick={() => openComment()}>
                          <MdComment className="rq41 outline" />
                        </button>
                      </div>

                      <Link to={`/details/${ad.id}`}>
                        <button className="rqDetailsBtn">
                          Details
                        </button>
                      </Link>

                      <div className="rq38">
                        <MdPhone className="rq39" />
                        <a href={`tel:${ad.phone}`} className="rq40">
                          {ad.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </main>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div
          className="edit-modal-overlay"
          onClick={closeEditModal}
        >
          <div
            className="edit-modal"
            onClick={e => e.stopPropagation()}
          >
            <h3>Edit Ad</h3>
            <input
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
            />
            <textarea
              value={editDesc}
              onChange={e => setEditDesc(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleEditSave}>Save</button>
              <button onClick={closeEditModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteModal && (
        <div
          className="delete-modal-overlay"
          onClick={closeDeleteModal}
        >
          <div
            className="delete-modal"
            onClick={e => e.stopPropagation()}
          >
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this ad?</p>
            <div className="modal-buttons">
              <button onClick={handleDeleteConfirm}>
                Yes, Delete
              </button>
              <button onClick={closeDeleteModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}{/* Comment Modal */}
      {activeCommentId && (
        <div
          className="comment-modal-overlay"
          onClick={closeComment}
        >
          <div
            className="comment-modal"
            onClick={e => e.stopPropagation()}
          >
            <h3>
              {replyTo == null
                ? 'Add Comment'
                : `Reply to Comment # ${replyTo}`}
            </h3>
            <ul className="comment-list">
              {ad.comments.map(c => (
                <li key={c.id}>
                  <div>
                    {c.text}
                    <div className="comment-controls">
                      <MdReply
                        className="ctrl-icon"
                        onClick={() => openComment(c.id)}
                      />
                      <MdDelete
                        className="ctrl-icon"
                        onClick={() => deleteComment(c.id)}
                      />
                    </div>
                  </div>
                  <ul className="reply-list">
                    {c.replies.map(r => (
                      <li key={r.id}>
                        {r.text}
                        <MdDelete
                          className="ctrl-icon"
                          onClick={() => deleteComment(r.id, c.id)}
                        />
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <textarea
              className="comment-input"
              placeholder={
                replyTo == null
                  ? 'Write your comment...'
                  : 'Write your reply...'
              }
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