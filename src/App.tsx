import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  skills: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    skills: '',
  });

  useEffect(() => {
    chrome.storage.sync.get(['formData'], (result) => {
      if (result.formData) {
        setFormData(result.formData);
      }
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    chrome.storage.sync.set({ formData }, () => {
      alert('Data saved successfully!');
    });
  };

  return (
    <div className="w-80 p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Freelancer.com Auto-fill</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
          <textarea
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={3}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center justify-center"
        >
          <Save className="mr-2" size={18} />
          Save
        </button>
      </form>
    </div>
  );
}

export default App;