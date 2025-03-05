'use client'

import GiftChart from '@/components/GIftChart'
import { data } from '@/data'
import { useEffect, useState } from 'react'

// Client-side only logic, avoid SSR errors
export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensuring this runs only on the client side (in the browser)
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      // Dynamically import WebApp SDK
      import('@twa-dev/sdk').then((WebApp) => {
        const telegramWebApp = WebApp.default;

        // Check if the methods are available on the WebApp object
        if (telegramWebApp && telegramWebApp.ready && telegramWebApp.expand) {
          console.log('WebApp methods are available', telegramWebApp);

          telegramWebApp.ready(); // Initialize Telegram Web App
          telegramWebApp.expand(); // Prevent swipe-down close
        } else {
          console.error('WebApp SDK is not available or missing methods');
        }
      }).catch((err) => {
        console.error('Error loading WebApp SDK:', err);
      });
    }
  }, [isClient]);

  return (
    <main className="flex min-h-screen flex-row justify-center pt-14">
      <GiftChart list={data} />
    </main>
  );
}
