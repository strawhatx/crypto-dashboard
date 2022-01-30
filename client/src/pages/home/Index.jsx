import logo from "../../assets/images/logo.svg";
import { Box, Link, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <header className="logo">
        <img src={logo} className="app-logo" alt="logo" />
        <Typography paragraph={true}>
          Edit <code>src/App.js</code> and save to reload.
        </Typography>
        <Link
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </Link>
      </header>
    </Box>
  );
};

export default Home;
