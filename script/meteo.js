    // Importer Moment.js
    import moment from 'https://cdn.skypack.dev/moment';
    
    
    
    // Récupérer les données du fichier JSON
    fetch('/script/temperatures_2023.json')
    .then(response => response.json())
    .then(data => {

    
/******************************************************************************
 *                PAGE STATISTIQUE
 * ******************************************************************************
 */

    //on utilise un filtre pour découper les données d'un mois spécifique
    const filterByMonth = (month) => {
    return data.temperatures.filter(temperature => {
    return temperature.DateDuJour.startsWith(`2023-${month}`)
    }).map(temperature => {
        // Utiliser Moment.js pour formater la date
        var formattedDate = moment(temperature.DateDuJour).format('D MMMM YYYY');
        //utiliser la fonction toLocaleDateString pour formater la date en français abbrevié
        var formaterDate = new Date(formattedDate).toLocaleDateString('fr-FR', {day: 'numeric', month: 'short'});
      
        
        // Retourner un objet avec la date formatée et la température
        return { date2: formaterDate, date: formattedDate, temp: temperature.TempDuJour, min: temperature.TempMin, max: temperature.TempMax };
      });
    }
//on met les données filtrées pour un mois spécifique dans des variables pour chaque mois
   const temperaturesJanvier = filterByMonth('01')
   const temperaturesFevrier = filterByMonth('02')
   const temperaturesMars = filterByMonth('03')
   const temperaturesAvril = filterByMonth('04')
   const temperaturesMai = filterByMonth('05')
   const temperaturesJuin = filterByMonth('06')
   const temperaturesJuillet = filterByMonth('07')
   const temperaturesAout = filterByMonth('08')
   const temperaturesSeptembre = filterByMonth('09')
   const temperaturesOctobre = filterByMonth('10')
   const temperaturesNovembre = filterByMonth('11')
   const temperaturesDecembre = filterByMonth('12')
//on met les données de chaque mois dans un tableau pour pouvoir les utiliser plus facilement
   const temperaturesMois = [temperaturesJanvier, temperaturesFevrier, temperaturesMars, temperaturesAvril, temperaturesMai, temperaturesJuin, temperaturesJuillet, temperaturesAout, temperaturesSeptembre, temperaturesOctobre, temperaturesNovembre, temperaturesDecembre]


   //donner la date d'aujourd'hui
    var dateAjd = document.getElementById("dateAjd");
    //formater la date
   dateAjd.innerHTML = new Date().toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'});
   
   //faire la navigation entre la page de statistique et la page d'accueil 
   //au click sur accueil
   var pageAccueil = true;
   var accueil = document.getElementById("accueil");
   accueil.addEventListener("click", function () {
    if (!pageAccueil) {
      pageAccueil = true;
      location.href = "../html/index.html";
  }

   });

   //modifier dynamiquement le tableau des températures mensuelles au click sur un mois
   var mois = document.getElementsByName("mois");


   for (let i = 0; i < mois.length; i++) {
       mois[i].addEventListener("click", function () {

        
           //faire la navigation entre la page accueil et la page statistique au click 
           //sur un mois
           if (pageAccueil){
             
             pageAccueil = false;
             location.href = "../html/statistique.html#" + i
            }
           
           //récupérer les cellules du tableau des températures du mois
           //chaque cellule correspond à un jour
           //les cellules contiennent la date, un icone et la température du jour
           var jours = document.getElementsByName("jours");
           
           //boucler sur les cellules "jours" du tableau pour afficher les données du mois
           for (let j = 0; j < jours.length; j++) {

               if (j < temperaturesMois[i].length) {

                   // Choix de l'icône en fonction de la température
                   if (temperaturesMois[i][j].temp <= 0) {
                   var icone = "neige";
                   } else if (temperaturesMois[i][j].temp <= 10) {
                   var icone = "pluie";
                    } else if (temperaturesMois[i][j].temp < 20) {
                    var icone = "nuage";
                   } else {
                   var icone = "soleil";
                   }
                   //insérer les données dans les cellules du tableau
                   jours[j].innerHTML = `
                   <div class="cellule">
                   <div class="moyenne2">${temperaturesMois[i][j].date2}</div>
                   <div><img width="40px" src="/image/${icone}.png" alt="${icone}"></div>
                   <div>${temperaturesMois[i][j].temp}°C</div>
                   </div>
                    `;
                  jours[j].style.visibility = "visible";
                   
               }
               //cacher les cellules "jours" qui ne contiennent pas de données
               //pour les mois qui ont moins de 31 jours
               else if (j >= temperaturesMois[i].length){
                   jours[j].style.visibility = "hidden";
                   jours[j].textContent = "";
               }
           }
           //PARTIE 2
           //charger les données du jour le plus chaud et le jour plus froid
           
           //définir les variables pour le jour le plus chaud 
           let maxTemp = -Infinity;//la température la plus haute (variable temporaire)
           let jourChaud = null;//la date du jour le plus chaud
           let chaud = null;//la température du jour le plus chaud
           let chaudMin = null;//la température minimale du jour le plus chaud
           let chaudMax = null;//la température maximale du jour le plus chaud
           
           //boucler sur les données du mois pour trouver le jour le plus chaud
           temperaturesMois[i].forEach(temperature => {
            //si la température du jour est plus grande que la température la plus haute
            //alors on met à jour les variables 
            if (temperature.temp > maxTemp) {
               maxTemp = temperature.temp;
               jourChaud = temperature.date;
               chaud = temperature.temp;
               chaudMin = temperature.min;
               chaudMax = temperature.max;
             }
            });

            //insérer les données dans les balises appropriées
            document.getElementById("jourChaud").innerHTML = new Date(jourChaud).toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'});
            document.getElementById("chaud").innerHTML = chaud+ "°";
            document.getElementById("minChaud").innerHTML = chaudMin+ "°";
            document.getElementById("maxChaud").innerHTML = chaudMax+ "°";
            
            //logique similaire pour le jour le plus froid

            //définir les variables pour le jour le plus froid
            let minTemp = Infinity;//la température la plus basse (variable temporaire)
            let jourFroid = null;//la date du jour le plus froid
            let froid = null;//la température du jour le plus froid
            let froidMin = null;//la température minimale du jour le plus froid
            let froidMax = null;//la température maximale du jour le plus froid

            //boucler sur les données du mois pour trouver le jour le plus froid
            temperaturesMois[i].forEach(temperature => {
              //si la température du jour est plus petite que la température la plus basse
              //alors on met à jour les variables
              if (temperature.temp < minTemp) {
                minTemp = temperature.temp;
                jourFroid = temperature.date;
                froid = temperature.temp;
                froidMin = temperature.min;
                froidMax = temperature.max;
              }
            });

            //insérer les données dans les balises appropriées
              document.getElementById("jourFroid").innerHTML = new Date(jourFroid).toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'});
              document.getElementById("froid").innerHTML = froid+ "°";
              document.getElementById("minFroid").innerHTML = froidMin+ "°";
              document.getElementById("maxFroid").innerHTML = froidMax+ "°";

              //PARTIE 2-2
              //charger les données de la moyenne des températures du mois

              //initialiser les variables pour calculer la moyenne
              let somme = 0;
              let compteur = 0;

              //boucler sur les données du mois pour incrémenter la somme et le compteur
              temperaturesMois[i].forEach(temperature => {
                somme += temperature.temp;//additionner les températures
                compteur++;//incrémenter le compteur
              });

              //calculer la moyenne
              let moyenne = somme / compteur;
              //arrondir la moyenne à l'entier le plus proche
              //insérer la moyenne dans la balise appropriée
              document.getElementById("moyenne").innerHTML = moyenne.toFixed(0)+ "°";

              //obtenir le nom et l'année du mois courant

              //obtenir la date du premier jour du mois
              let moisCourant = temperaturesMois[i][0].date;
              //convertir le date du premier jour du mois au format mmmm yyyy
              
              moisCourant = new Date(moisCourant).toLocaleDateString('fr-FR', {month: 'long', year: 'numeric'});
              //insérer le nom et l'année du mois courant dans la balise appropriée
              document.getElementById("moisCourant").innerHTML = moisCourant;
              //remettre la valeur de la varible pageAccueil à faux
              //pour préciser que la page n'est plus à l'accueil
               pageAccueil = false;
       });
   }

   //fonction pour charger directement les données du mois sélectionné
   //en utilisant le hash dans l'URL
   //et en forcant un deuxième clic sur le mois sélectionné  
   var indexMois = location.hash.substring(1)
   if (indexMois != null && indexMois >=0 && indexMois <= 11)
           mois[indexMois].click();//simuler un clic sur le mois sélectionné
  })
   
   .catch(error => console.error(error))

