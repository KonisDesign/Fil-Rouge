import "./CollabsDetails.scss";

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

  return (
    <>
      {props.infos.map((info, index) => (
        <div
          key={info.name}
          id={index}
          /* onClick={() => classChanged(index)} */
          className={`collab-details-container `} //${props.selectedIds.includes(index) ? 'change-color' : ''}
        >
          <div className="collab-picture">
            <img src={info.imageUrl} alt="profile picture" />
          </div>
          <div className="infos">
            <div className="collab-status">
              <h2>
                {info.name.toUpperCase()} {info.firstname}
              </h2>
              <h4>{info.job}</h4>
            </div>
            <div className="collab-projects">
              <h5>Travaille sur :</h5>
              <div className="collab-projects-list">
                {info.projects.map((project) => (
                  <h6 key={project}>{project}</h6>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
