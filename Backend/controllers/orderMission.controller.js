import { connectSQL } from "../database/connectDB.js"


export const getOrderMission = async (req, res) => {
    const { role, userid } = req.body
    console.log("Role Send to backend: ", role)
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    try {
        // const connect = await connectSQL();

        const queryForAll = `
            SELECT 
                m.*,
                c.cadre_id,
                c.delegation,
                c.p_matricule AS carPlate,
                u.nom AS cadre_nom,
                u.prenom AS cadre_prenom,
                g.grade_name,
                d.Destination,
                o.Object_type
            FROM mission m
            JOIN mission_cadre mc ON m.mission_id = mc.mission_id
            JOIN cadre c ON mc.cadre_id = c.cadre_id
            JOIN Utilisateur u ON c.id_utilisateur = u.id_utilisateur
            JOIN grade g ON c.grade_id = g.grade_id
            JOIN Destination d ON m.Id_des = d.id_des
            JOIN Object o ON m.Id_object = o.Id_object
            ;
        `;

        const queryForCadre = `
                        SELECT 
                            m.*,
                            c.cadre_id,
                            c.delegation,
                            c.p_matricule AS carPlate,
                            u.nom AS cadre_nom,
                            u.prenom AS cadre_prenom,
                            g.grade_name,
                            d.Destination,
                            o.Object_type
                        FROM mission m
                        JOIN mission_cadre mc ON m.mission_id = mc.mission_id
                        JOIN cadre c ON mc.cadre_id = c.cadre_id
                        JOIN Utilisateur u ON c.id_utilisateur = u.id_utilisateur
                        JOIN grade g ON c.grade_id = g.grade_id
                        JOIN Destination d ON m.Id_des = d.id_des
                        JOIN Object o ON m.Id_object = o.Id_object
                        WHERE m.status = 'En Cours' AND u.id_utilisateur = ?;`

        if (role === 'CADRE') {
            const [missions] = await connect.query(queryForCadre, [userid])

            res.status(200).json({
                success: true,
                message: 'Missions fetched successfully',
                missions: missions
            })
        } else {
            const [missions] = await connect.query(queryForAll)

            res.status(200).json({
                success: true,
                message: 'Missions fetched successfully',
                missions: missions
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching missions data',
            error: error.message
        })
    } finally {
        connect.release(); // Toujours libérer la connexion
    }
}

export const getServiceCars = async (req, res) => {
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    try {
        // const connect = await connectSQL();
        const [cars] = await connect.query('SELECT * FROM `service_vehicle`')
        console.log(cars)

        res.status(200).json(
            cars
        )
    } catch (error) {

        res.status(500).json({
            success: false,
            massage: 'internal server error'
        })
    } finally {
        connect.release(); // Toujours libérer la connexion
    }
}

export const getObjectOptions = async (req, res) => {
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    try {
        // const connect = await connectSQL();
        const query = 'SELECT * FROM Object';
        const [objects] = await connect.query(query);
        console.log(objects)

        res.status(200).json({
            success: true,
            objects: objects
        })
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        connect.release(); // Toujours libérer la connexion
    }
}

export const getObjectTypesOptions = async (req, res) => {
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    // let connect;
    try {
        // Établir la connexion à la base de données
        // connect = await connectSQL();

        // Récupérer et valider l'ID de l'objet
        const { objectId } = req.params;
        if (!objectId || isNaN(objectId)) {
            return res.status(400).json({ error: 'Invalid objectId' });
        }

        // Requête SQL pour récupérer les types de contrôle
        const query = 'SELECT * FROM Type_Objet WHERE object_id = ?';
        const [controleTypes] = await connect.query(query, [objectId]);

        // Gestion des résultats vides
        if (controleTypes.length === 0) {
            return res.status(404).json({ error: 'No control types found for this object' });
        }

        // Réponse JSON avec les types de contrôle
        res.status(200).json({
            success: true,
            controleTypes: controleTypes
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        connect.release(); // Toujours libérer la connexion
    }
};


export const getDestinations = async (req, res) => {
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    try {
        // const connect = await connectSQL();
        const query = 'SELECT * FROM Destination';
        const [destinations] = await connect.query(query);
        console.log("Dest. endpoint: ", destinations)

        res.status(200).json({
            success: true,
            destinations: destinations
        })
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Error fetching destinations' });
    } finally {
        connect.release(); // Toujours libérer la connexion
    }
}

export const getCadre = async (req, res) => {
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    try {
        // const connect = await connectSQL();


        const [cadres] = await connect.query(`SELECT * FROM cadre ;`)
        console.log(cadres)

        return res.status(200).json({
            success: true,
            message: 'Cadres fetched successfully',
            cadres: cadres
        })
    } catch (error) {
        console.log('Error fetching cadres: ', error);
        return res.status(500).json({
            success: false,
            message: 'No cadre found!!'
        })
    } finally {
        connect.release(); // Toujours libérer la connexion
    }
}
export const searchCadre = async (req, res) => {
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    try {
        // const connect = await connectSQL();
        const { name } = req.body;


        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Cadre name required'
            })
        }
        const [cadres] = await connect.query(`
            SELECT c.*, u.nom, u.prenom , g.grade_name 
            FROM cadre c
            INNER JOIN Utilisateur u ON c.id_utilisateur = u.id_utilisateur
            INNER JOIN grade g ON c.grade_id = g.grade_id
            WHERE u.nom LIKE ? OR u.prenom LIKE ? ;
            `, [`%${name}%`, `%${name}%`])
        console.log(cadres)


        if (cadres.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No cadre found!!'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Cadres fetched successfully',
            cadres: cadres
        })
    } catch (error) {
        console.log('Error fetching cadres: ', error);
        return res.status(500).json({
            success: false,
            message: 'No cadre found!!'
        })
    } finally {
        connect.release(); // Toujours libérer la connexion
    }
}


export const createOrderMission = async (req, res) => {
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion

    try {
        // const connect = await connectSQL();

        const {
            cadreId,
            destinationId,
            objectId,
            depDate,
            depHour,
            arrHour,
            durationDays,
            plateNumber,
            companion
        } = req.body
        if (
            !cadreId ||
            !destinationId ||
            !objectId ||
            !depDate ||
            !durationDays
        ) {
            console.log(
                cadreId,
                destinationId,
                objectId,
                depDate,
                durationDays
            )
            return res.status(400).json({
                success: false,
                message: 'All fields required'
            })
        }

        const [result] = await connect.execute(`INSERT INTO mission 
            (
            departure_date,
            duration_days,
            companion,
            s_matricule,
            heure_de_depart,
            heure_arrive,
            Id_des,
            Id_object
            ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                depDate,
                durationDays,
                companion || null,
                plateNumber || null,
                depHour,
                arrHour,
                destinationId,
                objectId
            ]);

        const missionId = result.insertId
        const [insertIntoMissionCadreTable] = await connect.execute('INSERT INTO mission_cadre (mission_id, cadre_id) VALUES (?, ?)', [
            missionId,
            cadreId
        ])

        const IDs = {
            missionId,
            cadreId
        }


        if (result.affectedRows === 1 && insertIntoMissionCadreTable.affectedRows === 1) {
            return res.status(201).json({
                success: true,
                message: 'Mission created successfully and missionCadre table updated',
                missionId: IDs
            })
        } else {
            return res.status(400).json({
                success: false,
                message: 'Failed to create Mission'
            })
        }


    } catch (error) {
        console.log('Error getting Cadres', error)
        res.status(400).json({
            success: false,
            message: 'Error inserting data to database'
        })
    } finally {
        connect.release(); // Toujours libérer la connexion
    }
}

export const updateOrderMission = async (req, res) => {
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    try {
        const { id } = req.params;
        const {
            arrHour,
            cadreId,
            companion,
            depDate,
            depHour,
            destinationId,
            durationDays,
            missionId,
            objectId,
            plateNumber
        } = req.body

        console.log(id)
        if (!id || !cadreId) {
            return res.status(400).json({
                success: false,
                message: "Mission id and Cadre id required!"
            })
        }

        // const connect = await connectSQL();
        await connect.beginTransaction();

        const missionQuery = `
            UPDATE mission SET 
                departure_date = ?, 
                duration_days = ?, 
                companion = ?, 
                s_matricule = ?, 
                heure_de_depart = ?, 
                heure_arrive = ?, 
                Id_des = ?, 
                Id_object = ? 
            WHERE mission_id = ?`;
        await connect.query(missionQuery, [
            depDate, durationDays, companion, plateNumber,
            depHour, arrHour, destinationId, objectId, missionId
        ]);

        await connect.query("DELETE FROM mission_cadre WHERE mission_id = ?", [id]);
        await connect.query("INSERT INTO mission_cadre (mission_id, cadre_id) VALUES (?, ?)", [id, cadreId]);

        await connect.commit();

        return res.status(200).json({
            success: true,
            message: 'Mission updated successfully'
        })


    } catch (error) {
        console.log('Error updating mission: ', error)
        res.status(500).json({
            success: false,
            message: 'update mission failed while update it from db'
        })
    } finally {
        connect.release(); // Toujours libérer la connexion
    }
}

export const updateOrderMissionStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion

    if (!id || !status) {
        return res.status(400).json({
            success: false,
            message: "id and status r required!"
        })
    }

    try {
        console.log("Data comming from Update status Endpoint: ", id, status)
        // const connect = await connectSQL();

        const query = `UPDATE mission 
                        SET status = ? 
                        WHERE mission_id = ? `;
        const [result] = await connect.query(query, [status, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Mission not found!"
            })
        }
        await connect.commit()
        console.log("Status updates successfully!")
        return res.status(200).json({
            success: true,
            message: "Status updates successfully!",
        })

    } catch (error) {
        console.log('Error while updating status', error)
        return res.status(500).json({
            success: false,
            message: "Status updates error!",
        })
    } finally {
        connect.release(); // Toujours libérer la connexion
    }

}

export const deleteOrderMission = async (req, res) => {
    const { id } = req.params;
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    try {
        // const connect = await connectSQL();

        await connect.query('DELETE FROM mission_cadre WHERE mission_id = ?', [id]);

        const [result] = await connect.query(
            `DELETE FROM mission WHERE mission_id = ?`,
            [id]
        )

        if (result.affectedRows > 0) {
            return res.status(200).json({
                success: true,
                massage: 'Mission deleted successfully'
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'Mission not found'
            })
        }

    } catch (error) {
        console.error('error deleting mission', error)
        return res.status(500).send('Server Error')
    } finally {
        connect.release(); // Toujours libérer la connexion
    }
}
