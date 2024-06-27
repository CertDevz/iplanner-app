import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import EventForm from '@/components/event-form'

const EventPage = async () => {
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }

  return (
    <div className="space-y-4 p-6">
      <EventForm />
    </div>
  )
}

export default EventPage
