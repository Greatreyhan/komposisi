import React, { useState } from 'react';
import { db } from "../config/firebase";
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import Editor from '@monaco-editor/react';

const AddComponent: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [type, setType] = useState<string>(''); 
    const [code, setCode] = useState<string>(''); 
    const [description, setDescription] = useState<string>(''); 
    const [variation, setVariation] = useState<number | ''>(''); 
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, type), {
                name,
                type,
                code,
                description,
                variation,
                created: Timestamp.now(),
            });
            setName('');
            setType('');
            setCode('');
            setDescription('');
            setVariation('');
            setMessage('Message sent successfully!');
        } catch (err) {
            setMessage('Error sending message: ' + err);
        }
    };

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <form onSubmit={handleSubmit} className="space-y-4 w-6/12 mx-auto px-8 py-6 bg-primary text-base-light rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-8 text-center">Add New Component</h2>

                {message && (
                    <div className={`mb-4 p-2 text-center rounded-md ${message.includes('Error') ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                        {message}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-base-light">
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full border border-base-light rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 text-base-dark"
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-base-light">
                        Type:
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                            className="mt-1 block w-full border border-base-light rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 text-base-dark"
                        >
                            <option value="" disabled>Select type</option>
                            <option value="atoms">Atoms</option>
                            <option value="molecules">Molecules</option>
                            <option value="organisms">Organisms</option>
                            <option value="templates">Templates</option>
                            <option value="pages">Pages</option>
                        </select>
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

                <button type="submit" className="w-full bg-secondary py-2 rounded-lg cursor-pointer font-semibold my-10">Submit</button>
            </form>
        </div>
    );
};

export default AddComponent;
