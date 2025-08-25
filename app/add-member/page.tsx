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
    camp_fee: '5000',
    deposit_paid: '',
    balance: '5000',
    payment_method: '',
    receipt_no: '',
    registration_no: '',
    date_received: '',
    checked_by: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPrintingBlank, setIsPrintingBlank] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    
    // Auto-calculate balance when camp_fee or deposit_paid changes
    if (name === 'camp_fee' || name === 'deposit_paid') {
      const campFee = name === 'camp_fee' ? parseFloat(value) || 0 : parseFloat(formData.camp_fee) || 0;
      const depositPaid = name === 'deposit_paid' ? parseFloat(value) || 0 : parseFloat(formData.deposit_paid) || 0;
      const calculatedBalance = campFee - depositPaid;
      updatedData.balance = calculatedBalance.toString();
    }
    
    setFormData(updatedData);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Convert numeric fields to numbers or null
      const submitData = {
        ...formData,
        age: formData.age ? parseInt(formData.age) : null,
        camp_fee: formData.camp_fee ? parseFloat(formData.camp_fee) : null,
        deposit_paid: formData.deposit_paid ? parseFloat(formData.deposit_paid) : null,
        balance: formData.balance ? parseFloat(formData.balance) : null,
      };
      await axios.post('http://localhost:5000/api/members', submitData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success('Member added successfully!');
      setIsSubmitted(true); // Keep the form data and show print option
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error.response?.data?.error || 'Failed to add member');
    }
  };

  const handlePrint = () => {
    setIsPrintingBlank(false);
    window.print();
  };

  const handlePrintBlank = () => {
    setIsPrintingBlank(true);
    setTimeout(() => {
      window.print();
      setIsPrintingBlank(false);
    }, 100);
  };

  const handleNewRegistration = () => {
    setFormData({
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
      camp_fee: '5000',
      deposit_paid: '',
      balance: '5000',
      payment_method: '',
      receipt_no: '',
      registration_no: '',
      date_received: '',
      checked_by: '',
    });
    setIsSubmitted(false);
  };

  // Common classes for consistent styling
  const labelClass = "block text-sm font-medium mb-1 text-gray-700";
  const inputClass = "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white placeholder-gray-400";
  const sectionTitleClass = "text-lg font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2";
  const printSectionTitleClass = "text-lg font-semibold mb-4 text-black border-b border-black pb-2";
  const printLabelClass = "text-sm font-medium text-black";
  const printValueClass = "text-sm text-black border-b border-dotted border-gray-400 min-h-[20px] inline-block min-w-[200px]";

  // Function to get display value - either actual data or blank lines for printing
  const getDisplayValue = (value: string, minLength: number = 200) => {
    if (isPrintingBlank) {
      return ''; // Return empty string for blank form
    }
    return value || ''; // Return actual value for filled form
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <Toaster />
      
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-form, #printable-form * {
            visibility: visible;
          }
          #printable-form {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white;
            padding: 20px;
            font-size: 12px;
          }
          .no-print {
            display: none !important;
          }
          .print-break {
            page-break-before: always;
          }
        }
      `}</style>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        {/* Screen View */}
        <div className="no-print">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center">Add New Member</h1>
          
          {/* Print Options - Always visible */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1a1 1 0 011-1h8a1 1 0 011 1v1a1 1 0 01-1 1H5a1 1 0 01-1-1zm5-8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <span className="text-blue-900 font-bold text-base">Print Options</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handlePrintBlank}
                  className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
                >
                  📄 Print Blank Form
                </button>
                {isSubmitted && (
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    🖨️ Print Filled Form
                  </button>
                )}
              </div>
            </div>
            <p className="text-blue-800 text-sm mt-2 font-medium">
              💡 <strong>Tip:</strong> Use "Print Blank Form" to get an empty form for manual completion, 
              or fill out the form below and use "Print Filled Form" after submission.
            </p>
          </div>

          {isSubmitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-green-800 font-medium">Member registered successfully!</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleNewRegistration}
                    className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                  >
                    ➕ New Registration
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Print View */}
        <div id="printable-form" className="hidden print:block">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-black mb-2">CAMP REGISTRATION FORM</h1>
            <p className="text-sm text-black">Registration No: {getDisplayValue(formData.registration_no) || '_____________'}</p>
            <p className="text-sm text-black">Date Received: {getDisplayValue(formData.date_received) || '_____________'}</p>
          </div>

          <div className="mb-6">
            <h2 className={printSectionTitleClass}>PARTICIPANT INFORMATION</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <span className={printLabelClass}>Full Name: </span>
                <span className={printValueClass}>{getDisplayValue(formData.full_name)}</span>
              </div>
              <div>
                <span className={printLabelClass}>Date of Birth: </span>
                <span className={printValueClass}>{getDisplayValue(formData.date_of_birth)}</span>
              </div>
              <div>
                <span className={printLabelClass}>Age: </span>
                <span className={printValueClass}>{getDisplayValue(formData.age)}</span>
              </div>
              <div>
                <span className={printLabelClass}>Gender: </span>
                <span className={printValueClass}>{getDisplayValue(formData.gender)}</span>
              </div>
              <div>
                <span className={printLabelClass}>Nationality: </span>
                <span className={printValueClass}>{getDisplayValue(formData.nationality)}</span>
              </div>
              <div>
                <span className={printLabelClass}>Phone: </span>
                <span className={printValueClass}>{getDisplayValue(formData.phone_number)}</span>
              </div>
              <div className="col-span-2">
                <span className={printLabelClass}>Email: </span>
                <span className={printValueClass}>{getDisplayValue(formData.email)}</span>
              </div>
              <div>
                <span className={printLabelClass}>Church: </span>
                <span className={printValueClass}>{getDisplayValue(formData.church_name)}</span>
              </div>
              <div>
                <span className={printLabelClass}>Denomination: </span>
                <span className={printValueClass}>{getDisplayValue(formData.denomination)}</span>
              </div>
              <div className="col-span-2">
                <span className={printLabelClass}>Pastor/Youth Leader: </span>
                <span className={printValueClass}>{getDisplayValue(formData.pastor_name)}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className={printSectionTitleClass}>EMERGENCY CONTACT</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <span className={printLabelClass}>Name: </span>
                <span className={printValueClass}>{getDisplayValue(formData.emergency_name)}</span>
              </div>
              <div>
                <span className={printLabelClass}>Relationship: </span>
                <span className={printValueClass}>{getDisplayValue(formData.emergency_relationship)}</span>
              </div>
              <div>
                <span className={printLabelClass}>Phone: </span>
                <span className={printValueClass}>{getDisplayValue(formData.emergency_phone)}</span>
              </div>
              <div>
                <span className={printLabelClass}>Alt Phone: </span>
                <span className={printValueClass}>{getDisplayValue(formData.emergency_alt_phone)}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className={printSectionTitleClass}>MEDICAL INFORMATION</h2>
            <div className="space-y-3">
              <div>
                <span className={printLabelClass}>Allergies: </span>
                <span className={`${printValueClass} block mt-1`}>
                  {getDisplayValue(formData.allergies) || (isPrintingBlank ? '' : 'None specified')}
                </span>
              </div>
              <div>
                <span className={printLabelClass}>Chronic Illnesses: </span>
                <span className={`${printValueClass} block mt-1`}>
                  {getDisplayValue(formData.chronic_illnesses) || (isPrintingBlank ? '' : 'None specified')}
                </span>
              </div>
              <div>
                <span className={printLabelClass}>Current Medications: </span>
                <span className={`${printValueClass} block mt-1`}>
                  {getDisplayValue(formData.medications) || (isPrintingBlank ? '' : 'None specified')}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className={printSectionTitleClass}>PAYMENT DETAILS</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <span className={printLabelClass}>Camp Fee: KES </span>
                <span className={printValueClass}>{getDisplayValue(formData.camp_fee)}</span>
              </div>
              <div>
                <span className={printLabelClass}>Deposit Paid: KES </span>
                <span className={printValueClass}>{getDisplayValue(formData.deposit_paid)}</span>
              </div>
              <div>
                <span className={printLabelClass}>Balance: KES </span>
                <span className={printValueClass}>{getDisplayValue(formData.balance)}</span>
              </div>
              <div>
                <span className={printLabelClass}>Payment Method: </span>
                <span className={printValueClass}>{getDisplayValue(formData.payment_method)}</span>
              </div>
              <div className="col-span-2">
                <span className={printLabelClass}>Receipt No: </span>
                <span className={printValueClass}>{getDisplayValue(formData.receipt_no)}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className={printSectionTitleClass}>CONSENT & DECLARATION</h2>
            <div className="space-y-3">
              <p className="text-xs text-black mb-4">
                I hereby consent to my participation in the camp and declare that the information provided is accurate.
                I understand the camp rules and regulations.
              </p>
              <div className="grid grid-cols-2 gap-x-8">
                <div>
                  <span className={printLabelClass}>Signature: </span>
                  <span className={printValueClass}>{getDisplayValue(formData.consent_signature)}</span>
                </div>
                <div>
                  <span className={printLabelClass}>Date: </span>
                  <span className={printValueClass}>{getDisplayValue(formData.consent_date)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 border-t border-black pt-4">
            <h2 className={printSectionTitleClass}>OFFICE USE ONLY</h2>
            <div className="grid grid-cols-3 gap-x-6 gap-y-4">
              <div>
                <span className={printLabelClass}>Reg No: </span>
                <span className={printValueClass}>{getDisplayValue(formData.registration_no)}</span>
              </div>
              <div>
                <span className={printLabelClass}>Date Received: </span>
                <span className={printValueClass}>{getDisplayValue(formData.date_received)}</span>
              </div>
              <div>
                <span className={printLabelClass}>Checked By: </span>
                <span className={printValueClass}>{getDisplayValue(formData.checked_by)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form - only show if not submitted or user wants to edit */}
        <div className={isSubmitted ? "no-print" : ""}>
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
                    placeholder="5000.00"
                    min="0"
                    step="0.01"
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
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className={labelClass}>Balance (KES)</label>
                  <input
                    type="number"
                    name="balance"
                    value={formData.balance}
                    onChange={handleChange}
                    className={`${inputClass} bg-gray-100`}
                    placeholder="0.00"
                    readOnly
                    title="Automatically calculated: Camp Fee - Deposit Paid"
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

            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 no-print">
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
    </div>
  );
}