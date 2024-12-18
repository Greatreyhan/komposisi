import React, { useEffect, useState } from 'react'
import LinkUrl from '../atoms/LinkUrl';
import List from '../molecules/List';
import { collection, query, onSnapshot} from "firebase/firestore";
import { db } from "../../config/firebase";
import axios from 'axios';

interface SidebarProps {
    className?: string;
}

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

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
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
    return (
        <div className={`bg-base-light border-r overflow-y-auto h-screen ${className}`}>
            <div className="flex flex-col sm:flex-row sm:justify-around">
                <div className="h-full w-full py-8">

                    <nav className="mt-10 px-6 pb-8">
                        <p className='text-sm font-semibold mb-2 mt-4'>Atoms</p>
                        <List>
                            {cards?.map(card => {
                                return(<List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>{card.name}</LinkUrl></List.Item>)
                            })}
                            </List>
                        {/* <List>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Avatars</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Alert</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Badges</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Button</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Bars</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Checkbox</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Icon</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Image</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Input Field</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Link</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Progress Bar</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Divider</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Radio</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Tag</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Toggles</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Text</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Toggles</LinkUrl></List.Item>
                        </List> */}
{/* 
                        <p className='text-sm font-semibold mb-2 mt-4'>Molecules</p>
                        <List>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>List Wrapper</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Navigation Wrapper</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Search Bar</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Card</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Accordion</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Tabs</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Modal Header</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Media Object</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Notification Item</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Input Group</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Toggle Group</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Stepper</LinkUrl></List.Item>
                        </List>

                        <p className='text-sm font-semibold mb-2 mt-4'>Organisms</p>
                        <List>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Sidebar</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Header</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Footer</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Navigation Bar</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Modal</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Form</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Table</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Card List</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Dashboard Panel</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Notification Center</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Profile Sidebar</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Content Grid</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Hero Section</LinkUrl></List.Item>
                        </List>

                        <p className='text-sm font-semibold mb-2 mt-4'>Templates</p>
                        <List>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Authentication</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Dashboard</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Profile</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Settings</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Landing</LinkUrl></List.Item>
                        </List>

                        <p className='text-sm font-semibold mb-2 mt-4'>Pages</p>
                        <List>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Landing Page</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Dashboard Page</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Product Page</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>About Page</LinkUrl></List.Item>
                        </List> */}
                    </nav>
                </div>
            </div>
        </div>

    )
}

export default Sidebar