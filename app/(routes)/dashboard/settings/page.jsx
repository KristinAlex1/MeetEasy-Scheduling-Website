// app/settings/page.jsx (or pages/settings.jsx for older versions of Next.js)

import React from "react";

function SettingsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <div className="space-y-4">
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Profile</h2>
          <p className="text-gray-600">Update your profile information.</p>
          {/* Profile Settings Form */}
        </div>

        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Subscription</h2>
          <p className="text-gray-600">Manage your subscription plan.</p>
          {/* Subscription Management */}
        </div>

        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Security</h2>
          <p className="text-gray-600">Change your password or enable two-factor authentication.</p>
          {/* Security Settings */}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
