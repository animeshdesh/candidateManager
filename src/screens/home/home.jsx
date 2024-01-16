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
import { useNavigate, useParams } from "react-router-dom";

const Home = ({ allUsers, fromActive }) => {
  const { id } = useParams();

  //   const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const handleUserClick = (user) => {
    setSelectedUser(user);
    navigate(`/candidate/${user.id}`);
  };
  useEffect(() => {
    if (id) {
      const userWithId = allUsers.find((user) => user.id === id);

      if (userWithId) {
        setSelectedUser(userWithId);
      } else {
        console.warn(`User with id ${id} not found`);
      }
    }
  }, [id, allUsers]);

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
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                    },
                  }}
                  onClick={() => handleUserClick(user)}
                >
                  <ListItemText primary={user.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
        <Box
          className="custom-scrollbar"
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
                <Typography
                  variant="h4"
                  sx={{ paddingLeft: "20px", marginTop: "10px" }}
                >
                  Personal Details:
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "20px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
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
                <Typography variant="h4" sx={{ paddingLeft: "20px" }}>
                  Education:
                </Typography>

                <Box
                  sx={{
                    padding: "20px",
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {selectedUser?.education?.map((edu, index) => (
                    <div key={index}>
                      <div>
                        <Typography variant="h5">
                          Name of Institude : {edu.institute}
                        </Typography>
                        <Typography variant="h5">
                          Year of Graduation : {edu.pass_out_year}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </Box>
                <Typography variant="h4" sx={{ paddingLeft: "20px" }}>
                  Skills:
                </Typography>

                <Box
                  sx={{
                    padding: "20px",
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {selectedUser?.skills?.map((skill, index) => (
                    <div key={index}>
                      <div>
                        <Typography variant="h5">
                          Skill : {skill?.skill}
                        </Typography>
                        <Typography variant="h5">
                          Year of Graduation : {skill?.experience}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </Box>
                <Typography variant="h4" sx={{ paddingLeft: "20px" }}>
                  Experience:
                </Typography>

                <Box
                  sx={{
                    padding: "20px",
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {selectedUser?.experience?.map((exp, index) => (
                    <div key={index}>
                      <div>
                        <Typography variant="h5">
                          Skill : {exp?.company}
                        </Typography>
                        <Typography variant="h5">
                          Project : {exp?.project}
                        </Typography>
                        <Typography variant="h5">Role : {exp?.role}</Typography>
                        <Typography variant="h5">
                          Duration from : {exp?.duration_from}
                        </Typography>
                      </div>
                    </div>
                  ))}
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
