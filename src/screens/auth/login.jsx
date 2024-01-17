/* eslint-disable react/prop-types */
import { Box, Button, Typography } from "@mui/material";
import ReusableInput from "../../components/InputTag";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const { setName, name } = props;
  const navigate = useNavigate();

  const handelNameChange = (value) => {
    setName(value);
  };
  return (
    <div>
      <Box
        sx={{ display: "flex", height: "100vh", backgroundColor: "#FFF5E0" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "10px",
            backgroundColor: "#141E46",
            color: "white",
            height: "100%",
            width: "50%",
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontFamily: "arial", fontSize: "35px" }}
          >
            Candidate Manager
          </Typography>
          <Typography sx={{ fontFamily: "arial", fontSize: "10px" }}>
            Made with 💖 for NonStop.io
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "50%",
          }}
        >
          <Box
            sx={{
              width: "50%",
              backgroundColor: "#bb2520",
              height: "50%",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Typography sx={{ fontSize: "35px", color: "white" }}>
              Log In
            </Typography>
            <Typography sx={{ fontSize: "15px", color: "white" }}>
              Enter Your Name
            </Typography>
            <ReusableInput value={name} onChange={handelNameChange} />
            <Button
              variant="contained"
              sx={{ backgroundColor: "#141E46" }}
              onClick={() => navigate(`/candidate`)}
            >
              Continue
            </Button>
            <Box></Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
