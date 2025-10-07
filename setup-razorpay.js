#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Create .env.local file for Razorpay configuration
const envContent = `# Razorpay Configuration (Frontend)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id_here

# Replace 'rzp_test_your_key_id_here' with your actual Razorpay Key ID
# Get it from: https://dashboard.razorpay.com/ -> Settings -> API Keys`;

const envPath = path.join(__dirname, '.env.local');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local file successfully!');
  console.log('📝 Please edit the file and replace "rzp_test_your_key_id_here" with your actual Razorpay Key ID');
  console.log('🔗 Get your key from: https://dashboard.razorpay.com/ -> Settings -> API Keys');
} catch (error) {
  console.error('❌ Error creating .env.local file:', error.message);
}
