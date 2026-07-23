import React, { useMemo } from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import {
    Box,
    Grid,
    Card,
    Typography,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material'
import { Icon } from '@iconify/react'

// Dữ liệu bảng user gần đây mẫu
const RECENT_USERS = [
    { id: 1, name: 'Nguyen Van A', email: 'a@gmail.com', role: 'User', status: 'Active' },
    { id: 2, name: 'Tran Thi B', email: 'b@gmail.com', role: 'Admin', status: 'Active' },
    { id: 3, name: 'Le Van C', email: 'c@gmail.com', role: 'User', status: 'Inactive' },
]

const AdminDashboardPage: NextPage = () => {

    const { t, i18n } = useTranslation()

    // Sử dụng useMemo để mảng STATS_DATA tự động cập nhật lại ngôn ngữ khi thay đổi i18n.language
    const STATS_DATA = useMemo(() => [
        { title: t('Total Users'), count: '8,450', icon: 'mdi:account-group', color: 'primary.main' },
        { title: t('Total Revenue'), count: '$48,200', icon: 'mdi:currency-usd', color: 'success.main' },
        { title: t('Active Products'), count: '342', icon: 'mdi:shopping', color: 'warning.main' },
        { title: t('Pending Orders'), count: '28', icon: 'mdi:clock-alert', color: 'error.main' },
    ], [t, i18n.language])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                width: '100%',
                gap: 3
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {t('Admin Dashboard')}
            </Typography>

            {/* Các thẻ Thống kê (Stat Cards) */}
            <Grid container spacing={3}>
                {STATS_DATA.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card
                            sx={{
                                p: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                height: '100%'
                            }}
                        >
                            <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                    {item.count}
                                </Typography>
                            </Box>
                            <Avatar
                                sx={{
                                    backgroundColor: item.color,
                                    color: '#fff',
                                    width: 50,
                                    height: 50,
                                }}
                            >
                                <Icon icon={item.icon} width={28} height={28} />
                            </Avatar>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Bảng quản lý người dùng gần đây */}
            <Card sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    {t('Recent Registered Users')}
                </Typography>
                <TableContainer component={Paper} sx={{ boxShadow: 'none', flexGrow: 1 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="recent users table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>{t('Full Name')}</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>{t('Email')}</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>{t('Role')}</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>{t('Status')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {RECENT_USERS.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{t(row.role)}</TableCell>
                                    <TableCell>
                                        <Box
                                            component="span"
                                            sx={{
                                                px: 2,
                                                py: 0.5,
                                                borderRadius: '8px',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                backgroundColor: row.status === 'Active' ? 'success.lighter' : 'error.lighter',
                                                color: row.status === 'Active' ? 'success.main' : 'error.main',
                                            }}
                                        >
                                            {t(row.status)}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    )
}

export default AdminDashboardPage