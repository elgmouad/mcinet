import { connectSQL } from "../database/connectDB.js"

export const getNbMission = async (connect) => {
    try {
        // const connect = await connectSQL();
        const query = `
            SELECT count(*) AS nombre_missions 
            FROM defaultdb.mission;
        `;
        const [result] = await connect.query(query);
        return result[0].nombre_missions; // Retour
        // ne directement le nombre de missions
    } catch (error) {
        throw error;
    }
};

export const getNbControl = async (connect) => {
    try {
        // const connect = await connectSQL();
        const query = `
            SELECT count(*) AS nombre_controles 
            FROM defaultdb.controle;
        `;
        const [result] = await connect.query(query);
        return result[0].nombre_controles; // Retourne directement le nombre de contrôles
    } catch (error) {
        throw error;
    }
};

export const getNbrMissionByMonth = async (connect) => {
    try {
        // const connect = await connectSQL();
        const query = `
            SELECT 
                YEAR(departure_date) AS year, 
                MONTH(departure_date) AS month, 
                COUNT(*) AS missions_count
            FROM mission
            GROUP BY YEAR(departure_date), MONTH(departure_date)
            ORDER BY year DESC, month DESC;
        `;
        const [result] = await connect.query(query);
        return result; // Retourne directement les résultats
    } catch (error) {
        throw error;
    }
};

export const getNbrNonConformeByPratique = async (connect) => {
    try {
        // const connect = await connectSQL();
        const query = `
            SELECT 
                COUNT(CASE WHEN affichage_prix = 'non-conforme' THEN 1 END) AS affichage_prix_non_conforme,
                COUNT(CASE WHEN solde = 'non-conforme' THEN 1 END) AS solde_non_conforme,
                COUNT(CASE WHEN publicite = 'non-conforme' THEN 1 END) AS publicité_non_conforme,
                COUNT(CASE WHEN tickets_caisses = 'non-conforme' THEN 1 END) AS NBR_tickets_caisses_non_conforme,
                COUNT(CASE WHEN vente_avec_prime = 'non-conforme' THEN 1 END) AS NBr_vente_avec_prime_non_conforme
            FROM controle;
        `;
        const [result] = await connect.query(query);
        return result[0]; // Retourne directement les résultats
    } catch (error) {
        throw error;
    }
};

export const fetchStatisticsByRole = async (req, res) => {
    const { role } = req.query;
    const pool = await connectSQL(); // Obtenir le pool
    const connection = await pool.getConnection(); // Obtenir une connexion

    try {
        if (role === 'DIRECTEUR') {
            const missions = await getNbMission(connection);
            const controls = await getNbControl(connection);
            const missionsByMonth = await getNbrMissionByMonth(connection);
            const nonConformes = await getNbrNonConformeByPratique(connection);

            console.log("Données pour DIRECTEUR:");
            console.log("Missions:", missions);
            console.log("Controls:", controls);
            console.log("Missions par mois:", missionsByMonth);
            console.log("Non conformes:", nonConformes);

            res.status(200).json({
                success: true,
                message: 'Statistiques récupérées avec succès pour le directeur',
                data: {
                    missions,
                    controls,
                    missionsByMonth,
                    nonConformes,
                },
            });
        } else if (role === 'CADRE') {
            const missionsByMonth = await getNbrMissionByMonth(connection);

            console.log("Données pour CONTROLEUR:");
            console.log("Missions par mois:", missionsByMonth);

            res.status(200).json({
                success: true,
                message: 'Statistiques récupérées avec succès pour le contrôleur',
                data: {
                    missionsByMonth,
                },
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Rôle invalide',
            });
        }
    } catch (error) {
        console.error("Erreur dans fetchStatisticsByRole:", error);
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur',
        });
    }finally {
        connection.release(); // Toujours libérer la connexion
      }
};