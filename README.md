# check-file-existence-action

![build](https://github.com/thebinaryfelix/file-existence-action/actions/workflows/build.yml/badge.svg)

## 📄 GitHub Action to check if a file exists

This is a GitHub Action to check if a given file or files exist in the repository. It can be used conditionally for running workflow steps based on file existence.

## Usage

The following example [workflow step](https://help.github.com/en/actions/configuring-and-managing-workflows/configuring-a-workflow) will check if the following files exist: `package.json`, `index.ts`, `README.md`, `foo` `*.txt`

```yml
- name: 'Check File Existence'
  uses: thebinaryfelix/check-file-existence-action@v1
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
        uses: actions/checkout@v1

      - name: Check file existence
        id: check_files
        uses: thebinaryfelix/check-file-existence-action@v1
        with:
          files: 'package.json, LICENSE, README.md'

      - name: Files exist
        if: steps.check_files.outputs.exists == 'true'
        # Only runs if all of the files exist
        run: echo "All files exist!"
```

## License

Copyright © 2022 [Mateus Félix](https://github.com/thebinaryfelix)

check-file-existence-action is licensed under the [MIT License](https://github.com/thebinaryfelix/check-file-existence-ation/blob/main/LICENSE).
