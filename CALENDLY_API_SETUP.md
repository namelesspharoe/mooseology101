# Calendly API Integration Setup

This guide will help you set up the Calendly API integration to replace the widget approach.

## Prerequisites

1. A Calendly account with admin access
2. Your Calendly event types already configured

## Step 1: Get Your Calendly API Key

1. Go to [Calendly API Keys](https://calendly.com/app/admin/integrations/api-keys)
2. Click "Create API Key"
3. Give it a name (e.g., "Mooseology101 Website")
4. Copy the generated API key

## Step 2: Get Your User URI

1. Go to your [Calendly Profile Settings](https://calendly.com/app/admin/profile)
2. Look for your User URI (it will look like: `https://api.calendly.com/users/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`)
3. Copy this URI

## Step 3: Get Your Event Type URIs

1. Go to your [Calendly Event Types](https://calendly.com/app/admin/event_types)
2. For each event type (Half Day, Full Day), click on it
3. In the URL, you'll see the event type URI (it will look like: `https://api.calendly.com/event_types/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`)
4. Copy both URIs

## Step 4: Create Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Calendly API Configuration
VITE_CALENDLY_API_KEY=your_calendly_api_key_here
VITE_CALENDLY_USER_URI=https://api.calendly.com/users/your_user_uri_here
VITE_CALENDLY_HALF_DAY_URI=https://api.calendly.com/event_types/your_half_day_event_type_uri
VITE_CALENDLY_FULL_DAY_URI=https://api.calendly.com/event_types/your_full_day_event_type_uri
```

## Step 5: Update Your App

Replace the current `BookingSection` import in `App.tsx`:

```tsx
// Replace this line:
import { BookingSection } from './components/BookingSection';

// With this line:
import { CustomBookingSection as BookingSection } from './components/CustomBookingSection';
```

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the booking section
3. Select a package and date
4. Verify that available time slots are loading
5. Test the booking flow

## Features of the API Integration

### ✅ What's Better Than the Widget:

1. **Custom UI**: Fully integrated with your site's design
2. **Better UX**: No iframe loading, smoother transitions
3. **More Control**: Custom validation, error handling
4. **Real-time Availability**: Shows actual available slots
5. **Better Mobile Experience**: Responsive design
6. **Analytics**: Track user interactions more effectively

### 🔧 Customization Options:

- **Date Range**: Currently shows next 30 days (easily adjustable)
- **Time Format**: 12-hour format (can be changed to 24-hour)
- **Validation**: Custom form validation
- **Styling**: Fully customizable with Tailwind CSS
- **Error Handling**: Toast notifications for user feedback

## Troubleshooting

### Common Issues:

1. **API Key Not Found**: Make sure your `.env` file is in the project root
2. **CORS Errors**: The API should work from the browser, but you might need to handle CORS
3. **No Available Slots**: Check your Calendly availability settings
4. **Event Type Not Found**: Verify your event type URIs are correct

### Debug Mode:

Add this to your component to see API responses:

```tsx
console.log('Event Types:', eventTypes);
console.log('Available Slots:', availableSlots);
```

## Security Notes

- Never commit your `.env` file to version control
- The API key is exposed to the client (this is normal for Calendly's public API)
- Consider rate limiting if needed
- Monitor API usage in your Calendly dashboard

## Next Steps

Once this is working, you can:

1. Add more event types
2. Customize the booking flow
3. Add email notifications
4. Integrate with your CRM
5. Add analytics tracking
6. Implement webhook handling for booking confirmations 