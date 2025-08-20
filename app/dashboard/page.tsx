'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Changed from 'next/router'
import axios, { AxiosError } from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import MemberTable from '../../components/MemberTable';
import Analytics from '../../components/Analytics';
import Link from 'next/link';

// Define the Member type
interface Member {
  id?: string;
  full_name: string;
  date_of_birth: string;
  age: string;
  gender: string;
  nationality: string;
  phone_number: string;
  email: string;
  church_name: string;
  denomination: string;
  pastor_name: string;
  emergency_name: string;
  emergency_relationship: string;
  emergency_phone: string;
  emergency_alt_phone: string;
  allergies: string;
  chronic_illnesses: string;
  medications: string;
  consent_signature: string;
  consent_date: string;
  camp_fee: string;
  deposit_paid: string;
  balance: string;
  payment_method: string;
  receipt_no: string;
  registration_no: string;
  date_received: string;
  checked_by: string;
}

export default function Dashboard() {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get<Member[]>('http://localhost:5000/api/members', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setMembers(res.data);
      } catch (err) {
        const error = err as AxiosError;
        if (error.response?.status === 401) {
          toast.error('Session Expired');
          router.push('/');
        } else {
          toast.error('Failed to fetch members');
        }
      }
    };
    fetchMembers();
  }, [router]);

  const filteredMembers = members.filter((member) =>
    member.full_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <Toaster />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Church Camp Dashboard</h1>
          <Link href="/add-member">
            <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium">
              Add Member
            </button>
          </Link>
        </div>
        
        <div className="mb-6">
          <Analytics members={members} />
        </div>
        
        <div className="mb-6">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Members
            </label>
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white placeholder-gray-400"
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <MemberTable members={filteredMembers} />
        </div>
      </div>
    </div>
  );
}