import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePageForm = () => {
  const [heroData, setHeroData] = useState({
    heading: '',
    subheading: '',
    image: null,
  });

  const [mansionData, setMansionData] = useState({
    description: '',
    btntext: '',
    ref1: '',
    ref2: '',
    ref3: '',
    ref4: '',
  });

  const [penthouseData, setPenthouseData] = useState({
    description: '',
    btntext: '',
    ref1: '',
    ref2: '',
    ref3: '',
    ref4: '',
  });

  const [collectiblesData, setCollectiblesData] = useState({
    description: '',
    btntext: '',
    ref1: '',
    ref2: '',
    ref3: '',
    ref4: '',
  });

  const [magazineData, setMagazineData] = useState({
    heading: '',
    subheading: '',
    image: null,
  });

  const [featuredData, setFeaturedData] = useState({
    ref1: '',
    ref2: '',
    ref3: '',
    ref4: '',
  });

  const [reviewData, setReviewData] = useState({
    _id: null, // To track the review being edited
    reviewerName: '',
    company: '',
    content: '',
    isApproved: false,
  });

  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://backend-5kh4.onrender.com"
      : "http://localhost:5001";

  // Fetch all reviews for admin
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/reviews/admin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setMessage('Failed to fetch reviews');
      }
    };

    fetchReviews();
  }, []);

  const handleFeaturedSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const references = [
      featuredData.ref1,
      featuredData.ref2,
      featuredData.ref3,
      featuredData.ref4,
    ].filter(ref => ref);

    if (references.length === 0) {
      setMessage('At least one reference number is required!');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/featured`, {
        references,
      });

      setMessage('Featured properties saved successfully!');
      console.log('Featured properties saved:', response.data);

      setFeaturedData({
        ref1: '',
        ref2: '',
        ref3: '',
        ref4: '',
      });
    } catch (error) {
      console.error('Error saving featured properties:', error);
      setMessage(
        error.response?.data?.message || 'Failed to save featured properties'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleHeroSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!heroData.heading || !heroData.subheading || !heroData.image) {
      setMessage('All fields are required!');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('heading', heroData.heading);
    formData.append('subheading', heroData.subheading);
    formData.append('image', heroData.image);

    try {
      const response = await axios.post(`${BASE_URL}/api/hero`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage('Hero content saved successfully!');
      console.log('Hero saved:', response.data);

      setHeroData({
        heading: '',
        subheading: '',
        image: null,
      });
    } catch (error) {
      console.error('Error saving hero:', error);
      setMessage(error.response?.data?.message || 'Failed to save hero content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMansionSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!mansionData.description || !mansionData.btntext) {
      setMessage('Description and button text are required!');
      setIsLoading(false);
      return;
    }

    const references = [
      mansionData.ref1,
      mansionData.ref2,
      mansionData.ref3,
      mansionData.ref4,
    ].filter(ref => ref);

    try {
      await axios.post(`${BASE_URL}/api/mansion`, {
        description: mansionData.description,
        btntext: mansionData.btntext,
      });

      if (references.length > 0) {
        await axios.post(`${BASE_URL}/api/mansion/featured`, {
          references,
        });
      }

      setMessage('Mansion content saved successfully!');
      console.log('Mansion saved:', { description: mansionData.description, btntext: mansionData.btntext, references });

      setMansionData({
        description: '',
        btntext: '',
        ref1: '',
        ref2: '',
        ref3: '',
        ref4: '',
      });
    } catch (error) {
      console.error('Error saving mansion:', error);
      setMessage(error.response?.data?.message || 'Failed to save mansion content');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePenthouseSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!penthouseData.description || !penthouseData.btntext) {
      setMessage('Description and button text are required!');
      setIsLoading(false);
      return;
    }

    const references = [
      penthouseData.ref1,
      penthouseData.ref2,
      penthouseData.ref3,
      penthouseData.ref4,
    ].filter(ref => ref);

    try {
      await axios.post(`${BASE_URL}/api/penthouse`, {
        description: penthouseData.description,
        btntext: penthouseData.btntext,
      });

      if (references.length > 0) {
        await axios.post(`${BASE_URL}/api/penthouse/featured`, {
          references,
        });
      }

      setMessage('Penthouse content saved successfully!');
      console.log('Penthouse saved:', { description: penthouseData.description, btntext: penthouseData.btntext, references });

      setPenthouseData({
        description: '',
        btntext: '',
        ref1: '',
        ref2: '',
        ref3: '',
        ref4: '',
      });
    } catch (error) {
      console.error('Error saving penthouse:', error);
      setMessage(error.response?.data?.message || 'Failed to save penthouse content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCollectiblesSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!collectiblesData.description || !collectiblesData.btntext) {
      setMessage('Description and button text are required!');
      setIsLoading(false);
      return;
    }

    const references = [
      collectiblesData.ref1,
      collectiblesData.ref2,
      collectiblesData.ref3,
      collectiblesData.ref4,
    ].filter(ref => ref);

    try {
      await axios.post(`${BASE_URL}/api/collectibles`, {
        description: collectiblesData.description,
        btntext: collectiblesData.btntext,
      });

      if (references.length > 0) {
        await axios.post(`${BASE_URL}/api/collectibles/featured`, {
          references,
        });
      }

      setMessage('Collectibles content saved successfully!');
      console.log('Collectibles saved:', { description: collectiblesData.description, btntext: collectiblesData.btntext, references });

      setCollectiblesData({
        description: '',
        btntext: '',
        ref1: '',
        ref2: '',
        ref3: '',
        ref4: '',
      });
    } catch (error) {
      console.error('Error saving collectibles:', error);
      setMessage(error.response?.data?.message || 'Failed to save collectibles content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagazineSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!magazineData.heading || !magazineData.subheading || !magazineData.image) {
      setMessage('All fields are required!');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('heading', magazineData.heading);
    formData.append('subheading', magazineData.subheading);
    formData.append('image', magazineData.image);

    try {
      const response = await axios.post(`${BASE_URL}/api/magazine`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage('Magazine content saved successfully!');
      console.log('Magazine saved:', response.data);

      setMagazineData({
        heading: '',
        subheading: '',
        image: null,
      });
    } catch (error) {
      console.error('Error saving magazine:', error);
      setMessage(error.response?.data?.message || 'Failed to save magazine content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!reviewData.reviewerName || !reviewData.company || !reviewData.content) {
      setMessage('Reviewer name, company, and content are required!');
      setIsLoading(false);
      return;
    }

    try {
      let response;
      if (reviewData._id) {
        // Update existing review
        response = await axios.put(
          `${BASE_URL}/api/reviews/${reviewData._id}`,
          {
            reviewerName: reviewData.reviewerName,
            company: reviewData.company,
            content: reviewData.content,
            isApproved: reviewData.isApproved,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setMessage('Review updated successfully!');
      } else {
        // Create new review
        response = await axios.post(
          `${BASE_URL}/api/reviews`,
          {
            reviewerName: reviewData.reviewerName,
            company: reviewData.company,
            content: reviewData.content,
            isApproved: reviewData.isApproved,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setMessage('Review saved successfully!');
      }

      console.log('Review saved/updated:', response.data);

      // Update reviews list
      const updatedReviews = await axios.get(`${BASE_URL}/api/reviews/admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setReviews(updatedReviews.data);

      // Reset form
      setReviewData({
        _id: null,
        reviewerName: '',
        company: '',
        content: '',
        isApproved: false,
      });
    } catch (error) {
      console.error('Error saving/updating review:', error);
      setMessage(error.response?.data?.message || 'Failed to save/update review');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditReview = (review) => {
    setReviewData({
      _id: review._id,
      reviewerName: review.reviewerName,
      company: review.company,
      content: review.content,
      isApproved: review.isApproved,
    });
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    setIsLoading(true);
    setMessage('');

    try {
      await axios.delete(`${BASE_URL}/api/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setMessage('Review deleted successfully!');
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
      setMessage(error.response?.data?.message || 'Failed to delete review');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setReviewData({
      _id: null,
      reviewerName: '',
      company: '',
      content: '',
      isApproved: false,
    });
  };

  return (
    <div className="w-full mx-auto p-4 md:p-20 mb-8">
      <div className="bg-white shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Hero Section</h2>
        <form onSubmit={handleHeroSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setHeroData({ ...heroData, image: e.target.files[0] })}
              className="w-full p-2 border outline-none mb-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
            <input
              type="text"
              value={heroData.heading}
              onChange={(e) => setHeroData({ ...heroData, heading: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter hero heading"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subheading</label>
            <input
              type="text"
              value={heroData.subheading}
              onChange={(e) => setHeroData({ ...heroData, subheading: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter hero subheading"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-800 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Saving...' : 'Save Hero Content'}
          </button>
        </form>
        {message && (
          <div className={`mt-4 p-3 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}
      </div>

      <div className="bg-white shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Featured Listings Section</h2>
        <form onSubmit={handleFeaturedSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reference No 1</label>
            <input
              type="text"
              value={featuredData.ref1}
              onChange={(e) => setFeaturedData({ ...featuredData, ref1: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter reference number 1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reference No 2</label>
            <input
              type="text"
              value={featuredData.ref2}
              onChange={(e) => setFeaturedData({ ...featuredData, ref2: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter reference number 2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reference No 3</label>
            <input
              type="text"
              value={featuredData.ref3}
              onChange={(e) => setFeaturedData({ ...featuredData, ref3: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter reference number 3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reference No 4</label>
            <input
              type="text"
              value={featuredData.ref4}
              onChange={(e) => setFeaturedData({ ...featuredData, ref4: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter reference number 4"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-800 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Saving...' : 'Save Featured Properties'}
          </button>
        </form>
        {message && (
          <div className={`mt-4 p-3 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}
      </div>

      <div className="bg-white shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Mansion Section</h2>
        <form onSubmit={handleMansionSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              value={mansionData.description}
              onChange={(e) => setMansionData({ ...mansionData, description: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter mansion description"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
            <input
              type="text"
              value={mansionData.btntext}
              onChange={(e) => setMansionData({ ...mansionData, btntext: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter mansion button text"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reference No 1</label>
            <input
              type="text"
              value={mansionData.ref1}
              onChange={(e) => setMansionData({ ...mansionData, ref1: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter reference number 1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reference No 2</label>
            <input
              type="text"
              value={mansionData.ref2}
              onChange={(e) => setMansionData({ ...mansionData, ref2: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter reference number 2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reference No 3</label>
            <input
              type="text"
              value={mansionData.ref3}
              onChange={(e) => setMansionData({ ...mansionData, ref3: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter reference number 3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reference No 4</label>
            <input
              type="text"
              value={mansionData.ref4}
              onChange={(e) => setMansionData({ ...mansionData, ref4: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter reference number 4"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-800 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Saving...' : 'Save Mansion Content'}
          </button>
        </form>
        {message && (
          <div className={`mt-4 p-3 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}
      </div>

      <div className="bg-white shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Penthouse Section</h2>
        <form onSubmit={handlePenthouseSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              value={penthouseData.description}
              onChange={(e) => setPenthouseData({ ...penthouseData, description: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter penthouse description"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
            <input
              type="text"
              value={penthouseData.btntext}
              onChange={(e) => setPenthouseData({ ...penthouseData, btntext: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter penthouse button text"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reference No 1</label>
            <input
              type="text"
              value={penthouseData.ref1}
              onChange={(e) => setPenthouseData({ ...penthouseData, ref1: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter reference number 1"
            />
          </div>
          <div>
            <label className="block/quotes/quotes text-sm font-medium text-gray-700 mb-1">Reference No 2</label>
            <input
              type="text"
              value={penthouseData.ref2}
              onChange={(e) => setPenthouseData({ ...penthouseData, ref2: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter reference number 2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reference No 3</label>
            <input
              type="text"
              value={penthouseData.ref3}
              onChange={(e) => setPenthouseData({ ...penthouseData, ref3: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter reference number 3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reference No 4</label>
            <input
              type="text"
              value={penthouseData.ref4}
              onChange={(e) => setPenthouseData({ ...penthouseData, ref4: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter reference number 4"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-800 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Saving...' : 'Save Penthouse Content'}
          </button>
        </form>
        {message && (
          <div className={`mt-4 p-3 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}
      </div>

      <div className="bg-white shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Collectibles Section</h2>
        <form onSubmit={handleCollectiblesSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              value={collectiblesData.description}
              onChange={(e) => setCollectiblesData({ ...collectiblesData, description: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter collectibles description"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
            <input
              type="text"
              value={collectiblesData.btntext}
              onChange={(e) => setCollectiblesData({ ...collectiblesData, btntext: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter collectibles button text"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reference No 1</label>
            <input
              type="text"
              value={collectiblesData.ref1}
              onChange={(e) => setCollectiblesData({ ...collectiblesData, ref1: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter reference number 1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reference No 2</label>
            <input
              type="text"
              value={collectiblesData.ref2}
              onChange={(e) => setCollectiblesData({ ...collectiblesData, ref2: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter reference number 2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reference No 3</label>
            <input
              type="text"
              value={collectiblesData.ref3}
              onChange={(e) => setCollectiblesData({ ...collectiblesData, ref3: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter reference number 3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reference No 4</label>
            <input
              type="text"
              value={collectiblesData.ref4}
              onChange={(e) => setCollectiblesData({ ...collectiblesData, ref4: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter reference number 4"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-800 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Saving...' : 'Save Collectibles Content'}
          </button>
        </form>
        {message && (
          <div className={`mt-4 p-3 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}
      </div>

      <div className="bg-white shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Magazine Section</h2>
        <form onSubmit={handleMagazineSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Magazine Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setMagazineData({ ...magazineData, image: e.target.files[0] })}
              className="w-full p-2 border outline-none mb-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Magazine Heading</label>
            <input
              type="text"
              value={magazineData.heading}
              onChange={(e) => setMagazineData({ ...magazineData, heading: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter magazine heading"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Magazine Subheading</label>
            <input
              type="text"
              value={magazineData.subheading}
              onChange={(e) => setMagazineData({ ...magazineData, subheading: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter magazine subheading"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-800 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Saving...' : 'Save Magazine Content'}
          </button>
        </form>
        {message && (
          <div className={`mt-4 p-3 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}
      </div>

      <div className="bg-white shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Client Reviews Section</h2>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reviewer Name</label>
            <input
              type="text"
              value={reviewData.reviewerName}
              onChange={(e) => setReviewData({ ...reviewData, reviewerName: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter reviewer name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input
              type="text"
              value={reviewData.company}
              onChange={(e) => setReviewData({ ...reviewData, company: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter company name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Review Content</label>
            <textarea
              value={reviewData.content}
              onChange={(e) => setReviewData({ ...reviewData, content: e.target.value })}
              className="w-full p-2 border outline-none mb-2"
              placeholder="Enter review content"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Approve Review</label>
            <input
              type="checkbox"
              checked={reviewData.isApproved}
              onChange={(e) => setReviewData({ ...reviewData, isApproved: e.target.checked })}
              className="h-5 w-5 text-gray-900 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">Check to approve review for public display</span>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-800 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Saving...' : reviewData._id ? 'Update Review' : 'Save Review'}
            </button>
            {reviewData._id && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
        {message && (
          <div className={`mt-4 p-3 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Existing Reviews</h3>
          {reviews.length === 0 ? (
            <p className="text-gray-600">No reviews available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Reviewer Name</th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Company</th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Content</th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Approved</th>
                    <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review._id}>
                      <td className="px-4 py-2 border text-sm text-gray-600">{review.reviewerName}</td>
                      <td className="px-4 py-2 border text-sm text-gray-600">{review.company}</td>
                      <td className="px-4 py-2 border text-sm text-gray-600">{review.content.substring(0, 50)}...</td>
                      <td className="px-4 py-2 border text-sm text-gray-600">{review.isApproved ? 'Yes' : 'No'}</td>
                      <td className="px-4 py-2 border text-sm">
                        <button
                          onClick={() => handleEditReview(review)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePageForm;