import { connectSQL } from "../database/connectDB.js"

export const fetchControls = async (req, res) =>{rrrrrrrrrrrrrrrrrrrrrr
    try {
        const connect = await connectSQL();
        // const query = `SELECT * FROM controle`;
        const query = `SELECT c.*, e.*
                        FROM controle c
                        INNER JOIN entreprise_controle ec ON c.idc = ec.idc
                        INNER JOIN entreprise e ON ec.ICE = e.ICE;`;

        const [result] = await connect.query(query);

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
    }
}
export const createControl = async (req, res) => {
    const control = req.body
    const convertDate = control.executedAt.at

    if(!control.entID) return res.status(400).json({
        success: false,
        message: 'Entreprise ID required!'
    })

    try {
        const connect = await connectSQL()
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
                                mission_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
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
            control.missionID
        ]
        const [response] = await connect.execute(query, values)
        if(response.affectedRows === 1) {
            
            const insertToEC = `INSERT INTO entreprise_controle (ICE, idc) VALUES (?, ?)`
            
            const result = await connect.execute(insertToEC, [control.entID, response.insertId])
            if(result.affectedRows === 1 ) {
                res.status(201).json({
                    success: true,
                    message: 'Control created successfully!'
                })
            }else {
                if(result.affectedRows === 1 ) {
                    res.status(400).json({
                        success: false,
                        message: 'Error while linking control with entreprise!'
                    })
                }
            }
        }else {
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
    }
}

export const updateControls = async (req, res) => {
    
}


export const deleteControl = async (req, res) => {
    
}
