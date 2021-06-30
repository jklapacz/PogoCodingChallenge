import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

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

const categoryMap = {
  Books: "📚",
  Entertainment: "🍷",
  'Food and Drink': "🍲",
  Shopping: "🛍️",
  Travel: "✈️",
  Unknown: "❓",
};
const catToEmoji = (category) => categoryMap[category] || category;//["Unknown"];

function ClaimListItem(props) {
  const classes = useStyles();
  const { points, name, amount, date } = props.purchase;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid xs container spacing={4} alignItems="center">
          <Grid item>
            <Typography variant="h4">{points}</Typography>
            <Typography variant="body1" color="textSecondary">
              PTS
            </Typography>
          </Grid>
          <Grid item xs sm container>
            <Grid
              item
              xs
              container
              direction="column"
              spacing={2}
              alignItems="flex-start"
              justify="flex"
            >
              <Typography variant="h5">{name}</Typography>
              <Typography color="secondary" variant="caption">
                {catToEmoji(props.purchase.category)} &nbsp;|&nbsp; ${amount}{" "}
                &nbsp;|&nbsp; {date}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color={props.redeemed ? "secondary" : "primary"}
              onClick={props.onClick}
            >
              {props.redeemed ? 'Unredeem' : 'Redeem'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export const ClaimedPurchases = ({ data } = { data: [] }) => {
  const [redeemedOffers, setRedeemedOffers] = React.useState([]);
  const isRedeemed = React.useCallback(
    (purchase) => {
      return redeemedOffers.find((p) => p.id === purchase.id);
    },
    [redeemedOffers]
  );

  const [redeemableOffers, setRedeemableOffers] = React.useState([]);
  const isRedeemable = React.useCallback(
    (purchase) => {
      return PointSystem.eligibleForPoints(purchase) && !isRedeemed(purchase);
    },
    [isRedeemed]
  );

  React.useEffect(() => {
    setRedeemableOffers([...data].filter(isRedeemable));
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
      if (redeemedOffers.find((p) => p.id === purchase.id)) {
        const idx = redeemedOffers.findIndex((p) => p.id === purchase.id);
        setRedeemedPoints(redeemedPoints - purchase.points);
        const newArr = redeemedOffers.slice();
        newArr.splice(idx, 1);
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
      <ul></ul>
      {redeemedOffers.map((purchase) => {
        return (
          <ClaimListItem
            purchase={purchase}
            onClick={() => unredeem(purchase)}
            redeemed
          />
        );
      })}
      <br />
      <h5>
        <b>Purchases to Claim</b> (last 30 days)
      </h5>
      <br />
      <b>{redeemedPoints} points redeemed!</b>
      <ul>
        {redeemableOffers.map((purchase) => {
          return (
            <ClaimListItem
              purchase={purchase}
              onClick={() => redeem(purchase)}
            />
          );
        })}
      </ul>
    </div>
  );
};
