import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../../loading/loading.jsx';
import api from '../../../api/index.jsx';
import {
  MdBookmarkBorder,
  MdBookmark,
  MdFavoriteBorder,
  MdFavorite,
  MdComment,
  MdPhone,
  MdReport
} from 'react-icons/md';
import './Section.css';
import routerImg from './image/routerImg.jpg';
import routerImg2 from './image/routerImg2.jpg';
import av5 from './image/av5.jpg';
import av6 from './image/av6.jpg';
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Swal from 'sweetalert2';

export default function Section() {
  const location = useLocation();
  const category = location.state?.category;

  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [draftComment, setDraftComment] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {

        const res = await api.get('/api/advertisements');
        const data = res.data.data || [];
        data.forEach(e => {
          e.name = "user name"
          e.userAvatar = av5;
          e.phone = "123-456-7890"
        });
        const filtered = data.filter(ad => ad.category_name?.toLowerCase() === category?.toLowerCase());
        console.log(data, filtered)
        if (filtered.length > 0) {
          setAds(filtered);
        } else {
          throw new Error("No ads returned");
        }
      } catch (err) {
        console.error('❌ Error fetching data:', err);
        setAds([
          {
            id: 1,
            user: {
              name: 'Ahmad naeem'
              , uuid: 1
            },
            userAvatar: av5,
            image_url: routerImg,
            title: 'Wireless Router and Switch',
            desc:
              'Dual-band 802.11ac Wi-Fi router with four Gigabit Ethernet ports. Supports MU-MIMO technology.',
            phone: '123-456-7890',
            isFollowed: true,
            isBookmarked: false,
            likes_count: false
          },
          {
            id: 2,
            user: {
              name: 'Sami masri'


              , uuid: 1
            },
            userAvatar: av6,
            image_url: routerImg2,
            title:
              'Smart Robot Vacuum—Effortless Cleaning!',
            desc:
              'Powerful suction and battery life, so your floors stay spotless.',
            phone: '123-456-7890',
            isFollowed: false,
            isBookmarked: false,
            likes_count: false
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);


  const handleReport = async () => {
    Swal.fire({
      title: 'Do you want to report?',
      text: 'Your report will be sent to the administration. Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, report',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        //  await api.post("/report${id}")
        Swal.fire('Reported!', 'Thank you for letting us know.', 'success');
      }
    });
  };


  const openComment = async (id) => {
    setActiveCommentId(id);
    await api.get(`/api/show/${id}`);
    setDraftComment('');
  };
  const closeComment = () => setActiveCommentId(null);
  const handleFollow = async (id) => {
    setAds(ads.map(a => a.id === id ? { ...a, isFollowed: !a.isFollowed } : a));
    const res = await api.post(`/api/follow/${id}`);
  };

  const handleBookmark = async (id) => {
    setAds(ads.map(a => a.uuid === id ? { ...a, isBookmarked: !a.isBookmarked } : a));
    await api.post(`/api/AddFavorite/${id}`);
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

  const postComment = async () => {
    try {
      setLoading(true)

      const res = await api.post(`/api/createComment/${activeCommentId}`, { comment: draftComment });
      console.log(res)
    } catch (error) {
      console.log("error while comment:", error)
    } finally {
      setLoading(false)
      closeComment();
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />

      <div className="fav-page">
        <h1 className="fav-header">{category.toUpperCase()} ADS SECTION</h1>
        <div className="fav-cards">
          {ads.map(ad => (
            <div key={ad.uuid} className="fav-card">
              <div className="fav-user-block">
                <img src={ad?.userAvatar} alt={ad?.user.name || ad.name} className="fav-avatar" />
                <span className="fav-username">{ad?.user.name || ad.name}</span>
              </div>

              <div
                className={
                  ad.isFollowed ? 'fav-tag fav-tag--active' : 'fav-tag fav-tag--inactive'
                }
                onClick={() => handleFollow(ad?.user.uuid)}
              >
                {ad.isFollowed ? 'Following' : 'Follow'}
              </div>

              <img src={ad.image_url} alt={ad.title} className="fav-image" />
              <div className="fav-details">
                <h2 className="fav-title">{ad.title}</h2>
                <div className="fav-stars">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i}>⭐️</span>
                    ))}
                </div>
                <p className="fav-desc">{ad.desc}</p>
                <div className="fav-footer">
                  <div className="fav-actions">
                    <button className="fav-btn" onClick={() => handleBookmark(ad.uuid)}>
                      {ad.isBookmarked ? (
                        <MdBookmark className="fav-icon fav-icon--filled" />
                      ) : (
                        <MdBookmarkBorder className="fav-icon fav-icon--outline" />
                      )}
                    </button>
                    <button className="fav-btn" onClick={() => handleLike(ad.uuid)}>
                      {ad.likes_count ? (
                        <MdFavorite className="fav-icon fav-icon--filled" />
                      ) : (
                        <MdFavoriteBorder className="fav-icon fav-icon--outline" />
                      )}
                    </button>
                    <button className="fav-btn" onClick={() => openComment(ad.uuid)}>
                      <MdComment className="fav-icon fav-icon--outline" />
                    </button>
                    <button className="fav-btn" onClick={handleReport}>
                      <MdReport className="fav-icon fav-icon--report-outline" />
                    </button>
                  </div>

                  <div className="fav-contact">
                    <MdPhone className="fav-icon-phone" />
                    <a href={`tel:${ad.phone}`} className="fav-contact-number">
                      {ad.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeCommentId && (
        <div className="comment-pane-overlay" onClick={closeComment}>
          <div className="comment-pane" onClick={e => e.stopPropagation()}>
            <textarea
              className="comment-input"
              placeholder="Write your comment..."
              value={draftComment}
              onChange={e => setDraftComment(e.target.value)}
            />
            <button className="comment-btn-post" onClick={postComment}>
              Post Comment
            </button>
            <button className="comment-btn-cancel" onClick={closeComment}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
