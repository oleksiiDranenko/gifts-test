import GiftChart from '@/components/GIftChart'
import { data } from '@/data'

export default function page() {
    return (
        <main className="flex min-h-screen pt-14 flex-col">
            <GiftChart list={data}/>
        </main>
    )
}
