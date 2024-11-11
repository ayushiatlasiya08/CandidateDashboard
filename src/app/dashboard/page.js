// 'use client';

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-CA', {
//     timeZone: 'Asia/Kolkata',
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit'
//   });
// };

// export default function Dashboard() {
//   const [candidates, setCandidates] = useState([]);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(5);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchCandidates = async (page) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/api/candidates?page=${page}&limit=${limit}`);
//       setCandidates(response.data);

//       const totalCandidatesResponse = await axios.get('http://localhost:4000/api/candidates/count');
//       const totalCandidates = totalCandidatesResponse.data.count;
//       setTotalPages(Math.ceil(totalCandidates / limit));
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError('Failed to load candidates. Please try again later.');
//     }
//   };

//   useEffect(() => {
//     fetchCandidates(page);
//   }, [page]);

//   return (
//     <div className="container mx-auto px-6 py-10">
//       <h1 className="text-4xl font-bold text-center mb-10 text-orange-500">Candidate Dashboard</h1>
//       {error ? (
//         <p className="text-red-500 text-center">{error}</p>
//       ) : (
//         <div className="shadow-lg rounded-lg overflow-hidden bg-white">
//           <table className="min-w-full leading-normal">
//             <thead>
//               <tr>
//                 <th className="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Date
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {candidates.map((candidate) => (
//                 <tr key={candidate.id} className="hover:bg-gray-50 transition">
//                   <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
//                     <p className="text-gray-900 whitespace-no-wrap">{candidate.name}</p>
//                   </td>
//                   <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
//                     <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
//                       candidate.status === 'Done' ? 'text-green-900 bg-green-100' : 'text-yellow-900 bg-yellow-100'
//                     } rounded-full`}>
//                       <span aria-hidden="true" className="absolute inset-0 opacity-50 rounded-full"></span>
//                       <span className="relative">{candidate.status}</span>
//                     </span>
//                   </td>
//                   <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
//                     <p className="text-gray-900 whitespace-no-wrap">{formatDate(candidate.date)}</p>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className="flex justify-between items-center p-5 bg-gray-100">
//             <button
//               onClick={() => setPage(page - 1)}
//               disabled={page === 1}
//               className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <span className="text-gray-700">
//               Page {page} of {totalPages}
//             </span>
//             <button
//               onClick={() => setPage(page + 1)}
//               disabled={page === totalPages}
//               className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// 'use client';

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-CA', {
//     timeZone: 'Asia/Kolkata',
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit'
//   });
// };

// export default function Dashboard() {
//   const [candidates, setCandidates] = useState([]);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(5);
//   const [totalPages, setTotalPages] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newCandidate, setNewCandidate] = useState({ name: '', status: '', date: '' });

//   // Fetch all candidates and set initial pagination
//   const fetchCandidates = async (page) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/api/candidates?page=${page}&limit=${limit}`);
//       setCandidates(response.data);

//       const totalCandidatesResponse = await axios.get('http://localhost:4000/api/candidates/count');
//       const totalCandidates = totalCandidatesResponse.data.count;
//       setTotalPages(Math.ceil(totalCandidates / limit));
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError('Failed to load candidates. Please try again later.');
//     }
//   };

//   useEffect(() => {
//     fetchCandidates(page);
//   }, [page]);

//   // Function to handle form submission and add new candidate
//   const handleAddCandidate = async () => {
//     const candidateData = {
//       ...newCandidate,
//       date: formatDate(newCandidate.date),
//     };

//     try {
//       await axios.post(`http://localhost:4000/api/candidates`, candidateData);
//       setIsModalOpen(false); // Close modal
//       setNewCandidate({ name: '', status: '', date: '' }); // Reset form fields
//       fetchCandidates(page); // Refresh the list to include the new candidate
//     } catch (error) {
//       console.error('Error adding candidate:', error);
//       setError('Failed to add candidate. Please try again later.');
//     }
//   };

//   return (
//     <div className="container mx-auto px-6 py-10">
//       <h1 className="text-4xl font-bold text-center mb-10 text-orange-500">Candidate Dashboard</h1>
//       {error ? (
//         <p className="text-red-500 text-center">{error}</p>
//       ) : (
//         <div>
//           <div className="flex justify-between mb-4">
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="bg-green-500 text-white px-4 py-2 rounded"
//             >
//               Add Candidate
//             </button>
//           </div>
//           <div className="shadow-lg rounded-lg overflow-hidden bg-white">
//             <table className="min-w-full leading-normal">
//               <thead>
//                 <tr>
//                   <th className="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Name
//                   </th>
//                   <th className="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Date
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {candidates.map((candidate) => (
//                   <tr key={candidate.id} className="hover:bg-gray-50 transition">
//                     <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
//                       <p className="text-gray-900 whitespace-no-wrap">{candidate.name}</p>
//                     </td>
//                     <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
//                       <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
//                         candidate.status === 'Done' ? 'text-green-900 bg-green-100' : 'text-yellow-900 bg-yellow-100'
//                       } rounded-full`}>
//                         <span aria-hidden="true" className="absolute inset-0 opacity-50 rounded-full"></span>
//                         <span className="relative">{candidate.status}</span>
//                       </span>
//                     </td>
//                     <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
//                       <p className="text-gray-900 whitespace-no-wrap">{formatDate(candidate.date)}</p>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className="flex justify-between items-center p-5 bg-gray-100">
//               <button
//                 onClick={() => setPage(page - 1)}
//                 disabled={page === 1}
//                 className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
//               >
//                 Previous
//               </button>
//               <span className="text-gray-700">
//                 Page {page} of {totalPages}
//               </span>
//               <button
//                 onClick={() => setPage(page + 1)}
//                 disabled={page === totalPages}
//                 className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           </div>

//           {isModalOpen && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//               <div className="bg-white p-6 rounded shadow-lg w-1/3">
//                 <h2 className="text-xl font-bold mb-4">Add New Candidate</h2>
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   value={newCandidate.name}
//                   onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
//                   className="border w-full p-2 mb-4 rounded"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Status"
//                   value={newCandidate.status}
//                   onChange={(e) => setNewCandidate({ ...newCandidate, status: e.target.value })}
//                   className="border w-full p-2 mb-4 rounded"
//                 />
//                 <input
//                   type="date"
//                   value={newCandidate.date}
//                   onChange={(e) => setNewCandidate({ ...newCandidate, date: e.target.value })}
//                   className="border w-full p-2 mb-4 rounded"
//                 />
//                 <div className="flex justify-end space-x-4">
//                   <button
//                     onClick={() => setIsModalOpen(false)}
//                     className="px-4 py-2 bg-gray-400 text-white rounded"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleAddCandidate}
//                     className="px-4 py-2 bg-green-500 text-white rounded"
//                   >
//                     Add
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


// 'use client';

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-CA', {
//     timeZone: 'Asia/Kolkata',
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit'
//   });
// };

// export default function Dashboard() {
//   const [candidates, setCandidates] = useState([]);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(5);
//   const [totalPages, setTotalPages] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
//   const [newCandidate, setNewCandidate] = useState({ name: '', status: '', date: '' });
//   const [selectedCandidate, setSelectedCandidate] = useState(null); // For update modal

//   const fetchCandidates = async (page) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/api/candidates?page=${page}&limit=${limit}`);
//       setCandidates(response.data);

//       const totalCandidatesResponse = await axios.get('http://localhost:4000/api/candidates/count');
//       const totalCandidates = totalCandidatesResponse.data.count;
//       setTotalPages(Math.ceil(totalCandidates / limit));
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError('Failed to load candidates. Please try again later.');
//     }
//   };

//   useEffect(() => {
//     fetchCandidates(page);
//   }, [page]);

//   // Function to handle adding a new candidate
//   const handleAddCandidate = async () => {
//     try {
//       await axios.post(`http://localhost:4000/api/candidates`, newCandidate);
//       setIsModalOpen(false);
//       setNewCandidate({ name: '', status: '', date: '' });
//       fetchCandidates(page);
//     } catch (error) {
//       console.error('Error adding candidate:', error);
//       setError('Failed to add candidate. Please try again later.');
//     }
//   };

//   // Open update modal and set the selected candidate
//   const openUpdateModal = (candidate) => {
//     setSelectedCandidate({ ...candidate }); // Clone candidate data
//     setIsUpdateModalOpen(true);
//   };

//   // Function to handle updating a candidate
//   const handleUpdateCandidate = async () => {
//     try {
//       await axios.put(`http://localhost:4000/api/candidates/${selectedCandidate.id}`, selectedCandidate);
//       setIsUpdateModalOpen(false);
//       setSelectedCandidate(null);
//       fetchCandidates(page);
//     } catch (error) {
//       console.error('Error updating candidate:', error);
//       setError('Failed to update candidate. Please try again later.');
//     }
//   };

//   return (
//     <div className="container mx-auto px-6 py-10">
//       <h1 className="text-4xl font-bold text-center mb-10 text-orange-500">Candidate Dashboard</h1>
//       {error ? (
//         <p className="text-red-500 text-center">{error}</p>
//       ) : (
//         <div>
//           <div className="flex justify-between mb-4">
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="bg-green-500 text-white px-4 py-2 rounded"
//             >
//               Add Candidate
//             </button>
//           </div>
//           <div className="shadow-lg rounded-lg overflow-hidden bg-white">
//             <table className="min-w-full leading-normal">
//               <thead>
//                 <tr>
//                   <th className="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Name
//                   </th>
//                   <th className="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {candidates.map((candidate) => (
//                   <tr key={candidate.id} className="hover:bg-gray-50 transition">
//                     <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
//                       <p className="text-gray-900 whitespace-no-wrap">{candidate.name}</p>
//                     </td>
//                     <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
//                       <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
//                         candidate.status === 'Done' ? 'text-green-900 bg-green-100' : 'text-yellow-900 bg-yellow-100'
//                       } rounded-full`}>
//                         <span aria-hidden="true" className="absolute inset-0 opacity-50 rounded-full"></span>
//                         <span className="relative">{candidate.status}</span>
//                       </span>
//                     </td>
//                     <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
//                       <p className="text-gray-900 whitespace-no-wrap">{formatDate(candidate.date)}</p>
//                     </td>
//                     <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
//                       <button
//                         onClick={() => openUpdateModal(candidate)}
//                         className="bg-blue-500 text-white px-3 py-1 rounded"
//                       >
//                         Update
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className="flex justify-between items-center p-5 bg-gray-100">
//               <button
//                 onClick={() => setPage(page - 1)}
//                 disabled={page === 1}
//                 className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
//               >
//                 Previous
//               </button>
//               <span className="text-gray-700">
//                 Page {page} of {totalPages}
//               </span>
//               <button
//                 onClick={() => setPage(page + 1)}
//                 disabled={page === totalPages}
//                 className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           </div>

//           {isModalOpen && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//               <div className="bg-white p-6 rounded shadow-lg w-1/3">
//                 <h2 className="text-xl font-bold mb-4">Add New Candidate</h2>
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   value={newCandidate.name}
//                   onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
//                   className="border w-full p-2 mb-4 rounded"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Status"
//                   value={newCandidate.status}
//                   onChange={(e) => setNewCandidate({ ...newCandidate, status: e.target.value })}
//                   className="border w-full p-2 mb-4 rounded"
//                 />
//                 <input
//                   type="date"
//                   value={newCandidate.date}
//                   onChange={(e) => setNewCandidate({ ...newCandidate, date: e.target.value })}
//                   className="border w-full p-2 mb-4 rounded"
//                 />
//                 <div className="flex justify-end space-x-4">
//                   <button
//                     onClick={() => setIsModalOpen(false)}
//                     className="px-4 py-2 bg-gray-400 text-white rounded"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleAddCandidate}
//                     className="px-4 py-2 bg-green-500 text-white rounded"
//                   >
//                     Add
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {isUpdateModalOpen && selectedCandidate && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//               <div className="bg-white p-6 rounded shadow-lg w-1/3">
//                 <h2 className="text-xl font-bold mb-4">Update Candidate</h2>
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   value={selectedCandidate.name}
//                   onChange={(e) => setSelectedCandidate({ ...selectedCandidate, name: e.target.value })}
//                   className="border w-full p-2 mb-4 rounded"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Status"
//                   value={selectedCandidate.status}
//                   onChange={(e) => setSelectedCandidate({ ...selectedCandidate, status: e.target.value })}
//                   className="border w-full p-2 mb-4 rounded"
//                 />
//                 <input
//                   type="date"
//                   value={selectedCandidate.date}
//                   onChange={(e) => setSelectedCandidate({ ...selectedCandidate, date: e.target.value })}
//                   className="border w-full p-2 mb-4 rounded"
//                 />
//                 <div className="flex justify-end space-x-4">
//                   <button
//                     onClick={() => setIsUpdateModalOpen(false)}
//                     className="px-4 py-2 bg-gray-400 text-white rounded"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleUpdateCandidate}
//                     className="px-4 py-2 bg-blue-500 text-white rounded"
//                   >
//                     Update
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCandidate, setNewCandidate] = useState({ name: '', status: '', date: '' });

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

  // Function to handle adding a new candidate
  const handleAddCandidate = async () => {
    try {
      await axios.post(`http://localhost:4000/api/candidates`, newCandidate);
      setIsModalOpen(false);
      setNewCandidate({ name: '', status: '', date: '' });
      fetchCandidates(page);
    } catch (error) {
      console.error('Error adding candidate:', error);
      setError('Failed to add candidate. Please try again later.');
    }
  };

  // Function to handle deleting a candidate
  const handleDeleteCandidate = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/candidates/${id}`);
      console.log(response.data.message);
      fetchCandidates(page); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting candidate:', error);
      setError('Failed to delete candidate. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-orange-500">Candidate Dashboard</h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div>
          <div className="flex justify-between mb-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Candidate
            </button>
          </div>
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
                  <th className="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
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
                    <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => handleDeleteCandidate(candidate.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
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

          {/* Add Candidate Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Add New Candidate</h2>
                <input
                  type="text"
                  placeholder="Name"
                  value={newCandidate.name}
                  onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                  className="border w-full p-2 mb-4 rounded"
                />
                <input
                  type="text"
                  placeholder="Status"
                  value={newCandidate.status}
                  onChange={(e) => setNewCandidate({ ...newCandidate, status: e.target.value })}
                  className="border w-full p-2 mb-4 rounded"
                />
                <input
                  type="date"
                  value={newCandidate.date}
                  onChange={(e) => setNewCandidate({ ...newCandidate, date: e.target.value })}
                  className="border w-full p-2 mb-4 rounded"
                />
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-400 text-white rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCandidate}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
