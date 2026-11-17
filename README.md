# 🎵 VocalClear AI — Free In-Browser Background Music & Voice Separator

> **100% Free, Unlimited, In-Browser AI Audio & Video Stem Separation.**  
> Powered by **Meta's HTDemucs** deep-learning model running client-side via **ONNX Runtime Web** (WebGPU & WebAssembly).  
> **Hosted completely free on GitHub Pages with zero server costs or backend infrastructure.**

---

## 🌟 Key Features

* **🧠 Studio-Grade AI (Meta HTDemucs):** Splits any audio or video file into isolated **Vocals**, **Background Music (No Vocals)**, **Drums**, **Bass**, and **Melody/Instruments**.
* **⚡ 100% Client-Side Processing:** All computations happen directly in your browser. Your audio and video files **never leave your device** — 100% private and secure.
* **🚀 Hardware Accelerated:** Automatically utilizes **WebGPU** on modern GPUs for blazing fast tensor inference, with multi-threaded **WebAssembly (WASM)** fallback for universal device support.
* **💾 Smart Model Caching:** The neural weights are cached in your browser's Cache API / IndexedDB on the first visit — subsequent runs start instantly offline with 0MB download.
* **🎬 Audio & Video Input Support:**
  * **Audio Formats:** MP3, WAV, M4A, AAC, FLAC, OGG, WMA.
  * **Video Formats:** MP4, WebM, MOV, MKV (audio track is extracted and resampled on the fly).
* **🎚️ Interactive Multi-Track DAW Mixer:**
  * Real-time synchronized master transport (Play / Pause / Scrub / Time display).
  * Animated glowing canvas waveform visualizer.
  * Individual stem faders (0% to 150% volume).
  * **Solo (S)** and **Mute (M)** toggles for each stem.
* **⚡ Instant DSP Vocal Cancellation Mode:**
  * Zero-wait (0.1s) center-channel phase inversion for instant vocal removal without waiting for neural downloads.
* **📦 Export Suite:**
  * Download **Vocals Only (Voice / Narrator)** in lossless 16-bit 44.1kHz WAV.
  * Download **Background Music & Sound Effects Only (No Vocals)** in lossless 16-bit 44.1kHz WAV.
  * Download **All Stems as ZIP** with one click.

---

## 🚀 How to Enable GitHub Pages (Free Hosting)

Once this repository is on GitHub, hosting your website on **GitHub Pages** is completely free and takes 30 seconds:

### Step 1: Open Repository Settings
1. Navigate to your repository on GitHub:
   [https://github.com/aditya-Pratap15/BG-separator-](https://github.com/aditya-Pratap15/BG-separator-)
2. Click on the **Settings** tab in the top navigation bar.

### Step 2: Navigate to Pages
1. In the left-hand settings sidebar, scroll to the **Code and automation** section.
2. Click on **Pages**.

### Step 3: Choose Build & Deployment Source
Under **Build and deployment** > **Source**, choose either of these two options:

* **Option A (Recommended — GitHub Actions):**
  1. Select **GitHub Actions** from the dropdown.
  2. The automated workflow `.github/workflows/deploy.yml` will automatically build and deploy the site whenever you push changes to `main`.

* **Option B (Direct Branch Deployment):**
  1. Select **Deploy from a branch**.
  2. Under **Branch**, select `main` and folder `/docs`.
  3. Click **Save**.

### Step 4: Access Your Live Website!
After 1–2 minutes, GitHub Pages will display your live website URL:
🌐 **`https://aditya-pratap15.github.io/BG-separator-/`**

---

## 🛠️ Architecture & Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | Vanilla JS (ES Modules) + Vite 8 | Fast, lightweight, zero runtime framework overhead |
| **Neural AI Model** | Meta HTDemucs (`htdemucs_embedded.onnx`) | High-fidelity 4-stem source separation |
| **Inference Engine** | ONNX Runtime Web (`onnxruntime-web`) | WebGPU & SIMD WebAssembly tensor execution |
| **Cross-Origin Isolation** | `coi-serviceworker` | Enables `SharedArrayBuffer` for multi-threading on GitHub Pages |
| **Audio Pipeline** | Web Audio API (`AudioContext`, `OfflineAudioContext`) | File decoding, 44.1kHz resampling & stereo extraction |
| **Archiving** | JSZip | Client-side ZIP generation for one-click stem bundles |
| **Hosting & CI/CD** | GitHub Pages + GitHub Actions | 100% free static site hosting and continuous deployment |

---

## 💻 Local Development

If you want to run the application locally on your computer:

```bash
# 1. Clone the repository
git clone https://github.com/aditya-Pratap15/BG-separator-.git
cd BG-separator-

# 2. Install dependencies
npm install

# 3. Start local development server (with required COOP/COEP headers)
npm run dev

# 4. Open in browser
# http://localhost:5173
```

To build for production:
```bash
npm run build
```

---

## 📄 License
This project is open-source and released under the [MIT License](LICENSE).
The underlying HTDemucs model is developed and open-sourced by Meta AI Research.
