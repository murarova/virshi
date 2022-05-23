import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { teal } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(teal[ 500 ]),
  backgroundColor: teal[ 500 ],
  '&:hover': {
    backgroundColor: teal[ 700 ],
  },
  fontFamily: '"PT Mono", monospace'
}));

export default function CustomButton({ children, onClick, ...props }) {
  return (
    <ColorButton { ...props } onClick={ onClick } variant="contained">
      { children }
    </ColorButton>
  );
}
