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

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/members/${memberId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setMember(res.data);
      } catch (err) {
        toast.error('Failed to fetch member details');
        onClose();
      }
    };
    fetchMember();
  }, [memberId, onClose]);

  if (!member) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{member.full_name}</h2>
        <h3 className="font-semibold">Participant Information</h3>
        <p><strong>DOB:</strong> {member.date_of_birth}</p>
        <p><strong>Age:</strong> {member.age}</p>
        <p><strong>Gender:</strong> {member.gender}</p>
        <p><strong>Nationality:</strong> {member.nationality}</p>
        <p><strong>Phone:</strong> {member.phone_number}</p>
        <p><strong>Email:</strong> {member.email}</p>
        <p><strong>Church:</strong> {member.church_name}</p>
        <p><strong>Denomination:</strong> {member.denomination}</p>
        <p><strong>Pastor:</strong> {member.pastor_name}</p>

        <h3 className="font-semibold mt-4">Emergency Contact</h3>
        <p><strong>Name:</strong> {member.emergency_name || 'N/A'}</p>
        <p><strong>Relationship:</strong> {member.emergency_relationship || 'N/A'}</p>
        <p><strong>Phone:</strong> {member.emergency_phone || 'N/A'}</p>
        <p><strong>Alt Phone:</strong> {member.emergency_alt_phone || 'N/A'}</p>

        <h3 className="font-semibold mt-4">Medical Information</h3>
        <p><strong>Allergies:</strong> {member.allergies || 'None'}</p>
        <p><strong>Chronic Illnesses:</strong> {member.chronic_illnesses || 'None'}</p>
        <p><strong>Medications:</strong> {member.medications || 'None'}</p>

        <h3 className="font-semibold mt-4">Consent & Declaration</h3>
        <p><strong>Signature:</strong> {member.consent_signature || 'N/A'}</p>
        <p><strong>Date:</strong> {member.consent_date || 'N/A'}</p>

        <h3 className="font-semibold mt-4">Payment Details</h3>
        <p><strong>Camp Fee:</strong> {member.camp_fee || 'N/A'}</p>
        <p><strong>Deposit Paid:</strong> {member.deposit_paid || 'N/A'}</p>
        <p><strong>Balance:</strong> {member.balance || 'N/A'}</p>
        <p><strong>Payment Method:</strong> {member.payment_method || 'N/A'}</p>
        <p><strong>Receipt No:</strong> {member.receipt_no || 'N/A'}</p>

        <h3 className="font-semibold mt-4">Office Use</h3>
        <p><strong>Registration No:</strong> {member.registration_no || 'N/A'}</p>
        <p><strong>Date Received:</strong> {member.date_received || 'N/A'}</p>
        <p><strong>Checked By:</strong> {member.checked_by || 'N/A'}</p>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}