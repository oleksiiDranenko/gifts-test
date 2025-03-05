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

  // We can import WebApp inside useEffect to ensure it runs only on the client-side
  useEffect(() => {
    if (isClient) {
      import('@twa-dev/sdk').then((WebApp) => {
        // Type assertion to tell TypeScript that WebApp has ready and expand methods
        (WebApp as any).ready();  // Initialize Telegram Web App
        (WebApp as any).expand(); // Prevent swipe-down close
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
