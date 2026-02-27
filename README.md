# Clickbait Detector Pro
### Reclaiming the Web: Intelligent Headline Analysis and Sensationalism Filtering
**License: MIT** | **Manifest V3** | **Pure Vanilla JS** | **Privacy Focused**

[Overview](#overview) • [Key Features](#key-features) • [Detection Logic](#detection-logic) • [Installation](#installation) • [Project Structure](#project-structure) • [Roadmap](#roadmap)

---

## Overview
**Clickbait Detector Pro** is a high-performance, privacy-focused Chrome extension designed to help users navigate the modern web without being misled by sensationalist headlines. Using a sophisticated heuristic engine, it scans websites in real-time and flags potential clickbait before you click.

By highlighting "engagement-bait" patterns, this tool empowers researchers, students, and everyday users to make more informed decisions about the content they consume, saving time and reducing mental fatigue.

## Key Features

### 🔎 Smart Heuristic Scanning
The extension analyzes the DOM (Document Object Model) of any website you visit, identifying headlines and titles. It applies a multi-layered scoring system to determine if a headline is trying to manipulate user curiosity.

### 📊 Real-Time Dashboard
A sleek, **Glassmorphism-designed** popup provides live statistics on your browsing habits:
*   **Total Scanned:** Tracks every headline analyzed.
*   **Caught:** Displays the number of clickbait traps successfully identified.
*   **Status Toggle:** Instantly enable or disable scanning with a single click.

### 🚩 Visual Warning System
When the detector identifies a high-scoring clickbait headline, it injects a subtle but clear **"🚩 Clickbait?"** badge directly onto the webpage, ensuring you are warned exactly where it matters.

### 🛡️ Privacy and Performance
*   **Zero Data Collection:** Your browsing history never leaves your machine. All analysis happens locally in the browser.
*   **Lightweight Execution:** Built with vanilla JavaScript and the `MutationObserver` API to ensure zero impact on page load speeds or battery life.

## Detection Logic
The "Engine" (located in `content/content.js`) uses a weighted scoring algorithm based on four primary pillars of clickbait identification:
1.  **Mystery Patterns:** Identification of vague pronouns (*"This," "These," "You won't believe"*) that withhold information.
2.  **Emotional Triggers:** Detection of "power words" like *Shocking, Insane, Heartbreaking,* or *Gone Wrong*.
3.  **The Shouting Check:** Monitoring the ratio of ALL-CAPS words to normal text.
4.  **The Question Trap:** Flagging headlines that pose a question to generate a curiosity gap rather than provide information.

## Installation

### Manual Development Setup (GitHub Version)
Since this project is in active development, you can install it manually:
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/Clickbait-Detector.git
    ```
2.  Open Chrome and navigate to `chrome://extensions/`.
3.  Enable **Developer Mode** (toggle in the top right).
4.  Select **Load unpacked** and choose the `Clickbait_Detector` directory.

## How to Use
1.  Navigate to any news site, YouTube, or social media platform.
2.  The extension will automatically scan headlines as you scroll.
3.  Click the **Detector Pro** icon in your toolbar to see your stats or disable real-time scanning.
4.  Look for the **"🚩 Clickbait?"** badge next to sensationalist titles.

## Project Structure
```text
Clickbait-Detector/
├── icons/            # Visual assets (icon128.png)
├── content/
│   ├── content.js    # Core detection logic and DOM injection
│   └── content.css   # Styling for the injected badges
├── popup/
│   ├── popup.html    # Dashboard User Interface
│   ├── popup.css     # Premium styling (Glassmorphism/Dark Mode)
│   └── popup.js      # UI logic and storage management
├── background.js     # Service worker for initialization
├── manifest.json     # Extension configuration (Manifest V3)
└── readme.md         # Professional documentation
```

## Roadmap
*   [ ] **AI Integration:** Add an optional toggle to use the Gemini API for "Deep Scan" semantic analysis.
*   [ ] **Community Reports:** Allow users to manually flag headlines to improve the heuristic accuracy.
*   [ ] **Headline Rewriting:** Potential feature to summarize the actual article content to replace the clickbait title.

## License
This project is licensed under the **MIT License**. Feel free to fork, modify, and use this project for your own professional development.
