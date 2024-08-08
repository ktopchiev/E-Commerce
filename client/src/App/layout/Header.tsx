import { DarkMode, DarkModeOutlined, LightMode } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"

interface Props {
    darkMode: boolean;
    handleDarkMode: () => void;
}

function Header({ darkMode, handleDarkMode }: Props) {
    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
                <Typography variant="h6">
                    E-Commerce
                </Typography>
                <IconButton size="large" onClick={handleDarkMode}>
                    {darkMode ?
                        <LightMode aria-label="Turn on the light" /> :
                        <DarkModeOutlined aria-label="Turn off the light" sx={{ color: 'white' }} />
                    }
                </IconButton>

            </Toolbar>
        </AppBar>
    )

}

export default Header