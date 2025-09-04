import React, { useState, useEffect, useRef } from "react";
import Loading from '../../loading/loading.jsx';
import api from '../../../api/index.jsx';
import {
  MdStar,
  MdPhone,
  MdBookmarkBorder,
  MdBookmark,
  MdFavoriteBorder,
  MdFavorite,
  MdChatBubbleOutline,
  MdReport,
  MdReply,
  MdDelete,
} from "react-icons/md";
import "./Section2.css";

import im1 from "./image/im1.jpg";
import im2 from "./image/im2.jpg";
import im3 from "./image/im3.jpg";
import im4 from "./image/im4.jpg";
import av5 from "./image/im5.jpg";
import av6 from "./image/im6.jpg";
import av7 from "./image/im7.jpg";
import av8 from "./image/im8.jpg";
import Swal from "sweetalert2";

export default function TopAds() {
  const [ads, setAds] = useState([]);
  const [activeCommentAdId, setActiveCommentAdId] = useState(null);
  const [commentText, setCommentText] = useState("");


  const handleFollow = async (uuid) => {

    const ad = ads.find(a => a.uuid === uuid);
    if (!ad) return;


    setAds(prev =>
      prev.map(a =>
        a.uuid === uuid ? { ...a, isFollowed: !a.isFollowed } : a
      )
    );

    try {

      const endpoint = ad.isFollowed
        ? `/api/unfollow/${uuid}`
        : `/api/follow/${uuid}`;

      const res = await api.post(endpoint);
      console.log(" Follow/Unfollow response:", res.data);
    } catch (error) {
      console.error(" Error in follow/unfollow:", error);

      setAds(prev =>
        prev.map(a =>
          a.uuid === uuid ? { ...a, isFollowed: ad.isFollowed } : a
        )
      );
    }
  };


  const handleBookmark = async (uuid) => {
    setAds(ads.map(a => a.uuid === uuid ? { ...a, isBookmarked: !a.isBookmarked } : a));
    await api.post(`/api/AddFavorite/${uuid}`);
  };

  const handleLike = async (uuid) => {
    // تحديث محلي فوري
    setAds(prevAds =>
      prevAds.map(ad =>
        ad.uuid === uuid
          ? { ...ad, likes_count: !ad.likes_count }
          : ad
      )
    );

    try {
      // تحديد القيمة الجديدة بناءً على الحالة الحالية
      const ad = ads.find(a => a.uuid === uuid);
      const newLikedState = !ad.likes_count;

      // إرسال الطلب للباك
      const res = await api.post(`/api/reactToAd/${uuid}`, { liked: newLikedState });
      console.log("✅ Like response:", res.data);
    } catch (error) {
      console.error("❌ Error liking ad:", error);

      // في حال فشل الطلب، نرجع الحالة القديمة
      setAds(prevAds =>
        prevAds.map(ad =>
          ad.uuid === uuid
            ? { ...ad, likes_count: !ad.likes_count }
            : ad
        )
      );
    }
  };
  const fallback = [
    {
      uuid: 1,
      name: "Rami Ali",
      userAvatar: av5,
      category_name: "TECHNOLOGY",
      title: "Wireless Router and Switch",
      rating: 5,
      description:
        "Dual-band 802.11ac Wi-Fi router with four Gigabit Ethernet ports. Supports MU-MIMO technology.",
      image_url: im1,
      phone: "123-456-7890",
    },
    {
      uuid: 2,
      name: "Tamir Hasan",
      userAvatar: av6,
      category_name: "EDUCATION",
      title: " Master React in 30 Days ",
      rating: 4,
      description:
        "Authentic Italian cuisine in a warm, inviting atmosphere.",
      image_url: im2,
      phone: "987-654-3210",
    },
    {
      uuid: 3,
      name: "Ramiz Fadi",
      userAvatar: av7,
      category_name: "FEATURED",
      title: "Ultra-Slim Laptop Pro",
      rating: 5,
      description:
        "An intensive hands-on course covering all React fundamentals, hooks, state management and beyond.",
      image_url: im3,
      phone: "555-123-4567",
    },
    {
      uuid: 4,
      name: "Mazin Yasi",
      userAvatar: av8,
      category_name: "Restaurant",
      title: " Cozy Italian Restaurant ",
      rating: 4,
      description:
        "High-performance ultrabook with long battery life and retina display.",
      image_url: "https://ff0b357256ca.ngrok-free.app/storage/ads/uNiAsKJ28DYFqOmxHs0hBsxfDRB33sWKYmYorrel.png",
      phone: "444-987-6543",
    },
  ].map((ad) => ({
    ...ad,
    likes_count: false,
    isBookmarked: false,
    isReported: false,
    comments: [],
  }));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/advertisements');
        const serverData = response.data.data;
        serverData.forEach(e => {
          e.userAvatar = av5;
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

      }
    };

    fetchData();
  }, []);

  const [replyTo, setReplyTo] = useState(null);

  const nextCommentId = useRef(1);

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

    const newCommentId = nextCommentId.current++; // ✅ توليد ID فريد

    try {
      await api.post(`/api/createComment/${activeCommentAdId}`, {
        comment: text
      });
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

        const updatedComments = replyTo == null
          ? [...ad.comments, { uuid: newCommentId, comment: text, replies: [] }]
          : ad.comments.map(c =>
            c.uuid === replyTo
              ? { ...c, replies: [...c.replies, { uuid: newCommentId, comment: text }] }
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
          ? ad.comments.filter(c => c.uuid !== cid)
          : ad.comments.map(c =>
            c.uuid === parentId
              ? { ...c, replies: c.replies.filter(r => r.uuid !== cid) }
              : c
          );

        return { ...ad, comments: updatedComments };
      })
    );
  };






  return (
    <section className="top-ads">
      <h2 className="top-ads__heading">Most Popular Ads</h2>
      <div className="top-ads__grid">
        {ads.map((ad) => (
          <div key={ad.uuid} className="top-card">
            {/* HEADER */}
            <div className="top-card__header">
              <div className="top-card__userinfo">
                <img src={ad.userAvatar} alt={ad.user.name} className="top-card__avatar" />
                <span className="top-card__badge">{ad.category_name}</span>
                <span className="top-card__username">{ad.user.name}</span>
              </div>
              <button
                className={ad.isFollowed ? "top-cardfollow-btn following" : "top-cardfollow-btn"}
                onClick={() => handleFollow(ad.user.uuid)}
              >
                {ad.isFollowed ? "Following" : "Follow"}
              </button>
            </div>

            {/* RATING */}
            <div className="top-card__rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <MdStar key={i} className={`top-card__star ${i < ad.rating ? "top-card__star--filled" : ""}`} />
              ))}
            </div>

            {/* BODY */}
            <div className="top-card__body">
              <h3 className="top-card__title">{ad.title}</h3>
              <p className="top-card__desc">{ad.description}</p>
            </div>

            {/* IMAGE */}
            <div className="top-card__image">
              <img src={ad.image_url} alt={ad.title} />
            </div>

            {/* ACTIONS */}
            <div className="top-card__footer">
              <div className="top-card__actions">
                <button onClick={() => handleLike(ad.uuid)} className="top-card__action-btn">
                  {ad.likes_count ? <MdFavorite /> : <MdFavoriteBorder />}
                </button>
                <button onClick={() => openComment(ad.uuid)} className="top-card__action-btn">
                  <MdChatBubbleOutline />
                </button>
                <button onClick={() => handleBookmark(ad.uuid)} className="top-card__action-btn">
                  {ad.isBookmarked ? <MdBookmark /> : <MdBookmarkBorder />}
                </button>
                <button onClick={() => handleReport(ad.uuid)} className="top-card__action-btn">
                  <MdReport />
                </button>
              </div>
              <div className="top-card__contact">
                <MdPhone />
                <a href={`tel:${ad.phone}`}>{ad.phone}</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* COMMENT MODAL */}

      {activeCommentAdId && (
        <div className="comment-modal-overlay" onClick={closeComment}>
          <div className="comment-modal" onClick={e => e.stopPropagation()}>
            <h3>
              {replyTo == null ? 'Add Comment' : `Reply to Comment #${replyTo}`}
            </h3>

            <ul className="comment-list">
              {ads.find(ad => ad.uuid === activeCommentAdId)?.comments.map(c => (
                <li key={c.uuid}>
                  <div>
                    {c.comment}
                    <div className="comment-controls">
                      <MdReply
                        className="ctrl-icon"
                        onClick={() => openComment(activeCommentAdId, c.uuid)}
                      />
                      <MdDelete
                        className="ctrl-icon"
                        onClick={() => deleteComment(c.uuid)}
                      />
                    </div>
                  </div>

                  {/* عرض الردود */}
                  <ul className="reply-list">
                    {c.replies.map(r => (
                      <li key={r.uuid}>
                        {r.comment}
                        <MdDelete
                          className="ctrl-icon"
                          onClick={() => deleteComment(r.uuid, c.uuid)}
                        />
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


    </section>
  );
}