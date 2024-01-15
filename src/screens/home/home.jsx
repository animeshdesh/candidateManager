/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  getAllCandidates,
  createCandidate,
  updateCandidate,
  deleteCandidate,
} from "../../services/auth.endpoints.js";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import "./home.css";

const Home = ({ allUsers, fromActive }) => {
  //   const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <Box
        sx={{
          backgroundColor: "#141E46",
          height: "10vh",
          marginBottom: "0.5rem",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "start",
          paddingLeft: "15px",
          color: "white",
          alignItems: "center",
          fontSize: "40px",
        }}
      >
        Candidate Manager
      </Box>
      <Box
        sx={{
          display: "flex",
          //   height: "85vh",
          width: "100%",
          borderRadius: "10px",
          overflowY: "auto", // Enable vertical scrolling
          maxHeight: "85vh",
          justifyContent: "space-between",
        }}
      >
        <Box
          className="custom-scrollbar"
          sx={{
            backgroundColor: "#FFF5E0",
            //   height: "85vh",
            width: "30%",
            borderRadius: "10px",
            overflowY: "auto", // Enable vertical scrolling
            maxHeight: "85vh",
          }}
        >
          <Box
            sx={{
              padding: "5px 0px 5px 0px",
              backgroundColor: "#BB2525",
              color: "white",
              width: "98%",
              height: "5vh",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "start",
              paddingLeft: "15px",
              alignItems: "center",
              fontSize: "20px",
            }}
          >
            Details of Canditate
          </Box>
          <Box>
            {/* Display the list of users */}
            <List>
              {allUsers?.map((user, index) => (
                <ListItem
                  key={index}
                  sx={{
                    border: "1px solid #141E46",
                    borderRadius: "10px",
                    marginTop: "2px",
                    backgroundColor:
                      selectedUser === user ? "#e09696" : "transparent",
                    "&:hover": {
                      backgroundColor: "#e09696", // Hover effect color
                    },
                  }}
                  onClick={() => setSelectedUser(user)}
                >
                  <ListItemText primary={user.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "#FFF5E0",
            //   height: "85vh",
            width: "69%",
            borderRadius: "10px",
            overflowY: "auto", // Enable vertical scrolling
            maxHeight: "85vh",
          }}
        >
          {selectedUser && (
            <Box>
              <Box
                sx={{
                  padding: "5px 0px 5px 0px",
                  backgroundColor: "#BB2525",
                  color: "white",
                  width: "98%",
                  height: "5vh",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "start",
                  paddingLeft: "15px",
                  alignItems: "center",
                  fontSize: "20px",
                }}
              >
                Selected Candidate
              </Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "20px",
                  }}
                >
                  <Box>
                    <Typography variant="h5">
                      Name : {selectedUser.name}
                    </Typography>
                    <Typography variant="h5">
                      Email : {selectedUser.email}
                    </Typography>
                    <Typography variant="h5">
                      Gender : {selectedUser.gender}
                    </Typography>
                    <Typography variant="h5">
                      Hobbies : {selectedUser.hobbies}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "150px", height: "150px" }}>
                    <img
                      src={selectedUser.profile_picture}
                      alt={selectedUser.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography>{allUsers?.education}</Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Home;
