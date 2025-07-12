import React, { useState, useEffect } from "react";
import {
  MdStar,
  MdPhone,
  MdBookmarkBorder,
  MdBookmark,
  MdFavoriteBorder,
  MdFavorite,
  MdChatBubbleOutline,
  MdReport,
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

export default function TopAds() {
  const [ads, setAds] = useState([]);
  const [modalId, setModalId] = useState(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fallback = [
      {
        id: 1,
        userName: "Rami Ali",
        userAvatar: av5,
        tag: "TECHNOLOGY",
        title: "Wireless Router and Switch",
        rating: 5,
        description:
          "Dual-band 802.11ac Wi-Fi router with four Gigabit Ethernet ports. Supports MU-MIMO technology.",
        image: im1,
        phone: "123-456-7890",
      },
      {
        id: 2,
        userName: "Tamir Hasan",
        userAvatar: av6,
        tag: "EDUCATION",
        title: " Master React in 30 Days ",
        rating: 4,
        description:
          "Authentic Italian cuisine in a warm, inviting atmosphere.",
        image: im2,
        phone: "987-654-3210",
      },
      {
        id: 3,
        userName: "Ramiz Fadi",
        userAvatar: av7,
        tag: "FEATURED",
        title: "Ultra-Slim Laptop Pro",
        rating: 5,
        description:
          "An intensive hands-on course covering all React fundamentals, hooks, state management and beyond.",
        image: im3,
        phone: "555-123-4567",
      },
      {
        id: 4,
        userName: "Mazin Yasi",   
        userAvatar: av8,
        tag: "Restaurant",
        title: " Cozy Italian Restaurant ",
        rating: 4,
        description:
          "High-performance ultrabook with long battery life and retina display.",
        image: im4,
        phone: "444-987-6543",
      },
    ].map((ad) => ({
      ...ad,
      isLiked: false,
      isBookmarked: false,
      isReported: false,
      comments: [],
    }));

    fetch("/api/most-popular-ads")
      .then((r) => r.json())
      .then((data) => setAds(data.map((ad, i) => ({ ...fallback[i], ...ad }))))
      .catch(() => setAds(fallback));
  }, []);

  const toggleLike = (id) =>
    setAds((a) =>
      a.map((ad) => (ad.id === id ? { ...ad, isLiked: !ad.isLiked } : ad))
    );
  const toggleBookmark = (id) =>
    setAds((a) =>
      a.map((ad) =>
        ad.id === id ? { ...ad, isBookmarked: !ad.isBookmarked } : ad
      )
    );
  const toggleReport = (id) => {
    setAds((a) =>
      a.map((ad) => (ad.id === id ? { ...ad, isReported: !ad.isReported } : ad))
    );
    alert("تم الإبلاغ عن هذا المحتوى");
  };
  const openComment = (id) => {
    setModalId(id);
    setCommentText("");
  };
  const closeComment = () => setModalId(null);
  const postComment = () => {
    if (!commentText.trim()) return;
    setAds((a) =>
      a.map((ad) =>
        ad.id === modalId
          ? { ...ad, comments: [...ad.comments, commentText.trim()] }
          : ad
      )
    );
    closeComment();
  };
  return (
    <section className="top-ads">
      <h2 className="top-ads__heading">Most Popular Ads</h2>
      <div className="top-ads__grid">
        {ads.map((ad) => (
          <div key={ad.id} className="top-card">
            {/* HEADER */}
            <div className="top-card__header">
              <div className="top-card__userinfo">
                <img
                  src={ad.userAvatar}
                  alt={ad.userName}
                  className="top-card__avatar"
                />
                <span className="top-card__badge">{ad.tag}</span>
                <span className="top-card__username">{ad.userName}</span>
              </div>
              <button
                className={
                  ad.isFollowed
                    ? "top-cardfollow-btn following"
                    : "top-cardfollow-btn"
                }
                onClick={() =>
                  setAds((a) =>
                    a.map((x) =>
                      x.id === ad.id ? { ...x, isFollowed: !x.isFollowed } : x
                    )
                  )
                }
              >
                {ad.isFollowed ? "Following" : "Follow"}
              </button>
            </div>

            {/* RATING */}
            <div className="top-card__rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <MdStar
                  key={i}
                  className={`top-card__star ${
                    i < ad.rating ? "top-card__star--filled" : ""
                  }`}
                />
              ))}
            </div>

            {/* BODY */}
            <div className="top-card__body">
              <h3 className="top-card__title">{ad.title}</h3>
              <p className="top-card__desc">{ad.description}</p>
            </div>
            {/* IMAGE */}
            <div className="top-card__image">
              <img src={ad.image} alt={ad.title} />
            </div>

            {/* ACTIONS + CONTACT */}
            <div className="top-card__footer">
              <div className="top-card__actions">
                <button
                  onClick={() => toggleLike(ad.id)}
                  className="top-card__action-btn"
                >
                  {ad.isLiked ? (
                    <MdFavorite className="top-cardicon top-cardicon--heart" />
                  ) : (
                    <MdFavoriteBorder className="top-cardicon top-cardicon--heart-outline" />
                  )}
                </button>
                <button
                  onClick={() => openComment(ad.id)}
                  className="top-card__action-btn"
                >
                  <MdChatBubbleOutline className="top-cardicon top-cardicon--comment" />
                </button>
                <button
                  onClick={() => toggleBookmark(ad.id)}
                  className="top-card__action-btn"
                >
                  {ad.isBookmarked ? (
                    <MdBookmark className="top-cardicon top-cardicon--bookmark" />
                  ) : (
                    <MdBookmarkBorder className="top-cardicon top-cardicon--bookmark-outline" />
                  )}
                </button>
                <button
                  onClick={() => toggleReport(ad.id)}
                  className="top-card__action-btn"
                >
                  <MdReport
                    className={
                      ad.isReported
                        ? "top-cardicon top-cardicon--report"
                        : "top-cardicon top-cardicon--report-outline"
                    }
                  />
                </button>
              </div>
              <div className="top-card__contact">
                <MdPhone className="top-cardicon top-cardicon--phone" />
                <a href={`tel:${ad.phone}`} className="top-card__phone">
                  {ad.phone}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {modalId !== null && (
        <div className="modal-overlay" onClick={closeComment}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add Comment</h3>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment…"
            />
            <div className="modal-buttons">
              <button onClick={postComment} className="btn-post">
                Post
              </button>
              <button onClick={closeComment} className="btn-cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}