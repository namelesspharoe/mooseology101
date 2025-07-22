import { InlineWidget } from 'react-calendly';

interface CalendlyWidgetProps {
  url: string;
  prefill?: {
    name?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  };
  utm?: {
    utmCampaign?: string;
    utmSource?: string;
    utmMedium?: string;
    utmContent?: string;
    utmTerm?: string;
  };
}

export function CalendlyWidget({ url, prefill, utm }: CalendlyWidgetProps) {
  // Add error handling and loading state
  if (!url) {
    return (
      <div className="calendly-widget glass-card">
        <div className="text-center p-8">
          <p className="text-red-400">Error: Calendly URL not provided</p>
        </div>
      </div>
    );
  }

  return (
    <div className="calendly-widget glass-card">
      <InlineWidget
        url={url}
        styles={{
          height: '700px',
          width: '100%',
          borderRadius: '16px',
          overflow: 'hidden',
          border: 'none'
        }}
        prefill={prefill}
        utm={utm}
        pageSettings={{
          backgroundColor: 'red',
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: '1e3a8a',
          textColor: '4d5055'
        }}
      />
    </div>
  );
}