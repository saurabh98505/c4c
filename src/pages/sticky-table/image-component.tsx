import React from 'react';
import { Box } from '@mui/material';

const ImageComponent = (props: any) => {
    if (props.key === 'Datei-Upload') {
        const images = props.image;
        const isValid = images && Array.isArray(images);
        return (
            isValid && (
                <Box>
                    {images.map((pic: any) => {
                        return <img width={40} height={40} src={pic} alt={pic} />;
                    })}
                </Box>
            )
        );
    } else {
        return <></>;
    }
};

export default ImageComponent;
