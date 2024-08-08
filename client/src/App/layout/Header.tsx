import { AppBar, Switch, Toolbar, Typography } from "@mui/material"

interface Props {
    handleDarkMode: () => void;
}

function Header({ handleDarkMode }: Props) {
    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
                <Typography variant="h6">
                    E-Commerce
                </Typography>
                <Switch color="primary" onClick={handleDarkMode} />
            </Toolbar>
        </AppBar>
    )

}

export default Header