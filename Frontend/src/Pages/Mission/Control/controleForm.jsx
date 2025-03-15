import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchObjectById } from '../../../Redux/Actions/object.actions'
import NewControleLoi2409Local from './newControleLoi2409Local';
import NewControleLoi2409Importation from './newControleLoi2409Importation';
import NewControleLoi3108 from './newControleLoi3108'
import NewControleLoi7715 from './newControleLoi7715';
import NewControleLoi7715Entreprise from './newControleLoi7715Entreprise';
import NewControleLoi7715PointVente from './NewControleLoi7715PointVente';

export const ControleForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const missionID = location.state?.id;
  const objectId = location.state?.objectId;

  const [selectedcontrole7715Type, setSelectedcontrole7715Type] = useState(null);


  // Sélection des données depuis Redux
  const { data: object, loading, error } = useSelector((state) => state.object);

  useEffect(() => {
    if (objectId) {
      dispatch(fetchObjectById(objectId)); // Appel au backend
    }
  }, [dispatch, objectId]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  if (!object[0]) return <p>Aucun objet trouvé.</p>;

  const handleNewControleCompany = () => {
    setSelectedcontrole7715Type("Entreprise");
  };

  const handleNewControlePointVente = () => {
    setSelectedcontrole7715Type("PointVente");
  };

  // Déterminer quel composant afficher
  const renderControlComponent = () => {
    switch (object[0].Object_type.toUpperCase()) {
      case "CONTROLE_LOI_3108":
        return <NewControleLoi3108 missionID={missionID} />;
      case "CONTROLE_LOI_2409_LOCAL":
        return <NewControleLoi2409Local missionID={missionID} />;
      case "CONTROLE_LOI_2409_IMPORTATION":
        return <NewControleLoi2409Importation missionID={missionID} />;
      case "CONTROLE_LOI_7715":
        if (selectedcontrole7715Type === "Entreprise") {
          return <NewControleLoi7715Entreprise missionID={missionID} />;
        } else if (selectedcontrole7715Type === "PointVente") {
          return <NewControleLoi7715PointVente missionID={missionID} />;
        } else {
          return (<NewControleLoi7715
            newEntrepriseControle={handleNewControleCompany}
            newPointVenteControle={handleNewControlePointVente} />);
        }
      default:
        return <p>Type de contrôle inconnu.</p>;
    }
  };

  return <div>{renderControlComponent()}</div>;
}


export default ControleForm
