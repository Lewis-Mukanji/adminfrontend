'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import MemberTable from '../../components/MemberTable';
import Analytics from '../../components/Analytics';
import Link from 'next/link';

// Define the Member type
interface Member {
  id: number;
  full_name: string;
  date_of_birth: string;
  age: number;
  gender: string;
  nationality: string;
  phone_number: string;
  email: string;
  church_name: string;
  denomination: string;
  pastor_name: string;
  emergency_name: string | null;
  emergency_relationship: string | null;
  emergency_phone: string | null;
  emergency_alt_phone: string | null;
  allergies: string | null;
  chronic_illnesses: string | null;
  medications: string | null;
  consent_signature: string | null;
  consent_date: string | null;
  camp_fee: number | null;
  deposit_paid: number | null;
  balance: number | null;
  payment_method: string | null;
  receipt_no: string | null;
  registration_no: string | null;
  date_received: string | null;
  checked_by: string | null;
}

export default function Dashboard() {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
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

  const handleDelete = async (memberId: number, memberName: string) => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to delete ${memberName}? This action cannot be undone.`
    );
    
    if (!confirmed) return;

    setDeleteLoading(memberId);
    
    try {
      await axios.delete(`http://localhost:5000/api/members/${memberId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      
      // Remove member from state
      setMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));
      toast.success(`${memberName} has been deleted successfully`);
      
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        toast.error('Session Expired');
        router.push('/');
      } else if (error.response?.status === 404) {
        toast.error('Member not found');
      } else {
        toast.error('Failed to delete member. Please try again.');
      }
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Show success message
    toast.success('Logged out successfully');
    
    // Redirect to login page
    router.push('/');
  };

  const filteredMembers = members.filter((member) =>
    member.full_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <Toaster />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Church Camp Dashboard</h1>
          <div className="flex gap-3 items-center">
            <Link href="/add-member">
              <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium">
                Add Member
              </button>
            </Link>
            <button 
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium flex items-center gap-2"
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
              Logout
            </button>
          </div>
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
          <MemberTable 
            members={filteredMembers} 
            onDelete={handleDelete}
            deleteLoading={deleteLoading}
          />
        </div>
      </div>
    </div>
  );
}