import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Divider, styled, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import React from 'react';
import { COLOR_CODES } from '../../utils/constants';

const CustomInput = styled(InputBase)({
    ml: 1,
    flex: 1,
    boxShadow: 'none',
    colorSecondary: 'red',
});

export default function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}: any) {
    const count = preGlobalFilteredRows?.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = (value: any) => {
        setGlobalFilter?.(value || undefined);
    };

    return (
        <Box className="global-search" ml={1}>
            <Paper
                component="form"
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: 400,
                }}
            >
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                    <SearchIcon />
                </IconButton>
                <CustomInput
                    value={value || ''}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'Search' }}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Box
                    display={'flex'}
                    justifyContent="center"
                    alignItems={'center'}
                >
                    <Typography sx={{ color: COLOR_CODES.darkGrey }}>
                        Filter
                    </Typography>
                    <IconButton sx={{ p: '10px' }} aria-label="directions">
                        <FilterAltIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Paper>
        </Box>
    );
}
