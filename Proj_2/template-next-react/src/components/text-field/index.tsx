// ** Text-field Imports
import { styled, TextField, TextFieldProps } from "@mui/material"

const TextFiledStyled = styled(TextField)<TextFieldProps>(({ theme }) => {
//   console.log("themee", { theme })

  return {
    "& .MuiInputLabel-root": {
      transform: "none",
      lineHeight: 1.2,
      position: "relative",
      marginBottom: theme.spacing(1),
      fontSize: theme.typography.body2.fontSize,
    },

    "& .MuiInputBase-root": {
      borderRadius: 8,
      backgroundColor: "transparent",
      border: `1px solid rgba(${theme.palette.customColors.main}, 0.2)`,
      transition: theme.transitions.create(["border-color", "box-shadow"], {
        duration: theme.transitions.duration.shorter,
      }),

      // --- PHẦN THÊM TỪ ẢNH ---
      "&.Mui-focused": {
        boxShadow: theme.shadows[2],
        "& .MuiInputBase-input:not(.MuiInputBase-readOnly):not([readonly])::placeholder": {
          transform: "translateX(4px)",
        },
        "&.MuiInputBase-colorPrimary": {
          borderColor: theme.palette.primary.main,
        },
        "&.MuiInputBase-colorSecondary": {
          borderColor: theme.palette.secondary.main,
        },
        "&.MuiInputBase-colorInfo": {
          borderColor: theme.palette.info.main,
        },
        "&.MuiInputBase-colorSuccess": {
          borderColor: theme.palette.success.main,
        },
        "&.MuiInputBase-colorWarning": {
          borderColor: theme.palette.warning.main,
        },
        "&.MuiInputBase-colorError": {
          borderColor: theme.palette.error.main,
        },
      },
      "&.Mui-error": {
        borderColor: theme.palette.error.main,
      },

      "&:before, &:after": {
        display: "none",
      },
      "& .MuiInputBase-input": {
        padding: "8px 10px",
      },
    },
  }
})

const CustomTextField = (props: TextFieldProps) => {
  const { size = "small", InputLabelProps, variant = "filled", ...rests } = props

  return (
    <TextFiledStyled
      size={size}
      variant={variant}
      InputLabelProps={{ shrink: true, ...InputLabelProps }}
      {...rests}
    />
  )
}

export default CustomTextField