import { Box, Container, IconButton, Typography } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function ContactPage() {


    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingTop: { sm: '200px', md: 2 },
                px: { xs: 3, sm: 5 },
                height: '100vh'
            }}
        >
            <Typography>Contact me in:</Typography>

            <Box>
                <IconButton
                    href="https://www.linkedin.com/in/karol-topchiev-787b85a8/"
                    target="_blank"
                    sx={{ color: 'gray', '&: hover': { color: '#0a66c2' } }}
                >
                    <LinkedInIcon
                        fontSize="large"
                    />
                </IconButton>
                <IconButton
                    href="https://github.com/ktopchiev"
                    target="_blank"
                    sx={{ color: 'gray', '&: hover': { color: 'black' } }}
                >
                    <GitHubIcon
                        fontSize="large"
                    />
                </IconButton>
            </Box>
        </Container>
    )
}