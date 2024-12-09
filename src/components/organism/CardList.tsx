import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../molecules/Card';
import Title from '../atoms/Title';

// Define the structure of the card data
interface CardData {
  id: number; // Assuming id is a number
  link: string; // URL for the card link
  title: string; // Title of the card
  subtitle: string; // Subtitle of the card
  image: string; // Image URL for the card
}

const CardList: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]); // State to hold the fetched card data
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CardData[]>('https://'); // Replace with your API endpoint
        const data = response.data;

        if (data.length === 0) {
          setCards(getDummyData());
        } else {
          setCards(data);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response.data.message || 'An error occurred while fetching data');
        } else {
          setError('An unknown error occurred');
        }
        setCards(getDummyData());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to generate dummy data
  const getDummyData = (): CardData[] => {
    return [
      {
        id: 1,
        link: '/details',
        title: 'Button',
        subtitle: '1 variations',
        image: '/src/assets/components.jpg',
      },
      {
        id: 2,
        link: '/details',
        title: 'Button',
        subtitle: '2 variations',
        image: '/src/assets/components.jpg',
      },
      {
        id: 3,
        link: '/details',
        title: 'Button',
        subtitle: '3 variations',
        image: '/src/assets/components.jpg',
      },
      {
        id: 4,
        link: '/details',
        title: 'Button',
        subtitle: '4 variations',
        image: '/src/assets/components.jpg',
      },
    ];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error: {error}</div>; // Error state
  // }

  return (
    <>
      <div>
        <Title variant='h3' className='my-8'>Atoms Section</Title>
        <div className='flex flex-wrap gap-10 justify-end'>
          {cards?.map((card) => (
            <Card
              key={card.id}
              to={card.link}
              title={card.title}
              subtitle={card.subtitle}
              src={card.image}
            />
          ))}
        </div>
      </div>
      <div>
        <Title variant='h3' className='my-8'>Molecules Section</Title>
        <div className='flex flex-wrap gap-10 justify-end'>
          {cards?.map((card) => (
            <Card
              key={card.id}
              to={card.link}
              title={card.title}
              subtitle={card.subtitle}
              src={card.image}
            />
          ))}
        </div>
      </div>
      <div>
        <Title variant='h3' className='my-8'>Organisms Section</Title>
        <div className='flex flex-wrap gap-10 justify-end'>
          {cards?.map((card) => (
            <Card
              key={card.id}
              to={card.link}
              title={card.title}
              subtitle={card.subtitle}
              src={card.image}
            />
          ))}
        </div>
      </div>
      <div>
        <Title variant='h3' className='my-8'>Templates Section</Title>
        <div className='flex flex-wrap gap-10 justify-end'>
          {cards?.map((card) => (
            <Card
              key={card.id}
              to={card.link}
              title={card.title}
              subtitle={card.subtitle}
              src={card.image}
            />
          ))}
        </div>
      </div>
      <div>
        <Title variant='h3' className='my-8'>Pages Section</Title>
        <div className='flex flex-wrap gap-10 justify-end'>
          {cards?.map((card) => (
            <Card
              key={card.id}
              to={card.link}
              title={card.title}
              subtitle={card.subtitle}
              src={card.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CardList;