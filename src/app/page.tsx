'use client'

import GiftChart from '@/components/GIftChart'
import { data } from '@/data'

import WebApp from '@twa-dev/sdk'
import { useEffect } from 'react'

export default function Home() {

	useEffect(() => {
		WebApp.ready();  // Initialize Telegram Web App
		WebApp.expand(); // Prevent swipe-down close
	}, []);

  	return (
    	<main className="flex min-h-screen flex-row justify-center pt-14">
      		<GiftChart list={data}/>
    	</main>
  	)
}
