import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import "./ProjectsList.scss";
import ProjectCard from "../project-card/ProjectCard";

export default function ProjectsList(props) {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.Id;

  const [isFirstEffectDone, setIsFirstEffectDone] = useState(false);

  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5129/Users/" + userId)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setIsFirstEffectDone(true);
      });
  });

  const [datas, setData] = useState(null);
  useEffect(() => {
    if (isFirstEffectDone) { // only run this effect when the first effect is done
      try {
        fetch("http://localhost:5129/Projects")
        .then((response) => response.json())
        .then((data) => {
          setData(Object.values(data));
        })
        .catch((error) => {
          console.log(error);
        });
      } catch {
        console.log('non')
      }
    }
  }, [isFirstEffectDone]);

  if (!datas && !props.user) {
    return null; // Retourner null ou un indicateur de chargement si les données ne sont pas encore disponibles
  }


  return datas ? (
    <div className="projects-container">
      {datas.map((data) => {
        if (
          user.role === "admin" ||
          user.projects.split(",").includes(data.id.toString())
        ) {
          return (
            <ProjectCard
              key={data.id}
              id={data.id}
              title={data.title}
              description={data.description}
              url={data.url}
            />
          );
        }
        return null;
      })}
    </div>
  ) : (
    <div>Impossible de recup</div>
  );
}
