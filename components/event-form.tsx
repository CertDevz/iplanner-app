'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useState, ChangeEvent } from 'react'
import { useFieldArray } from 'react-hook-form'

import { CreateEvent } from '@/actions/post-event'
import { FormData, useAuthForm } from '@/hooks/useForm'
import { Input } from './ui/input'
import { Button } from './ui/button'

const EventForm = () => {
  const router = useRouter()
  const [imageSource, setImageSource] = useState<string | undefined>(undefined)
  const [uploadMode, setUploadMode] = useState<'file' | 'link'>('file')
  const [speakers] = useState<{ name: string; avatar: string }[]>([])

  const onSubmit = async (data: FormData) => {
    try {
      let eventData = data
      if (uploadMode === 'file' && imageSource) {
        eventData = { ...data, backgroundImage: imageSource }
      }

      await CreateEvent(eventData)
      toast.success('Evento criado com sucesso')
      reset()
      return router.refresh()
    } catch (error) {
      toast.error('Erro ao criar evento.')
    }
  }

  const { register, errors, handleSubmit, reset, control } = useAuthForm(onSubmit)
  const { append, remove } = useFieldArray<any>({
    control,
    name: 'speaker',
  })

  const handleAddSpeaker = () => {
    append({ name: '', avatar: '' })
  }

  const handleRemoveSpeaker = (index: number) => {
    remove(index)
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const base64Image = await convertFileToBase64(file)
      setImageSource(base64Image)
      setUploadMode('file')
    }
  }

  const convertFileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })

  const handleModeChange = (mode: 'file' | 'link') => {
    setUploadMode(mode)
    if (mode === 'link') {
      setImageSource(undefined)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Título
          </label>
          <Input
            type="text"
            id="title"
            {...register.title}
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
          {errors.title && <span className="text-red-600">Este campo é obrigatório</span>}
        </div>

        <div>
          <label htmlFor="backgroundImage" className="block text-sm font-medium text-gray-700">
            Imagem de Fundo
          </label>
          {uploadMode === 'file' ? (
            <>
              <Input
                type="file"
                id="backgroundImage"
                onChange={handleFileChange}
                className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
              {imageSource && (
                <Image
                  src={imageSource}
                  alt="Preview"
                  className="mt-2 rounded-md shadow-sm"
                  style={{ maxWidth: '100%' }}
                  width={30}
                  height={50}
                />
              )}
            </>
          ) : (
            <Input
              type="text"
              id="backgroundImageLink"
              {...register.backgroundImage}
              placeholder="Insira o link da imagem (opcional)"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
          )}
          {errors.backgroundImage && (
            <span className="text-red-600">Este campo é obrigatório ou insira um link válido</span>
          )}
          <div className="mt-2 flex space-x-4">
            <button
              type="button"
              onClick={() => handleModeChange('file')}
              className={`rounded-md px-3 py-1 text-sm font-medium ${
                uploadMode === 'file'
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Upload Manual
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('link')}
              className={`rounded-md px-3 py-1 text-sm font-medium ${
                uploadMode === 'link'
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Link da Imagem
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Data do Evento
          </label>
          <Input
            type="date"
            id="date"
            {...register.date}
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
          {errors.date && <span className="text-red-600">Este campo é obrigatório</span>}
        </div>

        <div>
          <label htmlFor="hour" className="block text-sm font-medium text-gray-700">
            Hora do Evento
          </label>
          <Input
            type="time"
            id="hour"
            {...register.hour}
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
          {errors.hour && <span className="text-red-600">Este campo é obrigatório</span>}
        </div>

        <div>
          <label htmlFor="local" className="block text-sm font-medium text-gray-700">
            Local
          </label>
          <Input
            type="text"
            id="local"
            {...register.local}
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
          {errors.local && <span className="text-red-600">Este campo é obrigatório</span>}
        </div>

        <div className="col-span-2">
          <label htmlFor="descriptionLocal" className="block text-sm font-medium text-gray-700">
            Descrição do Local
          </label>
          <textarea
            id="descriptionLocal"
            {...register.descriptionLocal}
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
          {errors.descriptionLocal && <span className="text-red-600">Este campo é obrigatório</span>}
        </div>

        <div className="col-span-2">
          <label htmlFor="descriptionEvent" className="block text-sm font-medium text-gray-700">
            Descrição do Evento
          </label>
          <textarea
            id="descriptionEvent"
            {...register.descriptionEvent}
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
          {errors.descriptionEvent && <span className="text-red-600">Este campo é obrigatório</span>}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-2 text-lg font-medium text-gray-700">Palestrantes</h3>
        <div className="space-y-4">
          {speakers.map((speaker, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Input
                type="text"
                {...register.speakers[index].name}
                placeholder="Nome do palestrante"
                className="block w-1/2 rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
              <Input
                type="text"
                {...register.speakers[index].avatar}
                placeholder="URL do avatar"
                className="block w-1/2 rounded-md border-gray-300 shadow-sm sm:text-sm"
              />

              <Button
                type="button"
                onClick={() => handleRemoveSpeaker(index)}
                className="rounded-md bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700"
              >
                Remover
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={handleAddSpeaker}
            className="rounded-md bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700"
          >
            Adicionar Palestrante
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <Button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Criar Evento
        </Button>
      </div>
    </form>
  )
}

export default EventForm
