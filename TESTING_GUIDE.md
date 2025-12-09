# Testing Guide - Yaqidh Authentication & Administration

## Quick Start

The application is running on `http://localhost:5178/`

### Default Demo Credentials
- **Email:** `demo@yaqidh.com`
- **Password:** `demo123`

---

## Feature Testing Checklist

### 1. Authentication Flow

#### Login Page (`/login`)
- [ ] Navigate to `/login`
- [ ] Test email/phone input validation
- [ ] Test password visibility toggle (Eye icon)
- [ ] Test "Forgot Password" link
- [ ] Enter demo credentials and login
- [ ] Verify redirect to Dashboard (`/`)
- [ ] Check demo credentials box styling

#### Register Page (`/register`)
- [ ] Navigate to `/register`
- [ ] Fill out Step 1 form:
  - [ ] Full Name
  - [ ] Email
  - [ ] Phone Number
  - [ ] Password
  - [ ] Confirm Password (test mismatch)
  - [ ] Select Role (Parent/Caregiver or Nursery Manager)
- [ ] Click "Continue to Verification"
- [ ] Verify Step 2 - Phone Verification appears
- [ ] Enter verification code (any 6 digits)
- [ ] Complete registration and verify redirect to Dashboard
- [ ] Test "Back to Registration" link

### 2. Settings Hub (`/settings`)

#### Tab 1: Edit Profile
- [ ] Click Profile tab
- [ ] Update Full Name, Email, Phone
- [ ] Click "Upload Picture" button
- [ ] Select an image file
- [ ] Verify filename displays
- [ ] Click "Save Changes"

#### Tab 2: Notifications
- [ ] Click Notifications tab
- [ ] Toggle SMS Notifications on/off
- [ ] Toggle Email Notifications on/off
- [ ] Toggle Mobile App Notifications on/off
- [ ] Toggle Dashboard Color Indicators on/off
- [ ] Verify button state changes (On/Off)

#### Tab 3: Manage Cameras
- [ ] Click Cameras tab
- [ ] Click "Add Camera" button
- [ ] Fill in camera form:
  - [ ] Camera Name (e.g., "Test Camera")
  - [ ] IP Address (e.g., "192.168.1.100")
  - [ ] Zone (e.g., "Test Zone")
  - [ ] Connection Status dropdown
- [ ] Click "Add" button
- [ ] Verify new camera appears in grid
- [ ] Test "Edit" button on a camera
- [ ] Make changes and verify update
- [ ] Test "Delete" button
- [ ] Verify camera is removed from list

#### Tab 4: User Management (Manager Only)
- [ ] Click Staff tab (only visible to managers)
- [ ] Click "Add Teacher" button
- [ ] Fill in teacher form:
  - [ ] Email Address
  - [ ] Assigned Classroom/Zone
  - [ ] Role dropdown
- [ ] Click "Add Teacher"
- [ ] Verify new teacher appears in table
- [ ] Test "Remove" action
- [ ] Verify teacher is removed

#### Tab 5: Performance & Analytics
- [ ] Click Analytics tab
- [ ] Verify "Alert Distribution by Zone" section:
  - [ ] Progress bars showing alert counts
  - [ ] Zone names displayed
  - [ ] Numerical values visible
- [ ] Verify "Average Response Time" section:
  - [ ] Response times by zone
  - [ ] Overall average displayed

### 3. Incidents Page with Modal

#### Viewing Incidents
- [ ] Navigate to `/incidents` or click "Incidents" in sidebar
- [ ] View incident cards with:
  - [ ] Incident type
  - [ ] Location
  - [ ] Severity badge (color-coded)
  - [ ] Timestamp
  - [ ] Status indicator
- [ ] Click on any incident card

#### Incident Details Modal
- [ ] Modal opens on incident click
- [ ] Verify modal header shows "Incident Details"
- [ ] Check incident info displays correctly:
  - [ ] Incident Type
  - [ ] Severity (with color badge)
  - [ ] Location
  - [ ] Status (with color indicator)
- [ ] Verify Metadata section:
  - [ ] Timestamp: "2025-12-09 10:45:23"
  - [ ] Camera ID: "CAM-001" etc.
  - [ ] Zone matches location
  - [ ] Duration: "2 minutes 45 seconds"
- [ ] View Evidence Snapshot placeholder
- [ ] Check Alert Logs:
  - [ ] Multiple log entries with times
  - [ ] "System" label on each entry
- [ ] Scroll to User Notes section:
  - [ ] View admin note example
  - [ ] Add custom note in textarea
  - [ ] Click "Add Note" button
- [ ] Test action buttons:
  - [ ] "Mark as Resolved" button
  - [ ] "Close" button
- [ ] Close modal with:
  - [ ] X button (top-right)
  - [ ] Close button (footer)

### 4. Navigation & Routing

- [ ] Verify all routes load correctly:
  - [ ] `/` - Dashboard
  - [ ] `/login` - Login Page
  - [ ] `/register` - Register Page
  - [ ] `/live` - Live Monitoring
  - [ ] `/incidents` - Incidents with modal
  - [ ] `/reports` - Reports with charts
  - [ ] `/settings` - Settings with tabs
  - [ ] `/about` - About page
- [ ] Test sidebar navigation works
- [ ] Test back/forward browser buttons
- [ ] Verify no layout appears on auth pages

### 5. Styling & Design

- [ ] Verify pink theme throughout:
  - [ ] Brand-500 color (#ec4899) on buttons/badges
  - [ ] Light pink backgrounds where appropriate
  - [ ] Proper text color contrast
- [ ] Check rounded corners:
  - [ ] `rounded-xl` on inputs/buttons
  - [ ] `rounded-2xl` on cards
- [ ] Verify responsive design:
  - [ ] Test on mobile width (< 640px)
  - [ ] Test on tablet width (640px - 1024px)
  - [ ] Test on desktop width (> 1024px)
- [ ] Test hover effects on all interactive elements
- [ ] Verify shadows and borders display correctly

### 6. Form Validations

- [ ] Login form: Test empty field submission
- [ ] Register form: Test password mismatch
- [ ] Register form: Test short password
- [ ] Settings forms: Test required fields
- [ ] Camera form: Test missing fields
- [ ] Teacher form: Test email format (basic)

---

## Browser DevTools Testing

### Console
- [ ] No JavaScript errors
- [ ] No unhandled promise rejections
- [ ] Session storage updated on login

### Network
- [ ] No failed HTTP requests (for static assets)
- [ ] Hot module replacement working (HMR)

### Responsive Design
- [ ] iPhone SE (375x667)
- [ ] iPad (768x1024)
- [ ] Desktop (1920x1080)

---

## Known Limitations (Simulated Features)

- ✓ Login/Register: Simulated with sessionStorage
- ✓ Phone Verification: UI placeholder (doesn't send SMS)
- ✓ Notifications: Toggle UI (doesn't send actual notifications)
- ✓ Camera Management: UI only (no backend integration)
- ✓ User Management: UI only (no backend integration)
- ✓ Evidence Snapshot: Placeholder (no actual video)
- ✓ Charts: Mock data (not real-time)

---

## Performance Checklist

- [ ] Page loads in < 2 seconds
- [ ] No lag when clicking tabs
- [ ] Modal opens/closes smoothly
- [ ] Responsive to user input
- [ ] No memory leaks in DevTools

---

## Accessibility

- [ ] All buttons are keyboard accessible (Tab key)
- [ ] Form inputs have visible labels
- [ ] Color is not the only indicator
- [ ] Icons have meaningful context
- [ ] Modal has proper focus management

---

## Notes

- All data is temporary (cleared on page refresh)
- Authentication is client-side simulated
- No real backend API calls
- Demo data is hardcoded for testing

---

**Questions or Issues?**
Check the browser console for any error messages and report them.
