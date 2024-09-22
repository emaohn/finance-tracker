import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function DateFilter({start_date, end_date}) {

    return (
        <Stack direction="row" spacing={1}>
            <Chip label="Chip Filled" />
            <Chip label="Chip Outlined" variant="outlined" />
        </Stack>
    )
}