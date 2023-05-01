# CarbonCruncher – Climate Data Visualizations
WEB-sovellusprojekti ilmastonmuutoksen kuvaamisesta erilaisten visualisointinäkymien kautta

## Esittely
Carbon Cruncher on Oulun ammattikorkeakoulun 2. vuoden tieto- ja viestintätekniikan opiskelijoiden web-ohjelmoinnin projektityö, jossa tavoitteena oli rakentaa web-sovellus ilmastonmuutoksen visualisointiin.

Päätavoitteina sivustolle oli luoda responsiivinen käyttöliittymä, joka sisältää kirjautumissivun, missä käyttäjä voi rekisteröityä ja kirjautua palveluun, kaksi päänäkymää sekä muokattavissa olevan näkymän, jonka käyttäjä voi luoda itselleen yhdistelmällä eri visualisointikomponentteja. 

## Projektin tekijät
Projektin toteuttamisessa on ollut mukana neljä ohjelmistokehityksen opiskelijaa, joilla jokaisella on erilaisia taustoja ja kokemuksia web-kehityksestä. 

Kaisa Kangas on ohjelmistokehityksen opiskelija. Päätoimisesti Kaisa työskentelee ohjelmistotestaajana. Kaisa on vastannut projektin käyttöliittymän suunnittelusta ja toteutuksesta sekä tehnyt Visualisaatio 3 -kontrollerin ja Visualisaatio 2 -komponentin front-endiin. 

Anssi Kulotie on ohjelmistokehityksen opiskelija, joka työskentelee päätoimisesti IT-alalla. Työtehtävissä on kertynyt kokemusta omatekoisista käyttöliittymistä ja niiden haasteista. Projektissa Anssi on vastannut Azure-tietokannan luomisesta ja ylläpidosta sekä toteuttanut Visualisaatio 1:n kontrollerin ja front-end komponentin. 

Miikka Niska on ohjelmistokehityksen opiskelija, jolla on jonkin verran aiempaa työkokemusta web-ohjelmoinnista. Miikka on vastannut ER-diagrammin ja MS SQL:n suunnittelusta sekä toteuttanut kontrollerin Visualisaatio 2:lle ja Visualisaatio 3 ja 5-komponentit. Lisäksi hän on vastannut projektin tietokannan suunnittelusta. 

Esa Salminen on ohjelmistokehityksen opiskelija, jolla on aiempaa kokemusta C#:lla toteutetusta back-endistä töiden ja omien projektien kautta. Esa toimii projektin vetäjänä ja vastaa projektin yleisestä johtamisesta ja koordinoinnista. Lisäksi hän on vastannut rajapinnan käyttäjätesteistä, front-end testeistä, muutamasta kontrollerikomponentista sekä visualisaatio 4:stä.

## Käyttöliittymän toteutus

Yksittäisiä visualisointinäkymiä sovellukseen luotiin viisi kappaletta, joista visualisoinnit 1–3 sisällytettiin ensimmäiseen näkymään ja visualisoinnit 4–5 toiseen näkymään. 
Rekisteröinnin ja kirjautumisen lisäksi käyttäjätunnuksen voi poistaa ja samalla poistuu luotu käyttäjäkohtainen visualisointinäkymä.

![Etusivun kuva](https://user-images.githubusercontent.com/115356463/235495549-3c54dc02-4476-4cab-b4bc-4e5fb4eaf2f5.PNG)
**Kuva 1. Etusivu**

Käyttäjätunnuksen rekisteröinti tapahtuu klikkaamalla ”Sign up!” -painiketta etusivulla (kuva 1), josta käyttäjä ohjataan rekisteröitymissivulle. Rekisteröitymisen jälkeen käyttäjä ohjataan takaisin kirjautumiseen, jonka jälkeen avautuu ensimmäinen visualisointinäkymä ja sivuston yläpalkista on valittavana kaikki kolme erilaista näkymää.

Ensimmäinen näkymä sisältää lämpötilan ja C02-pitoisuuden visualisoinnit, toinen näkymä päästölähteiden visualisoinnit ja kolmas on käyttäjän muokkaama näkymä.
Yläpalkin oikeasta reunasta käyttäjä pääsee kirjautumaan ulos ja käyttäjänimen vieressä olevasta roskakori-ikonista käyttäjä pääsee poistamaan käyttäjätunnuksensa.

## Projektin teknologiat

Projektissa käytettiin useita eri teknologioita. Backend-kehityksessä käytettiin C#-kieltä, joka on yleinen kieli .NET Framework- ja .NET Core -kehitysympäristöissä. C#:lla toteutettiin projektin tietokantaan liittyvät toiminnot, kuten tiedon tallennus ja hakeminen. Backend-ohjelmointi toteutettiin käyttämällä Visual Studio Community 2022 -ohjelmistoa. 

Käyttöliittymän suunnittelussa käytettiin Figma-ohjelmaa, joka on verkkopohjainen suunnittelu- ja prototyyppityökalu. Figmalla toteutettiin projektin käyttöliittymän eri sivujen ja näkymien suunnittelu ja prototyyppien tekeminen. 

Frontend-kehityksessä käytettiin JavaScriptin React-kirjastoa, joka on yleisesti käytetty web-sovellusten käyttöliittymien toteuttamisessa. Reactilla toteutettiin projektin käyttöliittymän eri komponentit, jotka kommunikoivat backendin kanssa. Kehitysohjelmistona toimi Visual Studio Code. 

Projektin tietokanta toteutettiin Azuressa, joka on Microsoftin pilvipalvelu. Tietokanta toteutettiin serverless-ratkaisuna, mikä mahdollisti skaalautuvan ja joustavan tietokannan kehittämisen ja ylläpidon projektin edetessä. Tietokannan kehityksessä käytettiin SQL Server Management Studio -ohjelmistoa. 

Projektin kehitystä hallinnoitiin ja dokumentoitiin GitHubissa. GitHubissa ylläpidettiin koodin versionhallintaa ja projektin hallinnoimisessa ja tehtävänjaossa käytettyä kanban-taulua. 

Linkki projektin API-dokumentaatioon: https://saes.stoplight.io/docs/carbon-cruncher/gidasjqewjmst-carbon-cruncher-api



