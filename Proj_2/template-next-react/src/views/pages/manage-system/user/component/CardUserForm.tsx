import React from 'react'
import { Box, Button, TextField, MenuItem, Grid } from '@mui/material'
import { Controller } from 'react-hook-form'

interface CardUserFormProps {
    control: any
    errors: any
    handleSubmit: any
    onSubmit: any
    reset: any
    loading: boolean
    isEdit: boolean
}

export default function CardUserForm({
    control,
    errors,
    handleSubmit,
    onSubmit,
    reset,
    loading,
    isEdit
}: CardUserFormProps) {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2, maxHeight: '75vh', overflowY: 'auto', p: 1 }}>
                <Grid container spacing={2}>
                    {/* Email */}
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='email'
                            control={control}
                            render={({ field }: { field: any }) => (
                                <TextField
                                    {...field}
                                    label='Email'
                                    fullWidth
                                    size='small'
                                    error={Boolean(errors.email)}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />
                    </Grid>

                    {/* Mật khẩu: Bắt buộc khi Thêm mới, Không bắt buộc (để trống nếu không đổi) khi Cập nhật */}
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='password'
                            control={control}
                            render={({ field }: { field: any }) => (
                                <TextField
                                    {...field}
                                    type='password'
                                    label={isEdit ? 'Mật khẩu mới (Bỏ trống nếu không đổi)' : 'Mật khẩu'}
                                    fullWidth
                                    size='small'
                                    error={Boolean(errors.password)}
                                    helperText={errors.password?.message}
                                />
                            )}
                        />
                    </Grid>

                    {/* Họ */}
                    <Grid item xs={12} sm={4}>
                        <Controller
                            name='firstName'
                            control={control}
                            render={({ field }: { field: any }) => (
                                <TextField
                                    {...field}
                                    label='Họ'
                                    fullWidth
                                    size='small'
                                    error={Boolean(errors.firstName)}
                                    helperText={errors.firstName?.message}
                                />
                            )}
                        />
                    </Grid>

                    {/* Tên đệm */}
                    <Grid item xs={12} sm={4}>
                        <Controller
                            name='middleName'
                            control={control}
                            render={({ field }: { field: any }) => (
                                <TextField
                                    {...field}
                                    label='Tên đệm'
                                    fullWidth
                                    size='small'
                                />
                            )}
                        />
                    </Grid>

                    {/* Tên */}
                    <Grid item xs={12} sm={4}>
                        <Controller
                            name='lastName'
                            control={control}
                            render={({ field }: { field: any }) => (
                                <TextField
                                    {...field}
                                    label='Tên'
                                    fullWidth
                                    size='small'
                                    error={Boolean(errors.lastName)}
                                    helperText={errors.lastName?.message}
                                />
                            )}
                        />
                    </Grid>

                    {/* Số điện thoại */}
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='phoneNumber'
                            control={control}
                            render={({ field }: { field: any }) => (
                                <TextField
                                    {...field}
                                    label='Số điện thoại'
                                    fullWidth
                                    size='small'
                                />
                            )}
                        />
                    </Grid>

                    {/* Địa chỉ */}
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='address'
                            control={control}
                            render={({ field }: { field: any }) => (
                                <TextField
                                    {...field}
                                    label='Địa chỉ'
                                    fullWidth
                                    size='small'
                                />
                            )}
                        />
                    </Grid>

                    {/* Thành phố (City ID) */}
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='city'
                            control={control}
                            render={({ field }: { field: any }) => (
                                <TextField
                                    {...field}
                                    label='ID Thành phố (City ID)'
                                    fullWidth
                                    size='small'
                                    placeholder='Nhập ObjectId của City'
                                />
                            )}
                        />
                    </Grid>

                    {/* Vai trò (Role ID) */}
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='role'
                            control={control}
                            render={({ field }: { field: any }) => (
                                <TextField
                                    {...field}
                                    label='ID Vai trò (Role ID)'
                                    fullWidth
                                    size='small'
                                    placeholder='Nhập ObjectId của Role'
                                />
                            )}
                        />
                    </Grid>

                    {/* User Type */}
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='userType'
                            control={control}
                            render={({ field }: { field: any }) => (
                                <TextField
                                    {...field}
                                    select
                                    label='Loại User (userType)'
                                    fullWidth
                                    size='small'
                                >
                                    <MenuItem value={1}>1 - Admin</MenuItem>
                                    <MenuItem value={2}>2 - Staff</MenuItem>
                                    <MenuItem value={3}>3 - Normal</MenuItem>
                                </TextField>
                            )}
                        />
                    </Grid>

                    {/* Trạng thái Status */}
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='status'
                            control={control}
                            render={({ field }: { field: any }) => (
                                <TextField
                                    {...field}
                                    select
                                    label='Trạng thái'
                                    fullWidth
                                    size='small'
                                >
                                    <MenuItem value={1}>Hoạt động (1)</MenuItem>
                                    <MenuItem value={0}>Khóa (0)</MenuItem>
                                </TextField>
                            )}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                    <Button
                        type='reset'
                        variant='outlined'
                        color='secondary'
                        onClick={() => reset()}
                        disabled={loading}
                    >
                        Làm mới
                    </Button>
                    <Button type='submit' variant='contained' disabled={loading}>
                        {isEdit ? 'Cập nhật' : 'Thêm mới'}
                    </Button>
                </Box>
            </Box>
        </form>
    )
}