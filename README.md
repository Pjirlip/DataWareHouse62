# Data Warehouse - Aufgabenblatt 6 Aufgabe 2

Ziel des Programms ist die zerlegung einer CSV in Dimensionen und Fakten wie im Aufgabenbaltt gefordert. 

## Vorbereitung

Das Programm verwendet zum parsen und formatieren von CSV Daten das npm modul "csv". Deswegen muss als erstes das Modul installiert werden mittels: 
```bash
 npm install
```

## Test
Eine angepasste CSV liegt vor und kann mittels Befehl `npm run test` ausprobiert werden.


## Installieren
Um das Skript zu installieren einfach:
```bash
npm install
npm link .
```
ausführen. Danach kann das Script von überall mittels: 

```bash

dwh_tables <Eingabedatei> <Anzahl Dimensionen>

# Beispiel:

dwh_tables input.csv 3
```

Danach befinden sich die Dimensionsdateien und eine angpasste Fakten-CSV im ausgeführten Path. 
Die einzelnen Schritte werden bei der Ausführung auf der Standartausgabe protokolliert. 

Z.B:
```

Orignal File before Transmutation:
 [
  [ 'Micky', 'Hose', 'Rot', '39', '10' ],
  [ 'Donald', 'Hose', 'Grün', '78', '25' ],
  [ 'Micky', 'Jacke', 'Blau', '99', '23' ]
]


Dimensions:
 [
  Map(2) { 'Micky' => 'Micky', 'Donald' => 'Donald' },
  Map(2) { 'Hose' => 'Hose', 'Jacke' => 'Jacke' },
  Map(3) { 'Rot' => 'Rot', 'Grün' => 'Grün', 'Blau' => 'Blau' }
]


Original File after Transmutation:
 [
  [ 1, 1, 1, '39', '10' ],
  [ 2, 1, 2, '78', '25' ],
  [ 1, 2, 3, '99', '23' ]
]
```
