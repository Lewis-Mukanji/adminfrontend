//components/memberPopup.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Define the Member interface based on your API response
interface Member {
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
  emergency_name?: string;
  emergency_relationship?: string;
  emergency_phone?: string;
  emergency_alt_phone?: string;
  allergies?: string;
  chronic_illnesses?: string;
  medications?: string;
  consent_signature?: string;
  consent_date?: string;
  camp_fee?: string;
  deposit_paid?: string;
  balance?: string;
  payment_method?: string;
  receipt_no?: string;
  registration_no?: string;
  date_received?: string;
  checked_by?: string;
}

// Define props interface
interface MemberPopupProps {
  memberId: string | number;
  onClose: () => void;
}

export default function MemberPopup({ memberId, onClose }: MemberPopupProps) {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/members/${memberId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setMember(res.data);
      } catch (err) {
        toast.error('Failed to fetch member details');
        onClose();
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [memberId, onClose]);

  // Loading state
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-8 rounded-lg border border-gray-600">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
            <span className="text-white">Loading member details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!member) return null;

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: string | undefined) => {
    if (!amount) return 'N/A';
    return `KES ${parseFloat(amount).toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-gray-600">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">{member.full_name}</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)] custom-scrollbar">
          <div className="space-y-6">
            {/* Participant Information */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Participant Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-400 font-medium">Date of Birth:</span>
                  <span className="text-white ml-2">{formatDate(member.date_of_birth)}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Age:</span>
                  <span className="text-white ml-2">{member.age} years</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Gender:</span>
                  <span className="text-white ml-2">{member.gender}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Nationality:</span>
                  <span className="text-white ml-2">{member.nationality}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Phone:</span>
                  <span className="text-white ml-2">{member.phone_number}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Email:</span>
                  <span className="text-white ml-2 break-all">{member.email}</span>
                </div>
              </div>
            </div>

            {/* Church Information */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                Church Information
              </h3>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div>
                  <span className="text-gray-400 font-medium">Church:</span>
                  <span className="text-white ml-2">{member.church_name}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Denomination:</span>
                  <span className="text-white ml-2">{member.denomination}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Pastor/Leader:</span>
                  <span className="text-white ml-2">{member.pastor_name}</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-400 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                Emergency Contact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-400 font-medium">Name:</span>
                  <span className="text-white ml-2">{member.emergency_name || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Relationship:</span>
                  <span className="text-white ml-2">{member.emergency_relationship || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Phone:</span>
                  <span className="text-white ml-2">{member.emergency_phone || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Alt Phone:</span>
                  <span className="text-white ml-2">{member.emergency_alt_phone || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                Medical Information
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400 font-medium block">Allergies:</span>
                  <span className="text-white">{member.allergies || 'None reported'}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium block">Chronic Illnesses:</span>
                  <span className="text-white">{member.chronic_illnesses || 'None reported'}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium block">Medications:</span>
                  <span className="text-white">{member.medications || 'None reported'}</span>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-emerald-400 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
                Payment Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-400 font-medium">Camp Fee:</span>
                  <span className="text-white ml-2">{formatCurrency(member.camp_fee)}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Deposit Paid:</span>
                  <span className="text-green-400 ml-2">{formatCurrency(member.deposit_paid)}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Balance:</span>
                  <span className="text-red-400 ml-2">{formatCurrency(member.balance)}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Payment Method:</span>
                  <span className="text-white ml-2">{member.payment_method || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Receipt No:</span>
                  <span className="text-white ml-2">{member.receipt_no || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Consent & Office Use */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-400 mb-3">Consent & Declaration</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-400 font-medium">Signature:</span>
                    <span className="text-white ml-2">{member.consent_signature || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium">Date:</span>
                    <span className="text-white ml-2">{formatDate(member.consent_date)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-orange-400 mb-3">Office Use</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-400 font-medium">Registration No:</span>
                    <span className="text-white ml-2">{member.registration_no || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium">Date Received:</span>
                    <span className="text-white ml-2">{formatDate(member.date_received)}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium">Checked By:</span>
                    <span className="text-white ml-2">{member.checked_by || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-700 px-6 py-4 border-t border-gray-600">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Close
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6b7280;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}