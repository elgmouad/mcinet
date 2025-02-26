import React, { useState } from 'react';
import './index.css';

const FullForm = () => {

  const[values,setValues]=useState({
    nom:'',
    delegation:'',
    destination:'',
    objet:'',
    dateD:'',
    duree:'',
    heureD:'',
    heureA:'',
    service:'',
    typeV:'',
    personnelV:'',
    accompagne:''
  })

  const handleChange=(e)=>{
    setValues({...values,[e.target.name]:[e.target.value]})
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(values)
  }

  return (
    <div className="form-container">
      <h1>Créer Ordre Mission</h1>
      <form onSubmit={handleSubmit}>
      
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nom">Nom</label>
            <input type="text" name="nom" value={values.nom} placeholder="Nom..." onChange={(e)=>handleChange(e)} required />
          </div>
          <div className="form-group">
            <label htmlFor="titre">Titre</label>
            <input type="text" name="titre" placeholder="Titre..." onChange={(e)=>handleChange(e)} required/>
          </div>
        </div>

      
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="delegation">Délégation</label>
            <input type="text" name="delegation" placeholder="Délégation..." onChange={(e)=>handleChange(e)} required />
          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input type="text" name="destination" placeholder="Destination..." onChange={(e)=>handleChange(e)} required />
          </div>
        </div>

     
        <div className="form-row">
          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label htmlFor="objet">Objet</label>
            <textarea name="objet" placeholder="Décrivez l'objet de la mission..." onChange={(e)=>handleChange(e)} required></textarea>
          </div>
        </div>

      
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dateD">Date départ</label>
            <input type="date" name="dateD" onChange={(e)=>handleChange(e)} required/>
          </div>
          <div className="form-group">
            <label htmlFor="heureD">Heure de départ</label>
            <input type="time" name="heureD"onChange={(e)=>handleChange(e)} required />
          </div>
        </div>

        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="heureA">Heure d'arrivée</label>
            <input type="time" name="heureA" onChange={(e)=>handleChange(e)} required />
          </div>
          <div className="form-group">
            <label htmlFor="duree">Durée de la mission</label>
            <input type="text" name="duree" placeholder="Durée..." onChange={(e)=>handleChange(e)} required/>
          </div>
        </div>

       
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="typeV">Voiture</label>
            <select name="typeV" onChange={(e)=>handleChange(e)} required>
              <option value="">Sélectionnez une option</option>
              <option value="voiture1">Voiture 1</option>
              <option value="voiture2">Voiture 2</option>
              <option value="voiture3">Voiture 3</option>
            </select>
          </div>
        </div>

       
        <div className="form-row">
          <div className="form-group">
            <label htmlFor='service'>Voiture de service</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="service" value="oui" onChange={(e)=>handleChange(e)} required /> Oui
              </label>
              <label>
                <input type="radio" name="service" value="non" onChange={(e)=>handleChange(e)} required /> Non
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor='personnelV'>Voiture de personnel</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="personnelV" value="oui" onChange={(e)=>handleChange(e)} required /> Oui
              </label>
              <label>
                <input type="radio" name="personnelV" value="non" onChange={(e)=>handleChange(e)} required/> Non
              </label>
            </div>
          </div>
        </div>

        {/* Ligne 8 */}
        <div className="form-row">
          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label htmlFor="accompagne">Sera accompagné de :</label>
            <input type="text" name="accompagne" placeholder="Nom de l'accompagnant..." onChange={(e)=>handleChange(e)} required/>
          </div>
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button type="button" className="btn-secondary">Imprimer</button>
          <button type="submit" className="btn-primary">Sauvegarder</button>
        </div>
      </form>
    </div>
  );
};

export default FullForm;
