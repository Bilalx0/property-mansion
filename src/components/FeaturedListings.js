import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MansionCard from './Card';

const FeaturedListings = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [mansionFeatured, setMansionFeatured] = useState([]);
  const [penthouseFeatured, setPenthouseFeatured] = useState([]);
  const [collectiblesFeatured, setCollectiblesFeatured] = useState([]);
  const [mansionDescription, setMansionDescription] = useState('');
  const [mansionBtnText, setMansionBtnText] = useState('');
  const [penthouseDescription, setPenthouseDescription] = useState('');
  const [penthouseBtnText, setPenthouseBtnText] = useState('');
  const [collectiblesDescription, setCollectiblesDescription] = useState('');
  const [collectiblesBtnText, setCollectiblesBtnText] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Featured Listings
        const featuredRes = await axios.get('http://localhost:5001/api/featured');
        console.log('Featured Properties:', featuredRes.data);
        setFeaturedProperties(featuredRes.data);

        // Fetch Mansion Featured
        const mansionRes = await axios.get('http://localhost:5001/api/mansion/featured');
        console.log('Mansion Featured:', mansionRes.data);
        setMansionFeatured(mansionRes.data);

        // Fetch Penthouse Featured
        const penthouseRes = await axios.get('http://localhost:5001/api/penthouse/featured');
        console.log('Penthouse Featured:', penthouseRes.data);
        setPenthouseFeatured(penthouseRes.data);

        // Fetch Collectibles Featured
        const collectiblesRes = await axios.get('http://localhost:5001/api/collectibles/featured');
        console.log('Collectibles Featured:', collectiblesRes.data);
        setCollectiblesFeatured(collectiblesRes.data);

        // Fetch Mansion Description and Button Text
        const mansionContentRes = await axios.get('http://localhost:5001/api/mansion');
        console.log('Mansion Content:', mansionContentRes.data);
        setMansionDescription(mansionContentRes.data.description || 'No description available');
        setMansionBtnText(mansionContentRes.data.btntext || 'No button text available');

        // Fetch Penthouse Description and Button Text
        const penthouseContentRes = await axios.get('http://localhost:5001/api/penthouse');
        console.log('Penthouse Content:', penthouseContentRes.data);
        setPenthouseDescription(penthouseContentRes.data.description || 'No description available');
        setPenthouseBtnText(penthouseContentRes.data.btntext || 'No button text available');

        // Fetch Collectibles Description and Button Text
        const collectiblesContentRes = await axios.get('http://localhost:5001/api/collectibles');
        console.log('Collectibles Content:', collectiblesContentRes.data);
        setCollectiblesDescription(collectiblesContentRes.data.description || 'No description available');
        setCollectiblesBtnText(collectiblesContentRes.data.btntext || 'No button text available');
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load content. Please try again later.');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="px-4 md:px-8 lg:px-20 py-20 border-b border-[#00603A]">
        <h2 className="text-2xl md:text-3xl text-center md:text-left font-playfair text-[#00603A] mb-6">
          Featured Listings
        </h2>
        {error && (
          <p className="text-center text-red-600 col-span-4">{error}</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8">
          {featuredProperties.length > 0 ? (
            featuredProperties.map((mansion) => (
              <MansionCard key={mansion.reference} mansion={mansion} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-4">No featured properties available</p>
          )}
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-20 py-20 border-b border-[#00603A]">
        <h2 className="text-2xl md:text-3xl text-center md:text-left font-playfair text-[#00603A] mb-6">
          Newly Listed Mansions
        </h2>
        {error && (
          <p className="text-center text-red-600 col-span-4">{error}</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8">
          {mansionFeatured.length > 0 ? (
            mansionFeatured.map((mansion) => (
              <MansionCard key={mansion.reference} mansion={mansion} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-4">No featured mansions available</p>
          )}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 space-y-6 md:space-y-0">
          <p className="font-inter text-gray-600 text-center md:text-left max-w-2xl">
            {mansionDescription}
          </p>
          <a href="/mansions">
            <button className="font-inter px-20 py-3 text-black border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300">
              {mansionBtnText}
            </button>
          </a>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-20 py-20 border-b border-[#00603A]">
        <h2 className="text-2xl md:text-3xl text-center md:text-left font-playfair text-[#00603A] mb-6">
          Newly Listed Penthouses
        </h2>
        {error && (
          <p className="text-center text-red-600 col-span-4">{error}</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8">
          {penthouseFeatured.length > 0 ? (
            penthouseFeatured.map((mansion) => (
              <MansionCard key={mansion.reference} mansion={mansion} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-4">No featured penthouses available</p>
          )}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 space-y-6 md:space-y-0">
          <p className="font-inter text-gray-600 text-center md:text-left max-w-2xl">
            {penthouseDescription}
          </p>
          <a href="/penthouses">
            <button className="font-inter px-20 py-3 text-black border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300">
              {penthouseBtnText}
            </button>
          </a>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-20 py-20 border-b border-[#00603A]">
        <h2 className="text-2xl md:text-3xl text-center md:text-left font-playfair text-[#00603A] mb-6">
          Newly Listed Collectibles
        </h2>
        {error && (
          <p className="text-center text-red-600 col-span-4">{error}</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8">
          {collectiblesFeatured.length > 0 ? (
            collectiblesFeatured.map((mansion) => (
              <MansionCard key={mansion.reference} mansion={mansion} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-4">No featured collectibles available</p>
          )}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 space-y-6 md:space-y-0">
          <p className="font-inter text-gray-600 text-center md:text-left max-w-2xl">
            {collectiblesDescription}
          </p>
          <a href="/listedcollectibles">
            <button className="font-inter px-20 py-3 text-black border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300">
              {collectiblesBtnText}
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default FeaturedListings;