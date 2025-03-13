import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchObjectById } from '../../../Redux/Actions/object.actions'
import NewControleLoi2409Local from './newControleLoi2409Local';
import NewControleLoi2409Importation from './newControleLoi2409Importation';
import NewControleLoi3108 from './newControleLoi3108'
export const ControleForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const missionID = location.state?.id;
  const objectId = location.state?.objectId;

  // const [objectData, setObjectData] = useState(null);

  // Sélection des données depuis Redux
  const { data: object, loading, error } = useSelector((state) => state.object);

  useEffect(() => {
    if (objectId) {
      dispatch(fetchObjectById(objectId)); // Appel au backend
    }
  }, [dispatch, objectId]);

  // useEffect(() => {
  //   console.log("Object reçu dans le composant:", object[0]);
  //   console.log("Object reçu dans le composant:", object[0]);
  //   console.log("OBJECT TYPE:==============>", object[0].Object_type.toUpperCase());


  //   if (object && object.success && object.object) {
  //     setObjectData(object[0]); // Accéder au premier élément du tableau object

  //   }
  // }, [object]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  if (!object[0]) return <p>Aucun objet trouvé.</p>;


  // Déterminer quel composant afficher
  const renderControlComponent = () => {
    switch (object[0].Object_type.toUpperCase()) {
      case "CONTROLE_LOI_3108":
        return <NewControleLoi3108 missionID={missionID} />;
      case "CONTROLE_LOI_2409_LOCAL":
        return <NewControleLoi2409Local missionID={missionID} />;
      case "CONTROLE_LOI_2409_IMPORTATION":
        return <NewControleLoi2409Importation missionID={missionID} />;
      default:
        return <p>Type de contrôle inconnu.</p>;
    }
  };

  return <div>{renderControlComponent()}</div>;
}


export default ControleForm
