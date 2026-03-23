# check-file-existence-action

![build](https://github.com/thebinaryfelix/file-existence-action/actions/workflows/build.yml/badge.svg)

## 📄 GitHub Action to check if a file exists

This is a GitHub Action to check if a given file or files exist in the repository. It can be used conditionally for running workflow steps based on file existence.

## Usage

The following example [workflow step](https://help.github.com/en/actions/configuring-and-managing-workflows/configuring-a-workflow) will check if the following files exist: `package.json`, `index.ts`, `README.md`, `foo` `*.txt`

```yml
- name: 'Check File Existence'
  uses: thebinaryfelix/check-file-existence-action@vX.X.X # check the latest release
  with:
    files: 'package.json, index.ts, README.md, *.txt'
```

## ⚙️ Options

The following input variables options can be configured:

| Input variable    | Necessity | Description                                                                                                                                      | Default |
| ----------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `files`           | Required  | Comma separated string with paths to files and directories to check for existence. Supports [glob paterns](https://github.com/isaacs/node-glob). |         |
| `ignore_case`     | Optional  | Ignore if a file name has upper or lower cases.                                                                                                  | `true`  |
| `follow_symlinks` | Optional  | Indicates whether to follow symbolic links.                                                                                                      | `true`  |

## Outputs

- `exists`: Outputs `true` if the file(s) exists, otherwise `false`.

## Example

```yml
name: 'Check File Existence'

on: [push, pull_request]

jobs:
  check_file_existence:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository
        uses: actions/checkout@v4

      - name: Check file existence
        id: check_files
        uses: thebinaryfelix/check-file-existence-action@vX.X.X # check the latest release
        with:
          files: 'package.json, LICENSE, README.md'

      - name: Files exist
        if: steps.check_files.outputs.exists == 'true'
        # Only runs if all of the files exist
        run: echo "All files exist!"
```

# Releasing a New Version

> This process is performed locally by the maintainer.

## Prerequisites

- You are on the `main` branch with a clean working tree
- All PRs to be included in the release have been merged
- Each merged PR included a changelog fragment in `fragments/` (encouraged, but not enforced by CI)

## Steps

### Step 1 - Build the distribution

```sh
yarn build
```

This compiles the TypeScript source and bundles it into `dist/index.js`, which is the artifact the action executes at runtime. Commit the updated `dist/` if it changed:

```sh
git add dist/
git commit -m "chore: update dist"
```

### Step 2 - Run the release command

```sh
yarn release
```

> **Troubleshooting:** If you get `ERROR No upstream configured for current branch`, your branch has no upstream set. Fix it by pushing with:
> ```sh
> git push --set-upstream origin <branch-name>
> ```
> Then run `yarn release` again.

This command:
1. Reads all files in `fragments/` via `news-fragments` and appends them to [CHANGELOG.md](CHANGELOG.md)
2. Bumps the `version` field in `package.json` via `@release-it/bumper`
3. Creates a release commit and a git tag (e.g. `v1.2.0`)
4. Pushes the commit and tag to `main`

> `HUSKY=0` is set internally in the script to skip git hooks during the automated release commit, preventing `commitlint` from blocking it.

### Step 3 - Update the major version tag (optional)

If the release includes breaking changes, update the floating major tag (e.g. `v1`) to point to the new commit:

```sh
git tag -fa v1 -m "Update v1 tag"
git push origin v1 --force
```

---

# Contribute

Feel free to fork this repository and open a Pull Request to:

- Include a feature
- Bugfixes
- Update documentation

To do so, follow the steps below:

## Steps to contribute

### Step 1 - Fork the repo

Fork this repository and create a branch to work on.

### Step 2 - Before openning a Pull Request

Before openning a pull request, make sure you included the changelog `fragments`.

To add a changelog fragment, execute `npx news-fragments create [type]` and replace `[type]` for one of the following:

- feature
- bugfix
- doc
- removal
- misc

Include a clear message of all the changes you are including in your pull request.

### Step 3 - Open the pull request

When openning your pull request, make sure to include all details of **what you did** and the **motivation** behind it.

## License

Copyright © 2022 [Mateus Félix](https://github.com/thebinaryfelix)

check-file-existence-action is licensed under the [MIT License](https://github.com/thebinaryfelix/check-file-existence-ation/blob/main/LICENSE).
