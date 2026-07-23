'use client'
import Head from 'next/head'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import CustomTextField from 'src/components/text-field';
import { Box, Button } from '@mui/material';

export default function Home() {

  useEffect(() => {
    const successMessage = sessionStorage.getItem('login_success_toast')
    // console.log('🔍 [Trang Chủ] Kiểm tra sessionStorage:', successMessage)

    if (successMessage) {
      console.log('🚀 [Trang Chủ] Tìm thấy thông báo! Đang gọi toast.success...')
      toast.success(successMessage)
      sessionStorage.removeItem('login_success_toast')
    }
  }, [])

  return (
    <>
      <Head>
        <title>Store shop</title>
      </Head>
      <Box sx={{ margin: 6, display: 'flex', flexDirection: 'column', gap: 2, width: "300px" }}>
        <Button
          variant="contained"
          onClick={() => {
            console.log('🖱️ Bấm nút test thủ công')
            toast.success('Test thử toast thành công!')
          }}
        >
          Bấm để Test Toast
        </Button>

        <CustomTextField id='outlined-multiline-flexible' label='Multiline' />
      </Box>
    </>
  )
}