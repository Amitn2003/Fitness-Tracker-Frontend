import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, token } = useAuth();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    age: '',
    height: '',
    weight: '',
  });

  useEffect(() => {
    if (user) {
      setProfileData(user);
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });
      const result = await response.json();
      console.log(result)
      if (result.success) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error(result.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label>Name</label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label>Age</label>
          <input
            type="number"
            value={profileData.age}
            onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label>Height (cm)</label>
          <input
            type="number"
            value={profileData.height}
            onChange={(e) => setProfileData({ ...profileData, height: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label>Weight (kg)</label>
          <input
            type="number"
            value={profileData.weight}
            onChange={(e) => setProfileData({ ...profileData, weight: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
