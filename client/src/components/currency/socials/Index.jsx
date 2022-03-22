import React from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import NavTabs from "../../Tabs/Index";
import CurrencySocialsTwitter from "./platforms/Twitter";
import CurrencySocialsReddit from "./platforms/Reddit";

const CurrencySocials = () => {
  return (
    <>
      <Card>
        <CardHeader />
        <CardContent>
          <NavTabs
            title="Socials"
            tabItems={[
              { title: "Top posts", content: <CurrencySocialsTwitter /> },
              { title: "Twitter", content: <CurrencySocialsTwitter /> },
              { title: "Reddit", content: <CurrencySocialsReddit /> },
            ]}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default CurrencySocials;
