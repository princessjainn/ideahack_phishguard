# PhishGuard AI

## Overview

PhishGuard AI is a machine learning-powered phishing detection system with a Chrome browser extension and REST API backend. The system analyzes URLs in real-time using a Random Forest classifier trained on 450,000+ real phishing and legitimate URLs, achieving 99.41% test accuracy. Users can check URLs directly from their browser with one click.

## User Preferences

- Preferred communication style: Simple, everyday language with Gen Z vibes
- Focus: Backend API + Chrome extension (no web UI)

## System Architecture

### Application Type
**Backend API + Chrome Extension**: Flask REST API backend with Chrome Manifest V3 extension frontend.

**Rationale**: 
- API-only backend allows flexibility for multiple frontends (extension, mobile, other apps)
- Chrome extension provides seamless integration into user's browsing experience
- One-click URL checking without leaving the page
- CORS-enabled for cross-origin requests from extension

### Machine Learning Architecture

**Model: Random Forest Classifier with Standard Scaling**
- **Problem**: Classify URLs as phishing or legitimate with high accuracy and explainability
- **Solution**: Random Forest (150 estimators, max depth 15) with StandardScaler preprocessing and balanced class weights
- **Training Data**: 450,176 real URLs from Mendeley dataset (104,438 phishing, 345,738 legitimate)
- **Performance**: 99.41% test accuracy, 99.62% training accuracy on 50K sample
- **Persistence**: Models saved as pickle files (`phishguard_model.pkl`, `phishguard_scaler.pkl`)

**Feature Engineering Strategy**
- **Extracted Features**: URL length, domain length, HTTPS presence, dots/hyphens/underscores count, special characters, suspicious keywords, TLD analysis
- **Feature Design**: Heuristic-based features that capture common phishing patterns (e.g., excessive subdomains, suspicious keywords like "login" or "verify", non-HTTPS usage)
- **Explainability**: Each feature threshold triggers human-readable explanations (e.g., "⚠️ Unusually long URL (X characters)")

**Scoring System**
- **Safety Score**: 0-100 scale calculated from feature analysis
- **Risk Levels**: Three-tier system (Safe 🟢, Suspicious 🟡, Phishing 🔴) with corresponding emojis for quick visual feedback
- **Dual Output**: Both probability score and risk categorization provided for flexibility

### Chrome Extension Architecture

**Technology**: Manifest V3 Chrome Extension with Vanilla JavaScript
- **Components**: Popup UI, background service worker, content script
- **Design**: Purple gradient theme matching brand, modern Gen Z aesthetic
- **Features**: 
  - One-click page checking from toolbar
  - Configurable API endpoint (works with local or remote)
  - Real-time API connection status
  - Animated results with safety scores and explanations
- **User Flow**: Click extension icon → check current page → view results with vibe check

### Code Organization

**Backend (API)**
- `main.py`: Flask API with CORS, endpoints for URL checking and health
- `model.py`: ML model training, prediction, and persistence with real dataset support
- `feature_extractor.py`: 18 URL feature extraction functions
- `train.py`: Standalone script for training model on dataset

**Extension**
- `chrome-extension/manifest.json`: Extension configuration (Manifest V3)
- `chrome-extension/popup.html`: Main UI interface
- `chrome-extension/popup.js`: Extension logic and API communication
- `chrome-extension/styles.css`: Modern styling with gradients
- `chrome-extension/background.js`: Background service worker
- `chrome-extension/content.js`: Page content monitoring

**Rationale**: Clean separation between backend (API) and frontend (extension) allows independent development and deployment. Model can be retrained without touching extension code.

### Data Flow

1. User clicks PhishGuard extension icon on any webpage
2. Extension captures current page URL
3. User clicks "check this page" button
4. Extension sends POST request to `/api/check` endpoint
5. Flask API receives URL, extracts 18 features via `URLFeatureExtractor`
6. `PhishGuardModel` scales features and generates prediction with probability
7. API calculates safety score (0-100) and risk level with Gen Z vibe message
8. JSON response sent back with score, emoji, vibe, and explanations
9. Extension popup displays animated results with color-coded risk level

## External Dependencies

### Python Libraries

**Core Framework**
- `flask`: Web application framework and routing
- `flask-cors`: CORS support for extension requests

**Machine Learning**
- `scikit-learn`: RandomForestClassifier, StandardScaler, train/test split
- `numpy`: Numerical operations
- `pandas`: Dataset loading and processing

**URL Processing**
- `tldextract`: Domain/subdomain/TLD extraction from URLs
- `urllib.parse`: URL parsing and component extraction
- `socket`: Network operations (indicated by import, specific usage not shown in provided files)

**Utilities**
- `pickle`: Model serialization/deserialization
- `re`: Regular expression operations for URL pattern matching
- `os`: File system operations for model persistence

### Current Integrations

**Chrome Browser Extension** (IMPLEMENTED)
- Manifest V3 extension for Chrome
- One-click URL checking from any webpage
- Configurable API endpoint
- Real-time phishing detection

**Dataset Source**
- Mendeley Phishing URL Dataset (450K+ URLs)
- Automatically downloaded via curl from public dataset

### Future Enhancement Ideas

**External APIs** (not yet implemented)
- WHOIS API: Domain age and registration data
- VirusTotal API: URL reputation checking and threat intelligence
- Hybrid scoring combining ML predictions with API data

**Additional Features**
- Firefox extension port
- Auto-blocking of high-risk sites
- User reporting system for crowdsourced phishing data
- Dashboard for browsing safety analytics

### Data Storage

**Model Files** (pickle format)
- `phishguard_model.pkl`: Trained Random Forest model (99.41% accuracy)
- `phishguard_scaler.pkl`: Fitted StandardScaler for feature normalization
- `dataset.csv`: 450K URL dataset (30.8 MB)

**Extension Storage**
- Chrome sync storage for API endpoint configuration
- No user data collected or stored

### Configuration

**API Settings**
- Host: 0.0.0.0 (accessible from extension)
- Port: 5000
- CORS: Enabled for all origins
- Debug: Disabled in production

**Model Parameters**
- Algorithm: RandomForestClassifier
- Estimators: 150 trees
- Max depth: 15
- Min samples split: 5
- Class weights: Balanced
- Random state: 42 (reproducibility)

## Recent Changes (November 12, 2025)

### Major Transformation: Web App → API + Extension

- **Removed web UI**: Deleted templates folder, converted to API-only backend
- **Real dataset integration**: Downloaded 450K URL dataset from Mendeley
- **Model retraining**: Trained on real phishing data (50K sample) achieving 99.41% test accuracy
- **API simplification**: 
  - Removed render_template, added flask-cors
  - Changed endpoint from `/api/check-url` to `/api/check`
  - Added Gen Z casual language ("vibe" field, casual error messages)
  - Added `/health` endpoint for status checking
- **Chrome extension**: 
  - Created complete Manifest V3 extension
  - Built popup UI with gradient purple theme
  - Implemented content script for link monitoring
  - Added API configuration and connection status
- **Training script**: Created standalone `train.py` for easy model retraining
- **Documentation**: Added comprehensive README and EXTENSION_SETUP guide
- **Testing**: Verified API responds correctly with real phishing/legitimate URLs
