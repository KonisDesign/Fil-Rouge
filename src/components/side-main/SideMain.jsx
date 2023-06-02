import jwtDecode from "jwt-decode";
import "./SideMain.scss";
import { useEffect, useState } from "react";

export default function SideMain() {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.Id;

  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5129/Users/" + userId)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  });

  if (!user) {
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
        <div className="notif normal">
          <p>La tâche "Elementor" du projet "Wordpress" est terminée.</p>
        </div>
        <div className="notif normal">
          <p>La tâche "Elementor" du projet "Wordpress" est terminée.</p>
        </div>
        <div className="notif important">
          <p>La tâche "Elementor" du projet "Wordpress" est terminée.</p>
        </div>
        <div className="notif other">
          <p>La tâche "Elementor" du projet "Wordpress" est terminée.</p>
        </div>
      </div>
      <footer>
        <p>&copy; Designed by Romain & Julien</p>
      </footer>
    </div>
  );
}
