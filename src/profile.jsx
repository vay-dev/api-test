import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  User,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Clock,
  Star,
  MessageCircle,
  Share2,
  Edit,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = ({ profileId = "1" }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProfileData();
  }, [profileId]);

  const getProfileData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://68a0edbc6f8c17b8f5d8d215.mockapi.io/api/test/${profileId}`
      );

      if (!response.ok) {
        throw new Error(`Profile not found (${response.status})`);
      }

      const data = await response.json();
      setProfile(data);
      console.log("Profile loaded successfully!");
    } catch (error) {
      setError(error.message);
      console.error("Error fetching profile:", error);
      console.log("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToListing = () => {
    navigate("/");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.name}'s Profile`,
          text: `Check out ${profile.name}'s profile - ${profile.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      console.log("Profile link copied to clipboard!");
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Loading Profile
          </h2>
          <p className="text-gray-500">
            Please wait while we fetch the profile data...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Profile Not Found
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={getProfileData}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Try Again
            </button>
            <button
              onClick={handleBackToListing}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to Listing
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Navigation */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <button
              onClick={handleBackToListing}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors duration-200 group"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />
              Back to Team Directory
            </button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Profile Details
                </h1>
                <p className="text-gray-600 mt-1">
                  Complete information about team member
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleShare}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <Share2 size={18} />
                  Share
                </button>
                <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                  <Edit size={18} />
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Profile Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-xl object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        profile.name
                      )}&background=random&size=256`;
                    }}
                  />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 border-4 border-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
                  {profile.name}
                </h2>
                <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  {profile.title}
                </span>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3 mb-8">
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                  <MessageCircle size={20} />
                  Send Message
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2">
                  <Mail size={20} />
                  Send Email
                </button>
              </div>

              {/* Contact Info */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail size={18} className="text-blue-500" />
                    <span className="text-sm">
                      {profile.name.toLowerCase().replace(" ", ".")}@company.com
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone size={18} className="text-green-500" />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin size={18} className="text-red-500" />
                    <span className="text-sm">San Francisco, CA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <User className="text-blue-600" size={24} />
                About
              </h3>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  {profile.desction}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </div>

            {/* Professional Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Briefcase className="text-purple-600" size={24} />
                Professional Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Current Position
                  </h4>
                  <p className="text-gray-600">{profile.title}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Department
                  </h4>
                  <p className="text-gray-600">Operations</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Employee ID
                  </h4>
                  <p className="text-gray-600">
                    EMP-{profile.id.padStart(4, "0")}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Experience
                  </h4>
                  <p className="text-gray-600">5+ years</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Clock className="text-green-600" size={24} />
                Timeline
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Joined Company
                    </p>
                    <p className="text-gray-600 text-sm">
                      {formatDate(profile.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Profile Created
                    </p>
                    <p className="text-gray-600 text-sm">
                      Account setup completed
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Last Updated</p>
                    <p className="text-gray-600 text-sm">
                      Profile information updated
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills & Ratings */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Star className="text-yellow-500" size={24} />
                Skills & Performance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Leadership",
                  "Communication",
                  "Problem Solving",
                  "Teamwork",
                ].map((skill, index) => (
                  <div key={skill} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-900">{skill}</h4>
                      <span className="text-sm text-gray-500">
                        {Math.floor(Math.random() * 2) + 4}/5
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{
                          width: `${Math.floor(Math.random() * 20) + 80}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
