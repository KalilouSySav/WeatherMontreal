fetch('/script/temperatures_2023.json')
    .then(Response => { return Response.json() })
    .then(data => {

      const debutAnnee = new Date("2023-01-01");
      const semaineTemperatures = data.temperatures.reduce((semaines, temperature) => {
      const date = new Date(temperature.DateDuJour);
      const semaine = Math.floor((date - debutAnnee) / (1000 * 60 * 60 * 24 * 7));
        if (!semaines[semaine]) {
          semaines[semaine] = [];
        }
        semaines[semaine].push(temperature);
        return semaines;
      }, {});
 
     // Obtenir la date actuelle
     const currentDate = new Date();
 
    // Obtenir le numéro de semaine actuel à partir de la date actuelle
    const currentWeek = Math.floor((currentDate - debutAnnee) / (1000 * 60 * 60 * 24 * 7));
 
    // Obtenir le tableau des températures de la semaine actuelle
    let currentWeekTemperatures = semaineTemperatures[currentWeek];
 
    // Obtenir le tableau des températures de la semaine suivante
    let nextWeekTemperatures;
    if (currentWeek < Object.keys(semaineTemperatures).length - 1) {
        nextWeekTemperatures = semaineTemperatures[currentWeek + 1];
    } else {
        nextWeekTemperatures = [];
    }
 
    // Obtenir le tableau des températures de la semaine après la semaine suivante (dans 14 jours)
    let secondNextWeekTemperatures;
    if (currentWeek < Object.keys(semaineTemperatures).length - 2) {
        secondNextWeekTemperatures = semaineTemperatures[currentWeek + 2];
    } else {
        secondNextWeekTemperatures = [];
    }
    console.log(currentWeekTemperatures, nextWeekTemperatures, secondNextWeekTemperatures);
 
    var semaine1et2 = [currentWeekTemperatures, nextWeekTemperatures]

    var jourSemaines = ['dim','lun','mar','mer','jeu','ven','sam']
    var joursemaine = ''

    // Obtenir la date actuelle
    var dateCourante = new Date().toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'});
        
        
   //afficher la date d'aujourd'hui
    var dateAjd = document.getElementById("dateAjd");
    //dateAjd.innerHTML = moment().format('D MMMM YYYY');
   dateAjd.innerHTML = new Date().toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'});
 

        //afficher la température du jour avec température min et max et icone météo
        let tempjour = document.getElementById('tempjour')
        let tempMax = document.getElementById('tempMax')
        let tempMin = document.getElementById('tempMin')
        let imangemeteo = document.getElementById('imangemeteo')
       
        const auj = new Date();
        let aujInd = auj.getDay();

        let info1 = currentWeekTemperatures[aujInd]
        let temp1 = info1.TempDuJour
        let tempmin = info1.TempMin
        let tempmax = info1.TempMax
        tempjour.innerHTML = temp1 + '°C'
        tempMax.innerHTML = tempmax + '°C'
        tempMin.innerHTML = tempmin + '°C'

        // Choix de l'icône en fonction de la température
        if (temp1 <= 0) {
            var icone1 = "neige";
        } else if (temp1 <= 10) {
            var icone1 = "pluie";
        } else if (temp1 < 20) {
            var icone1 = "nuage";            
        } else {
            var icone1 = "soleil";
        }
        imangemeteo.innerHTML = `
        <img width="40%" src="/image/${icone1}.png" alt="${icone1}" width="50%">
         `;

        //afficher la température de demain, après demain et dans 3 jours
        let tdemain = document.getElementById('tdemain')
        let tapresd = document.getElementById('tapresd')
        let tdans3j = document.getElementById('tdans3j')

        var demain = new Date();
        demain.setDate(demain.getDate() + 1);
        var apresdemain = new Date();
        apresdemain.setDate(apresdemain.getDate() + 2);
        var dans3jours = new Date();
        dans3jours.setDate(dans3jours.getDate() + 3);

        //* température pour demain*/
        var demainjour = demain.getDate()
        console.log(demainjour)
        var demainmois = demain.getMonth() + 1
        var demainannee = demain.getFullYear()

        //(5).toString().padStart(2,0); 
        var datedemain = demainannee+"-"+demainmois.toString().padStart(2,0) +"-"+demainjour.toString().padStart(2,0)
        console.log('datedemain:'+datedemain)

        var tempdemain = data.temperatures.find((item) => item.DateDuJour === datedemain).TempDuJour;
        console.log('tempdemain:'+tempdemain)
        tdemain.innerHTML = '&nbsp;&nbsp;' + tempdemain + '°C'

        //* température pour après demain*/
        var apresdemainjour = apresdemain.getDate()
        console.log(apresdemainjour)
        var apresdemainmois = apresdemain.getMonth() + 1
        var apresdemainannee = apresdemain.getFullYear()

        //(5).toString().padStart(2,0); 
        var dateapresdemain = apresdemainannee+"-"+apresdemainmois.toString().padStart(2,0) +"-"+apresdemainjour.toString().padStart(2,0)
        console.log('dateapresdemain:'+dateapresdemain)

        var tempapresdemain = data.temperatures.find((item) => item.DateDuJour === dateapresdemain).TempDuJour;
        console.log('tempapresdemain:'+tempapresdemain)
        tapresd.innerHTML = '&nbsp;&nbsp;' + tempapresdemain + '°C'

        //*température dans 3 jours*/
        var dans3joursjour = dans3jours.getDate()
        console.log(dans3joursjour)
        var dans3joursmois = dans3jours.getMonth() + 1
        var dans3joursannee = dans3jours.getFullYear()

        //(5).toString().padStart(2,0); 
        var datedans3jours = dans3joursannee+"-"+dans3joursmois.toString().padStart(2,0) +"-"+dans3joursjour.toString().padStart(2,0)
        console.log('dans3jours:'+dans3joursjour)

        var tempdans3jours = data.temperatures.find((item) => item.DateDuJour === datedans3jours).TempDuJour;
        console.log('tempdans3jours:'+tempdans3jours)
        tdans3j.innerHTML = '&nbsp;&nbsp;' + tempdans3jours + '°C'       

        //* température pour les semaines*/
        var semaine1 = document.getElementsByName('semaine1')
        var semaine2 = document.getElementsByName('semaine2')        
        var semaine3 = document.getElementsByName('semaine3')
        var choixsemaine = document.getElementsByName('choixsemaine')

        document.getElementById('tabsemainecourante').style.display="block"
        document.getElementById('tabsemaineprochaine').style.display="none"
        document.getElementById('tabsemainesuivante').style.display="none"

        document.getElementById('divdemain').style.display="flex"
        document.getElementById('divapresdemain').style.display="flex"       
        document.getElementById('divdans3j').style.display="flex"


        for (let i = 0; i < semaine1.length; i++) {

            // Choix de l'icône en fonction de la température
            if (currentWeekTemperatures[i].TempDuJour <= 0) {
                var icone = "neige";
            } else if (currentWeekTemperatures[i].TempDuJour <= 10) {
                var icone = "pluie";
            } else if (currentWeekTemperatures[i].TempDuJour < 20) {
                var icone = "nuage";                            
            } else {
                var icone = "soleil";
            }
            joursemaine = jourSemaines[i]
            semaine1[i].innerHTML = `
            <div>&nbsp;&nbsp;${joursemaine}</div>
            <div><img width="45%" src="/image/${icone}.png" alt="${icone}"></div>
            <div>&nbsp;&nbsp;${currentWeekTemperatures[i].TempDuJour}°C</div>
            `;
        }

        for (let i = 0; i < semaine2.length; i++) {
 
            // Choix de l'icône en fonction de la température
            if (nextWeekTemperatures[i].TempDuJour <= 0) {
                var icone = "neige";
            } else if (nextWeekTemperatures[i].TempDuJour <= 10) {
                var icone = "pluie";
            } else if (nextWeekTemperatures[i].TempDuJour < 20) {
                var icone = "nuage";                        
            } else {
                var icone = "soleil";
            }
            joursemaine = jourSemaines[i]
            semaine2[i].innerHTML = `
            <div>&nbsp;&nbsp;${joursemaine}</div>
            <div><img width="45%" src="/image/${icone}.png" alt="${icone}"></div>
            <div>&nbsp;&nbsp;${nextWeekTemperatures[i].TempDuJour}°C</div>
             `;

        }

        for (let i = 0; i < semaine3.length; i++) {
 
            // Choix de l'icône en fonction de la température
            if (secondNextWeekTemperatures[i].TempDuJour <= 0) {
                var icone = "neige";
            } else if (secondNextWeekTemperatures[i].TempDuJour <= 10) {
                var icone = "pluie";
            } else if (secondNextWeekTemperatures[i].TempDuJour < 20) {
                var icone = "nuage";                            
            } else {
                var icone = "soleil";
            }
            joursemaine = jourSemaines[i]
            semaine3[i].innerHTML = `
            <div>&nbsp;&nbsp;${joursemaine}</div>
            <div><img width="45%" src="/image/${icone}.png" alt="${icone}"></div>
            <div>&nbsp;&nbsp;${secondNextWeekTemperatures[i].TempDuJour}°C</div>
             `;

        }

            //eventListener pour semaine courante
            document.getElementById("idsemainecourante").style.textDecoration="underline"
            var idsemainecourante = document.getElementById("idsemainecourante")
            idsemainecourante.addEventListener("click", function () {
                document.getElementById("idsemainecourante").style.textDecoration="underline"
                document.getElementById("idjouravenir").style.textDecoration="none"
                document.getElementById('tabsemainecourante').style.display="block"
                document.getElementById('tabsemaineprochaine').style.display="none"
                document.getElementById('tabsemainesuivante').style.display="none"
                document.getElementById('divdemain').style.display="flex"
                document.getElementById('divapresdemain').style.display="flex"       
                document.getElementById('divdans3j').style.display="flex"
                document.getElementById("btnPlus").style.display="none"
            })

            //eventListener pour jour à venir
            var idjouravenir = document.getElementById("idjouravenir")
            document.getElementById("btnPlus").style.display="none"

            idjouravenir.addEventListener("click", function () {
                document.getElementById("idsemainecourante").style.textDecoration="none"
                document.getElementById("idjouravenir").style.textDecoration="underline"
                document.getElementById('tabsemainecourante').style.display="none"
                document.getElementById('tabsemaineprochaine').style.display="block"
                document.getElementById('tabsemainesuivante').style.display="none"
                document.getElementById('divdemain').style.display="flex"
                document.getElementById('divapresdemain').style.display="flex"       
                document.getElementById('divdans3j').style.display="flex"
                document.getElementById("btnPlus").style.display="block"
            })

            //eventListener pour bouton + (plus)
            var btnPlus = document.getElementById("btnPlus")
            btnPlus.addEventListener("click", function () {
                document.getElementById('tabsemainecourante').style.display="none"
                document.getElementById('tabsemaineprochaine').style.display="block"
                document.getElementById('tabsemainesuivante').style.display="block"
                document.getElementById('divdemain').style.display="none"
                document.getElementById('divapresdemain').style.display="none"       
                document.getElementById('divdans3j').style.display="none"
                document.getElementById("btnPlus").style.display="none"
            })

       // }
       var mois = document.getElementsByName("mois");
   
       //faire la navigation entre la page d'accueil et la page de statistique
       var pageAccueil = true;
       var accueil = document.getElementById("accueil");
       accueil.addEventListener("click", function () {
        if (!pageAccueil) {
          pageAccueil = true;
          location.href = "../html/index.html";
      }
    
       });
    
       for (let i = 0; i < mois.length; i++) {
           mois[i].addEventListener("click", function () {
    
               //changer les donneés du mois en cours
               //alert(mois[i].innerHTML)
    
               if (pageAccueil){
                 //location.replace("../html/statistique.html");
                 pageAccueil = false;
                 location.href = "../html/statistique.html#" + i
                }
                  
               pageAccueil = false;
           });
       }
    
          
    var indexMois = location.hash.substring(1)
    if (indexMois != null && indexMois >=0 && indexMois <= 11)
          mois[indexMois].click();
       

    })