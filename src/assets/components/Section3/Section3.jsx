import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MdRestaurant,
  MdFlight,
  MdSchool,
  MdLaptopMac
} from 'react-icons/md';
import './Section3.css';

import im4 from './image/im4.jpg';
import im3 from './image/im3.jpg';
import im2 from './image/im2.jpg';
import im1 from './image/im1.jpg';

export default function Section3() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // جلب من API أو بيانات احتياطية
    setCategories([
      {
        id: 'restaurants',
        name: 'Restaurants',
        icon: <MdRestaurant />,
        image: im4,
        link: '/restaurants'
      },
      {
        id: 'travel',
        name: 'Travel',
        icon: <MdFlight />,
        image: im3,
        link: '/travel'
      },
      {
        id: 'education',
        name: 'Education',
        icon: <MdSchool />,
        image: im2,
        link: '/education'
      },
      {
        id: 'technology',
        name: 'Technology',
        icon: <MdLaptopMac />,
        image: im1,
        link: '/Section'
      }
    ]);
  }, []);

  return (
    <section className="browse-categories">
      <h2 className="browse-categories__title">Browse by Category</h2>
      <div className="browse-categories__list">
        {categories.map(cat => (
          <div key={cat.id} className="category-card">
            <Link to={cat.link} className="category-card__link">
              <div className="category-card__image">
                <img src={cat.image} alt={cat.name} />
              </div>
              <div className="category-card__info">
                <span className="category-card__name">{cat.name}</span>
                <div className="category-card__icon">{cat.icon}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}