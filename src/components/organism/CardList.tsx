import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../molecules/Card';
import Title from '../atoms/Title';
import { collection, query, onSnapshot} from "firebase/firestore";
import { db } from "../../config/firebase";

// Define the structure of the card data
interface CardData {
  id: string;
  name: string;
  type: string;
  description?: string;
  image: string;
  data: [
    {
      title: string;
      variation: string;
      description: string;
      code: string;
      image: string;
    }
  ]
}

const CardList: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]); // State to hold the fetched card data
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'atoms'));
        onSnapshot(q, (querySnapshot) => {
          const fetchedCards = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data() as Omit<CardData, 'id'> // Spread the data and omit the id
          }));
          setCards(fetchedCards);
        });
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response.data.message || 'An error occurred while fetching data');
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>; // Error state
  }

  const sections = ['atoms', 'molecules', 'organisms', 'templates', 'pages'];

  return (
    <>
      {sections.map(section => (
        <div key={section}>
          <Title variant='h3' className='my-8'>{`${section.charAt(0).toUpperCase() + section.slice(1)} Section`}</Title>
          <div className='flex flex-wrap gap-10 justify-end'>
            {cards.filter(card => card.type === section).map(card => (
              <Card
                key={card.id}
                to={`/details/${card.id}`}
                title={card.name}
                subtitle={`${card.data.length ?? 0} variations`}
                src={card.image}
                alt={card.name}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default CardList;