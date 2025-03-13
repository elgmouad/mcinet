import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { fetchStatistics } from '../../Redux/Actions/statistics.actions';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Statisctic() {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const { data, loading, error } = useSelector((state) => state.statistics);

  console.log("Rôle de l'utilisateur:", role);
  console.log("Données statistiques:", data);
  console.log("État de chargement:", loading);
  console.log("Erreur:", error);

  useEffect(() => {
    dispatch(fetchStatistics(role));
  }, [dispatch, role]);

  if (loading) {
    return <div className="p-4">Chargement des statistiques...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Erreur : {error}</div>;
  }

  // Données pour les missions par mois
  const missionsByMonthData = {
    labels: data?.missionsByMonth?.map((item) => `${item.year}-${item.month}`) || [],
    datasets: [
      {
        label: 'Missions par mois',
        data: data?.missionsByMonth?.map((item) => item.missions_count) || [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Données pour les contrôles non conformes
  const nonConformesData = {
    labels: ['Affichage Prix', 'Solde', 'Publicité', 'Tickets Caisses', 'Vente avec Prime'],
    datasets: [
      {
        label: 'Contrôles non conformes',
        data: [
          data?.nonConformes?.affichage_prix_non_conforme || 0,
          data?.nonConformes?.solde_non_conforme || 0,
          data?.nonConformes?.publicité_non_conforme || 0,
          data?.nonConformes?.NBR_tickets_caisses_non_conforme || 0,
          data?.nonConformes?.NBr_vente_avec_prime_non_conforme || 0,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
      },
    ],
  };

  // Données pour les contrôles totaux
  const controlsData = {
    labels: ['Contrôles Totaux'],
    datasets: [
      {
        label: 'Nombre de contrôles',
        data: [data?.controls || 0],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Données pour les contrôles conformes vs non conformes
  const controlsComplianceData = {
    labels: ['Conformes', 'Non Conformes'],
    datasets: [
      {
        label: 'Contrôles',
        data: [
          data?.controls - data?.nonConformes?.total_non_conformes || 0, // Contrôles conformes
          data?.nonConformes?.total_non_conformes || 0, // Contrôles non conformes
        ],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord des statistiques</h1>

      {role === 'DIRECTEUR' && data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold mb-2">Missions par mois</h2>
            <Bar data={missionsByMonthData} />
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold mb-2">Contrôles non conformes</h2>
            <Pie data={nonConformesData} />
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold mb-2">Contrôles totaux</h2>
            <Bar data={controlsData} />
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold mb-2">Contrôles conformes vs non conformes</h2>
            <Pie data={controlsComplianceData} />
          </div>
        </div>
      )}

      {role === 'CADRE' && data && (
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold mb-2">Missions du contrôleur</h2>
          <Bar data={missionsByMonthData} />
        </div>
      )}
    </div>
  );
}

export default Statisctic;