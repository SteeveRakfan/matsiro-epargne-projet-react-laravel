import AuthApp from "../../components/layout/authentified/AuthApp";
import Budgets from "../../pages/admin/budgets/Budgets";
import Dashboard from "../../pages/admin/Dashboard";
import Expenses from "../../pages/admin/expenses/Expenses";
import MarketPrices from "../../pages/admin/market_prices/MarketPrices";
import Pantries from "../../pages/admin/pantries/Pantries";
import ShoppingLists from "../../pages/admin/shopping_lists/ShoppingLists";
import ProtectedRoutes from "../guards/ProtectedRoutes";

const adminRoutes = [
  {
    element: <ProtectedRoutes allowedRoles={["admin"]} />,
    children: [
      {
        path: "admin",
        element: <AuthApp />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "expenses", element: <Expenses /> },
          { path: "budgets", element: <Budgets /> },
          { path: "market_prices", element: <MarketPrices /> },
          { path: "shopping_lists", element: <ShoppingLists /> },
          { path: "pantries", element: <Pantries /> },
        ],
      },
    ],
  },
];
export default adminRoutes;
