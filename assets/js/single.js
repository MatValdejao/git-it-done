var issueContanerEl = document.getElementById("issues-container");

var getRepoIssues = function (repoName) {
    var apiUrl = "https://api.github.com/repos/" + repoName + "/issues?direction=asc";

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayIssues(data);
            })
        }
        else {
            alert("There was a problem with your request!");
        }
    })
}

var displayIssues = function (issues) {
    if (issues.length === 0) {
        issueContanerEl.textContent = "This repo has open issues!";
        return; 
    }

    // create a link element to take users to the issue on github
    for (var i = 0; i < issues.length; i++) {
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // create span to hold issue title 
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");
        
        // check if issue is issue or pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        }
        else {
            typeEl.textContent = "(Issue)"
        }

        // append to container
        issueEl.appendChild(typeEl);

        // append to page
        issueContanerEl.appendChild(issueEl);
    }
}

getRepoIssues("facebook/react")