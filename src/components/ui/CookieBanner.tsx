"use client";

import { useState, useEffect } from "react";
import { Button } from "./Button";

type CookieConsent = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
};

const COOKIE_CONSENT_KEY = "carenest-cookie-consent";
const COOKIE_BANNER_KEY = "carenest-banner-dismissed";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always required
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const existingConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const bannerDismissed = localStorage.getItem(COOKIE_BANNER_KEY);

    if (!existingConsent && !bannerDismissed) {
      setIsVisible(true);
    }
  }, []);

  const acceptAll = () => {
    const consent: CookieConsent = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    localStorage.setItem(COOKIE_BANNER_KEY, "true");
    setIsVisible(false);
  };

  const acceptEssential = () => {
    const consent: CookieConsent = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    localStorage.setItem(COOKIE_BANNER_KEY, "true");
    setIsVisible(false);
  };

  const savePreferences = () => {
    const consent: CookieConsent = {
      essential: preferences.essential,
      analytics: preferences.analytics,
      marketing: preferences.marketing,
      timestamp: Date.now(),
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    localStorage.setItem(COOKIE_BANNER_KEY, "true");
    setIsVisible(false);
    setShowPreferences(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-neutral-200 shadow-lg">
      <div className="max-w-7xl mx-auto p-3 sm:p-4">
        {!showPreferences ? (
          <div className="flex flex-col gap-3">
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-800 mb-1 text-sm sm:text-base">
                Cookie Settings
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                We use cookies to enhance your experience. By clicking &ldquo;Accept
                All&rdquo;, you consent to our use of cookies.{" "}
                <button
                  onClick={() => setShowPreferences(true)}
                  className="underline hover:no-underline text-amber-700"
                >
                  Customize
                </button>
              </p>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <Button
                onClick={acceptEssential}
                variant="secondary"
                className="flex-1 py-2 px-3 text-xs sm:text-sm whitespace-nowrap"
              >
                Essential Only
              </Button>
              <Button
                onClick={acceptAll}
                variant="primary"
                className="flex-1 py-2 px-3 text-xs sm:text-sm whitespace-nowrap"
              >
                Accept All
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-neutral-800">
                Cookie Preferences
              </h3>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-neutral-500 hover:text-neutral-700 transition-colors"
                aria-label="Close preferences"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="essential"
                    checked={preferences.essential}
                    disabled
                    className="rounded border-neutral-300"
                  />
                  <label htmlFor="essential" className="font-medium text-sm">
                    Essential Cookies
                  </label>
                </div>
                <p className="text-xs text-neutral-600">
                  Required for the website to function properly. Cannot be
                  disabled.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="analytics"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences((prev) => ({
                        ...prev,
                        analytics: e.target.checked,
                      }))
                    }
                    className="rounded border-neutral-300"
                  />
                  <label htmlFor="analytics" className="font-medium text-sm">
                    Analytics Cookies
                  </label>
                </div>
                <p className="text-xs text-neutral-600">
                  Help us understand how visitors use our website to improve
                  user experience.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="marketing"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences((prev) => ({
                        ...prev,
                        marketing: e.target.checked,
                      }))
                    }
                    className="rounded border-neutral-300"
                  />
                  <label htmlFor="marketing" className="font-medium text-sm">
                    Marketing Cookies
                  </label>
                </div>
                <p className="text-xs text-neutral-600">
                  Used to track visitors across websites for personalized
                  advertising.
                </p>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3 pt-2">
              <Button
                onClick={() => setShowPreferences(false)}
                variant="secondary"
                className="flex-1 py-2 px-3 text-xs sm:text-sm"
              >
                Cancel
              </Button>
              <Button
                onClick={savePreferences}
                variant="primary"
                className="flex-1 py-2 px-3 text-xs sm:text-sm"
              >
                Save Preferences
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
