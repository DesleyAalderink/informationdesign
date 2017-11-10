var Quest = new Array(10);  // een array voor de antwoorden.

function populate() {
// een functie die ervoor zorgt dat als de gebruiker niks invoert hij 0 punten hiervoor berekent.
  for(var i=0; i<10; i++) { Quest[i]=0; }
}

function total() {
// telt de punten op van de antwoorden
  myScore=0;
  for (var i=0; i<10; i++) { myScore=myScore+Quest[i]; }
  analyzer(myScore);
}

// de uitkomst de test.
myContents = new Array();
  myContents[0] = "Zeer waarschijnlijk"   + ". Uw resultaten komen heel erg overeen met mensen die zelfmoord plegen. Zoek A.U.B zo snel mogelijk hulp en bel 1813. Denk aan de mensen die om u geven.";
  myContents[1] = "Waarschijnlijk"  + ". De kans is groot dat uw denkt aan zelfmoord. Denk aan je nabestaande en maak geen fouten. Bel 1813 als de situatie erger wordt.";
  myContents[2] = "Het is mogelijk" + ". Er is een kleine kans dat uw zal denken aan zelfmoord. Probeer wat positiever in het leven te staan";
  myContents[3] = "Onwaarschijnlijk"  + ". Dat kans dat u zelfmoord zal plegen is erg onwaarschijnlijk.";
  myContents[4] = "Zeer onwaarschijnlijk"   + ". Er is zo goed als geen mogelijkheid dat u zelfmoord zou willen plegen. De vragen zijn bedoelt om een inzicht te kunnen geven voor wat aanleidingen kunnen zijn voor zelfmoord.";
  myContents[5] = "Geen kans"  + ". Er bestaat geen kans dat u zelfmoord zal plegen. De vragen zijn bedoelt om een inzicht te kunnen geven voor wat aanleidingen kunnen zijn voor zelfmoord."


function analyzer (myScore) {
// een functie die zegt hoeveel punten en nodig zijn voor welke uitkomst.
  if (myScore>34)            { myContentsPtr = 5; } //6
    else { if (myScore > 27) { myContentsPtr = 4; } //5
    else { if(myScore>20)    { myContentsPtr = 3; } //4
    else { if(myScore>13)    { myContentsPtr = 2; } //3
    else { if(myScore>6)     { myContentsPtr = 1; } //2
    else                     { myContentsPtr = 0; } //1
        }
      }
    }
  }
  myDisplay(myContents[myContentsPtr])
}


function myDisplay(myContents) {
// zet de resultaten in de HTML
document.getElementById("result").innerHTML = (myContents);
}

function saver(q, points) {
// zet de punten in de array
  q=q-1;
  Quest[q]=points
}
