'use client'

import GiftsList from '@/components/GiftsList';
import { useEffect, useState } from 'react'
// Client-side only logic, avoid SSR errors
export default function page() {
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
          }

          if (telegramWebApp.lockOrientation) {
            telegramWebApp.lockOrientation(); // Lock screen orientation
            console.log('Screen orientation locked.');
          }

          // Set header color to a custom color (example: "#1E90FF" or any CSS color)
          if (telegramWebApp.setHeaderColor) {
            telegramWebApp.setHeaderColor('#111827'); // Set custom color (e.g., Dodger Blue)
            console.log('Header color set to #1E90FF.');
          } else {
            console.warn('setHeaderColor method not available.');
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
    <main className="flex min-h-screen pt-14 flex-col">
		<GiftsList/>
    </main>
  );
}
