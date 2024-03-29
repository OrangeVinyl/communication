'use client';

import axios from 'axios';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

// components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FileUpload } from '@/components/file-upload';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Server name is required',
  }),
  imageUrl: z.string().min(1, {
    message: 'Server image is required',
  }),
});

export const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      await axios.post('/api/servers', values);

      form.reset();
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open>
      <DialogContent className={'bg-white text-black p-0 overflow-hidden'}>
        <DialogHeader className={'pt-8 px-6'}>
          <DialogTitle className={'text-2xl text-center'}>🎉 서버를 꾸며주세요</DialogTitle>
          <DialogDescription className={'text-center text-zinc-500'}>
            ✨서버에게 개성을 부여하려면 이름과 이미지를 설정해보세요!
            <br />
            언제든지 변경할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-8'}>
            <div className={'space-y-8 px-6'}>
              <div className={'flex items-center justify-center text-center'}>
                <FormField
                  control={form.control}
                  name={'imageUrl'}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint={'serverImage'}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <FormField
                control={form.control}
                name={'name'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={'uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'}
                    >
                      서버 명
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className={
                          'bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                        }
                        placeholder={'서버 이름을 입력해주세요.'}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>
            <DialogFooter className={'bg-gray-100 px-6 py-5'}>
              <Button disabled={isLoading} variant={'primary'}>
                생성
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
