import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../App/api/agent';
import { toast } from 'react-toastify';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

interface FromInputs {
    username: string,
    email: string,
    password: string
}

export default function Register() {

    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { isSubmitting, isValid, errors } } = useForm<FromInputs>({
        mode: 'all'
    });

    function handleApiErrors(errors: any) {
        console.log(errors);
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes("Username")) {
                    setError("username", { message: error });
                } else if (error.includes("Email")) {
                    setError("email", { message: error });
                } else if (error.includes("Password")) {
                    setError("password", { message: error });
                }
            });
        }
    }

    return (
        <Card variant="outlined">
            <Typography
                component="h1"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
                Register
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit((data) => {
                    agent.Account.register(data)
                        .then(() => {
                            toast.success('Registration have been successful - please login');
                            navigate('/login');
                        })
                        .catch(err => {
                            handleApiErrors(err);
                        });
                })}
                noValidate
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2,
                }}
            >
                <FormControl>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <TextField
                        id="username"
                        type="username"
                        placeholder="Username"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        {...register("username", { required: "Username is required" })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        type="email"
                        id="email"
                        required
                        fullWidth
                        variant="outlined"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <TextField
                        placeholder="••••••"
                        type="password"
                        id="password"
                        required
                        fullWidth
                        variant="outlined"
                        {...register("password", {
                            required: "Password is required", pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                message: "Password does not meet the required complexity"
                            }
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                </FormControl>
                <LoadingButton
                    loading={isSubmitting}
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={!isValid}
                >
                    Register
                </LoadingButton>
            </Box>
            <Divider>or</Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography sx={{ textAlign: 'center' }}>
                    Already have an account?{' '}
                    <Link
                        to={'/login'}
                    >
                        Sign in
                    </Link>
                </Typography>
            </Box>
        </Card>
    );
}