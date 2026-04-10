"use client";
import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  FileText, 
  MessageSquare, 
  Calendar, 
  Globe, 
  Award, 
  TrendingUp,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  Send,
  UserPlus,
  BookOpen,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  Search,
  Filter,
  Bell,
  Download,
  MoreVertical
} from 'lucide-react';

const EducationDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Dashboard Stats Cards
  const statsCards = [
    { icon: Users, label: 'Total Students', value: '1,284', change: '+12%', color: 'bg-blue-100', iconColor: 'text-blue-600', trend: 'up' },
    { icon: FileText, label: 'Applications', value: '847', change: '+23%', color: 'bg-indigo-100', iconColor: 'text-indigo-600', trend: 'up' },
    { icon: GraduationCap, label: 'Visa Approved', value: '612', change: '+8%', color: 'bg-green-100', iconColor: 'text-green-600', trend: 'up' },
    { icon: Globe, label: 'Partner Unis', value: '156', change: '+5', color: 'bg-purple-100', iconColor: 'text-purple-600', trend: 'up' },
    { icon: Calendar, label: 'Upcoming Intakes', value: '28', change: 'Next 30d', color: 'bg-orange-100', iconColor: 'text-orange-600', trend: 'neutral' },
    { icon: MessageSquare, label: 'Pending Inquiries', value: '43', change: '-5', color: 'bg-red-100', iconColor: 'text-red-600', trend: 'down' },
    { icon: Award, label: 'Scholarships', value: '$2.4M', change: '+18%', color: 'bg-yellow-100', iconColor: 'text-yellow-600', trend: 'up' },
    { icon: TrendingUp, label: 'Success Rate', value: '94%', change: '+3%', color: 'bg-teal-100', iconColor: 'text-teal-600', trend: 'up' },
  ];

  // Recent Applications
  const recentApplications = [
    { id: 'APP-2024-001', student: 'Sarah Johnson', country: 'Canada', program: 'Computer Science', status: 'Visa Processing', date: '2024-01-15', score: 92 },
    { id: 'APP-2024-002', student: 'Michael Chen', country: 'UK', program: 'Business Analytics', status: 'Offer Received', date: '2024-01-14', score: 88 },
    { id: 'APP-2024-003', student: 'Priya Sharma', country: 'Australia', program: 'Data Science', status: 'Application Review', date: '2024-01-13', score: 91 },
    { id: 'APP-2024-004', student: 'James Wilson', country: 'USA', program: 'Engineering', status: 'Visa Approved', date: '2024-01-12', score: 94 },
    { id: 'APP-2024-005', student: 'Emma Davis', country: 'Germany', program: 'AI & Robotics', status: 'Documents Pending', date: '2024-01-11', score: 87 },
  ];

  // Upcoming Consultations
  const upcomingConsultations = [
    { time: '10:00 AM', student: 'Alex Thompson', type: 'Visa Guidance', duration: '30 min', country: 'Canada' },
    { time: '11:30 AM', student: 'Maria Garcia', type: 'University Selection', duration: '45 min', country: 'UK' },
    { time: '02:00 PM', student: 'David Kim', type: 'Scholarship Application', duration: '30 min', country: 'Australia' },
    { time: '03:30 PM', student: 'Lisa Wang', type: 'Profile Evaluation', duration: '20 min', country: 'USA' },
  ];

  // Application Status Distribution
  const statusData = {
    'Visa Approved': 35,
    'Offer Received': 28,
    'Application Review': 22,
    'Documents Pending': 15
  };

  // Top Destination Countries
  const topDestinations = [
    { country: 'Canada', students: 324, percentage: 28, flag: '🇨🇦' },
    { country: 'UK', students: 287, percentage: 25, flag: '🇬🇧' },
    { country: 'USA', students: 256, percentage: 22, flag: '🇺🇸' },
    { country: 'Australia', students: 198, percentage: 17, flag: '🇦🇺' },
    { country: 'Germany', students: 92, percentage: 8, flag: '🇩🇪' },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Visa Processing': 'bg-yellow-100 text-yellow-700',
      'Offer Received': 'bg-green-100 text-green-700',
      'Application Review': 'bg-blue-100 text-blue-700',
      'Visa Approved': 'bg-emerald-100 text-emerald-700',
      'Documents Pending': 'bg-orange-100 text-orange-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Header */}
      

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 group">
              <div className="flex items-start justify-between mb-4">
                <div className={`${card.color} p-3 rounded-xl`}>
                  <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  card.trend === 'up' ? 'bg-green-100 text-green-700' : 
                  card.trend === 'down' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {card.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{card.label}</h3>
              <p className="text-3xl font-bold text-gray-800">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Charts and Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Application Status Distribution */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Application Status Distribution</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                View Details <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-8">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 200 200" className="w-full">
                  {Object.values(statusData).reduce((acc, value, idx, arr) => {
                    const previousPercentages = arr.slice(0, idx).reduce((a, b) => a + b, 0);
                    const startAngle = (previousPercentages / 100) * 360;
                    const endAngle = startAngle + (value / 100) * 360;
                    
                    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
                    const largeArcFlag = value > 50 ? 1 : 0;
                    
                    const startRad = (startAngle - 90) * Math.PI / 180;
                    const endRad = (endAngle - 90) * Math.PI / 180;
                    
                    const x1 = 100 + 80 * Math.cos(startRad);
                    const y1 = 100 + 80 * Math.sin(startRad);
                    const x2 = 100 + 80 * Math.cos(endRad);
                    const y2 = 100 + 80 * Math.sin(endRad);
                    
                    return (
                      <>
                        {acc}
                        <path
                          d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                          fill={colors[idx]}
                          opacity="0.8"
                        />
                      </>
                    );
                  }, <circle cx="100" cy="100" r="55" fill="white" />)}
                </svg>
              </div>
              <div className="flex-1 space-y-3">
                {Object.entries(statusData).map(([status, percentage]) => (
                  <div key={status}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">{status}</span>
                      <span className="text-sm font-semibold text-gray-800">{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${percentage}%`,
                          background: status === 'Visa Approved' ? '#10b981' :
                                     status === 'Offer Received' ? '#3b82f6' :
                                     status === 'Application Review' ? '#f59e0b' : '#ef4444'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Destinations */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Top Destinations</h2>
            <div className="space-y-4">
              {topDestinations.map((dest, idx) => (
                <div key={idx} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{dest.flag}</span>
                      <span className="text-sm font-medium text-gray-700">{dest.country}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-gray-800">{dest.students}</span>
                      <span className="text-xs text-gray-500 ml-1">students</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${dest.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Applications & Upcoming Consultations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Applications */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Recent Applications</h2>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Filter className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">App ID</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Student</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Program</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentApplications.map((app, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{app.id}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{app.student}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{app.country}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{app.program}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-12">
                            <div className="relative inline-flex items-center justify-center">
                              <svg className="w-10 h-10 transform -rotate-90">
                                <circle cx="20" cy="20" r="16" stroke="#e5e7eb" strokeWidth="3" fill="none" />
                                <circle 
                                  cx="20" cy="20" r="16" 
                                  stroke="#3b82f6" 
                                  strokeWidth="3" 
                                  fill="none" 
                                  strokeDasharray={`${(app.score / 100) * 100} 100`}
                                  strokeLinecap="round"
                                />
                              </svg>
                              <span className="absolute text-xs font-semibold">{app.score}%</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Consultations & Quick Actions */}
          <div className="space-y-6">
            {/* Upcoming Consultations */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Upcoming Consultations</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700">Schedule</button>
              </div>
              <div className="space-y-4">
                {upcomingConsultations.map((consult, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex flex-col items-center justify-center">
                      <Clock className="w-4 h-4 text-blue-600 mb-1" />
                      <span className="text-xs font-bold text-blue-600">{consult.time.split(' ')[0]}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{consult.student}</p>
                      <p className="text-xs text-gray-500 mt-1">{consult.type} • {consult.duration}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-400">{consult.country}</span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
              <p className="text-blue-100 text-sm mb-4">Manage student applications and consultations</p>
              <div className="space-y-2">
                <button className="w-full bg-white/20 hover:bg-white/30 rounded-lg py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                  <UserPlus className="w-4 h-4" />
                  Add New Student
                </button>
                <button className="w-full bg-white/20 hover:bg-white/30 rounded-lg py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                  <Send className="w-4 h-4" />
                  Schedule Consultation
                </button>
                <button className="w-full bg-white/20 hover:bg-white/30 rounded-lg py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                  <FileText className="w-4 h-4" />
                  Process Application
                </button>
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-800">Visa approved for <span className="font-semibold">Sarah Johnson</span></p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-800">New application received from <span className="font-semibold">Michael Chen</span></p>
                    <p className="text-xs text-gray-400">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mt-1">
                    <Clock className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-800">Consultation scheduled with <span className="font-semibold">Priya Sharma</span></p>
                    <p className="text-xs text-gray-400">Yesterday</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationDashboard;