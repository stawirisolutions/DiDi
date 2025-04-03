import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <>
      <Grid templateAreas={`"nav" "main" "footer"`}>
        <GridItem area={"nav"}>
          <NavBar />
        </GridItem>
        <GridItem area={"main"}>
          <Outlet />
        </GridItem>
        <GridItem area={"footer"}>Footer</GridItem>
      </Grid>
    </>
  );
};

export default App;
