"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  GraduationCap,
  Users,
  FileText,
  Calendar,
  Globe,
  Award,
  MessageSquare,
  UserCog,
  BarChart3,
  Mail,
  Phone,
  BookOpen,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Send,
  Download,
  Settings,
  Shield,
  HelpCircle,
  LogOut,
  Bell,
  Star,
  TrendingUp,
  MapPin,
  Briefcase,
  CreditCard,
  PieChart,
  UserPlus,
  Eye,
  ThumbsUp,
  AlertCircle
} from "lucide-react";

const EducationSidebar = () => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    "Student Management": true,
    "Application Processing": true,
  });
  const pathname = usePathname();

  const toggleExpand = (item: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  // Updated Menu Structure for Education Consultancy
  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: "Dashboard", 
      path: "/admin/dashboard",
      description: "Overview & Analytics"
    },

    {
      icon: GraduationCap,
      label: "Student Management",
      path: "#",
      expandable: true,
      children: [
        { name: "All Students", path: "/admin/students", icon: Users, count: 1284 },
        { name: "Add New Student", path: "/admin/students/add", icon: UserPlus },
        { name: "Student Profiles", path: "/admin/students/profiles", icon: Eye },
        { name: "Student Documents", path: "/admin/students/documents", icon: FileText },
      ],
    },

    {
      icon: FileText,
      label: "Application Processing",
      path: "#",
      expandable: true,
      children: [
        { name: "All Applications", path: "/admin/applications", icon: FileText, count: 847 },
        { name: "New Applications", path: "/admin/applications/new", icon: Bell, count: 43 },
        { name: "Visa Processing", path: "/admin/applications/visa", icon: Clock, count: 156 },
        { name: "Offer Letters", path: "/admin/applications/offers", icon: CheckCircle, count: 98 },
        { name: "Documents Review", path: "/admin/applications/documents", icon: Eye },
      ],
    },

    {
      icon: Globe,
      label: "University Partners",
      path: "#",
      expandable: true,
      children: [
        { name: "All Universities", path: "/admin/universities", icon: Globe, count: 156 },
        { name: "Add University", path: "/admin/universities/add", icon: Plus },
        { name: "University Programs", path: "/admin/universities/programs", icon: BookOpen },
        { name: "Partnership Agreements", path: "/admin/universities/agreements", icon: FileText },
        { name: "University Rankings", path: "/admin/universities/rankings", icon: TrendingUp },
      ],
    },

    {
      icon: Award,
      label: "Scholarships",
      path: "#",
      expandable: true,
      children: [
        { name: "All Scholarships", path: "/admin/scholarships", icon: Award, count: 45 },
        { name: "Add Scholarship", path: "/admin/scholarships/add", icon: Plus },
        { name: "Scholarship Applications", path: "/admin/scholarships/applications", icon: FileText },
        { name: "Awarded Scholarships", path: "/admin/scholarships/awarded", icon: CheckCircle, count: 612 },
        { name: "Scholarship Budget", path: "/admin/scholarships/budget", icon: DollarSign },
      ],
    },

    {
      icon: Calendar,
      label: "Consultations",
      path: "#",
      expandable: true,
      children: [
        { name: "Upcoming Consultations", path: "/admin/consultations/upcoming", icon: Clock, count: 28 },
        { name: "Schedule Consultation", path: "/admin/consultations/schedule", icon: Calendar },
        { name: "Consultation History", path: "/admin/consultations/history", icon: FileText },
        { name: "Video Consultations", path: "/admin/consultations/video", icon: Video },
      ],
    },

    {
      icon: MessageSquare,
      label: "Inquiries & Support",
      path: "#",
      expandable: true,
      children: [
        { name: "All Inquiries", path: "/admin/inquiries", icon: MessageSquare, count: 43 },
        { name: "Support Tickets", path: "/admin/support/tickets", icon: HelpCircle },
        { name: "Live Chat", path: "/admin/support/chat", icon: MessageSquare },
        { name: "Email Templates", path: "/admin/support/email-templates", icon: Mail },
        { name: "FAQs", path: "/admin/support/faqs", icon: HelpCircle },
      ],
    },

    {
      icon: BarChart3,
      label: "Reports & Analytics",
      path: "#",
      expandable: true,
      children: [
        { name: "Application Reports", path: "/admin/reports/applications", icon: PieChart },
        { name: "Student Analytics", path: "/admin/reports/students", icon: TrendingUp },
        { name: "Financial Reports", path: "/admin/reports/financial", icon: DollarSign },
        { name: "Visa Success Rate", path: "/admin/reports/visa", icon: CheckCircle },
        { name: "Export Data", path: "/admin/reports/export", icon: Download },
      ],
    },

    {
      icon: UserCog,
      label: "Staff Management",
      path: "#",
      expandable: true,
      children: [
        { name: "All Staff", path: "/admin/staff", icon: Users, count: 24 },
        { name: "Add Staff Member", path: "/admin/staff/add", icon: UserPlus },
        { name: "Roles & Permissions", path: "/admin/staff/roles", icon: Shield },
        { name: "Activity Logs", path: "/admin/staff/activity", icon: FileText },
        { name: "Performance Review", path: "/admin/staff/performance", icon: Star },
      ],
    },

    {
      icon: Briefcase,
      label: "Visa Services",
      path: "#",
      expandable: true,
      children: [
        { name: "Visa Applications", path: "/admin/visa/applications", icon: FileText, count: 156 },
        { name: "Visa Requirements", path: "/admin/visa/requirements", icon: CheckCircle },
        { name: "Visa Checklist", path: "/admin/visa/checklist", icon: FileText },
        { name: "Embassy Appointments", path: "/admin/visa/appointments", icon: Calendar },
        { name: "Visa Success Stories", path: "/admin/visa/success-stories", icon: ThumbsUp },
      ],
    },

    {
      icon: DollarSign,
      label: "Payments & Fees",
      path: "#",
      expandable: true,
      children: [
        { name: "Fee Collections", path: "/admin/payments/collections", icon: CreditCard },
        { name: "Invoices", path: "/admin/payments/invoices", icon: FileText },
        { name: "Refunds", path: "/admin/payments/refunds", icon: XCircle },
        { name: "Commission Tracking", path: "/admin/payments/commission", icon: TrendingUp },
      ],
    },

    {
      icon: Mail,
      label: "Communications",
      path: "#",
      expandable: true,
      children: [
        { name: "Email Campaigns", path: "/admin/communications/emails", icon: Send },
        { name: "Newsletter", path: "/admin/communications/newsletter", icon: Bell },
        { name: "SMS Alerts", path: "/admin/communications/sms", icon: Phone },
        { name: "Notifications", path: "/admin/communications/notifications", icon: Bell },
      ],
    },

    {
      icon: Settings,
      label: "Settings",
      path: "#",
      expandable: true,
      children: [
        { name: "General Settings", path: "/admin/settings/general", icon: Settings },
        { name: "Country Management", path: "/admin/settings/countries", icon: MapPin },
        { name: "Intake Periods", path: "/admin/settings/intakes", icon: Calendar },
        { name: "Email Configuration", path: "/admin/settings/email", icon: Mail },
        { name: "API Integration", path: "/admin/settings/api", icon: Settings },
      ],
    },
  ];

  // Helper function to render icons with active state
  const renderIcon = (Icon: any, isActiveItem: boolean, customClass = "") => {
    return <Icon className={`w-5 h-5 transition-colors ${isActiveItem ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'} ${customClass}`} />;
  };

  return (
    <div className="w-72 bg-gradient-to-b from-white to-gray-50 h-full border-r border-gray-200 flex flex-col overflow-hidden shadow-lg">
      {/* Logo & Brand Section */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              EduConsult
            </h1>
            <p className="text-xs text-gray-500">Admin Portal v2.0</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {menuItems.map((item, index) => (
          <div key={index} className="mb-1">
            {/* Main Menu Item */}
            <div
              className={`flex items-center justify-between px-4 py-2.5 mx-2 rounded-lg cursor-pointer transition-all duration-200 group ${
                isActive(item.path) && !item.expandable
                  ? 'bg-blue-50 text-blue-600 shadow-sm'
                  : 'hover:bg-blue-50'
              }`}
              onClick={() => item.expandable && toggleExpand(item.label)}
            >
              <Link
                href={item.path === "#" ? "#" : item.path}
                className="flex items-center gap-3 flex-1"
                onClick={(e) => item.path === "#" && e.preventDefault()}
              >
                <div className="relative">
                  {renderIcon(item.icon, isActive(item.path) && !item.expandable)}
                  {/* Notification badge for counts */}
                  {item.children && item.children.some(child => child.count) && (
                    <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </div>
                <div className="flex-1">
                  <span className={`text-sm font-medium transition-colors ${
                    isActive(item.path) && !item.expandable ? 'text-blue-600' : 'text-gray-700 group-hover:text-blue-600'
                  }`}>
                    {item.label}
                  </span>
                  {item.description && (
                    <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                  )}
                </div>
              </Link>

              {item.expandable && (
                <div className="text-gray-400 ml-2">
                  {expandedItems[item.label] ? (
                    <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                  ) : (
                    <ChevronRight className="w-4 h-4 transition-transform duration-200" />
                  )}
                </div>
              )}
            </div>

            {/* Expandable Children Menu */}
            {item.expandable && expandedItems[item.label] && item.children && (
              <div className="ml-9 mt-1 space-y-1 border-l-2 border-gray-200 ml-11">
                {item.children.map((child, i) => (
                  <Link
                    key={i}
                    href={child.path}
                    className={`flex items-center justify-between px-4 py-2 text-sm transition-all duration-200 rounded-lg mx-2 ${
                      isActive(child.path)
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {child.icon && renderIcon(child.icon, isActive(child.path), "w-4 h-4")}
                      <span>{child.name}</span>
                    </div>
                    {child.count && (
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        isActive(child.path) 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {child.count}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Section - User Profile & Logout */}
      {/* <div className="border-t border-gray-200 p-4 bg-white">
        Quick Stats
        <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-600">Today's Activity</span>
            <Bell className="w-3 h-3 text-gray-400" />
          </div>
          <div className="flex justify-between text-xs">
            <div>
              <p className="text-gray-500">Consultations</p>
              <p className="font-semibold text-gray-800">8</p>
            </div>
            <div>
              <p className="text-gray-500">Applications</p>
              <p className="font-semibold text-gray-800">12</p>
            </div>
            <div>
              <p className="text-gray-500">Visa Updates</p>
              <p className="font-semibold text-gray-800">5</p>
            </div>
          </div>
        </div>

        User Profile
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
            AD
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">Super Administrator</p>
          </div>
          <LogOut className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
        </div>

        Version Info 
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-center text-gray-400">
            © 2024 EduConsult Pro<br />
            Version 2.0.1
          </p>
        </div>
      </div> */}
    </div>
  );
};

// Missing icon components
const Plus = () => <span className="w-5 h-5 inline-flex items-center justify-center">+</span>;
const Video = () => <span className="w-5 h-5 inline-flex items-center justify-center">📹</span>;

export default EducationSidebar;