'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from '@hookform/resolvers/zod'

import { usePathname, useRouter } from 'next/navigation'

import { CommentValidation } from '@/lib/validations/thread'
import { useState } from 'react'
import { Input } from '../ui/input'
import Image from 'next/image'
import { addCommentToThread } from '@/lib/actions/thread.actions'

interface Props{
    threadId:string,
    currentUserImg:string,
    currentUserId:string
}

const Comment =({threadId,currentUserImg,currentUserId}:Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const [isSuccess, setIsSuccess] = useState(false)
  
    const form = useForm({
      resolver: zodResolver(CommentValidation),
      defaultValues: {
        thread:''
        }
    })

    const onSubmit = async(values:z.infer<typeof CommentValidation>) => {
      await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname)

      form.reset();
      setIsSuccess(true)
      setTimeout(() => setIsSuccess(false), 900)
      router.refresh()
    }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`comment-form ${isSuccess ? 'ring-1 ring-primary-500/40 bg-dark-3/70' : ''}`}>
      <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className='flex w-full items-center gap-3 max-sm:flex-col max-sm:items-start'>
              <FormLabel className='text-base-semibold text-light-2'>
                <Image src={currentUserImg} alt='Profile Image' width={40} height={40} className='rounded-full border border-dark-4/70 object-cover'/>
              </FormLabel>
              <FormControl className='border-none bg-transparent'>
                <Input
                  type='text'
                  placeholder='Reply to keep the thread moving...'
                  maxLength={280}
                  className='no-focus w-full text-light-1 outline-none transition-all duration-200 focus:ml-1'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='comment-form_btn max-sm:w-full' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <span className='flex items-center gap-2'>
                <span className='h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white' />
                Posting...
              </span>
            ) : (
              'Reply'
            )}
        </Button>
      </form>
    </Form>  
  )
}

export default Comment