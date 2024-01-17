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

const Home = ({ fromActive, name }) => {
  const { id } = useParams();

  //   const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editable, setEditable] = useState(true);
  const [editedUser, setEditedUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  const navigate = useNavigate();

  const getAllUsers = async () => {
    const response = await getAllCandidates();
    setAllUsers(response);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    navigate(`/candidate/${user.id}`);
  };

  const handleTextChange = (type, value, index, nestedType) => {
    if (
      nestedType === "education" ||
      nestedType === "skills" ||
      nestedType === "experience"
    ) {
      setSelectedUser({
        ...selectedUser,
        [nestedType]: selectedUser[nestedType].map((item, i) => {
          if (i === index) {
            return {
              ...item,
              [type]: value,
            };
          }
          return item;
        }),
      });
    } else {
      setSelectedUser({
        ...selectedUser,
        [type]: value,
      });
    }
  };

  const handelSavingData = async () => {
    if (fromActive) {
      const response = await createCandidate(selectedUser);
      if (response) {
        const updatedUsers = await getAllCandidates();
        setAllUsers(updatedUsers);
        setSelectedUser(response);
        navigate(`/candidate/${response.id}`);
      }
    } else {
      const response = await updateCandidate(id, selectedUser);
      if (response) {
        const updatedUsers = await getAllCandidates();
        setAllUsers(updatedUsers);
        setSelectedUser(response);
      }
    }
  };
  const handelDeleteUser = async () => {
    const response = await deleteCandidate(selectedUser.id);
    if (response) {
      console.log("Deleted Successfully");
      const updatedUsers = await getAllCandidates();
      setAllUsers(updatedUsers);
      setSelectedUser(null);
    }
  };
  const handleAddSkill = () => {
    const newSkill = {
      name: "",
      experience: 0,
    };

    setSelectedUser((prevUser) => ({
      ...prevUser,
      skills: [...prevUser.skills, newSkill],
    }));
  };
  const handleAddEducation = () => {
    const newEducation = {
      institute: "",
      degree: "",
      percentage: 0,
      pass_out_year: "",
    };

    setSelectedUser((prevUser) => ({
      ...prevUser,
      education: [...prevUser.education, newEducation],
    }));
  };
  useEffect(() => {
    if (id) {
      const userWithId = allUsers.find((user) => user.id === id);
      if (userWithId) {
        setSelectedUser(userWithId);
        console.log(userWithId);
      } else {
        console.warn(`User with id ${id} not found`);
      }
    }
    if (fromActive) {
      const lastUserId =
        allUsers.length > 0 ? allUsers[allUsers.length - 1].id : 0;
      const newUserId = lastUserId + 1;
      setSelectedUser({
        profile_picture: "",
        name: "",
        address: "",
        phone: "",
        email: "",
        gender: "",
        hobbies: [],
        education: [
          {
            institute: "",
            degree: "",
            percentage: 0,
            pass_out_year: "",
          },
        ],
        skills: [
          {
            name: "",
            experience: 0,
          },
        ],
        experience: [
          {
            company: "",
            project: "",
            role: "",
            team_size: 0,
            duration_from: "",
            duration_to: "",
          },
        ],
        id: `${newUserId}`, // Set to an empty string for new candidates
        company: "",
      });
      setEditable(false);
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
          justifyContent: "space-between",
          paddingLeft: "15px",
          color: "white",
          alignItems: "center",
          fontSize: "40px",
        }}
      >
        Candidate Manager
        {name ? `${name}` : ""}
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
          {!selectedUser && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Typography>Select the candidate</Typography>
            </Box>
          )}
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
                  justifyContent: "space-between",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                  alignItems: "center",
                  fontSize: "20px",
                }}
              >
                <Typography sx={{ fontSize: "20px" }}>
                  Selected Candidate{" "}
                </Typography>
                <div style={{ display: "flex", gap: "25px" }}>
                  {!editable && (
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#141E46" }}
                      onClick={() => {
                        handelSavingData();
                        setEditable(true);
                      }}
                    >
                      Save
                    </Button>
                  )}
                  {editable && (
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#141E46" }}
                      onClick={() => setEditable(false)}
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#141E46" }}
                    onClick={() => handelDeleteUser()}
                  >
                    Delete
                  </Button>
                </div>
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
                            onChange={(value) =>
                              handleTextChange("name", value)
                            }
                            type="name"
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
                            onChange={(value) =>
                              handleTextChange("email", value)
                            }
                            type="email"
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
                            onChange={(value) =>
                              handleTextChange("gender", value)
                            }
                            type="gender"
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
                            onChange={(value) =>
                              handleTextChange("hobbies", value)
                            }
                            type="hobbies"
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
                            onChange={(value) =>
                              handleTextChange(
                                "institute",
                                value,
                                index,
                                "education"
                              )
                            }
                            type="institute"
                          />
                        </div>
                        <div style={{ marginTop: "10px" }}>
                          <Typography variant="h5">
                            Year of graduation:
                          </Typography>
                          <ReusableInput
                            value={edu.pass_out_year}
                            disabled={editable}
                            onChange={(value) =>
                              handleTextChange(
                                "pass_out_year",
                                value,
                                index,
                                "education"
                              )
                            }
                            type="pass_out_year"
                          />
                        </div>
                      </Grid>
                    ))}
                    {!editable && selectedUser?.education?.length < 10 && (
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#141E46",
                          height: "35px",
                          margin: "35px",
                        }}
                        onClick={handleAddEducation}
                      >
                        Add Education
                      </Button>
                    )}
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
                            onChange={(value) =>
                              handleTextChange("skill", value, index, "skills")
                            }
                            type="skill"
                          />

                          <Typography variant="h5">
                            Year of Graduation :
                          </Typography>
                          <ReusableInput
                            value={skill?.experience}
                            disabled={editable}
                            onChange={(value) =>
                              handleTextChange(
                                "experience",
                                value,
                                index,
                                "skills"
                              )
                            }
                            type="experience"
                          />
                        </div>
                      </Grid>
                    ))}
                    {!editable && selectedUser?.skills?.length < 10 && (
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#141E46",
                          height: "35px",
                          margin: "35px",
                        }}
                        onClick={handleAddSkill}
                      >
                        Add Skill
                      </Button>
                    )}
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
                          <Typography variant="h5">Company :</Typography>
                          <ReusableInput
                            value={exp?.company}
                            disabled={editable}
                            onChange={(value) =>
                              handleTextChange(
                                "company",
                                value,
                                index,
                                "experience"
                              )
                            }
                            type="company"
                          />

                          <Typography variant="h5">Project :</Typography>
                          <ReusableInput
                            value={exp?.project}
                            disabled={editable}
                            onChange={(value) =>
                              handleTextChange(
                                "project",
                                value,
                                index,
                                "experience"
                              )
                            }
                            type="project"
                          />

                          <Typography variant="h5">Role : </Typography>
                          <ReusableInput
                            value={exp?.role}
                            disabled={editable}
                            onChange={(value) =>
                              handleTextChange(
                                "role",
                                value,
                                index,
                                "experience"
                              )
                            }
                            type="role"
                          />

                          <Typography variant="h5">Duration from :</Typography>
                          <ReusableInput
                            value={exp?.duration_from}
                            disabled={editable}
                            onChange={(value) =>
                              handleTextChange(
                                "duration_from",
                                value,
                                index,
                                "experience"
                              )
                            }
                            type="duration_from"
                          />
                        </div>
                      </Grid>
                    ))}
                    {!editable && selectedUser?.experience?.length < 10 && (
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#141E46",
                          height: "35px",
                          margin: "35px",
                        }}
                        onClick={handleAddSkill}
                      >
                        Add Experience
                      </Button>
                    )}
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
