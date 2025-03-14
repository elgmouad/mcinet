import { response } from "express";
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
    } finally {
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
                success: false,
                message: 'Error while creating control!'
            })

        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error server!'
        })
        throw error
    } finally {
        connect.release(); // Toujours libérer la connexion
    }
}

// export const createControlLoi97Importation = async (req, res) => {
//     const data = req.body
//     const pool = await connectSQL(); // Obtenir le pool
//     const connect = await pool.getConnection(); // Obtenir une connexion

//     // const convertDate = data.executedAt.at
//     console.log('Add importation Controle_Loi2409_Importation: ', data)
//     if (!data.entID) return res.status(400).json({
//         success: false,
//         message: 'Entreprise ID required!'
//     })

//     try {
//         // const connect = await connectSQL()
//         const query = `
//         INSERT INTO controle24_09Importation (
//                                 date_visite ,
//                                 f_observation,
//                                 validation,
//                                 mission_id) VALUES (?, ?, ?, ?)`
//         const values = [
//             data.executedAt.at,
//             data.observation,
//             data.validation,
//             data.missionID
//         ]
//         const [responseControle] = await connect.execute(query, values);
//         console.log('Importation : ', responseControle);

//         if (responseControle.affectedRows === 1) {

//             const insertToEC = `INSERT INTO entrepriseControle24_09Importation (
//             ICE, 
//             idCtrl,
//             idPrd,
//             nbrState,
//             status,
//             observation) VALUES (?, ?, ?, ?, ?,?)`;

//             const [responseEC] = await connect.execute(insertToEC, [data.entID, responseControle.insertId, data.productID, data.nbrControle, data.status, data.observation])
//             console.log('Entrprise : ', responseEC);

//             if (responseEC.affectedRows === 1) {
//                 if (data.status === 'Conforme') {
//                     const currentDate = new Date();
//                     const at = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
//                     data.dateFinAut = at;
//                     // Ajouter 6 mois
//                     currentDate.setMonth(currentDate.getMonth() + 6);
//                     const dateFinAut = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
//                     const insertToAutorisation = `INSERT INTO autorisation (
//                     dateDebut,
//                     dateFin,
//                     id_Prd) VALUES (?, ?, ?)`;
//                     const [responseAutorisation] = await connect.execute(insertToAutorisation, [at, dateFinAut, data.productID]);
//                     if (responseAutorisation.affectedRows === 1) {
//                         console.log('Autorisation : ', responseAutorisation);

//                         res.status(201).json({
//                             success: true,
//                             message: 'Control created successfully!'
//                         });

//                     } else {
//                         res.status(400).json({
//                             success: false,
//                             message: 'Error while linking Autorisation with Product!'
//                         });
//                     }
//                 }

//                 res.status(201).json({
//                     success: true,
//                     message: 'Control created successfully!'
//                 });

//             } else {
//                 // if (result.affectedRows === 1) {
//                 res.status(400).json({
//                     success: false,
//                     message: 'Error while linking control with entreprise!'
//                 });
//                 // }
//             }
//         } else {
//             res.status(400).json({
//                 success: false,
//                 message: 'Error while creating control!'
//             })

//         }
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Erreur interne du serveur'
//         })
//         throw error
//     } finally {
//         connect.release(); // Toujours libérer la connexion
//     }
// }

export const createControlLoi97Importation = async (req, res) => {
    const data = req.body
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion

    // const convertDate = data.executedAt.at
    console.log('Add importation Controle_Loi2409_Importation: ', data)
    if (!data.entID) return res.status(400).json({
        success: false,
        message: 'Entreprise ID required!'
    })

    try {
        // const connect = await connectSQL()
        const query = `
        INSERT INTO controle24_09Importation (
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
        const [responseControle] = await connect.execute(query, values);
        console.log('Importation : ', responseControle);

        if (responseControle.affectedRows === 1) {

            const resultByEntCont = await createControlEntrepriseLoi97Importation(data, responseControle);
            if (resultByEntCont.success) {
                res.status(201).json({
                    success: true,
                    message: 'Control created successfully!'
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: resultByEntCont.message
                })
            }

        } else {
            res.status(400).json({
                success: false,
                message: 'Error while creating control!'
            })

        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        throw error.message
    } finally {
        connect.release(); // Toujours libérer la connexion
    }
}

const createControlEntrepriseLoi97Importation = async (data, oldState) => {
    // const data = req.body
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion

    // const convertDate = data.executedAt.at
    // console.log('Add EntrepriseControle_Loi2409_Importation: ', data)
    if (!data.entID || !data.productID) return {
        success: false,
        message: 'Data required!'
    }

    try {
        // const connect = await connectSQL()
        console.log("OLD STATE ENTREPRISE", oldState);

        if (oldState.affectedRows === 1) {

            const insertToEC = `INSERT INTO entrepriseControle24_09Importation (
            ICE, 
            idCtrl,
            idPrd,
            nbrState,
            status,
            observation) VALUES (?, ?, ?, ?, ?,?)`;

            const [responseEC] = await connect.execute(insertToEC, [data.entID, oldState.insertId, data.productID, data.nbrControle, data.status, data.observation])
            console.log('Entrprise : ', responseEC);
            if (responseEC.affectedRows === 1) {
                if (data.status === 'Conforme') {
                    const result = await createAutorisationControlLoi97Importation(data, responseEC);
                    if (result.success) {
                        return {
                            success: true,
                            message: 'Successful Linked Entreprise and Create Autorisation'
                        }
                    } else {
                        return {
                            success: false,
                            message: 'Faild to Link Entreprise and add Autorisation'
                        }
                    }
                } else {
                    return {
                        success: true,
                        message: 'Linked Successful with Controle'
                    }
                }
            } else {
                return {
                    success: false,
                    message: 'Fail To link Entreprise with Controle'
                }
            }
        } else {
            return {
                success: false,
                message: 'Fail Linked Entreprise with controle Old not Succes '
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    } finally {
        connect.release(); // Toujours libérer la connexion
    }
}

const createAutorisationControlLoi97Importation = async (data, oldState) => {
    // const data = req.body
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion

    // const convertDate = data.executedAt.at
    // console.log('Add AutorisationControle_Loi2409_Importation: ', data)
    if (!data.productID) return {
        success: false,
        message: 'Product Data required!'
    }

    try {
        // const connect = await connectSQL()

        console.log("OLD STATE AUTORISATION", oldState);
        if (oldState.affectedRows === 1) {
            const currentDate = new Date();
            const at = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
            data.dateFinAut = at;
            // Ajouter 6 mois
            currentDate.setMonth(currentDate.getMonth() + 6);
            const dateFinAut = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;

            const insertToAutorisation = `INSERT INTO autorisation (
                dateDebut,
                dateFin,
                id_Prd) VALUES (?, ?, ?)`;
            const [responseAutorisation] = await connect.execute(insertToAutorisation, [at, dateFinAut, data.productID]);
            if (responseAutorisation.affectedRows === 1) {
                console.log('Autorisation : ', responseAutorisation);
                return {
                    success: true,
                    message: 'Linked with Autorisation Successful'
                }
            } else {
                return {
                    success: false,
                    message: 'Fail Linked Autorisation'
                }
            }
        } else {
            return {
                success: false,
                message: 'Fail Linked Autorisation with Entreprise'
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error
        }
        throw error;
    } finally {
        connect.release(); // Toujours libérer la connexion
    }
}

export const updateControls = async (req, res) => {

}


export const deleteControl = async (req, res) => {

}
