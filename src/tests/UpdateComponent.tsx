import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from "../config/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import Editor from '@monaco-editor/react';

const AddComponentById: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [existingData, setExistingData] = useState<Array<any>>([]);
    const [title, setTitle] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [variation, setVariation] = useState<number | ''>('');
    const [githubLink, setGithubLink] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;

            try {
                const docRef = doc(db, "atoms", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setExistingData(data?.data || []);
                } else {
                    setMessage("Document does not exist");
                }
            } catch (error) {
                setMessage(`Error fetching data: ${error}`);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!id) {
            setMessage("Invalid document ID");
            return;
        }

        try {
            const docRef = doc(db, "atoms", id);
            await updateDoc(docRef, {
                data: arrayUnion({
                    title,
                    code,
                    description,
                    variation,
                    githubLink,
                }),
            });

            // Update UI with the newly added data
            setExistingData(prev => [
                ...prev,
                { title, code, description, variation, githubLink },
            ]);

            // Reset form fields
            setTitle('');
            setCode('');
            setDescription('');
            setVariation('');
            setGithubLink('');

            setMessage('Data added successfully!');
        } catch (error) {
            setMessage(`Error adding data: ${error}`);
        }
    };

    return (
        <div className="flex flex-col items-center w-full h-screen my-32">
            <h2 className="text-2xl font-bold mb-8 text-center">Add Data to Document</h2>

            {message && (
                <div className={`mb-4 p-2 text-center rounded-md ${message.includes('Error') ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                    {message}
                </div>
            )}

            {/* Display Existing Data */}
            <div className="w-8/12 mb-8">
                <h3 className="text-xl font-semibold mb-4">Existing Data:</h3>
                {existingData.length > 0 ? (
                    <ul className="space-y-4">
                        {existingData.map((item, index) => (
                            <li key={index} className="p-4 border rounded-md bg-gray-100">
                                <p><strong>Title:</strong> {item.title}</p>
                                <p><strong>Code:</strong> {item.code}</p>
                                <p><strong>Description:</strong> {item.description}</p>
                                <p><strong>Variation:</strong> {item.variation}</p>
                                <p><strong>GitHub Link:</strong> <a href={item.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">{item.githubLink}</a></p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No existing data found.</p>
                )}
            </div>

            {/* Form to Add Data */}
            <form onSubmit={handleSubmit} className="space-y-4 w-6/12 mx-auto px-8 py-6 bg-primary text-base-light rounded-lg shadow-md">
                <div>
                    <label className="block text-sm font-medium text-base-light">
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="mt-1 block w-full border border-base-light rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 text-base-dark"
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-base-light">
                        Code:
                        <Editor
                            height="200px"
                            language="javascript"
                            value={code}
                            onChange={(value) => setCode(value || '')}
                            options={{
                                minimap: { enabled: false },
                                lineNumbers: "on",
                                automaticLayout: true,
                            }}
                            className="mt-1"
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-base-light">
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="mt-1 block w-full border border-base-light rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 text-base-dark h-32 resize-none"
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-base-light">
                        Variation:
                        <input
                            type="number"
                            value={variation}
                            onChange={(e) => setVariation(e.target.value ? Number(e.target.value) : '')}
                            required
                            className="mt-1 block w-full border border-base-light rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 text-base-dark"
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-base-light">
                        GitHub Link:
                        <input
                            type="text"
                            value={githubLink}
                            onChange={(e) => setGithubLink(e.target.value)}
                            required
                            className="mt-1 block w-full border border-base-light rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 text-base-dark"
                        />
                    </label>
                </div>

                <button type="submit" className="w-full bg-secondary py-2 rounded-lg cursor-pointer font-semibold my-10">Submit</button>
            </form>
        </div>
    );
};

export default AddComponentById;