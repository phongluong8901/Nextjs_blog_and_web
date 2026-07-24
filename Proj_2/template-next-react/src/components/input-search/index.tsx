// ** React Imports
import React, { ChangeEvent, useState, useEffect } from 'react'

// ** MUI Imports
import TextField, { TextFieldProps } from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

// ** Iconify Imports
import { Icon } from '@iconify/react'

// ** Import hook debounce từ thư mục hooks của bạn
import { useDebounce } from 'src/hooks/useDebounce'

export type InputSearchProps = Omit<TextFieldProps, 'onChange'> & {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    onClear?: () => void
    delay?: number // Thời gian chờ debounce (mặc định 500ms)
}

const InputSearch = ({
    value,
    onChange,
    placeholder = 'Tìm kiếm...',
    onClear,
    delay = 500,
    ...props
}: InputSearchProps) => {
    const [localValue, setLocalValue] = useState(value)

    // Đồng bộ lại khi giá trị bên ngoài thay đổi (ví dụ nút clear ở trang cha)
    useEffect(() => {
        setLocalValue(value)
    }, [value])

    // Gọi hook debounce
    const debouncedValue = useDebounce(localValue, delay)

    // Bắn sự kiện onChange lên component cha sau khi đã debounce xong
    useEffect(() => {
        if (debouncedValue !== value) {
            const event = {
                target: { value: debouncedValue },
            } as ChangeEvent<HTMLInputElement>
            onChange(event)
        }
    }, [debouncedValue])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value) // Gõ phím mượt ngay lập tức trên giao diện
    }

    return (
        <TextField
            value={localValue}
            onChange={handleChange}
            placeholder={placeholder}
            size='small'
            variant='outlined'
            {...props}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: (theme) => theme.palette.background.paper,
                },
                ...props.sx,
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position='start'>
                        <Icon icon='mdi:magnify' width={20} height={20} style={{ opacity: 0.7 }} />
                    </InputAdornment>
                ),
                endAdornment:
                    localValue && onClear ? (
                        <InputAdornment position='end'>
                            <span
                                onClick={() => {
                                    setLocalValue('')
                                    onClear()
                                }}
                                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            >
                                <Icon icon='mdi:close-circle' width={18} height={18} style={{ opacity: 0.5 }} />
                            </span>
                        </InputAdornment>
                    ) : null,
                ...props.InputProps,
            }}
        />
    )
}

export default InputSearch