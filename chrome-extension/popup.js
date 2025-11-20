let API_URL = 'http://localhost:5000';

chrome.storage.sync.get(['apiUrl'], function(result) {
    if (result.apiUrl) {
        API_URL = result.apiUrl;
        document.getElementById('apiUrl').value = API_URL;
    }
    checkAPIStatus();
});

document.getElementById('saveApi').addEventListener('click', function() {
    const url = document.getElementById('apiUrl').value.trim();
    if (url) {
        API_URL = url;
        chrome.storage.sync.set({apiUrl: url}, function() {
            console.log('api url saved:', url);
            checkAPIStatus();
        });
    }
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0]) {
        const url = tabs[0].url;
        document.getElementById('pageUrl').textContent = url;
    }
});

document.getElementById('checkPage').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
            checkURL(tabs[0].url);
        }
    });
});

async function checkAPIStatus() {
    try {
        const response = await fetch(`${API_URL}/health`);
        if (response.ok) {
            const statusDot = document.querySelector('.status-dot');
            const statusText = document.querySelector('.status-text');
            statusDot.classList.remove('offline');
            statusDot.classList.add('online');
            statusText.textContent = 'api: connected ✨';
        }
    } catch (error) {
        const statusDot = document.querySelector('.status-dot');
        const statusText = document.querySelector('.status-text');
        statusDot.classList.remove('online');
        statusDot.classList.add('offline');
        statusText.textContent = 'api: offline 💀';
    }
}

async function checkURL(url) {
    const resultDiv = document.getElementById('result');
    const scoreCircle = document.getElementById('scoreCircle');
    const scoreValue = document.getElementById('scoreValue');
    const statusEmoji = document.getElementById('statusEmoji');
    const statusText = document.getElementById('statusText');
    const vibe = document.getElementById('vibe');
    const risk = document.getElementById('risk');
    const explanationsList = document.getElementById('explanationsList');

    resultDiv.style.display = 'block';
    statusEmoji.textContent = '⏳';
    statusText.textContent = 'checking...';
    scoreCircle.className = 'score-circle';

    try {
        const response = await fetch(`${API_URL}/api/check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url })
        });

        if (!response.ok) {
            throw new Error('api error');
        }

        const data = await response.json();

        scoreValue.textContent = data.safety_score;
        scoreCircle.classList.add(data.risk_level);
        
        statusEmoji.textContent = data.emoji;
        statusText.textContent = data.risk_level;
        
        vibe.textContent = data.vibe || '—';
        risk.textContent = `${data.phishing_probability}%`;

        explanationsList.innerHTML = '';
        data.explanations.forEach(exp => {
            const item = document.createElement('div');
            item.className = 'explanation-item';
            item.textContent = exp;
            explanationsList.appendChild(item);
        });

    } catch (error) {
        statusEmoji.textContent = '❌';
        statusText.textContent = 'error';
        vibe.textContent = 'api might be down';
        risk.textContent = '—';
        explanationsList.innerHTML = '<div class="explanation-item">could not connect to api. make sure it\'s running!</div>';
    }
}

checkAPIStatus();
setInterval(checkAPIStatus, 30000);
