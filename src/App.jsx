import "./App.css";
import Planinput from "./components/PlanInput";

function App() {
  // read the html and js comments
  // look at the way the linked plan calculators work

  const shopifyPlanArr = [
    {
      name: "basic",
      id: "shopify-basic",
      cost: 29,
      creditCardFee: 2.9,
      transactionFee: 2,
      centsPerTransaction: 30,
    },
    {
      name: "regular",
      id: "shopify-reg",
      cost: 79,
      creditCardFee: 2.6,
      transactionFee: 1,
      centsPerTransaction: 30,
    },
    {
      name: "advanced",
      id: "shopify-adv",
      cost: 299,
      creditCardFee: 2.4,
      transactionFee: 0.5,
      centsPerTransaction: 30,
    },
    {
      name: "plus",
      id: "shopify-plus",
      cost: 2000,
      creditCardFee: 2.15,
      transactionFee: 0.15,
      centsPerTransaction: 30,
    },
  ];

  const turnToDecimal = (num) => {
    return num / 100;
  };

  return (
    <div>
      <h1>Shopify Plan Calculator</h1>
      <Planinput shopifyPlanArr={shopifyPlanArr} />
    </div>
  );
}

export default App;
