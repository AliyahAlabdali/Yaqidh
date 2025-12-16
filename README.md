# Yaqidh | يقظ
### Smart Vision System for Safer Childhood Environments

![Project Status](https://img.shields.io/badge/Status-Under%20Development-pink)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-Academic-green)

> **Project ID:** CSAI-471-P1-F09\
> **Institution:** Umm Al-Qura University - Faculty of Computer and Information Systems\
> **Department:** Department of Computer Science and Artificial Intelligence

---

## 📖 Abstract
**Yaqidh** is an AI-powered smart monitoring system designed to enhance safety in childhood environments such as nurseries and homes. By leveraging advanced Computer Vision (YOLOv8) and Real-Time Processing, the system autonomously detects critical incidents, specifically **Falls**, **Physical Aggression**, and **Unattended Children**, and instantly alerts caregivers and managers.

This solution aims to reduce the reliance on continuous manual surveillance, minimize response times to accidents, and provide peace of mind to parents and staff.

## ✨ Key Features
* **Real-Time Incident Detection:** Automatically identifies high-risk events (Falls, Aggression, Unattended Child) using AI.
* **Role-Based Access Control:** Distinct interfaces and permissions for **Nursery Managers**, **Teachers**, and **Parents**.
* **Instant Alert System:** Multi-channel notifications via Dashboard, SMS, and Email.
* **Live Monitoring Dashboard:** A centralized hub for viewing live camera feeds and system status.
* **Incident Logging & Reporting:** Automated archiving of event snapshots/clips with detailed logs for review.
* **Admin Configuration:** Comprehensive settings for managing staff, cameras, zones, and notification preferences.

## 🛠️ Technology Stack
This project utilizes a modern, modular architecture:

### Frontend (Web Application)
* **Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **Icons:** Lucide-React
* **Charts:** Recharts

### Backend & AI (Planned Integration)
* **Core Server:** Flask (Python)
* **Computer Vision Model:** YOLOv8 (Ultralytics)
* **Image Processing:** OpenCV
* **Training Environment:** Google Colab

---

## 🚀 Installation & Setup

### Prerequisites
* Node.js (v16+)
* npm (v8+)

### Steps
1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/AliyahAlabdali/yaqidh.git]\   cd yaqidh
    ```

2.  **Install Frontend Dependencies**
    ```bash
    npm install
    ```

3.  **Run the Development Server**
    ```bash
    npm run dev
    ```
    The application will launch at `http://localhost:5173`.

---

## 📂 Project Structure
```text
src/
├── ai/              # Placeholder modules for AI inference integration
├── components/      # Reusable UI components (Layout, StatCards, Modals)
├── pages/           # Main application views (Dashboard, LiveMonitor, Settings, etc.)
├── mockBackend/     # Simulated data for development/testing
└── assets/          # Static assets (Logos, Icons)