import React from 'react'
import { Message } from '@/app/page'
import { ChevronDownCircle } from 'lucide-react'

interface Props {
  messages: Message[]
}

function Messages({ messages }: Props) {
  return (
    <div className={`${messages?.length > 0 ? "pb-96" : "pb-52"} flex flex-col min-h-screen pt-20`}>
      {!messages?.length && (
        <div className='flex flex-col space-y-10 flex-1 items-center justify-end pl-6'>
          <p className='text-gray-500 animate-pulse'>
            Start a conversation with the voice assistant
          </p>
          <ChevronDownCircle size={64} className='animate-bounce text-gray-500' />
        </div>
      )}
    </div>
  )
}

export default Messages
