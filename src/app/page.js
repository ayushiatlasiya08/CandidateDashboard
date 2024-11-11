'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

export default function Dashboard() {
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCandidates = async (page) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/candidates?page=${page}&limit=${limit}`);
      setCandidates(response.data);

      const totalCandidatesResponse = await axios.get('http://localhost:4000/api/candidates/count');
      const totalCandidates = totalCandidatesResponse.data.count;
      setTotalPages(Math.ceil(totalCandidates / limit));
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load candidates. Please try again later.');
    }
  };

  useEffect(() => {
    fetchCandidates(page);
  }, [page]);

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Candidate Dashboard</h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="shadow-lg rounded-lg overflow-hidden bg-white">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{candidate.name}</p>
                  </td>
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                    <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                      candidate.status === 'Done' ? 'text-green-900 bg-green-100' : 'text-yellow-900 bg-yellow-100'
                    } rounded-full`}>
                      <span aria-hidden="true" className="absolute inset-0 opacity-50 rounded-full"></span>
                      <span className="relative">{candidate.status}</span>
                    </span>
                  </td>
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{formatDate(candidate.date)}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center p-5 bg-gray-100">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
