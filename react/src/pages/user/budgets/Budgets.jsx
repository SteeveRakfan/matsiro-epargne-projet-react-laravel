import React, { useState } from "react";
import AuthNav from "../../../components/common/AuthNav";
import AuthTitle1 from "../../../components/common/AuthTitle1";
import AuthContainer from "../../../components/common/AuthContainer";
import Info1 from "../../../components/common/Info1";
import Input2 from "../../../components/common/Input2";

export default function Budgets() {
  const [initialFund, setInitialFund] = useState(0);
  return (
    <div>
      <AuthNav />
      <AuthContainer>
        <div className="flex justify-between items-center mb-10">
          <AuthTitle1 title="Budgets" />
        </div>
        {!initialFund ? (
          <Info1 title="You have not still set your Initial Fund. Set it">
            <Input2
              field={{
                name: "initial_fund",
                label: "Initial fund:",
                number: true,
              }}
              value={initialFund}
              onChange={(e) => setInitialFund(e.target.value)}
            />
          </Info1>
        ) : (
          ""
        )}
      </AuthContainer>
    </div>
  );
}
