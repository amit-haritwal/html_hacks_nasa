// material-ui
import { Typography,Chip } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const DashboardPage = () => (
    <div>
        <Typography variant="h2" gutterBottom>
            Upcoming Matches
        </Typography>
    <MainCard title="India vs Pakistan" actionButton="Join">
        <Typography variant="body2">
            ICC Cricket World Cup
        </Typography>
         <Chip label="mega" color="primary" />
    </MainCard>
    </div>
);

export default DashboardPage;
