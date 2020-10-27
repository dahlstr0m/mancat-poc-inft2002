# inft2002-gr4-portfolio

---

## Install

### Install client

`cd client` `npm install`

### Build client script file

`npm start`

### Test client

`npm test`

### Install server

`cd server` `npm install`

### Start server

`npm start`

### Test server

## `npm test`

## How to git

### Clone project:

**1. Åpne command prompt, naviger til ønsket mappe og last ned prosjektet:**
`git clone https://gitlab.stud.idi.ntnu.no/hpbastia/inft2002-gr4-portfolio.git`

### Etter endringer:

**1. Pass på å velge riktig branch:** `git checkout <branch>` Eventuelt lag en ny med:
`git checkout -b <ny_branch>`

**2. Legg til filer som skal lastes opp:** `git add <filnavn>` `git add .` (for alle nye/endrede
filer)

**3. Skriv en commit message (med en god beskrivelse av endringene):** `git commit -m "<melding>"`

**4. Push filer** For å pushe filer til en ny branch for første gang:
`git push --set-upstream origin <branch>` Deretter kan man bruke: `git push`

### Etter alt fungerer og man skal merge til master:

**Pass på at alle filer er formatert med prettier, koden ikke har noen flow-errorer og at alle
tester fungerer!**

**1. Bytt til master (viktig!):** `git checkout master`

**2. Merge branch:** `git merge <branch>` `git push`

**3. Slett den gamle branchen om den ikke skal brukes mer** `git branch -d <branch>`
`git push origin --delete <branch>`
