import { CircularProgress, Container } from "@mui/material";

function LoadingView() {
    return <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <CircularProgress size={32} color="primary" />
        </Container>
}

export default LoadingView;