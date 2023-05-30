import "./CollabsDetails.scss";
import Picture from '../../assets/profile.webp'

export default function CollabsDetails(props) {

    /* const classChanged = (id) => {
      if (props.canAddClass) {
        if (props.selectedIds.includes(id)) {
            props.setSelectedIds(props.selectedIds.filter(selectedId => selectedId !== id));
        } else {
            props.setSelectedIds([...props.selectedIds, id]);
        }
      }
    } */
console.log(props.data)

//parcourir data.projects, et à chaque virgule, on ajoute dans un tableau   ----    faire aussi le mdp

if (!props.data) {
  return null; // Retourner null ou un indicateur de chargement si les données ne sont pas encore disponibles
}

const dataArray = Object.values(props.data);
  return dataArray ? (
    <>
      {dataArray.map((data, index) => (
        <div
          key={data.id}
          id={index}
          /* onClick={() => classChanged(index)} */
          className={`collab-details-container `} //${props.selectedIds.includes(index) ? 'change-color' : ''}
        >
          <div className="collab-picture">
            <img src={Picture} alt="profile picture" />
          </div>
          <div className="infos">
            <div className="collab-status">
              <h2>
                {data.lastname.toUpperCase()} {data.firstname}
              </h2>
              <h4>{data.job}</h4>
            </div>
            <div className="collab-projects">
              <h5>Travaille sur :</h5>
              <div className="collab-projects-list">
                {data.projects}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
  :
  (
    <div>Impossible de recup</div>
  )
}
