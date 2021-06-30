import React from 'react'

const BLOCKED_CATEGORIES = [
  "Bank Fees",
  "Interest",
  "Transfer",
  "Taxes",
  "Payment",
];

export class PointSystem {
  constructor(purchases) {
    this.allPurchases = [];
    for (const purchase of purchases) {
      purchase.points = PointSystem.calculatePoints(purchase)
      purchase.id = btoa(purchase.name+purchase.date+purchase.amount)
      this.allPurchases.push(purchase)
    }
  }

  acceptableTransactions() {
    const acceptable = this.allPurchases.filter(PointSystem.eligibleForPoints);
    console.log("acceptable: %O", acceptable)
    return acceptable.slice()
  }

  static eligibleForPoints(purchase) {
    const eligible = (
      purchase.amount &&
      purchase.amount > 0 &&
      purchase.category &&
      !BLOCKED_CATEGORIES.includes(purchase.category)
    );
    console.log("checking eligibility: %O, %O", purchase, eligible);
    return eligible;
  }
  static calculatePoints(purchase) {
    return purchase.amount < 25 ? 5 : 10;
  }
}