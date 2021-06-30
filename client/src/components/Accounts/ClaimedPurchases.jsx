import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import { PointSystem } from "../../utils/pointSystem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

function ClaimListItem(props) {
  const classes = useStyles();
  const { points, name, amount, date } = props.purchase;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs sm container direction="column">
            <Grid item xs>
              <Typography variant="body2" gutterBottom>
                {points}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                PTS
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs={8} container direction="column" spacing={2}>
              <Grid item>
                <Typography variant="body2">
                  {name}
                </Typography>
                <Typography variant="body2">
                  {amount}
                </Typography>
                <Typography variant="body2">
                  {date}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Fab
                variant="extended"
                onClick={props.onClick}
              >
                Redeem
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export const ClaimedPurchases = ({ data } = { data: [] }) => {
  const [redeemedOffers, setRedeemedOffers] = React.useState([]);
  const isRedeemed = React.useCallback((purchase) => {
    return redeemedOffers.find(p => p.id === purchase.id)
  }, [redeemedOffers]);

  const [redeemableOffers, setRedeemableOffers] = React.useState([]);
  const isRedeemable = React.useCallback((purchase) => {
    return PointSystem.eligibleForPoints(purchase) && !isRedeemed(purchase) 
  }, [isRedeemed])

  React.useEffect(() => {
    setRedeemableOffers([...data].filter(isRedeemable))
  }, [setRedeemableOffers, data, isRedeemable]);

  const [redeemedPoints, setRedeemedPoints] = React.useState(0);
  const redeem = React.useCallback(
    (purchase) => {
      setRedeemedPoints(purchase.points + redeemedPoints);
      setRedeemedOffers([...redeemedOffers, purchase]);
    },
    [redeemedOffers, setRedeemedOffers, redeemedPoints, setRedeemedPoints]
  );
  const unredeem = React.useCallback(
    (purchase) => {
      if (redeemedOffers.find(p => p.id === purchase.id)) {
        const idx = redeemedOffers.findIndex(p => p.id === purchase.id)
        setRedeemedPoints(redeemedPoints - purchase.points);
        const newArr = redeemedOffers.slice()
        newArr.splice(idx, 1)
        setRedeemedOffers(newArr);
      }
    },
    [redeemedOffers, setRedeemedOffers, redeemedPoints, setRedeemedPoints]
  );

  const EmptyOfferList = () => <div>No offers!</div>;

  return data.length === 0 ? (
    <EmptyOfferList />
  ) : (
    <div>
      <h5>Claimed Offers</h5>
      <br />
      <ul>
      </ul>
        {redeemedOffers.map((purchase) => {
          return (
            <ClaimListItem purchase={purchase} onClick={() => unredeem(purchase)} redeemed />
          );
        })}
      <br />
      <h5>
        <b>Purchases to Claim</b> (last 14 days)
      </h5>
      <br />
      <b>{redeemedPoints} points redeemed!</b>
      <ul>
        {redeemableOffers.map((purchase) => {
          return (
            <ClaimListItem purchase={purchase} onClick={() => redeem(purchase)} />
          );
        })}
      </ul>
    </div>
  );
};
