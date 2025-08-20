import { useState } from 'react';
import MemberPopup from './MemberPopup';

// Define the Member interface (should match the one in your dashboard and analytics)
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

// Define the props interface
interface MemberTableProps {
  members: Member[];
}

export default function MemberTable({ members }: MemberTableProps) {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const formatPhone = (phone: string) => {
    if (!phone) return 'N/A';
    // Format Kenyan phone numbers
    if (phone.startsWith('254')) {
      return `+${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`;
    }
    if (phone.startsWith('07') || phone.startsWith('01')) {
      return `${phone.slice(0, 4)} ${phone.slice(4)}`;
    }
    return phone;
  };

  const getGenderColor = (gender: string) => {
    return gender === 'Male' ? 'text-blue-600' : gender === 'Female' ? 'text-pink-600' : 'text-gray-600';
  };

  if (members.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Members Found</h3>
        <p className="text-gray-500">No members match your search criteria. Try adjusting your search or add new members.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date of Birth
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nationality
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Church
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Denomination
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pastor/Leader
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.map((member: Member, index: number) => (
              <tr 
                key={member.id || index} 
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {member.full_name?.charAt(0)?.toUpperCase() || 'N'}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => setSelectedMember(member.id || `${index}`)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:underline"
                      >
                        {member.full_name || 'Unknown'}
                      </button>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatDate(member.date_of_birth)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {member.age || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-medium ${getGenderColor(member.gender)}`}>
                    {member.gender || 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <div className="flex items-center">
                    <span className="mr-2">{member.nationality || 'N/A'}</span>
                    {member.nationality === 'Kenyan' && <span className="text-xs">🇰🇪</span>}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <a 
                    href={`tel:${member.phone_number}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {formatPhone(member.phone_number)}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <a 
                    href={`mailto:${member.email}`}
                    className="hover:text-blue-600 transition-colors truncate block max-w-xs"
                  >
                    {member.email || 'N/A'}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <div className="max-w-xs truncate" title={member.church_name}>
                    {member.church_name || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <div className="max-w-xs truncate" title={member.denomination}>
                    {member.denomination || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <div className="max-w-xs truncate" title={member.pastor_name}>
                    {member.pastor_name || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setSelectedMember(member.id || `${index}`)}
                    className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Member count footer */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{members.length}</span> member{members.length !== 1 ? 's' : ''}
          </div>
          <div className="text-xs text-gray-500">
            Click on a name to view full details
          </div>
        </div>
      </div>

      {selectedMember && (
        <MemberPopup 
          memberId={selectedMember} 
          onClose={() => setSelectedMember(null)} 
        />
      )}
    </div>
  );
}