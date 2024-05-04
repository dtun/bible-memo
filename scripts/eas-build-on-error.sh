#!/bin/bash

curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GITHUB_API_KEY}" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/dtun/bible/issues \
  -d "{\"title\":\"${EAS_BUILD_PLATFORM}: E2E Test Failure\",\"body\":\"The EAS build failed for build ID ${EAS_BUILD_ID}.\",\"assignees\":[\"dtun\"]}"
