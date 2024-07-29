'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { registerUser } from './registerService';

type FormData = {
  email: string;
  id: string;
  name: string;
  password: string;
};

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();
  const toast = useToast();

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data);
      toast({
        title: '회원가입 성공',
        description: '회원가입이 완료되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    //   router.push('/login');
    } catch (error) {
      toast({
        title: '회원가입 실패',
        description: '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('회원가입 오류:', error);
    }
  };

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">이메일 2</FormLabel>
            <Input
              id="email"
              type="email"
              {...register('email', { required: '이메일은 필수입니다.' })}
            />
          </FormControl>

          <FormControl isInvalid={!!errors.id}>
            <FormLabel htmlFor="id">아이디</FormLabel>
            <Input
              id="id"
              {...register('id', { required: '아이디는 필수입니다.' })}
            />
          </FormControl>

          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">이름</FormLabel>
            <Input
              id="name"
              {...register('name', { required: '이름은 필수입니다.' })}
            />
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">비밀번호</FormLabel>
            <Input
              id="password"
              type="password"
              {...register('password', { required: '비밀번호는 필수입니다.' })}
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" width="full">
            회원 등록
          </Button>
        </VStack>
      </form>
    </Box>
  );
}