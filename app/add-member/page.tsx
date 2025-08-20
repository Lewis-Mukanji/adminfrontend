'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function AddMember() {
  const [formData, setFormData] = useState({
    full_name: '',
    date_of_birth: '',
    age: '',
    gender: '',
    nationality: '',
    phone_number: '',
    email: '',
    church_name: '',
    denomination: '',
    pastor_name: '',
    emergency_name: '',
    emergency_relationship: '',
    emergency_phone: '',
    emergency_alt_phone: '',
    allergies: '',
    chronic_illnesses: '',
    medications: '',
    consent_signature: '',
    consent_date: '',
    camp_fee: '',
    deposit_paid: '',
    balance: '',
    payment_method: '',
    receipt_no: '',
    registration_no: '',
    date_received: '',
    checked_by: '',
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/members', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success('Member added successfully!');
      router.push('/dashboard');
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error.response?.data?.error || 'Failed to add member');
    }
  };

  // Common classes for consistent styling
  const labelClass = "block text-sm font-medium mb-1 text-gray-700";
  const inputClass = "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white placeholder-gray-400";
  const sectionTitleClass = "text-lg font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2";

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <Toaster />
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center">Add New Member</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h2 className={sectionTitleClass}>Participant Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Full Name *</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Date of Birth *</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Nationality *</label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Phone Number *</label>
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g., +254 700 000 000"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="example@email.com"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Church Name *</label>
                <input
                  type="text"
                  name="church_name"
                  value={formData.church_name}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Denomination *</label>
                <input
                  type="text"
                  name="denomination"
                  value={formData.denomination}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Pastor/Youth Leader *</label>
                <input
                  type="text"
                  name="pastor_name"
                  value={formData.pastor_name}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className={sectionTitleClass}>Emergency Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Full Name</label>
                <input
                  type="text"
                  name="emergency_name"
                  value={formData.emergency_name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Relationship</label>
                <input
                  type="text"
                  name="emergency_relationship"
                  value={formData.emergency_relationship}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g., Parent, Guardian, Sibling"
                />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  type="text"
                  name="emergency_phone"
                  value={formData.emergency_phone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Alternative Phone</label>
                <input
                  type="text"
                  name="emergency_alt_phone"
                  value={formData.emergency_alt_phone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className={sectionTitleClass}>Medical Information</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className={labelClass}>Allergies</label>
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  className={inputClass}
                  rows={3}
                  placeholder="List any allergies (food, medication, environmental, etc.)"
                />
              </div>
              <div>
                <label className={labelClass}>Chronic Illnesses</label>
                <textarea
                  name="chronic_illnesses"
                  value={formData.chronic_illnesses}
                  onChange={handleChange}
                  className={inputClass}
                  rows={3}
                  placeholder="List any chronic conditions or ongoing health issues"
                />
              </div>
              <div>
                <label className={labelClass}>Current Medications</label>
                <textarea
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  className={inputClass}
                  rows={3}
                  placeholder="List all current medications and dosages"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className={sectionTitleClass}>Consent & Declaration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Digital Signature</label>
                <input
                  type="text"
                  name="consent_signature"
                  value={formData.consent_signature}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Type your full name as signature"
                />
              </div>
              <div>
                <label className={labelClass}>Date</label>
                <input
                  type="date"
                  name="consent_date"
                  value={formData.consent_date}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className={sectionTitleClass}>Payment Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Camp Fee (KES)</label>
                <input
                  type="number"
                  name="camp_fee"
                  value={formData.camp_fee}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className={labelClass}>Deposit Paid (KES)</label>
                <input
                  type="number"
                  name="deposit_paid"
                  value={formData.deposit_paid}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className={labelClass}>Balance (KES)</label>
                <input
                  type="number"
                  name="balance"
                  value={formData.balance}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className={labelClass}>Payment Method</label>
                <select
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select Payment Method</option>
                  <option value="Cash">Cash</option>
                  <option value="M-Pesa">M-Pesa</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Receipt No</label>
                <input
                  type="text"
                  name="receipt_no"
                  value={formData.receipt_no}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className={sectionTitleClass}>Office Use Only</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>Registration No</label>
                <input
                  type="text"
                  name="registration_no"
                  value={formData.registration_no}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Date Received</label>
                <input
                  type="date"
                  name="date_received"
                  value={formData.date_received}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Checked By</label>
                <input
                  type="text"
                  name="checked_by"
                  value={formData.checked_by}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="px-6 py-3 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}