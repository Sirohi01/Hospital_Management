    import { useState, useEffect, useCallback } from 'react';
    import { UserIcon, CalendarIcon, PhoneIcon, EmailIcon, AddressIcon, MedicalIcon, EmergencyIcon, InsuranceIcon } from '../components/patientIcons';
    import { getPatientsService } from '../services/coreServices';

    const Patients = ({ refresh }) => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterGender, setFilterGender] = useState('all');
    const [expandedPatient, setExpandedPatient] = useState(null);
    
    const fetchPatients = useCallback(async () => {
        try {
        setLoading(true);
        setError(null);
        const response = await getPatientsService();
        setPatients(response.patients || []);
        } catch (err) {
        setError(err.message || 'Failed to fetch patients');
        } finally {
        setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPatients();
    }, [fetchPatients, refresh]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
        });
    };

    const calculateAge = (dob) => {
        if (!dob) return 'N/A';
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
        }
        
        return age > 0 ? age : 'Infant';
    };

    const getGenderColor = (gender) => {
        return gender === 'Male' 
        ? 'bg-blue-100 text-blue-800 border-blue-200' 
        : 'bg-pink-100 text-pink-800 border-pink-200';
    };

    const getBloodGroupColor = (bloodGroup) => {
        const colors = {
        'A+': 'bg-red-500',
        'A-': 'bg-red-600',
        'B+': 'bg-green-500',
        'B-': 'bg-green-600',
        'AB+': 'bg-purple-500',
        'AB-': 'bg-purple-600',
        'O+': 'bg-orange-500',
        'O-': 'bg-orange-600'
        };
        return colors[bloodGroup] || 'bg-gray-500';
    };

    const formatAddress = (address) => {
        if (!address) return '';
        if (typeof address === 'string') return address;
        if (typeof address === 'object') {
        const parts = [];
        if (address.street) parts.push(address.street);
        if (address.city) parts.push(address.city);
        if (address.state) parts.push(address.state);
        if (address.zipCode) parts.push(address.zipCode);
        return parts.join(', ');
        }
        return '';
    };

    const togglePatientDetails = (patientId) => {
        setExpandedPatient(expandedPatient === patientId ? null : patientId);
    };

    const filteredPatients = patients.filter(patient => {
        const matchesSearch = searchTerm === '' || 
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.contactNumber.includes(searchTerm) ||
        (patient.email && patient.email.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesGender = filterGender === 'all' || patient.gender.toLowerCase() === filterGender;
        
        return matchesSearch && matchesGender;
    });

    if (loading) {
        return (
        <div className="flex justify-center items-center h-64">
            <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gradient-to-r from-purple-400 to-pink-400"></div>
            <div className="animate-pulse absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-purple-500"></div>
            </div>
            <p className="ml-4 text-lg text-gray-600 animate-pulse">Loading patients...</p>
        </div>
        );
    }

    if (error) {
        return (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border border-red-200">
            <div className="flex items-center mb-4">
            <div className="bg-red-500 rounded-full p-2 mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-800">Error Loading Patients</h3>
            </div>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
            onClick={fetchPatients}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
            Try Again
            </button>
        </div>
        );
    }

    if (patients.length === 0) {
        return (
        <div className="text-center py-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl">
            <div className="bg-white p-6 rounded-full w-24 h-24 mx-auto mb-6 shadow-lg">
            <UserIcon className="w-12 h-12 text-gray-400 mx-auto mt-3" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Patients Found</h3>
            <p className="text-gray-600 text-lg">Start by registering your first patient to see them here.</p>
        </div>
        );
    }

    return (
        <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 rounded-2xl text-white shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-opacity-20 p-2 rounded-full mr-3">
                <UserIcon className="w-8 h-8" />
                </div>
                <div>
                <h2 className="text-3xl font-bold">Patients Directory</h2>
                <p className="text-indigo-100">Total: {filteredPatients.length} patients</p>
                </div>
            </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
                <div className="relative">
                <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input
                    type="text"
                    placeholder="Search by name, phone, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-0 text-gray-800 placeholder-gray-500 shadow-lg focus:ring-4 focus:ring-white focus:ring-opacity-30 transition-all"
                />
                </div>
            </div>
            <div className="md:w-48">
                <select
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
                className="w-full py-3 px-4 rounded-xl border-0 text-gray-800 shadow-lg focus:ring-4 focus:ring-white focus:ring-opacity-30 transition-all"
                >
                <option value="all">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                </select>
            </div>
            </div>
        </div>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPatients.map(patient => (
            <div key={patient._id} className="group">
                {/* Main Card */}
                <div 
                className={`rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden cursor-pointer ${
                    expandedPatient === patient._id ? 'ring-4 ring-purple-300 ring-opacity-50' : ''
                }`}
                onClick={() => togglePatientDetails(patient._id)}
                >
                {/* Patient Header */}
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-10 rounded-full -ml-8 -mb-8"></div>
                    
                    <div className="relative z-10">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{patient.firstName} {patient.lastName}</h3>
                        <div className="flex items-center mb-2">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            <span className="text-sm">{formatDate(patient.dob)}</span>
                            <span className="mx-2">•</span>
                            <span className="text-sm">{calculateAge(patient.dob)} years</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getGenderColor(patient.gender)}`}>
                            {patient.gender}
                            </span>
                            {patient.bloodGroup && (
                            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getBloodGroupColor(patient.bloodGroup)}`}>
                                {patient.bloodGroup}
                            </span>
                            )}
                        </div>
                        </div>
                        <div className="ml-4">
                        <div className={`transform transition-transform duration-300 ${expandedPatient === patient._id ? 'rotate-180' : ''}`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                
                {/* Basic Info (Always Visible) */}
                <div className="p-6">
                    <div className="space-y-3">
                    {/* Contact Summary */}
                    {patient.contactNumber && (
                        <div className="flex items-center text-gray-700">
                        <PhoneIcon className="w-4 h-4 mr-3 text-blue-500" />
                        <span className="text-sm">{patient.contactNumber}</span>
                        </div>
                    )}
                    
                    {patient.email && (
                        <div className="flex items-center text-gray-700">
                        <EmailIcon className="w-4 h-4 mr-3 text-blue-500" />
                        <span className="text-sm truncate">{patient.email}</span>
                        </div>
                    )}

                    {/* Quick Medical Info */}
                    {patient.primaryPhysician && (
                        <div className="flex items-center text-gray-700">
                        <MedicalIcon className="w-4 h-4 mr-3 text-green-500" />
                        <span className="text-sm">Dr. {patient.primaryPhysician}</span>
                        </div>
                    )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                        Registered: {formatDate(patient.createdAt)}
                        </span>
                        <span className="text-xs text-purple-600 font-medium">
                        Click for details
                        </span>
                    </div>
                    </div>
                </div>
                </div>

                {/* Expanded Details */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expandedPatient === patient._id 
                    ? 'max-h-screen opacity-100 mt-4' 
                    : 'max-h-0 opacity-0'
                }`}>
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-bold text-gray-800">Patient Details</h4>
                    <button
                        onClick={(e) => {
                        e.stopPropagation();
                        setExpandedPatient(null);
                        }}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Complete Contact Information */}
                    <div className="bg-blue-50 p-4 rounded-xl">
                        <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <PhoneIcon className="w-5 h-5 mr-2 text-blue-600" />
                        Contact Information
                        </h5>
                        {patient.contactNumber && (
                        <p className="text-gray-700 mb-2">
                            <span className="font-medium">Phone:</span> {patient.contactNumber}
                        </p>
                        )}
                        {patient.email && (
                        <p className="text-gray-700 mb-2">
                            <span className="font-medium">Email:</span> {patient.email}
                        </p>
                        )}
                        {formatAddress(patient.address) && (
                        <p className="text-gray-700">
                            <span className="font-medium">Address:</span> {formatAddress(patient.address)}
                        </p>
                        )}
                    </div>

                    {/* Medical Information */}
                    {(patient.allergies || patient.medicalHistory || patient.currentMedications || patient.primaryPhysician) && (
                        <div className="bg-green-50 p-4 rounded-xl">
                        <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                            <MedicalIcon className="w-5 h-5 mr-2 text-green-600" />
                            Medical Information
                        </h5>
                        {patient.primaryPhysician && (
                            <p className="text-gray-700 mb-2">
                            <span className="font-medium">Primary Doctor:</span> Dr. {patient.primaryPhysician}
                            </p>
                        )}
                        {patient.allergies && patient.allergies !== 'no' && patient.allergies !== 'No' && (
                            <p className="text-gray-700 mb-2">
                            <span className="font-medium">Allergies:</span> {patient.allergies}
                            </p>
                        )}
                        {patient.medicalHistory && patient.medicalHistory !== 'no' && patient.medicalHistory !== 'No' && (
                            <p className="text-gray-700 mb-2">
                            <span className="font-medium">Medical History:</span> {patient.medicalHistory}
                            </p>
                        )}
                        {patient.currentMedications && patient.currentMedications !== 'no' && patient.currentMedications !== 'No' && (
                            <p className="text-gray-700">
                            <span className="font-medium">Current Medications:</span> {patient.currentMedications}
                            </p>
                        )}
                        </div>
                    )}

                    {/* Emergency Contact */}
                    {patient.emergencyContact && patient.emergencyContact.name && (
                        <div className="bg-red-50 p-4 rounded-xl">
                        <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                            <EmergencyIcon className="w-5 h-5 mr-2 text-red-600" />
                            Emergency Contact
                        </h5>
                        <p className="text-gray-700 font-medium mb-1">{patient.emergencyContact.name}</p>
                        {patient.emergencyContact.number && (
                            <p className="text-gray-600">Phone: {patient.emergencyContact.number}</p>
                        )}
                        {patient.emergencyContact.relationship && (
                            <p className="text-gray-600">Relationship: {patient.emergencyContact.relationship}</p>
                        )}
                        </div>
                    )}

                    {/* Insurance Information */}
                    {patient.insurance && patient.insurance.provider && (
                        <div className="bg-yellow-50 p-4 rounded-xl">
                        <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                            <InsuranceIcon className="w-5 h-5 mr-2 text-yellow-600" />
                            Insurance Details
                        </h5>
                        <p className="text-gray-700 font-medium mb-1">{patient.insurance.provider}</p>
                        {patient.insurance.number && (
                            <p className="text-gray-600 mb-1">Policy Number: {patient.insurance.number}</p>
                        )}
                        {patient.insurance.groupNumber && (
                            <p className="text-gray-600">Group Number: {patient.insurance.groupNumber}</p>
                        )}
                        </div>
                    )}
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div>

        {filteredPatients.length === 0 && patients.length > 0 && (
            <div className="text-center py-12">
            <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400 mx-auto mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No patients match your search</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
            </div>
        )}
        </div>
    );
    };

    export default Patients;