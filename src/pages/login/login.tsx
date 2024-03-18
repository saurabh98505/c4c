import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LOGO from '../../assets/logo.jpeg';
import LOGOS from '../../assets/logo.jpg';

import CustomFormikField from '../../components/CustomFormikField';
import { COLOR_CODES } from '../../utils/constants';
import { loginSchema } from '../../validations/validation';

export default function Login() {
    const nav = useNavigate();

    const [showLoader, setShowLoader] = React.useState<boolean>(false);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('AUHT_USER');
        if (isLoggedIn) {
            nav('/dashboard');
        }
    }, []);

    const submitHandler = React.useCallback(async (values: any) => {
        try {
            // const dd = await axios.get('http://c4c-cen.com/api/api_getAll');
            // console.log(dd);
            const params = new URLSearchParams();
            params.append('email', values.email);
            params.append('password', values.password);
            const data: any = await axios.post('/api_getLogin', params);
            setShowLoader(false);
            if (!data?.response === false) {
                localStorage.setItem('AUHT_USER', JSON.stringify(data));
                nav('/dashboard');
            } else {
                alert('Invalid Login Credentials...!');
            }
        } catch (e: any) {
            setShowLoader(false);
            alert(e?.message ?? 'Something went wrong!');
        }
    }, []);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        width: '50%',
                    }}
                >
                    <Box display={'flex'} alignItems={'center'}>
                        <img
                            alt="JotForm"
                            src={LOGO}
                            style={{ height: '80px' }}
                        />
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '18px',
                            }}
                        >
                            C4C Construction Portal
                        </Typography>
                    </Box>
                    <Box>
                        <img src={LOGOS} height={'50px'} />
                    </Box>
                </Box>
                <Formik
                    initialValues={{
                        // email: 'cen@admin.com',
                        // password: 'abcxyz',
                        email: '',
                        password: '',
                    }}
                    validationSchema={loginSchema}
                    onSubmit={submitHandler}
                >
                    {({ errors }) => {
                        return (
                            <Form>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '400px',
                                    }}
                                >
                                    <CustomFormikField
                                        name="email"
                                        placeholder="Email Address"
                                    />

                                    <CustomFormikField
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                    />

                                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                                    <Box
                                        sx={{
                                            m: 1,
                                            position: 'relative',
                                            width: '100%',
                                        }}
                                    >
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            disabled={showLoader}
                                        >
                                            Sign In
                                        </Button>
                                        {showLoader && (
                                            <CircularProgress
                                                size={24}
                                                sx={{
                                                    color: COLOR_CODES.tabBtnColor,
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    marginTop: '-12px',
                                                    marginLeft: '-12px',
                                                }}
                                            />
                                        )}
                                    </Box>
                                    {/* <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid> */}
                                </Box>
                            </Form>
                        );
                    }}
                </Formik>
            </Box>
        </>
    );
}
