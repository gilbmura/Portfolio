// GitHub Repository Fetcher
document.addEventListener('DOMContentLoaded', () => {
    
    const username = 'gilbmura';
    
    // Elements
    const githubRepos = document.getElementById('githubRepos');
    const githubLoader = document.getElementById('githubLoader');
    const githubError = document.getElementById('githubError');
    const githubUsername = document.querySelector('.github-username a');
    
   
    if (githubUsername) {
        githubUsername.href = `https://github.com/${username}`;
        githubUsername.innerHTML = `<i class="fab fa-github"></i> @${username}`;
    }
    
    // Fetch GitHub repositories
    async function fetchGitHubRepos() {
        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch repositories');
            }
            
            const repos = await response.json();
            displayRepos(repos);
        } catch (error) {
            console.error('Error fetching GitHub repos:', error);
            showError();
        }
    }
    
    // Displaying repositories
    function displayRepos(repos) {
        
        githubLoader.style.display = 'none';
        
        if (repos.length === 0) {
            githubRepos.innerHTML = '<p class="no-repos">No public repositories found.</p>';
            return;
        }
        
       
        const repoHTML = repos.map(repo => {
            // Get topics/languages if available
            const topics = repo.topics || [];
            
            // Format date
            const updatedAt = new Date(repo.updated_at);
            const formattedDate = updatedAt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            
            return `
                <div class="github-repo">
                    <div class="repo-header">
                        <h3 class="repo-name">
                            <a href="${repo.html_url}" target="_blank">
                                <i class="fab fa-github"></i> ${repo.name}
                            </a>
                        </h3>
                    </div>
                    <div class="repo-description">
                        <p>${repo.description || 'No description provided'}</p>
                    </div>
                    <div class="repo-meta">
                        ${repo.language ? `<span class="repo-language"><i class="fas fa-code"></i> ${repo.language}</span>` : ''}
                        <span class="repo-updated"><i class="fas fa-history"></i> Updated: ${formattedDate}</span>
                    </div>
                    <div class="repo-stats">
                        <span class="repo-stars"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                        <span class="repo-forks"><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                    </div>
                    ${topics.length > 0 ? `
                    <div class="repo-topics">
                        ${topics.slice(0, 4).map(topic => `<span class="repo-topic">${topic}</span>`).join('')}
                    </div>
                    ` : ''}
                </div>
            `;
        }).join('');
        
        githubRepos.innerHTML = repoHTML;
    }
    
    // error message handling
    function showError() {
        githubLoader.style.display = 'none';
        githubError.style.display = 'block';
    }
    
    // Initializing
    fetchGitHubRepos();
}); 