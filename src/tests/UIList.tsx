import axios from 'axios';
import { collection, onSnapshot, query, doc, deleteDoc, listCollections } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { Button, LinkUrl } from '../components/atoms';

interface CardData {
    id: string;
    name: string;
    type: string;
    variation: string;
    description: string;
    code: string;
    image: string;
}

const UIList = () => {
    const [cards, setCards] = useState<CardData[]>([]); // State to hold fetched card data
    const [loading, setLoading] = useState<boolean>(true); // State to manage loading state
    const [error, setError] = useState<string | null>(null); // State to manage error state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(db, 'atoms'));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const fetchedCards = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    } as CardData));
                    setCards(fetchedCards);
                    setLoading(false);
                });
                return unsubscribe;
            } catch (err) {
                setError('An error occurred while fetching data ');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const docRef = doc(db, 'atoms', id);
            await deleteDoc(docRef);
            setCards(prevCards => prevCards.filter(card => card.id !== id)); // Optimistic update
        } catch (err) {
            console.error('Error deleting document: ', err);
            setError('Failed to delete the card. Please try again.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className="w-10/12 mx-auto mt-8 flex justify-end">
                <LinkUrl to="/add">Add Component</LinkUrl>
            </div>
            <div className="flex justify-center mt-4">
                <table className="table p-4 bg-white rounded-lg shadow w-10/12 mx-auto">
                    <thead>
                        <tr>
                            <th className="border p-4 whitespace-nowrap font-normal text-gray-900">#</th>
                            <th className="border p-4 whitespace-nowrap font-normal text-gray-900">Name</th>
                            <th className="border p-4 whitespace-nowrap font-normal text-gray-900">Type</th>
                            <th className="border p-4 whitespace-nowrap font-normal text-gray-900">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cards.length > 0 ? (
                            cards.map((data, index) => (
                                <tr key={data.id} className="text-gray-700">
                                    <td className="border p-4 text-center">{index + 1}</td>
                                    <td className="border p-4">{data.name}</td>
                                    <td className="border p-4">{data.type}</td>
                                    <td className="border p-4 flex justify-center items-center gap-x-2">
                                        <LinkUrl to={"/add/"+data.id}>Add</LinkUrl>
                                        <Button>Edit</Button>
                                        <Button onClick={() => handleDelete(data.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="border p-4 text-center">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UIList;
