Weather Lookup App – Exam Submission

Features
• Fully asynchronous weather fetch using async/await
• Uses exact required API:  
  https://api.open-meteo.com/v1/forecast?latitude={LAT}&longitude={LON}&current_weather=true
• Loading indicator during request
• Proper error handling (empty input, unknown city, network issues)
• Displays city name, current temperature (°C), wind speed (km/h)
• Simple placeholder weather icon
• Responsive design (mobile-friendly with Flexbox)
• Accessible (ARIA labels, live regions, proper alt text)
• Auto-loads Nairobi on page load for instant demo

Supported Cities (case-insensitive)
Nairobi • London • New York • Tokyo • Sydney • Paris • Cape Town • Mumbai

Files
index.html  → structure and layout
styles.css  → modern, responsive styling with Flexbox
script.js   → all JavaScript logic (async fetch, DOM updates, error handling)

No API call)

Tested and working in Chrome
