import { useEffect, useState } from "react";
import "./ListCollabs.scss";
import CollabsDetails from "../collabs-details/CollabsDetails";

export default function ListCollabs() {
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
  return (
    <div className={`collabs-container`}>
      <CollabsDetails data={datas}></CollabsDetails>
    </div>
  );
}
