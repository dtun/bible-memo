#!/bin/bash

# Variables
TOKEN="${GITHUB_API_KEY}"
BUILD_ID="${EAS_BUILD_ID}"
BUILD_PLATFORM="${EAS_BUILD_PLATFORM}"
OWNER='dtun'
REPO='bible'
TITLE="${BUILD_PLATFORM}: E2E Build Failure"
BODY="The EAS build failed on platform ${BUILD_PLATFORM} with build ID ${BUILD_ID}."

# GitHub API URL
URL="https://api.github.com/repos/$OWNER/$REPO/issues"

# JSON data
DATA=$(jq -n --arg title "$TITLE" --arg body "$BODY" \
    '{"title": $title, "body": $body}')

# Sending request to GitHub API to create issue
curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "$URL" \
  -d "$DATA"
