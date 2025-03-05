
import GiftChart from '@/components/GIftChart'
import { data } from '@/data'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row justify-center pt-14">
      <GiftChart list={data}/>
    </main>
  )
}
