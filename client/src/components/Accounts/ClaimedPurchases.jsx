import React from "react";

const BLOCKED_CATEGORIES = [
  "Bank Fees",
  "Interest",
  "Transfer",
  "Taxes",
  "Payments",
];
class PointSystem {
  static eligibleForPoints(purchase) {
    return (
      purchase.amount &&
      purchase.amount > 0 &&
      purchase.category &&
      !BLOCKED_CATEGORIES.includes(purchase.category)
    );
  }
  static calculatePoints(purchase) {
      return purchase.amount < 25 ? 5 : 10
  }
}

const samplePurchases = [
    { amount: 50, category: "Books", name: "Bible" }
]

export const ClaimedPurchases = () => (
  <div>
    <h5>
      <b>Purchases to Claim</b> (last 14 days)
    </h5>
    <br />
    Total points: 0 Elegible purchases
    <ul>
        {samplePurchases.map(purchase => {
            return <li>{purchase.name}: {purchase.amount} [{PointSystem.calculatePoints(purchase)}]</li>
        })}
    </ul>
  </div>
);
