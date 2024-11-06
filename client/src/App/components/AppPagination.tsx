import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../models/pagination";

interface Props {
    metaData: MetaData;
    onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {

    const { currentPage, totalPages, pageSize, totalItemsCount } = metaData;

    return (
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography>
                Displaying {(currentPage * pageSize) - pageSize + 1} - {totalItemsCount >= pageSize ?
                    currentPage * pageSize
                    : totalItemsCount}
                of {totalItemsCount} items
            </Typography>
            <Pagination
                color="secondary"
                size="large"
                count={totalPages}
                page={currentPage}
                onChange={(_e, page) => onPageChange(page)}
            />
        </Box>
    )
}
