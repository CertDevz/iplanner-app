import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    const { ...body } = await request.json()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const course = await db.events.create({
      data: {
        ...body,
        userId,
        date: new Date(),
        hour: new Date(),
        speaker: {
          create: {
            avatar: '',
            name: '',
          },
        },
        organization: {
          create: {
            contact: '119191919191',
            description: 'Empresa numero 1',
            image: 'kasjdhf',
            name: 'Torreson',
          },
        },
      },
    })

    return NextResponse.json(course)
  } catch (error) {
    return new NextResponse('Internal Server Error' + error, { status: 500 })
  }
}
