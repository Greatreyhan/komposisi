import React, { useState, useEffect } from 'react';
import Navigation from '../organism/Navigation';
import DetailLayout from '../templates/DetailLayout';
import PageDescription from '../organism/PageDescription';
import CodeComponent from '../molecules/CodeComponent';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

// Define the structure of the card data
interface CardData {
  id: string; 
  name: string;
  type: string; 
  variation: string;
  description: string; 
  code: string; 
  image: string; 
}

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the id from URL params
  const [card, setCard] = useState<CardData | null>(null); // State to hold the fetched card data
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage error state

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError('Invalid document ID.');
        setLoading(false);
        return;
      }

      try {
        // Reference the document by its ID
        const docRef = doc(db, 'atoms', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // Set the document data to state
          setCard({ id: docSnap.id, ...docSnap.data() } as CardData);
        } else {
          setError('No matching document found!');
        }
      } catch (error) {
        setError('An error occurred while fetching data: ' + error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, [id]); // Dependency array includes id to refetch if it changes

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error state
  }

  if (!card) {
    return <div>No data available.</div>; // Handle case where card is null
  }

  return (
    <DetailLayout 
      Navigation={<Navigation />} 
      Content={
        <div className='pt-16'>
          <PageDescription description={card.description} name={card.name} type={card.type} />
          <CodeComponent 
            className='mt-4' 
            name={card.name} 
            code={card.code} 
            language="tsx" 
          />
        </div>
      } 
    />
  );
};

export default Detail;