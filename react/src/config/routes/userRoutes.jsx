import AuthApp from "../../components/layout/authentified/AuthApp";
import Budget from "../../pages/user/budgets/Budgets";
import Dashboard from "../../pages/user/Dashboard";
import Expense from "../../pages/user/expenses/Expenses";
import MarketPrice from "../../pages/user/market_prices/MarketPrices";
import Pantry from "../../pages/user/pantries/Pantries";
import ShoppingList from "../../pages/user/shopping_lists/ShoppingLists";
import ProtectedRoutes from "../guards/ProtectedRoutes";

const userRoutes = [
  {
    element: <ProtectedRoutes allowedRoles={['user']} />,
    children: [
      {
        path: "user",
        element: <AuthApp />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "expenses", element: <Expense /> },
          { path: "budgets", element: <Budget /> },
          { path: "market_prices", element: <MarketPrice /> },
          { path: "shopping_lists", element: <ShoppingList /> },
          { path: "pantry", element: <Pantry /> },
        ],
      },
    ],
  },
];
export default userRoutes;
