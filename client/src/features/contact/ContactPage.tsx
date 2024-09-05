import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { decrement, increment } from "./counterSlice";

export default function ContactPage() {
    const dispatch = useAppDispatch();
    const { title, data } = useAppSelector(state => state.counter);

    return (
        <>
            <Typography variant="h3" sx={{ marginBottom: '20px' }}>{title}</Typography>
            <Typography variant="h3" sx={{ marginBottom: '20px' }}>{data}</Typography>
            <ButtonGroup>
                <Button onClick={() => (dispatch(increment(1)))} variant="contained" color="primary">Increment</Button>
                <Button onClick={() => (dispatch(increment(5)))} variant="contained" color="secondary">Increment by 5</Button>
                <Button onClick={() => (dispatch(decrement(1)))} variant="contained" color="error">Decrement</Button>
            </ButtonGroup>
        </>
    )
}