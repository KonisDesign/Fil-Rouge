import { useEffect, useState } from "react";
import "./ProjectsList.scss";
import ProjectCard from "../project-card/ProjectCard";

export default function ProjectsList() {
  const [datas, setData] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5129/Projects")
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

  const dataArray = Object.values(datas);

  return dataArray ? (
    <div className="projects-container">
      {datas.map((data) => (
        <ProjectCard key={data.id} id={data.id} title={data.title} description={data.description} url={data.url}/>
      ))}
    </div>
  )
  : (<div>Impossible de recup</div>)
}
