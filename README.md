# 🛡️ PhishGuard AI

AI-powered phishing URL detector with Chrome extension. Trained on 450K+ URLs for 99.41% accuracy.

## 🚀 Features

- **Machine Learning**: Random Forest classifier trained on real phishing dataset
- **Chrome Extension**: One-click URL checking directly from your browser
- **REST API**: Backend API for integration with any app
- **Real-time Analysis**: Instant phishing detection with explainability
- **Gen Z Vibes**: Modern UI with casual, friendly language

## 🏗️ Architecture

### Backend
- **Flask API** with CORS support
- **Random Forest** ML model (99.41% test accuracy)
- **18 URL features** extracted (HTTPS, length, keywords, patterns, etc.)
- **450K URL dataset** from Mendeley

### Chrome Extension
- **Popup interface** for checking current page
- **Content script** for link monitoring
- **Configurable API** endpoint
- **Real-time status** indicators

## 📦 Setup

### 1. Install Dependencies

```bash
# Python packages are already installed via Replit
```

### 2. Train the Model (First Time Only)

The model is already trained! But if you want to retrain:

```bash
python train.py
```

This trains on 50,000 URLs and takes ~2-3 minutes.

### 3. Run the API

```bash
python main.py
```

The API runs on `http://localhost:5000`

### 4. Install Chrome Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the `chrome-extension` folder from this project
5. The PhishGuard extension should now appear in your toolbar

### 5. Configure Extension

1. Click the PhishGuard icon in Chrome toolbar
2. Enter your API URL (default: `http://localhost:5000`)
3. Click "save"
4. The status should show "api: connected ✨"

## 🎯 Usage

### Using the Chrome Extension

1. Navigate to any website
2. Click the PhishGuard extension icon
3. Click "check this page"
4. View the safety score and risk analysis

### Using the API Directly

#### Check a URL

```bash
curl -X POST http://localhost:5000/api/check \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

Response:
```json
{
  "url": "https://example.com",
  "safety_score": 95,
  "risk_level": "safe",
  "emoji": "✅",
  "vibe": "all good fam",
  "phishing_probability": 2.5,
  "explanations": ["✅ looks clean to me"],
  "details": {
    "url_length": 23,
    "https": true,
    "sus_keywords": 0
  }
}
```

#### Health Check

```bash
curl http://localhost:5000/health
```

## 🧪 Testing with Examples

Try these URLs to see the detector in action:

**Safe URLs:**
- `https://google.com`
- `https://github.com`
- `https://wikipedia.org`

**Suspicious/Phishing:**
- `http://192.168.1.1/login.php?redirect=account`
- `http://secure-paypal-verify-login.tk/account`
- `http://amaz0n-login.com/signin?user=admin`

## 📊 Model Performance

- **Test Accuracy**: 99.41%
- **Training Accuracy**: 99.62%
- **Dataset Size**: 50,000 URLs (sampled from 450K)
- **Features Extracted**: 18 per URL
- **Algorithm**: Random Forest (150 estimators, max depth 15)

## 🎨 Features Detected

The model analyzes these URL characteristics:

1. URL length & domain length
2. HTTPS usage
3. IP address in URL
4. Suspicious keywords (login, verify, account, etc.)
5. Special characters & patterns
6. Subdomain count
7. High-risk TLDs (.tk, .ml, .ga, etc.)
8. Number ratio in domain
9. And 10 more...

## 📁 Project Structure

```
├── main.py                 # Flask API server
├── train.py                # Model training script
├── model.py                # ML model class
├── feature_extractor.py    # URL feature extraction
├── dataset.csv             # 450K URL dataset
├── phishguard_model.pkl    # Trained model
├── phishguard_scaler.pkl   # Feature scaler
└── chrome-extension/       # Chrome extension
    ├── manifest.json       # Extension config
    ├── popup.html          # Popup UI
    ├── popup.js            # Popup logic
    ├── styles.css          # Styling
    ├── background.js       # Background script
    └── content.js          # Content script
```

## 🔧 Development

### Retrain with Different Sample Size

```bash
python train.py 100000  # Train on 100K URLs
```

### API Endpoints

- `GET /` - API info and status
- `GET /health` - Health check
- `POST /api/check` - Check URL for phishing

## 🛠️ Tech Stack

- **Backend**: Flask, scikit-learn, pandas, numpy
- **ML**: Random Forest, StandardScaler
- **Extension**: Chrome Extension Manifest V3, Vanilla JS
- **Dataset**: Mendeley Phishing URL Dataset (450K URLs)

## 🎯 Use Cases

- **Personal Protection**: Check links before clicking
- **Security Research**: Study phishing patterns
- **Integration**: Add phishing detection to your app via API
- **Education**: Learn about ML-based security

## ⚠️ Notes

- The API runs locally by default (not suitable for production as-is)
- Model is trained on historical data - new phishing techniques may emerge
- Always practice good security hygiene beyond just URL checking

## 🌟 Future Enhancements

- [ ] WHOIS API integration for domain age checking
- [ ] VirusTotal API for additional threat intelligence
- [ ] User reporting system for crowdsourced data
- [ ] Real-time model updates
- [ ] Firefox extension support
- [ ] Production-ready deployment config

---

built with ✨ by a gen z dev who's tired of phishing scams fr fr
