# `git show` vs `git cat-file -p`

## Comparing Commands with a Commit Hash Argument
`git cat-file -p <commit-hash>` can show similar information to `git show <commit-hash>`. Both commands can be used to display the contents of a commit, but they provide the information in slightly different formats.

### `git show <commit-hash>`
This command provides a detailed view of a commit, including:
- Commit message
- Author and date
- Diff of changes introduced by the commit

Example:
```bash
git show <commit-hash>
```

### `git cat-file -p <commit-hash>`
This command displays the contents of a commit object in a more raw format. It shows the metadata of the commit (author, date, parent commits, etc.) and the tree object associated with the commit, but it does not show the diff of changes introduced by the commit.

Example:
```bash
git cat-file -p <commit-hash>
```

### Example Output Comparison
Assuming we have a commit with hash `abcd1234`:

- **git show abcd1234:**
  ```plaintext
  commit abcd1234
  Author: John Doe <john@example.com>
  Date:   Fri Jul 7 12:34:56 2023 -0700

      Commit message

  diff --git a/file.txt b/file.txt
  index e69de29..d95f3ad 100644
  --- a/file.txt
  +++ b/file.txt
  @@ -0,0 +1 @@
  +Hello, world!
  ```

- **git cat-file -p abcd1234:**
  ```plaintext
  tree 1a2b3c4d5e6f7g8h9i0j
  parent 0987zyxwvu
  author John Doe <john@example.com> 1688783696 -0700
  committer John Doe <john@example.com> 1688783696 -0700

  Commit message
  ```

### Summary

- `git show <commit-hash>` provides a detailed view including the diff of changes.
- `git cat-file -p <commit-hash>` provides a raw view of the commit metadata and the tree object.

Both commands are useful depending on the level of detail you need. If you want to see the actual changes made in a commit, use `git show`. If you want to see the metadata and structure of the commit, use `git cat-file -p`. 
When using `cat-file -p`, you'll get output that includes the hashes for the `tree` and `parent`'(s) (if it's not a root commit) and `blob`'(s). These hashes can be used further to explore the history and content of your repository. For example you could run `git cat-file -p <tree-hash>`, `git cat-file -p <parent-hash>` or `git cat-file -p <blob-hash>`… with the latter triggers the inspection of the blobs actual content.

