import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ProjectCard.scss";

export default function ProjectCard(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/project/" + props.id);
  };

  const [datas, setData] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5129/Users")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!datas) {
    return null; // Retourner null ou un indicateur de chargement si les données ne sont pas encore disponibles
  }

  return (
    <div className="project-card" onClick={() => handleClick()}>
      <img className="project-image" src={"../../../MySqlDotNetCoreBackend/public/" + props.url} />
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <div className="row">
        {datas.map((user, userIndex) => {
          return user.projects.split(",").map((project) => {
            if ((project == props.id) && userIndex < 8) {
              return (
                <img
                  key={userIndex}
                  src={"../../../MySqlDotNetCoreBackend/public/" + user.url}
                  alt={user.firstname}
                  style={{right: userIndex * 20 + 'px'}}
                />
              );
            }
            return null
          });
        })}
      </div>
    </div>
  );
}
