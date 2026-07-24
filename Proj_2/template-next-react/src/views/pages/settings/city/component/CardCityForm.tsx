import React, { useState } from 'react'
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    Chip,
    useTheme
} from '@mui/material'
import { Icon } from '@iconify/react'
import { Controller } from 'react-hook-form'

// Import cấu hình sẵn có của bạn (điều chỉnh lại đường dẫn nếu cần)
import { CONFIG_CITIES } from 'src/configs/city'
import CustomConfirmDialog from 'src/components/custom-confirm-dialog'


interface CardCityFormProps {
    control: any
    errors: any
    handleSubmit: any
    onSubmit: any
    reset: any
    setValue: any
    loading: boolean
    isEdit: boolean
}

export default function CardCityForm({
    control,
    errors,
    handleSubmit,
    onSubmit,
    reset,
    setValue,
    loading,
    isEdit
}: CardCityFormProps) {
    const theme = useTheme()
    const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({})

    // State quản lý Dialog xác nhận khi chọn từ danh sách
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
    const [selectedTargetName, setSelectedTargetName] = useState('')

    const handleToggle = (index: number) => {
        setOpenItems((prev) => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    const handleItemClick = (name: string) => {
        setSelectedTargetName(name)
        setOpenConfirmDialog(true)
    }

    const handleConfirmSelect = () => {
        setValue('name', selectedTargetName, { shouldValidate: true })
        setOpenConfirmDialog(false)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1, p: 1 }}>
                <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label='Tên thành phố'
                            fullWidth
                            size='small'
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message}
                        />
                    )}
                />

                {!isEdit && (
                    <Box>
                        <Typography variant='caption' sx={{ fontWeight: 600, color: 'text.secondary', mb: 0.5, display: 'block' }}>
                            Hoặc chọn nhanh từ danh sách Tỉnh/Quận cấu hình sẵn:
                        </Typography>

                        <Paper
                            elevation={0}
                            sx={{
                                width: '100%',
                                backgroundColor: theme.palette.background.default,
                                borderRadius: 2,
                                border: `1px solid ${theme.palette.divider}`,
                                maxHeight: '250px',
                                overflowY: 'auto'
                            }}
                        >
                            <List component='nav' sx={{ width: '100%', p: 0 }}>
                                {CONFIG_CITIES.map((city: any, index: number) => {
                                    const isOpen = Boolean(openItems[index])

                                    return (
                                        <React.Fragment key={index}>
                                            <ListItemButton
                                                onClick={() => handleToggle(index)}
                                                sx={{
                                                    py: 1,
                                                    px: 2,
                                                    borderBottom: `1px solid ${theme.palette.divider}`,
                                                    '&:hover': { backgroundColor: theme.palette.action.selected }
                                                }}
                                            >
                                                <ListItemText
                                                    primary={
                                                        <Box
                                                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                handleItemClick(city.name)
                                                            }}
                                                        >
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                                                                    {city.name}
                                                                </Typography>
                                                                {city.code && (
                                                                    <Chip
                                                                        label={city.code}
                                                                        size='small'
                                                                        variant='outlined'
                                                                        color='primary'
                                                                        sx={{ height: 18, fontSize: '0.65rem' }}
                                                                    />
                                                                )}
                                                            </Box>
                                                            <Typography variant='caption' sx={{ color: theme.palette.primary.main, fontWeight: 500, mr: 1 }}>
                                                                [Chọn tỉnh]
                                                            </Typography>
                                                        </Box>
                                                    }
                                                />
                                                <Icon
                                                    icon={isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                                                    width={20}
                                                    style={{ color: theme.palette.text.secondary }}
                                                />
                                            </ListItemButton>

                                            <Collapse in={isOpen} timeout='auto' unmountOnExit>
                                                <List component='div' disablePadding sx={{ backgroundColor: theme.palette.background.paper }}>
                                                    {city.districts.map((district: string, dIndex: number) => (
                                                        <ListItemButton
                                                            key={dIndex}
                                                            onClick={() => handleItemClick(district)}
                                                            sx={{
                                                                pl: 4,
                                                                py: 0.75,
                                                                borderBottom: `1px dashed ${theme.palette.divider}`,
                                                                '&:hover': { backgroundColor: theme.palette.action.hover }
                                                            }}
                                                        >
                                                            <Icon
                                                                icon='mdi:circle-small'
                                                                width={18}
                                                                style={{ marginRight: 6, color: theme.palette.text.secondary }}
                                                            />
                                                            <ListItemText
                                                                primary={
                                                                    <Typography variant='caption' sx={{ color: theme.palette.text.secondary }}>
                                                                        {district}
                                                                    </Typography>
                                                                }
                                                            />
                                                        </ListItemButton>
                                                    ))}
                                                </List>
                                            </Collapse>
                                        </React.Fragment>
                                    )
                                })}
                            </List>
                        </Paper>
                    </Box>
                )}

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

            {/* Sử dụng CustomConfirmDialog để xác nhận khi chọn nhanh Tỉnh/Quận */}
            <CustomConfirmDialog
                open={openConfirmDialog}
                title='Xác nhận điền nhanh'
                content={`Bạn có muốn điền "${selectedTargetName}" vào ô Tên thành phố không?`}
                confirmText='Xác nhận'
                confirmColor='primary'
                icon='mdi:check-circle-outline'
                loading={false}
                onClose={() => setOpenConfirmDialog(false)}
                onConfirm={handleConfirmSelect}
            />
        </form>
    )
}