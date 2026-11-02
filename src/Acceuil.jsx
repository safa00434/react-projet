import { useState } from "react"
import { PieChart, Pie, Tooltip, Legend } from "recharts";

//calcul durée
function calculerDuree(debut, fin) {
const d = new Date(debut);
const f = new Date(fin);
const jours = Math.round((f - d) / (1000 * 60 * 60 * 24)) + 1;
return jours + " jour(s)";
}


export default function Acceuil() {
    const[inputValue, SetinputValue]=useState("");
    const[dateDValue,SetdateDValue]=useState("");
    const[dateFValue,SetdateFValue]=useState("");
    const[resValue,SetresValue]=useState("");
    const[Statut,SetStatut]=useState("à faire");
    const[tache, SetTache]=useState([]);
    const[editIndex, SeteditIndex]=useState(null);
    const[Recherche, SetRecherche]=useState("");
    
    //ajouter une nouvelle tâche
    const AjouterBtn =() => {
        if (inputValue === "" || dateDValue === "" || dateFValue === "" || resValue === "" || Statut === ""){
            alert("Remplir tous les champs!")
            return;
        }
        if(dateFValue<dateDValue){
            alert("la date de fin doit être supérieure à la date de début")
            return;
        }
        const NouvelleTache = {
            tache:inputValue,
            dateDebut:dateDValue,
            dateFin:dateFValue,
            name:resValue,
            statut:Statut,
        };
        if (editIndex === null){
            SetTache([...tache, NouvelleTache]);
        }else{ 
            SetTache(tache.map((t,i) => i == editIndex ? NouvelleTache : t));
            SeteditIndex(null);
        }
        

        SetinputValue("");
        SetdateDValue("");
        SetdateFValue("");
        SetresValue("");
        SetStatut("à faire");
        
    }
    //modification
    function ModifierTache(indexReel){
        const t = tache[indexReel];
        SetinputValue(t.tache);
        SetdateDValue(t.dateDebut);
        SetdateFValue(t.dateFin);
        SetresValue(t.name);
        SetStatut(t.statut);
        SeteditIndex(indexReel);
    }
    //suppression
    function SupprimerTache(indexReel){
        SetTache(tache.filter((t,i) => i !== indexReel ))
    }
    //search
    const tachesFiltrees = tache.filter((t) =>
    t.tache.toLowerCase().includes(Recherche.toLowerCase())
    );
    //graphe
    const COULEURS = {
        "à faire": "#f44336",
        "en cours": "#ff9800",
        "terminé": "#4caf50",
    };

    const donneesGraphique = ["à faire", "en cours", "terminé"]
    .map((s) => ({
        name: s,
        value: tache.filter((t) => t.statut === s).length,
        fill: COULEURS[s],
    }))
    .filter((d) => d.value > 0);

    //total tâches
    const TotalTaches = [tache.reduce(acc => acc + 1, 0 )]



    return(
        <>
        <h1>GESTION DES TACHES</h1>
        <div className="container">
            <form >
                <div>
                    <label htmlFor="tache">Nature de tache:</label>
                    <input id="tache" type="text" value={inputValue} placeholder="saisir votre tâche" onChange={(e)=>SetinputValue(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="dateD">Date de début:</label>
                    <input id="dateD" type="date" value={dateDValue} onChange={(e)=>SetdateDValue(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="dateF">Date de fin:</label>
                    <input id="dateF" type="date" value={dateFValue} onChange={(e)=>SetdateFValue(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="ressource">Réalisée par:</label>
                    <input id="ressource" type="text" value={resValue} onChange={(e)=>SetresValue(e.target.value)}/>
                </div>
                <div className="champ">
                    <label htmlFor="statut">Statut:</label>
                    <select id="statut" value={Statut} onChange={(e)=>SetStatut(e.target.value)}>
                        <option value="à faire">A FAIRE</option>
                        <option value="en cours">EN COURS</option>
                        <option value="terminé">TERMINE</option>
                    </select>
                <button type="button" className="btn" onClick={AjouterBtn}>{editIndex === null ? "Ajouter" : "Enregistrer"}</button>
                </div>
            </form>
            <div className="zone-tableau">
                <input type="text" className="recherche" placeholder="rechercher une tâche" value={Recherche} onChange={(e)=>SetRecherche(e.target.value)}/>


                <table className="table">
                    <thead>
                        <tr>
                            <th>Tâches</th>
                            <th>Durée de tâche</th>
                            <th>Réalisé par</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tachesFiltrees.map((t)=>{
                            const indexReel = tache.indexOf(t);
                            
                            return(
                                <tr key={indexReel}>
                                <td>{t.tache}</td>
                                <td>{calculerDuree(t.dateDebut, t.dateFin)}</td>
                                <td>{t.name}</td>
                                <td>{t.statut}</td>
                                <td>
                                    <div className="MSbtn">
                                    <button className="btn-modifier" type="button" onClick={() => ModifierTache(indexReel)}> Modifier</button>
                                    <button className="btn-supprimer" type="button" onClick={() => SupprimerTache(indexReel)}>Supprimer</button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                    <div className="toTache">
                        <h2>Nombre total des tâches</h2>    
                        <span> {TotalTaches} </span>
                    </div>
                </table>
                <div className="graphique">
                    <h2>Répartition par statut</h2>

                    {donneesGraphique.length === 0 ? (
                        <p>Aucune donnée à afficher.</p>
                    ) : (
                        <PieChart width={340} height={300}>
                            <Pie data={donneesGraphique} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} />
                            <Tooltip />
                            <Legend />
                        </PieChart>
                )}
                </div>
            </div>
        </div>
        </>
    )
}
