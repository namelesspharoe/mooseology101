// Calendly API Service
// You'll need to get your Calendly API key from: https://calendly.com/app/admin/integrations/api-keys

const CALENDLY_API_BASE = 'https://api.calendly.com';
const CALENDLY_API_KEY = import.meta.env.VITE_CALENDLY_API_KEY; // Add this to your .env file

export interface CalendlyEventType {
  uri: string;
  name: string;
  active: boolean;
  duration: number;
  description: string;
  color: string;
  slug: string;
}

export interface CalendlyTimeSlot {
  start_time: string;
  end_time: string;
  status: string;
}

export interface CalendlySchedulingLink {
  booking_url: string;
  owner: string;
  event_type: string;
}

export class CalendlyAPI {
  private static async makeRequest(endpoint: string, options: RequestInit = {}) {
    if (!CALENDLY_API_KEY) {
      throw new Error('Calendly API key not found. Please add VITE_CALENDLY_API_KEY to your .env file');
    }

    const response = await fetch(`${CALENDLY_API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${CALENDLY_API_KEY}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Calendly API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Get all event types for a user
  static async getEventTypes(userUri: string): Promise<CalendlyEventType[]> {
    const response = await this.makeRequest(`/event_types?user=${userUri}`);
    return response.collection || [];
  }

  // Get available time slots for a specific event type
  static async getAvailableTimes(
    eventTypeUri: string,
    startTime: string,
    endTime: string
  ): Promise<CalendlyTimeSlot[]> {
    const response = await this.makeRequest(
      `/event_type_available_times?event_type=${eventTypeUri}&start_time=${startTime}&end_time=${endTime}`
    );
    return response.available_times || [];
  }

  // Create a scheduling link
  static async createSchedulingLink(
    eventTypeUri: string,
    maxEventCount: number = 1
  ): Promise<CalendlySchedulingLink> {
    const response = await this.makeRequest('/scheduling_links', {
      method: 'POST',
      body: JSON.stringify({
        owner: eventTypeUri,
        max_event_count: maxEventCount,
      }),
    });
    return response;
  }

  // Get user info (you'll need your user URI)
  static async getUserInfo(userUri: string) {
    return await this.makeRequest(`/users/${userUri}`);
  }
}

// Helper function to format dates for Calendly API
export const formatDateForCalendly = (date: Date): string => {
  return date.toISOString();
};

// Helper function to get next 30 days of available times
export const getNextMonthTimes = async (eventTypeUri: string) => {
  const now = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(now.getDate() + 30);

  return await CalendlyAPI.getAvailableTimes(
    eventTypeUri,
    formatDateForCalendly(now),
    formatDateForCalendly(thirtyDaysFromNow)
  );
}; 