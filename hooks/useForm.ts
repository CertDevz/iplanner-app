import { Prisma } from '@prisma/client'
import { useForm, SubmitHandler } from 'react-hook-form'

export type FormData = Prisma.EventsCreateInput

export const useAuthForm = (onSubmit: SubmitHandler<FormData>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    setFocus,
    setValue,
    control,
  } = useForm<FormData>()

  return {
    register: {
      title: register('title', {
        required: { value: true, message: 'Titulo é obrigatório' },
      }),

      local: register('local', {
        required: { value: true, message: 'Local é obrigatório' },
      }),

      backgroundImage: register('backgroundImage', {
        required: { value: false, message: 'Imagem é opcional' },
      }),

      descriptionLocal: register('descriptionLocal', {
        required: { value: true, message: 'Descrição de local é obrigatório' },
      }),

      descriptionEvent: register('descriptionEvent', {
        required: { value: true, message: 'Descrição do evento é obrigatório' },
      }),

      date: register('date', {
        required: { value: true, message: 'Data do evento é obrigatório.' },
      }),

      hour: register('hour', {
        required: { value: true, message: 'Hora do evento é obrigatório.' },
      }),

      speakers: [] as any[],
    },
    ...register,

    handleSubmit: handleSubmit(onSubmit),
    errors,
    reset,
    setError,
    setFocus,
    setValue,
    control,
  }
}
