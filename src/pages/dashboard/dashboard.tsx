import TableViewIcon from '@mui/icons-material/TableView';
import { Card, CardActionArea, CardContent } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { COLOR_CODES } from '../../utils/constants';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const nav = useNavigate();
    const [dataLogin, setDataLogin] = useState<any>();
    useEffect(() => {
        const isLoggedIn: any = JSON.parse(
            localStorage.getItem('AUHT_USER') ?? ''
        );
        console.log(isLoggedIn.response[0]);
        setDataLogin(isLoggedIn?.response[0]);
    }, [setDataLogin]);

    return (
        <>
            {/* Hero unit */}
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        C4C-CEN
                    </Typography>

                    <Box
                        display="flex"
                        justifyContent={'space-around'}
                        alignItems="center"
                    >
                        {(dataLogin?.email !== 'herrmann@kdh-werbetechnik.de' &&
                            dataLogin?.email !== 'oliver.lehmann@bp.com' && dataLogin?.email !== 'kowalkowski@kdh-werbetechnik.de') && (
                            <Card
                                sx={{
                                    maxWidth: 385,
                                    background: COLOR_CODES.tableBgColor,
                                    textAlign: 'center',
                                }}
                                onClick={() => nav('/sticky')}
                            >
                                <CardActionArea
                                    sx={{
                                        flexDirection: 'column',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 2,
                                    }}
                                >
                                    <TableViewIcon
                                        sx={{
                                            fontSize: '140px',
                                            color: COLOR_CODES.tabBtnColor,
                                        }}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                        >
                                            Visual SIGNAGE INSPECTION
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )}
                        {(dataLogin?.email === 'herrmann@kdh-werbetechnik.de' || dataLogin?.email === 'kowalkowski@kdh-werbetechnik.de' || dataLogin?.email === 'cen@admin.com') && (
                            <Card
                                sx={{
                                    maxWidth: 385,
                                    background: COLOR_CODES.tableBgColor,
                                    textAlign: 'center',
                                }}
                                onClick={() => nav('/shop')}
                            >
                                <CardActionArea
                                    sx={{
                                        flexDirection: 'column',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 2,
                                    }}
                                >
                                    <TableViewIcon
                                        sx={{
                                            fontSize: '140px',
                                            color: COLOR_CODES.tabBtnColor,
                                        }}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                        >
                                            Shop Fassaden Check
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )}
                        {(dataLogin?.email === 'oliver.lehmann@bp.com' || dataLogin?.email === 'cen@admin.com') && (
                            <Card
                                sx={{
                                    maxWidth: 385,
                                    background: COLOR_CODES.tableBgColor,
                                    textAlign: 'center',
                                }}
                                onClick={() => nav('/retrofit')}
                            >
                                <CardActionArea
                                    sx={{
                                        flexDirection: 'column',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 2,
                                    }}
                                >
                                    <TableViewIcon
                                        sx={{
                                            fontSize: '140px',
                                            color: COLOR_CODES.tabBtnColor,
                                        }}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                        >
                                            FRN RetroFit Shelf
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )}
                    </Box>
                </Container>
            </Box>
        </>
    );
}