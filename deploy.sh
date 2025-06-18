#!/bin/bash

# Add all changes
git add .

# Commit changes
echo "Enter commit message:"
read message
git commit -m "$message"

# Push to GitHub
git push origin main

echo "Changes pushed to GitHub!"
echo "Your site will be available at: https://gilbmura.github.io/Portfolio/"
echo "Note: It might take a few minutes for changes to appear." 