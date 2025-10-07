# Razorpay Setup Guide

## Environment Variables Required

Create a `.env.local` file in the client directory with the following:

```env
# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id_here
```

## Steps to Get Razorpay Keys:

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up/Login to your account
3. Go to Settings > API Keys
4. Generate Test Keys
5. Copy the Key ID and add it to your `.env.local` file

## Server Environment Variables

Add these to your server `.env` file:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=your_key_secret_here
```

## Testing

1. Make sure both client and server have the correct Razorpay keys
2. The payment flow should now work:
   - Order is created on backend
   - Razorpay payment modal opens
   - User can complete payment
   - Payment is verified and order is confirmed

## Debug Information

The checkout page now includes debug information in development mode:
- Shows if Razorpay script is loaded
- Shows if Razorpay key is configured
- Includes a "Test Razorpay" button to verify functionality

## Troubleshooting

### Common Issues:

1. **"Razorpay is not loaded" error:**
   - Check if the Razorpay script is loading in browser console
   - Verify network connectivity
   - Try refreshing the page

2. **"Razorpay key is not configured" error:**
   - Create `.env.local` file in client directory
   - Add `NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_here`
   - Restart the development server

3. **Payment modal not opening:**
   - Check browser console for errors
   - Verify Razorpay key is correct
   - Use the "Test Razorpay" button to debug

4. **Order created but no payment modal:**
   - Check if Razorpay script loaded successfully
   - Verify the order has a valid `razorpayOrderId`
   - Check browser console for JavaScript errors

### Debug Steps:

1. Open browser console (F12)
2. Look for Razorpay-related logs
3. Check if "Razorpay script loaded successfully" appears
4. Verify the order details are logged correctly
5. Use the debug panel on the checkout page
