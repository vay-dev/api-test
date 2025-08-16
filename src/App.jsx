import "./App.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  User,
  Calendar,
  ExternalLink,
  Loader2,
  AlertCircle,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

function App() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getApi();
  }, []);

  const getApi = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://68a0edbc6f8c17b8f5d8d215.mockapi.io/api/test"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProfiles(data);
      toast.success("Data fetched successfully!");
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleViewProfile = (id) => {
    // Navigate to dynamic profile page
    window.open(`/profile/${id}`, "_blank");
  };

  const handleViewDetails = (id) => {
    // Navigate to detailed profile page
    window.open(`/profile/${id}/details`, "_blank");
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Loading Profiles
          </h2>
          <p className="text-gray-500">
            Please wait while we fetch the data...
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
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={getApi}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-8 w-8 text-blue-600" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Team Directory
              </h1>
            </div>
            <p className="text-lg text-gray-600">
              Discover our talented team members
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                {profiles.length}{" "}
                {profiles.length === 1 ? "Profile" : "Profiles"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {profiles.length === 0 ? (
          <div className="text-center py-16">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No profiles found
            </h3>
            <p className="text-gray-500">
              Check back later for team member profiles.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 group"
              >
                {/* Card Header with Gradient */}
                <div className="relative">
                  <div className="h-36 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                  <div className="absolute -bottom-14 left-6">
                    <div className="relative">
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-28 h-28 rounded-full border-4 border-white shadow-xl object-cover"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            profile.name
                          )}&background=random&size=128`;
                        }}
                      />
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="pt-20 p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {profile.name}
                    </h3>
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {profile.title}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3">
                    {profile.desction}
                  </p>

                  <div className="flex items-center text-gray-500 text-sm mb-6">
                    <Calendar size={16} className="mr-2 text-blue-500" />
                    <span>Joined {formatDate(profile.createdAt)}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleViewProfile(profile.id)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
                    >
                      <User size={16} />
                      View Profile
                    </button>
                    <button
                      onClick={() => handleViewDetails(profile.id)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
                    >
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Refresh Button */}
        <div className="text-center mt-12">
          <button
            onClick={getApi}
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2 inline" />
                Refreshing...
              </>
            ) : (
              "Refresh Data"
            )}
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
