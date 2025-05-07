import { auth, signIn } from '~/server/auth/index'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()

  if (session?.user) redirect('/lockers')

  return (
    <div>
      <form action={async () => {
        'use server'
        await signIn('google')
      }}>
        <button type='submit'>
          Continuar con Google
        </button>
      </form>
    </div>
  )
}
