// app/page.tsx
import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect to the client dashboard
  redirect('/client')
}