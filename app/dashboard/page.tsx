// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import MemberTable from '../components/MemberTable';
// import Analytics from '../components/Analytics';
// import Link from 'next/link';

// export default function Dashboard() {
//   const [members, setMembers] = useState([]);
//   const [search, setSearch] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     const fetchMembers = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/members', {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         setMembers(res.data);
//       } catch (err) {
//         if (err.response?.status === 401) {
//           toast.error('Session Expired');
//           router.push('/');
//         } else {
//           toast.error('Failed to fetch members');
//         }
//       }
//     };
//     fetchMembers();
//   }, [router]);

//   const filteredMembers = members.filter((member) =>
//     member.full_name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen p-6">
//       <Toaster />
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Church Camp Dashboard</h1>
//           <Link href="/add-member">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//               Add Member
//             </button>
//           </Link>
//         </div>
//         <Analytics members={members} />
//         <div className="mb-6">
//           <input
//             type="text"
//             placeholder="Search by name..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <MemberTable members={filteredMembers} />
//       </div>
//     </div>
//   );
// }