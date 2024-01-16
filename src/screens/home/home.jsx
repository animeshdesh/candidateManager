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
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import "./home.css";
import { useNavigate, useParams } from "react-router-dom";
import ReusableInput from "../../components/InputTag.jsx";

const Home = ({ allUsers, fromActive }) => {
  const { id } = useParams();

  //   const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editable, setEditable] = useState(true);
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
                  sx={{
                    paddingLeft: "20px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  Personal Details:
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "20px",
                    margin: "10px",
                    border: "1px solid black",
                    borderRadius: "10px",
                  }}
                >
                  <Box sx={{ width: "70%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                      }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={1.5}>
                          <Typography variant="h5" style={{ display: "flex" }}>
                            Name:
                          </Typography>
                        </Grid>
                        <Grid item xs={10.5}>
                          <ReusableInput
                            value={selectedUser.name}
                            disabled={editable}
                          />
                        </Grid>
                        <Grid item xs={1.5}>
                          <Typography variant="h5" style={{ display: "flex" }}>
                            Email:
                          </Typography>
                        </Grid>
                        <Grid item xs={10.5}>
                          <ReusableInput
                            value={selectedUser.email}
                            disabled={editable}
                          />
                        </Grid>
                        <Grid item xs={1.5}>
                          <Typography variant="h5" style={{ display: "flex" }}>
                            Gender:
                          </Typography>
                        </Grid>
                        <Grid item xs={10.5}>
                          <ReusableInput
                            value={selectedUser.gender}
                            disabled={editable}
                          />
                        </Grid>
                        <Grid item xs={1.5}>
                          <Typography variant="h5" style={{ display: "flex" }}>
                            Hobbies:
                          </Typography>
                        </Grid>
                        <Grid item xs={10.5}>
                          <ReusableInput
                            value={selectedUser.hobbies}
                            disabled={editable}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                  <Box sx={{ width: "30%", height: "150px" }}>
                    <img
                      src={selectedUser.profile_picture}
                      alt={selectedUser.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        borderRadius: "10px",
                        paddingLeft: "20px",
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
                    margin: "10px",
                    border: "1px solid black",
                    borderRadius: "10px",
                  }}
                >
                  <Grid
                    container
                    spacing={3}
                    sx={{
                      padding: "20px",
                    }}
                  >
                    {selectedUser?.education?.map((edu, index) => (
                      <Grid item key={index} xs={12} md={6} lg={4}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography variant="h5">
                            Name of Institute:
                          </Typography>
                          <ReusableInput
                            value={edu.institute}
                            disabled={editable}
                          />
                        </div>
                        <div style={{ marginTop: "10px" }}>
                          <Typography variant="h5">
                            Year of Graduation:
                          </Typography>
                          <ReusableInput
                            value={edu.pass_out_year}
                            disabled={editable}
                          />
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                <Typography variant="h4" sx={{ paddingLeft: "20px" }}>
                  Skills:
                </Typography>
                <Box
                  sx={{
                    padding: "20px",
                    margin: "10px",
                    border: "1px solid black",
                    borderRadius: "10px",
                  }}
                >
                  <Grid
                    container
                    spacing={3}
                    sx={{
                      padding: "20px",
                    }}
                  >
                    {selectedUser?.skills?.map((skill, index) => (
                      <Grid item key={index} xs={12} md={6} lg={4}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography variant="h5">Skill :</Typography>
                          <ReusableInput
                            value={skill?.skill}
                            disabled={editable}
                          />

                          <Typography variant="h5">
                            Year of Graduation :
                          </Typography>
                          <ReusableInput
                            value={skill?.experience}
                            disabled={editable}
                          />
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                <Typography variant="h4" sx={{ paddingLeft: "20px" }}>
                  Experience:
                </Typography>
                <Box
                  sx={{
                    padding: "20px",
                    margin: "10px",
                    border: "1px solid black",
                    borderRadius: "10px",
                  }}
                >
                  <Grid
                    container
                    spacing={3}
                    sx={{
                      padding: "20px",
                    }}
                  >
                    {selectedUser?.experience?.map((exp, index) => (
                      <Grid item key={index} xs={12} md={6} lg={4}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography variant="h5">Skill :</Typography>
                          <ReusableInput
                            value={exp?.company}
                            disabled={editable}
                          />

                          <Typography variant="h5">Project :</Typography>
                          <ReusableInput
                            value={exp?.project}
                            disabled={editable}
                          />

                          <Typography variant="h5">Role : </Typography>
                          <ReusableInput
                            value={exp?.role}
                            disabled={editable}
                          />

                          <Typography variant="h5">Duration from :</Typography>
                          <ReusableInput
                            value={exp?.duration_from}
                            disabled={editable}
                          />
                        </div>
                      </Grid>
                    ))}
                  </Grid>
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
