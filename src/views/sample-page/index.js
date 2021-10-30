// material-ui
import { Typography, Chip, Grid } from "@mui/material";

// project imports
import MainCard from "ui-component/cards/MainCard";

import { MATCHES } from "../../utils/data";

import { Link } from "react-router-dom";

// ==============================|| SAMPLE PAGE ||============================== //

const DashboardPage = () => (
  <div>
    <Typography variant="h2" gutterBottom>
      Upcoming Matches
    </Typography>
    {MATCHES.map((match, index) => {
      return (
        <MainCard
          title="India vs Pakistan"
          actionButton={<Link to={`/joinMatch/${match.match_id}`}>Join</Link>}
        >
          <Grid container spacing={24}>
            <Grid item xs={12} lg={6}>
              <Typography variant="body2">ICC Cricket World Cup</Typography>
              <Chip label="India" />
              <Chip label="Pakistan" />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Chip color="success" label="Entry Fee - 0.1 ETH" />
              <Chip color="error" label=" Prize Pool - 300 ETH" />
            </Grid>
          </Grid>
        </MainCard>
      );
    })}
  </div>
);

export default DashboardPage;