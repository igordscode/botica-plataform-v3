import ReactGA from "react-ga4";

const TRACKING_ID = (import.meta as any).env?.VITE_GOOGLE_ANALYTICS_ID;

export const initGA = () => {
  if (TRACKING_ID) {
    ReactGA.initialize(TRACKING_ID);
  } else {
    console.warn("Google Analytics ID not configured.");
  }
};

export const trackPageView = (path: string) => {
  if (TRACKING_ID) {
    ReactGA.send({ hitType: "pageview", page: path });
  }
};

export const trackEvent = (category: string, action: string, label?: string) => {
  if (TRACKING_ID) {
    ReactGA.event({
      category,
      action,
      label,
    });
  }
};
