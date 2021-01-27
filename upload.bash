#!/usr/bin/bash

echo "....Adding files...."
git add .
echo "....Last logs...."
git log --oneline | head -n 5
echo "....Write down the new commit name...."
read -p ">> " name
git commit -m "$name"
echo "....Uploading to github...."
git push
echo "....Finished...."
