document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("searchForm");
    const input = document.getElementById("username");
    const gallery = document.getElementById("gallery");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const username = input.value.trim();
        if (username) {
            fetchRepos(username);
        }
    });
});

function fetchRepos(username) {
    const gallery = document.getElementById("gallery");
    gallery.textContent = ""; 

    // Show loading message
    const loadingMessage = document.createElement("p");
    loadingMessage.textContent = "Loading repositories...";
    gallery.appendChild(loadingMessage);

    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            return response.json();
        })
        .then((repos) => {
            gallery.textContent = ""; 

            if (repos.length === 0) {
                const noReposMessage = document.createElement("p");
                noReposMessage.textContent = "No repositories found.";
                gallery.appendChild(noReposMessage);
                return;
            }
            displayRepos(repos);
        })
        .catch((error) => {
            console.error("Error:", error);
            gallery.textContent = "";
            const errorMessage = document.createElement("p");
            errorMessage.textContent = `Error: ${error.message}`;
            gallery.appendChild(errorMessage);
        });
}

function displayRepos(repos) {
    const gallery = document.getElementById("gallery");

    repos.forEach((repo) => {
        // Create the repo card container
        const repoElement = document.createElement("div");
        repoElement.classList.add("repo-card");

        // Create GitHub icon
        const icon = document.createElement("i");
        icon.classList.add("fa-brands", "fa-github");

        // Create the title container
        const titleContainer = document.createElement("h3");

        // Create the link
        const link = document.createElement("a");
        link.href = repo.html_url;
        link.target = "_blank";
        link.textContent = repo.name;

        // Append link and icon to the title
        titleContainer.appendChild(icon);
        titleContainer.appendChild(link);

        // Create description
        const description = document.createElement("p");
        description.textContent = repo.description || "No description";

        // Create created date
        const createdDate = document.createElement("p");
        createdDate.textContent = `Created: ${new Date(repo.created_at).toDateString()}`;

        // Create updated date
        const updatedDate = document.createElement("p");
        updatedDate.textContent = `Updated: ${new Date(repo.updated_at).toDateString()}`;


        // Create watchers count
        const watchers = document.createElement("p");
        watchers.textContent = `Watchers: ${repo.watchers}`;

        // Programming Language
        const language = document.createElement("p");
        language.textContent = `Language: ${repo.language || "Not specified"}`;

        // Fetch commit count
        fetch(repo.commits_url.replace("{/sha}", ""))
            .then(response => response.json())
            .then(commits => {
                const commitCount = document.createElement("p");
                commitCount.textContent = `Commits: ${commits.length}`;
                repoElement.appendChild(commitCount);
            })
            .catch(error => console.error(`Error fetching commits for ${repo.name}:`, error));

        // Append all elements to the repo card
        repoElement.appendChild(titleContainer);
        repoElement.appendChild(description);
        repoElement.appendChild(createdDate);
        repoElement.appendChild(updatedDate);
        repoElement.appendChild(watchers);
        repoElement.appendChild(language);

        // Append repo card to gallery
        gallery.appendChild(repoElement);
    });
}
