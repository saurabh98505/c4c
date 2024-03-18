import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import LOGO from '../../assets/logo.jpeg';
import LOGOS from '../../assets/logo.jpg';
import { COLOR_CODES } from '../../utils/constants';
import ProfileMenu from './profile-menu';

const PRE_LOGIN_ROUTES = ['/login'];
const Layout = () => {
    const location = useLocation();

    const isPreLoginRoute = useMemo(
        () => PRE_LOGIN_ROUTES.includes(location.pathname),
        [location.pathname]
    );

    const nav = useNavigate();

    return (
        <>
            <AppBar position="relative" sx={{ background: COLOR_CODES.white }}>
                <Toolbar>
                    <Grid
                        display="flex"
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        container
                    >
                        <Grid item display="flex" xs={10} alignItems="center">
                            <img
                                alt="JotForm"
                                src={LOGO}
                                style={{ height: '60px' }}
                                onClick={() => nav('/dashboard')}
                            />
                            <Typography
                                sx={{
                                    color: '#24c058',
                                    fontWeight: 'bold',
                                    paddingLeft: '5px',
                                }}
                            >
                                C4C Construction Portal
                            </Typography>
                        </Grid>

                        <Grid
                            item
                            display={'flex'}
                            justifyContent={'flex-end'}
                            alignItems="center"
                            xs={2}
                        >
                            <img
                                alt="JotForm"
                                src={LOGOS}
                                style={{ height: '40px' }}
                                onClick={() => nav('/dashboard')}
                            />
                            {!isPreLoginRoute && <ProfileMenu />}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <main style={{ paddingBottom: '5px' }}>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
