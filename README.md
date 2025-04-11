# .github

This stores defaults for DigiServe including issue templates.

See: [Creating a default community health file](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file)

## Workflows

These are shared github workflows used in many of our repositories.

### [Add Label to Issues](./.github/workflows/addLabelToIssue.yml)

**Trigger:** issues

### [Merge and Release](./.github/workflows/branch-merge-release.yml)
Merges a branch into master and creates a release\
**Trigger:** workflow_call
#### Inputs
|Name|Description|Type|Required|
|---|---|---|---|
|branch|Branch to merge|string|✔|
|tag|Exisiting tag to create the release from|string|✔|
|body|Release body|string|✔|
|base|Base branch to merge into (default `master`)|string||

### [Bump Version](./.github/workflows/bump-version.yml)
Increments the version using semver and saves it package.json.
Creates a tagged commit with the new version\
**Trigger:** workflow_call
#### Inputs
|Name|Description|Type|Required|
|---|---|---|---|
|type|Release type (should be major, minor or patch)|string|✔|
|build_meta|Build metadata to append to the version|string||
|ref||string||
 #### Outputs
|Name|Description|
|---|---|
|new_version||

### [Check Release Label](./.github/workflows/check-pr-release-label.yml)
Used in PRs to check for a valid release label. Adds a comment if it's missing.\
**Trigger:** workflow_call

### [Create Release](./.github/workflows/create-release.yml)
Read release notes from pr and create version from tag\
**Trigger:** workflow_call
#### Inputs
|Name|Description|Type|Required|
|---|---|---|---|
|tag||string|✔|

### [Cypress E2E Tests](./.github/workflows/cypress-e2e-tests.yml)
Runs our Cypress E2E test suite. Includes setting up AppBuilder using the github reference of the current repository\
**Trigger:** workflow_call
#### Inputs
|Name|Description|Type|Required|
|---|---|---|---|
|ref||string||

### [Dependabot Auto Merge](./.github/workflows/dependabot-merge.yml)
Automatically merge dependabot prs from ab-utils\
**Trigger:** workflow_call
 #### Secrets
|Name|Description|
|---|---|
|DEPENDABOT_TOKEN|PAT|

### [Docker Build and Push](./.github/workflows/docker-build.yml)
Builds a new docker image and push it to dockerhub\
**Trigger:** workflow_call
#### Inputs
|Name|Description|Type|Required|
|---|---|---|---|
|tags|Docker tags to publish with (comma seperated)|string|✔|
|base_tag|Tag of digiserve/service-cli to use as the base (master/develop)|string||
|branch|Specify the branch to building|string||
 #### Secrets
|Name|Description|
|---|---|
|DOCKER_USERNAME||
|DOCKER_PASSWORD||

### [Generate Build Meta Data](./.github/workflows/generate-build-meta.yml)

**Trigger:** workflow_call
#### Inputs
|Name|Description|Type|Required|
|---|---|---|---|
|version||string|✔|
|identifier||string|✔|
 #### Outputs
|Name|Description|
|---|---|
|build||

### [Get PR Release Label](./.github/workflows/get-pr-release-label.yml)
Checks a pr for valid release labels ('major', 'minor', 'patch', 'skip-release').
It also verifies that only one release label is present\
**Trigger:** workflow_call
 #### Outputs
|Name|Description|
|---|---|
|label|The label ('major', 'minor', 'patch', or 'no_release')|
|valid|True if 1 label was found|

### [Open PR](./.github/workflows/open-pr.yml)
Creates a PR\
**Trigger:** workflow_call
#### Inputs
|Name|Description|Type|Required|
|---|---|---|---|
|branch|Branch to merge|string|✔|
|title|PR Title|string|✔|
|body|PR Body|string|✔|
|release_notes|Notes to be used when the PR gets merged.|string|✔|
|base|Base to merge into (default `master`).|string||

### [Update Sub Repo](./.github/workflows/update-sub-repo.yml)
Updates a sub repo to a given version and commits it to a new branch.\
**Trigger:** workflow_call
#### Inputs
|Name|Description|Type|Required|
|---|---|---|---|
|repository|Full sub repo name with organization|string||
|short_name|Short name for the sub repo|string|✔|
|folder|Folder name for the sub repo in the main repo|string|✔|
|version|Git tag in the sub repo|string|✔|
 #### Secrets
|Name|Description|
|---|---|
|TOKEN||
 #### Outputs
|Name|Description|
|---|---|
|branch|Name of the generated branch that this workflow committed to.|
