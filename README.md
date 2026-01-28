# MeetEasy – Scheduling & Meeting Management App

🔗 **Live Demo:** https://meet-easy-scheduling-website.vercel.app  
📂 **Repository:** This GitHub repository

## 📌 Important Notes Before Using the App

Please keep the following points in mind when testing the application:

1. **Signing in with Google is the recommended login method.**  
   Google authentication provides the most stable and consistent experience during testing.

2. After creating a meeting, **some UI elements may require a refresh** to fully reflect updated data.  
   This is a known behavior and does not affect core functionality such as meeting creation or email notifications.

3. Authentication is configured for the **deployed environment only**.  
   Local execution requires updating OAuth redirect URIs and environment variables accordingly.

These notes are provided to ensure a smooth demo experience for first-time users.

---

## 🧩 Project Overview

MeetEasy is a web-based scheduling application that allows users to create and manage meetings, send invitations, and handle authentication securely. The application focuses on user flows, authentication handling, and integration with third-party services in a real-world web environment.

Core features include:
- User authentication (Google sign-in recommended)
- Meeting scheduling and management
- Email notifications for scheduled meetings
- Secure session handling

---

## 🎯 Purpose of the Project

This project was built as a **learning-focused application** to apply and strengthen my understanding of:

- React and modern front-end architecture
- Authentication workflows using third-party providers
- Secure session and user management
- API integration and event-based workflows
- Structuring and documenting real-world applications

MeetEasy was developed **under academic supervision** as part of my learning process. The goal was not to create a fully production-ready scheduling platform, but to gain hands-on experience with authentication, user flows, and system integration.

---

## 🛠️ Technologies Used

- React / Next.js
- Google Authentication (OAuth)
- API-based email notifications
- JavaScript
- HTML / CSS

---

## ⚠️ Known Limitations

The following limitations are acknowledged as part of the project’s learning-focused scope:

- Newly created meetings may not immediately appear in all UI components until the page is refreshed.
- Authentication is optimized for the deployed environment and is not configured for local OAuth testing by default.
- Error handling and UI feedback are intentionally minimal to keep the project focused on core authentication and scheduling workflows.
- The application has not been optimized for large-scale production use or high concurrent traffic.

These limitations are documented intentionally to provide transparency and context for reviewers.

---

## 🚧 Project Status

This project is maintained as a **portfolio demonstration** of authentication flows, scheduling logic, and system integration concepts. While functional, it is not intended to represent a production-ready enterprise system.

---

## 📎 Additional Notes

This project emphasizes learning outcomes, documentation, and real-world application structure. Known behaviors and limitations are documented to ensure clarity for first-time reviewers.
