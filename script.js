// script.js - Simple wallet connection
console.log("ENKI: Bright Future Gift Box loaded");

document.addEventListener('DOMContentLoaded', function() {
    const connectBtn = document.getElementById('connectBtn');
    const statusText = document.getElementById('statusText');
    
    connectBtn.addEventListener('click', function() {
        statusText.textContent = 'Connecting to wallet...';
        statusText.style.color = '#00ffea';
        
        // Simulate wallet connection
        setTimeout(() => {
            statusText.textContent = 'Connected! Ready to open gift.';
            statusText.style.color = '#00ffaa';
            connectBtn.textContent = '🎁 Open Gift';
            
            // Change to gift opening
            connectBtn.onclick = function() {
                statusText.textContent = 'Your future message: "The stars align for your success!"';
                connectBtn.textContent = '🔄 Get New Message';
            };
        }, 1500);
    });
});
