'use client'

import * as z from 'zod'
import { useForm, useWatch } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from '../ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'

import { usePathname, useRouter } from 'next/navigation'
import { useOrganization } from '@clerk/nextjs'

import { ThreadValidation } from '@/lib/validations/thread'
import { createThread } from '@/lib/actions/thread.actions'


const PostThread = ({ userId }: { userId: string }) => {
  const router = useRouter()

  const pathname = usePathname()

  const { organization } = useOrganization()
  const maxLength = 280

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: '',
      accountId: userId,
    }
  })

  const content = useWatch({ control: form.control, name: 'thread' }) || ''
  const progress = Math.min((content.length / maxLength) * 360, 360)

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    await createThread({
      text: values.thread,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname
    })

    router.push("/")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 flex flex-col justify-start gap-8">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-3 w-full'>
              <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <FormLabel className='text-base-semibold text-light-2'>
                  Your post
                </FormLabel>
                <div className='flex items-center gap-2 text-subtle-medium text-light-4'>
                  <span>{content.length}/{maxLength}</span>
                  <div
                    className='relative h-9 w-9 rounded-full bg-dark-3/80 p-[2px]'
                    style={{
                      backgroundImage: `conic-gradient(#2DD4BF ${progress}deg, rgba(255,255,255,0.08) 0deg)`
                    }}
                  >
                    <div className='flex h-full w-full items-center justify-center rounded-full bg-dark-2 text-[10px] text-light-3'>
                      {Math.ceil((content.length / maxLength) * 100)}%
                    </div>
                  </div>
                </div>
              </div>
              <FormControl className='no-focus border border-dark-4 bg-dark-3/70 text-light-1'>
                <Textarea
                  rows={12}
                  maxLength={maxLength}
                  placeholder='Share an update, ask a question, or start a discussion...'
                  className='account-form_input min-h-[220px] resize-none bg-transparent text-light-1 placeholder:text-light-4/70 focus:shadow-[0_0_18px_rgba(45,212,191,0.18)]'
                  {...field}
                />
              </FormControl>
              <p className='text-subtle-medium text-light-4'>Use thoughtful details. You can edit later.</p>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='text-subtle-medium text-light-4'>
            Posting as <span className='text-light-1'>{organization ? organization.name : 'You'}</span>
          </div>
          <Button type='submit' className='btn-primary rounded-full px-6 py-2' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <span className='flex items-center gap-2'>
                <span className='h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white' />
                Posting...
              </span>
            ) : (
              'Post'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PostThread
