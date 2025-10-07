# Payment Debug Guide

This guide helps debug payment-related issues in the Enlive Salon application.

## Common Payment Errors

### 1. "Invalid payment response" Error

**Symptoms:**
- Console shows "Invalid payment response" error
- Payment modal closes without success

**Causes:**
- Missing `razorpay_payment_id` in response
- Missing `razorpay_signature` in response
- Network issues during payment processing

**Debug Steps:**
1. Check browser console for detailed error logs
2. Verify Razorpay configuration in environment variables
3. Check network connectivity
4. Verify payment amount and currency

**Solution:**
- Enhanced error handling now provides detailed logging
- Check console for specific missing fields
- Verify Razorpay keys are properly configured

### 2. "Payment verification failed" Error

**Symptoms:**
- Payment appears successful but verification fails
- Order status remains "pending"

**Causes:**
- Invalid payment signature
- Server-side verification issues
- Database connection problems

**Debug Steps:**
1. Check server logs for verification details
2. Verify Razorpay webhook configuration
3. Check database connectivity
4. Verify order exists in database

**Solution:**
- Enhanced server-side logging provides detailed verification steps
- Check server console for signature comparison details
- Verify order lookup and payment status updates

## Debugging Tools

### Client-Side Debugging

1. **Browser Console Logs:**
   ```javascript
   // Payment response validation
   console.log('Payment response received:', response);
   
   // Payment verification
   console.log('Payment verification successful:', verificationResult);
   ```

2. **Network Tab:**
   - Check API calls to `/orders/verify-payment`
   - Verify request/response payloads
   - Check for 4xx/5xx status codes

### Server-Side Debugging

1. **Console Logs:**
   ```javascript
   // Payment verification request
   console.log('Payment verification request:', { userId, orderId, paymentId, signature });
   
   // Order lookup
   console.log('Searching for order with razorpayOrderId:', orderId);
   
   // Signature verification
   console.log('Signature comparison:', { expected, received, match });
   ```

2. **Database Checks:**
   - Verify order exists with correct `razorpayOrderId`
   - Check payment status in order document
   - Verify user authentication

## Environment Variables

Ensure these are properly configured:

```env
# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
RAZORPAY_ACCOUNT_ID=your_account_id

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Testing Payment Flow

### 1. Test Mode Setup
- Use Razorpay test keys
- Test with small amounts
- Use test card numbers

### 2. Common Test Scenarios
- Successful payment
- Payment failure
- Network interruption
- Invalid signature
- Order not found

### 3. Test Card Numbers
```
Success: 4111 1111 1111 1111
Failure: 4000 0000 0000 0002
```

## Error Recovery

### Client-Side Recovery
1. **Payment Error Handler:**
   - Shows user-friendly error messages
   - Provides retry option
   - Redirects to support if needed

2. **Payment Success Handler:**
   - Displays order confirmation
   - Shows order details
   - Provides navigation options

### Server-Side Recovery
1. **Order Status Rollback:**
   - Reverts payment status on failure
   - Restores order to pending state
   - Logs error details

2. **Stock Management:**
   - Reverts stock changes on payment failure
   - Prevents overselling
   - Maintains inventory accuracy

## Monitoring and Alerts

### Key Metrics to Monitor
1. Payment success rate
2. Verification failure rate
3. Average payment processing time
4. Error frequency by type

### Alert Conditions
1. High payment failure rate (>5%)
2. Verification failures (>2%)
3. Database connection issues
4. Razorpay API errors

## Best Practices

### 1. Error Handling
- Always provide user-friendly error messages
- Log detailed error information for debugging
- Implement retry mechanisms for transient failures

### 2. Security
- Never log sensitive payment data
- Validate all payment parameters
- Use secure signature verification

### 3. User Experience
- Show clear loading states
- Provide helpful error messages
- Offer alternative actions on failure

## Support Contacts

For payment-related issues:
1. Check this debug guide first
2. Review server logs for detailed error information
3. Contact development team with error details
4. Include order ID and timestamp in support requests

## Recent Improvements

### Enhanced Error Handling
- Detailed console logging for payment responses
- Specific error messages for different failure types
- Better user feedback for payment issues

### Improved Verification
- Enhanced server-side payment verification
- Detailed signature comparison logging
- Better error recovery mechanisms

### User Experience
- Payment error handler component
- Payment success handler component
- Better navigation and feedback
