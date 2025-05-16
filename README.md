# Eksamen-AdrianMeyer
JavaScript & API Eksamen 2025
Laget av Adrian Meyer

Innholdsfortegnelse
Generelt

Avhengigheter

Funksjonalitet

Notater

Generelt
Dette prosjektet er laget som eksamensbesvarelse i JavaScript og API våren 2025.
Applikasjonen er utviklet med vanlig HTML, CSS og JavaScript (uten rammeverk eller biblioteker).

Prosjektet er modulbasert, følger gjennomgående camelCase-navngivning og bruker getElementById for all DOM-manipulasjon.
Disse valgene er gjort av meg for å sikre konsekvent, lettlest og forutsigbar kode, selv om det ikke var et eksplisitt krav i oppgaveteksten.

Avhengigheter
Jest
Brukes til enhetstesting av JavaScript-funksjonalitet. Testene ligger i /tests-mappen.

Backend og API - CrudCrud
Dette prosjektet bruker CrudCrud som midlertidig backend for å lagre og hente brukerdata. CrudCrud tilbyr en enkel REST API som er gratis å bruke, men med noen begrensninger.

Viktig:

CrudCrud-endpointet som brukes i prosjektet varer kun i 24 timer fra det opprettes.

Sensor må derfor opprette en egen gratis endpoint-URL på CrudCrud.com for å kunne teste lagring og henting av data.

Når ny URL er opprettet, må den byttes ut i prosjektets konfigurasjonsfil api.js er definert i koden.

Eksempel på URL i koden:

const API_URL = "https://crudcrud.com/api/din-egen-endpoint/brukere";

Ingen andre eksterne biblioteker
All annen funksjonalitet er laget med vanilla JS.

Funksjonalitet
Brukerhåndtering

Registrering og innlogging med validering.

Brukerdata lagres og hentes via API.

Swipe-funksjon

Brukeren kan swipe mellom profiler for å finne interessante matcher.

Filtrering

Dynamisk filtrering av brukere basert på kriterier.

Eksternt API

Brukerdata hentes fra offentlig tilgjengelig API.

Modulbasert kode

Kodebasen er delt opp i gjenbrukbare moduler for bedre struktur og vedlikehold.

Bonusfunksjoner

Gi rose: Brukere kan gi hverandre en "rose".

Lys/mørk modus: Brukeren kan bytte mellom lyst og mørkt tema.

Greeting-message: Dynamisk velkomstmelding til brukeren.

Testing

Enhetstester for sentrale funksjoner med Jest.

Design

Enkel, men gjennomført CSS for bedre brukeropplevelse.

Notater
Eget valg av kodepraksis:
Jeg har valgt å bruke camelCase og getElementById gjennomgående for å sikre konsistens og lesbarhet i koden. Dette gir tydelig struktur og gjør det lettere å vedlikeholde og videreutvikle prosjektet.

Ingen rammeverk brukt:
Alt er laget med vanilla JavaScript, HTML og CSS.

Krav til git/GitHub:

Foreleser er lagt til som collaborator.

Ingen commits eller branches er slettet.

.git-mappen beholdes i prosjektet.

Installasjon og bruk:

Klon repoet:

text
git clone https://github.com/sevarianto/Eksamen-AdrianMeyer.git
cd Eksamen-AdrianMeyer
Installer avhengigheter:

text
npm install
Kjør tester:

text
npm test
Åpne index.html i nettleser for å bruke applikasjonen.

Slutt på dokumentet
