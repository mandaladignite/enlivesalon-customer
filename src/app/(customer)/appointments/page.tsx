"use client";

import Footer from "@/components/customer/UI/Footer";
import { motion } from "framer-motion";
import { Calendar, Clock, Scissors, AlertCircle, CheckCircle, X, Star, Home, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { appointmentAPI } from "@/lib/api";
import CancelAppointmentModal from "@/components/customer/CancelAppointmentModal";

// Updated type to match backend API
type Appointment = {
  _id: string;
  date: string;
  timeSlot: string;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled" | "no_show" | "rescheduled";
  totalPrice: number;
  bookingReference: string;
  estimatedDuration: number;
  serviceId: {
    _id: string;
    name: string;
    description: string;
    duration: number;
    price: number;
    category: string;
  };
  stylistId?: {
    _id: string;
    name: string;
    specialties: string[];
    rating: number;
  };
  location: "home" | "salon";
  notes?: string;
  specialInstructions?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  cancellationReason?: string;
  cancelledAt?: string;
  statusHistory?: Array<{
    status: string;
    changedAt: string;
    changedBy: string;
    reason: string;
  }>;
  rescheduledFrom?: {
    date: string;
    timeSlot: string;
    rescheduledAt: string;
    rescheduledBy: string;
  };
  createdAt: string;
  updatedAt: string;
};

export default function AppointmentsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  
  // Modal states
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const handleTabChange = (tab: 'active' | 'history') => {
    setActiveTab(tab);
    setSelectedStatus('all'); // Reset filter when switching tabs
  };

  // Modal handlers
  const handleOpenCancelModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setCancelModalOpen(true);
  };

  const handleModalClose = () => {
    setCancelModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleModalSuccess = () => {
    loadAppointments(); // Refresh the appointments list
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
      return;
    }

    if (user) {
      loadAppointments();
    }
  }, [user, loading, router, selectedStatus]);

  const loadAppointments = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      const params: any = {};
      if (selectedStatus !== "all") {
        params.status = selectedStatus;
      }
      
      const response = await appointmentAPI.getUserAppointments(params);
      setAppointments(response.data?.appointments || []);
    } catch (error: any) {
      setError(error.message || "Failed to load appointments");
      console.error("Error loading appointments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions to categorize appointments
  const getActiveBookings = () => {
    const now = new Date();
    
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      
      // Active bookings: upcoming appointments with active statuses
      return appointmentDate >= now && 
             ['pending', 'confirmed', 'in_progress'].includes(appointment.status);
    });
  };

  const getAppointmentHistory = () => {
    const now = new Date();
    
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      
      // History: past appointments OR completed/cancelled/closed statuses
      return appointmentDate < now || 
             ['completed', 'cancelled', 'no_show', 'rescheduled'].includes(appointment.status);
    });
  };

  const getUpcomingAppointments = () => {
    const now = new Date();
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate >= now && 
             ['pending', 'confirmed', 'in_progress'].includes(appointment.status);
    });
  };

  const getPastAppointments = () => {
    const now = new Date();
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate < now || 
             ['completed', 'cancelled', 'no_show', 'rescheduled'].includes(appointment.status);
    });
  };



  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "no_show":
        return "bg-gray-100 text-gray-800";
      case "rescheduled":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get appointments based on active tab
  const getCurrentAppointments = () => {
    if (activeTab === 'active') {
      return getActiveBookings();
    } else {
      return getAppointmentHistory();
    }
  };

  const currentAppointments = getCurrentAppointments();
  const filteredAppointments =
    selectedStatus === "all"
      ? currentAppointments
      : currentAppointments.filter(apt => apt.status === selectedStatus);

  // Prevent hydration issues by not rendering until client-side
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center" suppressHydrationWarning={true}>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" suppressHydrationWarning={true}></div>
      </div>
    );
  }

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" suppressHydrationWarning={true}>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" suppressHydrationWarning={true}></div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!user) return null;

  return (
    <section className="w-full bg-white min-h-screen">
      {/* Back to Home Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Back to Home</span>
            </button>
            <button
              onClick={() => router.push('/')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              <span className="font-medium">Home</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-12 h-12 text-yellow-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              My Appointments
            </h1>
            <p className="text-lg text-gray-600">
              View and manage your upcoming and past appointments
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center"
            >
              <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
              <span className="text-red-700 text-sm">{error}</span>
            </motion.div>
          )}

          {/* Main Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => handleTabChange('active')}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'active'
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Active Bookings
              </button>
              <button
                onClick={() => handleTabChange('history')}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'history'
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Appointment History
              </button>
            </div>
          </div>

          {/* Status Filter for Active Bookings */}
          {activeTab === 'active' && (
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {[
                { id: "all", name: "All Active" },
                { id: "pending", name: "Pending" },
                { id: "confirmed", name: "Confirmed" },
                { id: "in_progress", name: "In Progress" },
              ].map(status => (
                <button
                  key={status.id}
                  onClick={() => setSelectedStatus(status.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedStatus === status.id
                      ? "bg-yellow-500 text-black"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {status.name}
                </button>
              ))}
            </div>
          )}

          {/* Status Filter for History */}
          {activeTab === 'history' && (
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {[
                { id: "all", name: "All History" },
                { id: "completed", name: "Completed" },
                { id: "cancelled", name: "Cancelled" },
                { id: "no_show", name: "No Show" },
                { id: "rescheduled", name: "Rescheduled" },
              ].map(status => (
                <button
                  key={status.id}
                  onClick={() => setSelectedStatus(status.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedStatus === status.id
                      ? "bg-yellow-500 text-black"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {status.name}
                </button>
              ))}
            </div>
          )}

          {/* Summary Statistics */}
          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">
                  {activeTab === 'active' ? getActiveBookings().length : getAppointmentHistory().length}
                </h3>
                <p className="text-blue-700 font-medium">
                  {activeTab === 'active' ? 'Active Bookings' : 'Total History'}
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-900">
                  {getUpcomingAppointments().length}
                </h3>
                <p className="text-green-700 font-medium">Upcoming</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {getPastAppointments().length}
                </h3>
                <p className="text-gray-700 font-medium">Completed</p>
              </div>
            </div>
          )}

          {/* Appointments List */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
            </div>
          ) : filteredAppointments.length > 0 ? (
            <div className="space-y-6">
              {filteredAppointments.map((appointment, index) => (
                <motion.div
                  key={appointment._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    {/* Appointment Details */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {appointment.serviceId.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Booking Ref: {appointment.bookingReference}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {appointment.status.charAt(0).toUpperCase() +
                            appointment.status.slice(1)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-5 h-5 mr-3 text-yellow-600" />
                          <span>{formatDate(appointment.date)}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-5 h-5 mr-3 text-yellow-600" />
                          <span>
                            {formatTime(appointment.timeSlot)}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Scissors className="w-5 h-5 mr-3 text-yellow-600" />
                          <span>
                            {appointment.serviceId.duration} minutes
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="w-5 h-5 mr-3 text-yellow-600 font-bold">
                            ₹
                          </span>
                          <span className="font-semibold text-gray-900">
                            ₹{appointment.totalPrice}
                          </span>
                        </div>
                      </div>

                      {appointment.notes && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-500 mb-1">Notes:</p>
                          <p className="text-gray-700">{appointment.notes}</p>
                        </div>
                      )}

                      {appointment.specialInstructions && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-500 mb-1">Special Instructions:</p>
                          <p className="text-gray-700">{appointment.specialInstructions}</p>
                        </div>
                      )}

                      {appointment.stylistId && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-500 mb-1">Stylist:</p>
                          <p className="text-gray-700">
                            {appointment.stylistId.name} ({appointment.stylistId.specialties.join(', ')})
                          </p>
                        </div>
                      )}
                      
                      {appointment.location === "home" && appointment.address && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-500 mb-1">Address:</p>
                          <p className="text-gray-700">
                            {appointment.address.street}, {appointment.address.city}, {appointment.address.state} {appointment.address.zipCode}
                          </p>
                        </div>
                      )}

                      {appointment.rescheduledFrom && (
                        <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                          <p className="text-sm text-purple-600 mb-1">Rescheduled from:</p>
                          <p className="text-purple-700">
                            {formatDate(appointment.rescheduledFrom.date)} at {formatTime(appointment.rescheduledFrom.timeSlot)}
                          </p>
                        </div>
                      )}

                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-2 mt-4 lg:mt-0 lg:ml-6">
                      {(appointment.status === "pending" ||
                        appointment.status === "confirmed") && (
                        <button
                          onClick={() => handleOpenCancelModal(appointment)}
                          className="flex items-center px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </button>
                      )}

                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {activeTab === 'active' ? 'No active bookings' : 'No appointment history'}
              </h3>
              <p className="text-gray-500 mb-6">
                {activeTab === 'active' 
                  ? selectedStatus === "all"
                    ? "You don't have any active bookings or upcoming appointments."
                    : `No active ${selectedStatus} appointments found.`
                  : selectedStatus === "all"
                    ? "You don't have any appointment history yet."
                    : `No ${selectedStatus} appointments in your history.`
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/book"
                  className="inline-block bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition"
                >
                  Book an Appointment
                </a>
                {activeTab === 'history' && (
                  <button
                    onClick={() => handleTabChange('active')}
                    className="inline-block bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition"
                  >
                    View Active Bookings
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Modals */}
      {selectedAppointment && (
        <CancelAppointmentModal
          isOpen={cancelModalOpen}
          onClose={handleModalClose}
          appointment={selectedAppointment}
          onSuccess={handleModalSuccess}
        />
      )}

      <Footer />
    </section>
  );
}
