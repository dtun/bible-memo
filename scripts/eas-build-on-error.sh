#!/bin/bash

curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GITHUB_API_KEY}" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/dtun/bible/issues \
  -d "{"title":"${BUILD_PLATFORM}: E2E Build Failure","body":"The EAS build failed on platform ${BUILD_PLATFORM} with build ID ${BUILD_ID}.","assignees":["dtun"]"}"
