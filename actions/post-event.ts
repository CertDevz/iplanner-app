import { FormData } from '@/hooks/useForm'
import axios from 'axios'

export const CreateEvent = async (input: FormData) => {
  try {
    const response = await axios.post('/api/events', input)
    return response.data
  } catch (error: any) {
    console.error('Error creating event:', error.response?.data || error.message)
    throw error
  }
}
