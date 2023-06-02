import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { CSSTransition } from "react-transition-group";
import "./Dashboard.scss";
import SideMain from "../../components/side-main/SideMain";
import Header from "../../components/header/Header";
import CreateButton from "../../components/create-button/CreateButton";
import ProjectsList from "../../components/projects-list/ProjectsList";
import ListCollabs from "../../components/list-collabs/ListCollabs";

export default function Dashboard() {
  const [displayComponentProject, setDisplayComponentProject] = useState(true);

  const toggleComposant = (boolean) => {
    setDisplayComponentProject(boolean);
  };
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.Id;
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");
  useEffect(() => {
    fetch("http://localhost:5129/Users/" + userId)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setRole(data.role);
      });
  }, [userId]);

  return (
    <div className="dashboard">
      <SideMain />
      <Header />
      {role === "admin" ? <CreateButton /> : ""}
      <div className="tab-main">
        <div className="tab-projects">
          <button className="tab-button" onClick={() => toggleComposant(true)}>
            Projets
          </button>
          <span className={displayComponentProject ? "isActive" : ""}></span>
        </div>
        <div className="tab-collabs">
          <button className="tab-button" onClick={() => toggleComposant(false)}>
            Collaborateurs
          </button>
          <span className={!displayComponentProject ? "isActive" : ""}></span>
        </div>
      </div>
      <CSSTransition
        in={displayComponentProject}
        timeout={1000}
        classNames="projects"
      >
        <ProjectsList user={user}/>
      </CSSTransition>
      <CSSTransition
        in={!displayComponentProject}
        timeout={1000}
        classNames="collabs"
      >
        <ListCollabs />
      </CSSTransition>
    </div>
  );
}
