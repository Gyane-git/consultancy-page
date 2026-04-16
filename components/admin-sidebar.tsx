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
  
  Plus,
  Video,
} from "lucide-react";

const EducationSidebar = () => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    "Student Management": true,
    "Applications": true,
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

  // Trimmed menu: keep main admin sections only
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard", description: "Overview & Analytics" },
    { icon: GraduationCap, label: "Students", path: "/admin/students", expandable: true, children: [ { name: "All Students", path: "/admin/students", icon: Users, count: 1284 } ] },
    { icon: FileText, label: "Applications", path: "/admin/applications", expandable: false, children: [] },
    { icon: BookOpen, label: "IELTS Prep", path: "/admin/ielts", expandable: false, children: [] },
    { icon: Globe, label: "Destinations", path: "/admin/destinations", expandable: false, children: [] },
    { icon: Globe, label: "Universities", path: "/admin/universities", expandable: false, children: [] },
    { icon: Award, label: "Scholarships", path: "/admin/scholarships", expandable: false, children: [] },
    { icon: Calendar, label: "Consultations", path: "/admin/consultations", expandable: false, children: [] },
    { icon: BarChart3, label: "Reports", path: "/admin/reports", expandable: false, children: [] },
    { icon: UserCog, label: "Staff", path: "/admin/staff", expandable: false, children: [] },
    { icon: DollarSign, label: "Payments", path: "/admin/payments", expandable: false, children: [] },
    { icon: Mail, label: "Communications", path: "/admin/communications", expandable: false, children: [] },
    { icon: Settings, label: "Settings", path: "/admin/settings", expandable: false, children: [] },
  ];

  // Helper function to render icons with active state
  const renderIcon = (Icon: any, isActiveItem: boolean, customClass = "") => {
    return <Icon className={`w-5 h-5 transition-colors ${isActiveItem ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'} ${customClass}`} />;
  };

  return (
    <div className="w-72 bg-gradient-to-b from-white to-gray-50 h-full border-r border-gray-200 flex flex-col overflow-hidden shadow-lg">
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

// no fallback icons needed; using lucide-react icons

export default EducationSidebar;