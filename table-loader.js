const tableContainer = document.getElementById('tableContainer');
const tableRow = document.createDocumentFragment();
const footerContainer = document.getElementById('footerContainer');
const footerRow = document.createDocumentFragment();

fetch("challenge-data.json")
      .then(response => response.json())
      .then(data => {

        console.log(data);

        // Get total count of challenges entries
        var challengeCount = data.challenges.length;
        console.log("challengeCount = " + challengeCount);

        // Tally completed challenges with this var
        var completedTotal = 0;

        for(let i = 0; i < challengeCount; i++) {
            let rank;
            let difficultyNum;
            // Create <tr> element
            let tr = document.createElement("tr");
            // Create <th scope="row"> element: Challenge name
            let th = tr.appendChild(document.createElement('th'));
            th.scope = "row";
            // Create <td> element: Difficulty
            let difficulty = document.createElement('td');
            // Create <td> element: Links
            let links = document.createElement('td');
            // Create <td> element: Status
            let status = document.createElement('td');
            
            currentChallengeData = data.challenges[i];
            console.log(currentChallengeData.challengeurl);
            console.log("difficulty: " + currentChallengeData.difficulty); 

            // Tally completed challenges
            if(currentChallengeData.completed == true) {
              completedTotal++;
            }

            // Build the HTML with the name of the challenge linked to the challenge URL on Frontend Mentor
            var challengeHTML = `<a href="` + `${currentChallengeData.challengeurl}` + "\">" + `${currentChallengeData.challenge}` + "</a>";
            console.log(challengeHTML);
            // Add challengeHTML to table header
            th.innerHTML = challengeHTML;

            if( currentChallengeData.difficulty == 1) {
              rank = "Newbie";
              difficultyNum = 1;
            }
            // Build the HTML for the difficulty box to be styled later
            var difficultyHTML = `<span class="difficulty-wrapper"><span class="number-wrapper">` + difficultyNum + `</span><span class="text-wrapper">` + rank + `</span></span>`;
            // Add difficulty to table row
            difficulty.innerHTML = difficultyHTML;

            // Build the HTML for the links. SVGs are contained in svg-defs.svg and referenced with <use>
            if(currentChallengeData.completed == false) {
              var linksHTML = "";
            } else {
            var linksHTML = `<a href="` + `${currentChallengeData.livesiteurl}` + "\">" + `<svg><use xlink:href="svg-defs.svg#globe"></svg></a>`
              + `<a href="` + `${currentChallengeData.githuburl}` + "\">" + `<svg><use xlink:href="svg-defs.svg#githubcat"></svg></a>`
              + `<a href="` + `${currentChallengeData.solutionurl}` + "\">" + `<img src="favicon-32x32.png"></a>`;
            }
            // Add links to table row
            links.innerHTML = linksHTML;

            // Build HTML for status: true == "Complete!", false == "In progress"
            if(currentChallengeData.completed == true) {
              var statusHTML = `<span class="difficulty-wrapper"><span class="icon-wrapper">`
                + `<svg><use xlink:href="svg-defs.svg#checkmark" /></svg></span>` 
                + `<span class="text-wrapper">Completed!</span></span>`;
            } else {
              var statusHTML = `<span class="difficulty-wrapper"><span class="reverse-icon-wrapper"><svg><use xlink:href="svg-defs.svg#in-progress"></svg>`
                + `</span><span class="reverse-text-wrapper">In progress</span></span>`;
            }
            // Add status to table row
            status.innerHTML = statusHTML;

            // We all done. Put all <td> HTML into appropriate <tr> element
            tr.appendChild(difficulty);
            tr.appendChild(links);
            tr.appendChild(status);

            tableRow.appendChild(tr);
            tableContainer.appendChild(tableRow);
        }

        console.log("completed challenges: " + completedTotal);

        // Create <tr> element in <tfoot> to display total of completed challenges
        // Doing this below the for loop since we only need to do this once
        // We'll get the total of the completed challenges inside the for loop
        // and create the HTML after the for loop.
        let tfootRow = document.createElement('tr');
        // Create <th scope="row" colspan="1"> in <tfoot>
        let tfootHead = tfootRow.appendChild(document.createElement('th'));
        tfootHead.scope = "row";
        tfootHead.colSpan = "1";
        // Create <td colspan="2" for the number of challenges completed 
        let challengesFoot = document.createElement('td');
        challengesFoot.colSpan = "2";
        // Create last element, which is an empty <td>
        let spacer = document.createElement('td');

        // Build HTML for challenges completed
        var challengesCompletedHTML = "Challenges completed";
        tfootHead.innerHTML = challengesCompletedHTML;

        // Build HTML for total number of completed challenges
        challengesFoot.innerHTML = completedTotal;

        // Build empty <td> tag to fill out row
        spacer.innerHTML = "";

        tfootRow.appendChild(challengesFoot);
        tfootRow.appendChild(spacer);

        footerRow.appendChild(tfootRow);
        footerContainer.appendChild(footerRow);
      })

