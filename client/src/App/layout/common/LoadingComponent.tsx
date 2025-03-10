import { Backdrop, Box, CircularProgress, Typography } from "@mui/material"

interface Props {
    message?: string,
}

function LoadingComponent({ message = 'Loading...' }: Props) {
    return (
        <Backdrop open={true} invisible={true}>
            <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
                <CircularProgress size={50} color="secondary" />
                <Typography sx={{ justifyContent: 'center', position: 'fixed', top: '60%', typography: { xs: 'body2', md: 'h5' } }}>{message}</Typography>
            </Box>
        </Backdrop>
    )
}

export default LoadingComponent