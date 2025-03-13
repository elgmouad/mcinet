import { connectSQL } from "../database/connectDB.js"

export const fetchControls = async (req, res) => {
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    try {
        // const connect = await connectSQL();
        // const query = `SELECT * FROM controle`;
        const query = `SELECT c.*, e.*
                        FROM controle c
                        INNER JOIN entreprise_controle ec ON c.idc = ec.idc
                        INNER JOIN entreprise e ON ec.ICE = e.ICE;`;

        const [result] = await connect.query(query);
        console.log('Controls list: ', result)
        res.status(200).json({
            success: true,
            message: "All controls fetched successfully",
            controls: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur'
        })
    }finally {
        connect.release(); // Toujours libérer la connexion
      }
}
export const createControl = async (req, res) => {
    const control = req.body
    const convertDate = control.executedAt.at
    console.log('Add Control: ', control)
    if (!control.entID) return res.status(400).json({
        success: false,
        message: 'Entreprise ID required!'
    })
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion

    try {
        // const connect = await connectSQL()
        const query = `
        INSERT INTO controle (
                                date_visite ,
                                affichage_prix ,
                                tickets_caisses ,
                                solde ,
                                publicite ,
                                vente_avec_prime ,
                                a_comment,
                                t_comment,
                                s_comment,
                                p_comment,
                                v_comment,
                                f_observation,
                                validation,
                                mission_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        const values = [
            control.executedAt.at,
            control.pratics[0].status,
            control.pratics[1].status,
            control.pratics[2].status,
            control.pratics[3].status,
            control.pratics[4].status,
            control.pratics[0].observation,
            control.pratics[1].observation,
            control.pratics[2].observation,
            control.pratics[3].observation,
            control.pratics[4].observation,
            control.finallObservation,
            control.validation,
            control.missionID
        ]
        const [response] = await connect.execute(query, values)
        if (response.affectedRows === 1) {

            const insertToEC = `INSERT INTO entreprise_controle (ICE, idc) VALUES (?, ?)`

            const result = await connect.execute(insertToEC, [control.entID, response.insertId])
            if (result.affectedRows === 1) {
                res.status(201).json({
                    success: true,
                    message: 'Control created successfully!'
                })
            } else {
                if (result.affectedRows === 1) {
                    res.status(400).json({
                        success: false,
                        message: 'Error while linking control with entreprise!'
                    })
                }
            }
        } else {
            res.status(400).json({
                success: flase,
                message: 'Error while creating control!'
            })

        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error server!'
        })
        throw error
    }finally {
        connect.release(); // Toujours libérer la connexion
      }
}

export const createControlLoi97Importation = async (req, res) => {
    const data = req.body
    // const convertDate = data.executedAt.at
    console.log('Add importation Controle_Loi2409_Importation: ', data)
    if (!data.entID) return res.status(400).json({
        success: false,
        message: 'Entreprise ID required!'
    })
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    try {
        // const connect = await connectSQL()
        const query = `
        INSERT INTO Controle_Loi97_Importation (
                                date_visite ,
                                f_observation,
                                validation,
                                mission_id) VALUES (?, ?, ?, ?)`
        const values = [
            data.executedAt.at,
            data.observation,
            data.validation,
            data.missionID
        ]
        const [response] = await connect.execute(query, values)
        if (response.affectedRows === 1) {

            const insertToEC = `INSERT INTO Entreprise_Controle97_Impor (
            ICE, 
            idCtrl,
            idPrd,
            nbrState,
            status,
            observation) VALUES (?, ?, ?, ?, ?,?)`

            const result = await connect.execute(insertToEC, [data.entID, response.insertId, data.productID, data.nbrControle, data.status, data.observation])
            if (result.affectedRows === 1) {
                if (data.status === 'Conforme') {
                    const insertToAutorisation = `INSERT INTO Autorisation (dateDebut, dateFin, id_Prd) VALUES (?, ?, ?)`
                    result = await connect.execute(insertToAutorisation, [data.dateDebutAut, data.dateFinAut, response.insertId])
                }

                res.status(201).json({
                    success: true,
                    message: 'Control created successfully!'
                })
            } else {
                if (result.affectedRows === 1) {
                    res.status(400).json({
                        success: false,
                        message: 'Error while linking control with entreprise!'
                    })
                }
            }
        } else {
            res.status(400).json({
                success: flase,
                message: 'Error while creating control!'
            })

        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
        throw error
    }finally {
        connect.release(); // Toujours libérer la connexion
      }
}

export const updateControls = async (req, res) => {

}


export const deleteControl = async (req, res) => {

}
