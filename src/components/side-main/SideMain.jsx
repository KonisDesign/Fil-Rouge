import jwtDecode from "jwt-decode";
import "./SideMain.scss";
import { useEffect, useState } from "react";

export default function SideMain() {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.Id;

  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`http://localhost:5129/Users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }
    fetchUser();
  }, [userId]);

  const [projects, setProjects] = useState(null);
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("http://localhost:5129/Projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    }
    fetchProjects();
  }, []);

  if (!user || !projects) {
    return null; // Retourner null ou un indicateur de chargement si les données ne sont pas encore disponibles
  }

  return (
    <div className="side-main">
      <img
        className="profile-pic"
        src={"../../../MySqlDotNetCoreBackend/public/" + user.url}
        alt="profile"
      />
      <h2>Bonjour {user.firstname}</h2>
      <div className="notifs-container">
        <h4>Dernières notifications</h4>
        {projects &&
          projects.map((project) => (
            project.notifications === "" || project.notifications === 'Aucune notification' ? null : (
              <div key={project.id} className="notif">
                <p>{project.notifications}</p>
              </div>
            )
          ))}
      </div>
      <footer>
        <p>&copy; Designed by Romain & Julien</p>
      </footer>
    </div>
  );
}
