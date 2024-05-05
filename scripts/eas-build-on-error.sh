#!/bin/bash

curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GITHUB_API_KEY}" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/dtun/bible-memo/issues \
  -d "{\"title\":\"EAS Build Failure: ${EAS_BUILD_PLATFORM}\",\"body\":\"The EAS build failed for build ID ${EAS_BUILD_ID}.\",\"assignees\":[\"dtun\"]}"
