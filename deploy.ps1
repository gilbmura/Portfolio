# Add all changes
git add .

# Commit changes
$message = Read-Host -Prompt "Enter commit message"
git commit -m "$message"

# Push to GitHub
git push origin main

Write-Host "Changes pushed to GitHub!" -ForegroundColor Green
Write-Host "Your site will be available at: https://gilbmura.github.io/Portfolio/" -ForegroundColor Cyan
Write-Host "Note: It might take a few minutes for changes to appear." -ForegroundColor Yellow 