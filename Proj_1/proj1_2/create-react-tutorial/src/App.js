
import './App.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function App() {
  return (
    <>
      <button color="secondary">Secondary</button>
      <Button variant="contained" color="success">
        Success
      </Button>
      <Button variant="outlined" color="error">
        Error
      </Button>
    </>
  )
}

export default App;
