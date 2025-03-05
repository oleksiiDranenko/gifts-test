'use client'

import GiftChart from '@/components/GIftChart'
import { data } from '@/data'
import { useEffect, useState } from 'react'

// Client-side only logic, avoid SSR errors
export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      import('@twa-dev/sdk').then((WebApp) => {
        const telegramWebApp = WebApp.default;

        if (telegramWebApp) {
          console.log('Telegram Web App initialized:', telegramWebApp);

          telegramWebApp.ready();  // Ensure the app is initialized
          telegramWebApp.expand(); // Expand to full screen
          
          if (telegramWebApp.disableVerticalSwipes) {
            telegramWebApp.disableVerticalSwipes(); // Prevent swipe-down close
            console.log('Vertical swipes disabled.');
          } else {
            console.warn('disableVerticalSwipes method not available.');
          }

          if (telegramWebApp.lockOrientation) {
            telegramWebApp.lockOrientation(); // Optional: Lock screen orientation
            console.log('Screen orientation locked.');
          }
        } else {
          console.error('Telegram Web App SDK not available.');
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
