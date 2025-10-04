<div align="center">
  <img src="Untitled design (3).png" alt="SevaKey Logo" width="150"/>
  
  # SevaKey  
  *Your Health. Your Key. Your Control.*
</div>

---

## 🚀 About the Project
*SevaKey* is a healthcare platform that gives *patients full ownership and access to their medical history* using a single *SevaKey ID*.  

It bridges patients, doctors, and pharmacies in one ecosystem — ensuring *trust, simplicity, and security* in healthcare.

A group project built by *Shivang & Chaitanya*.

---

## 🌟 Core Highlights
- 🔑 *SevaKey ID*  
  Every patient gets a unique digital health ID.  
  Temporary IDs can be generated for *time-limited, controlled sharing*.  

- 🩺 *Doctor AI Assistant*  
  Record consultations → AI transcribes & structures notes → share instantly with patients.  

- 💊 *Pharmacy Verification*  
  Patients can share their SevaKey ID with pharmacies to *digitally verify prescriptions*.  

- 📡 *Emergency Offline Mode*  
  Core health details remain accessible even without internet.  

- 🤖 *AI Wellness Chatbot*  
  Offers safe home remedies, lifestyle guidance, and preventive health tips.  
  (No risky self-diagnosis.)

---

## 📲 User Roles
| Role       | Capabilities |
|------------|--------------|
| *Patient* | Register, receive SevaKey ID, manage/share records, generate Temporary IDs |
| *Doctor*  | Access patient records, record & transcribe consultations, update notes |
| *Pharmacist* | Verify prescriptions using SevaKey ID |

---

## 🖥 Screens (MVP)
1. Splash & Branding  
2. Login / Signup (Patient / Doctor)  
3. Patient Dashboard (SevaKey ID + Temporary ID)  
4. Doctor Dashboard (Consultation recording + AI transcription)  
5. Pharmacy Verification Screen  
6. Emergency Offline Mode  
7. AI Wellness Chatbot  

---

## ⚙ Tech Stack
- *Frontend:* Flutter (Mobile-first), React (Web prototype)  
- *Backend:* Python FastAPI  
- *Database:* PostgreSQL  
- *AI Services:* Whisper API (speech-to-text), lightweight LLM for medical note summarization  
- *Security:* JWT Auth, encrypted storage, role-based access  

---

## 📖 Workflow Example
1. Patient registers → receives unique SevaKey ID.  
2. Doctor enters SevaKey ID → starts consultation → records audio.  
3. AI transcribes & structures notes → doctor reviews/edits → saves.  
4. Notes get securely linked to the patient’s SevaKey ID.  
5. Patient can generate a *Temporary ID* → share with a pharmacy to verify prescriptions.  

---

## 🎨 Branding
- *App Name:* SevaKey  
- *ID System:* SevaKey ID  
- *Colors:* Orange (#EEA52C), Blue (#005A7F), White  
- *Tagline:* Your Health, One Key Away  

---

## 🛠 Installation (for developers)
```bash
# Clone the repo
git clone https://github.com/your-username/sevakey.git

# Navigate into project
cd sevakey

# Install dependencies
flutter pub get
# OR (for web prototype)
npm install

# Run project
flutter run
# OR
npm start
