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
import "./profile.css";

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
      <div className="loading-container">
        <div className="loading-content">
          <Loader2 className="loading-spinner" />
          <h2 className="loading-title">Loading Profile</h2>
          <p className="loading-text">
            Please wait while we fetch the profile data...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <AlertCircle className="error-icon" />
          <h2 className="error-title">Profile Not Found</h2>
          <p className="error-text">{error}</p>
          <div className="error-buttons">
            <button onClick={getProfileData} className="retry-button">
              Try Again
            </button>
            <button onClick={handleBackToListing} className="back-button">
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
    <div className="profile-container">
      {/* Header with Navigation */}
      <header className="profile-header">
        <div className="header-content">
          <div className="header-inner">
            <button onClick={handleBackToListing} className="back-nav-button">
              <ArrowLeft size={20} className="back-arrow" />
              Back to Team Directory
            </button>
            <div className="header-main">
              <div className="header-text">
                <h1 className="header-title">Profile Details</h1>
                <p className="header-subtitle">
                  Complete information about team member
                </p>
              </div>
              <div className="header-actions">
                <button onClick={handleShare} className="share-button">
                  <Share2 size={18} />
                  Share
                </button>
                <button className="edit-button">
                  <Edit size={18} />
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Profile Content */}
      <main className="profile-main">
        <div className="profile-grid">
          {/* Left Column - Profile Summary */}
          <div className="profile-sidebar">
            <div className="sidebar-card">
              <div className="profile-summary">
                <div className="avatar-container">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="profile-avatar"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        profile.name
                      )}&background=random&size=256`;
                    }}
                  />
                  <div className="online-indicator">
                    <div className="online-dot"></div>
                  </div>
                </div>
                <h2 className="profile-name">{profile.name}</h2>
                <span className="profile-title-badge">{profile.title}</span>
              </div>

              {/* Quick Actions */}
              <div className="quick-actions">
                <button className="message-button">
                  <MessageCircle size={20} />
                  Send Message
                </button>
                <button className="email-button">
                  <Mail size={20} />
                  Send Email
                </button>
              </div>

              {/* Contact Info */}
              <div className="contact-section">
                <h3 className="contact-title">Contact Information</h3>
                <div className="contact-list">
                  <div className="contact-item">
                    <Mail size={18} className="contact-icon email-icon" />
                    <span className="contact-text">
                      {profile.name.toLowerCase().replace(" ", ".")}@company.com
                    </span>
                  </div>
                  <div className="contact-item">
                    <Phone size={18} className="contact-icon phone-icon" />
                    <span className="contact-text">+1 (555) 123-4567</span>
                  </div>
                  <div className="contact-item">
                    <MapPin size={18} className="contact-icon location-icon" />
                    <span className="contact-text">San Francisco, CA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="profile-content">
            {/* About Section */}
            <div className="content-section">
              <h3 className="section-title">
                <User className="section-icon user-icon" size={24} />
                About
              </h3>
              <div className="section-content">
                <p className="about-description">{profile.desction}</p>
                <p className="about-additional">
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
            <div className="content-section">
              <h3 className="section-title">
                <Briefcase className="section-icon briefcase-icon" size={24} />
                Professional Details
              </h3>
              <div className="professional-grid">
                <div className="professional-item">
                  <h4 className="professional-label">Current Position</h4>
                  <p className="professional-value">{profile.title}</p>
                </div>
                <div className="professional-item">
                  <h4 className="professional-label">Department</h4>
                  <p className="professional-value">Operations</p>
                </div>
                <div className="professional-item">
                  <h4 className="professional-label">Employee ID</h4>
                  <p className="professional-value">
                    EMP-{profile.id.padStart(4, "0")}
                  </p>
                </div>
                <div className="professional-item">
                  <h4 className="professional-label">Experience</h4>
                  <p className="professional-value">5+ years</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="content-section">
              <h3 className="section-title">
                <Clock className="section-icon clock-icon" size={24} />
                Timeline
              </h3>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-dot blue-dot"></div>
                  <div className="timeline-content">
                    <p className="timeline-title">Joined Company</p>
                    <p className="timeline-date">
                      {formatDate(profile.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot green-dot"></div>
                  <div className="timeline-content">
                    <p className="timeline-title">Profile Created</p>
                    <p className="timeline-date">Account setup completed</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot purple-dot"></div>
                  <div className="timeline-content">
                    <p className="timeline-title">Last Updated</p>
                    <p className="timeline-date">Profile information updated</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills & Ratings */}
            <div className="content-section">
              <h3 className="section-title">
                <Star className="section-icon star-icon" size={24} />
                Skills & Performance
              </h3>
              <div className="skills-grid">
                {[
                  "Leadership",
                  "Communication",
                  "Problem Solving",
                  "Teamwork",
                ].map((skill, index) => (
                  <div key={skill} className="skill-item">
                    <div className="skill-header">
                      <h4 className="skill-name">{skill}</h4>
                      <span className="skill-rating">
                        {Math.floor(Math.random() * 2) + 4}/5
                      </span>
                    </div>
                    <div className="skill-progress">
                      <div
                        className="skill-progress-bar"
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
