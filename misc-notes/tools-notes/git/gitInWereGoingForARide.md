# Git In, We're going for a ride 😎. 
✨ `git [command] --help`

**Overview**
* Review of Git Basics
* History-changing Git commands
* Different ways of changing history
* Using remotes to change history
* Dangers of history-changing operations
* Pointers
* Introduction to contributing

---

## Git Intro & Graph Theory
💭 Leonhard Euler, 1735AC.

Graph theory can be used to describe a lot of things.
One straightfoward example is **maps**.
You can _think_ of graph theory as a way of encoding information about two aspects of a map: **places to go, and ways to get there.**

The point: **a Git repository is one giant graph**

Most of the time when you interact with Git, you're working with commits one way or another.
A git commit consists of two things: 
  1. a pointer to the state of your code at some moment in time.
  2. Zero or more pointers to "parent" commits.

(_Hint: the word "pointer" means you're probably talking about a graph… bitch._)

A Git commit is a node in a graph, and each one of those nodes can point to other nodes that came before them.
Another fun fact about Git commits: A commits ID is a SHA-1 hash of several pieces of information: the contents of the commit, and the IDs of its parent commits.

### Git Objects & Garbage Collection
#### Git Objects
1. **Blob Object**:
   - **Blobs** store the contents of files. Each blob is a snapshot of a file's content at a particular point in time.
   - Blobs do not store metadata like filenames or directory paths.

2. **Tree Object**:
   - **Trees** store the structure of directories and files.
   - A tree object contains references (pointers) to blobs and other tree objects. This way, it represents both files and subdirectories.
   - Each entry in a tree object includes:
     - The SHA-1 hash of the blob or subtree.
     - The file mode (permissions).
     - The filename or directory name.

3. **Commit Object**:
   - **Commits** store the state of the repository at a particular point in time.
   - A commit object contains:
     - A reference to a tree object that represents the directory structure and the state of the files at the time of the commit.
     - Metadata about the commit, such as the author, committer, date, and commit message.
     - References to parent commits (for merges or history tracking).

##### Blobs and Trees
###### Blobs
A **blob** is an abbreviation for _binary large object_.
It is a fundamental data type in Git.
It represents the contents of a file as a binary object, storing the files data without any metadata like filename, permissions, or directory structure.

When you add a file to a Git repository, Git compresses the files contents and stores them in the `.git/objects` folder mentioned above as a blob. 
Each blob is identified by a unique SHA-1 has of its contents.

Each blob is referenced by a tree object, which represents the directory structure, and the tree object is referenced by the commit object.
The **blob** is unreachable because it has been erased from history.

The default grace period for reaching _unreachable_ objects is typically 90 days.

###### How Blobs and Trees Reference Each Other
1. **Blobs in Trees**:
  - When you add a file to the repository and commit it, Git creates a blob for the file's content.
  - Git then creates a tree object that includes a reference to this blob. The tree object also includes the filename and file mode, effectively placing the blob within the directory structure.

2. **Trees in Commits**:
  - When you commit changes, Git creates a new tree object representing the entire directory structure at the time of the commit.
  - The commit object then references this tree object, capturing the state of the project at that specific commit.

###### Repository Data Storage Visualized
Imagine you have a repository with the following structure:

``` sh
my_repo/
├── file1.txt
└── dir/
    └── file2.txt
```

1. **Blobs**:
   - `file1.txt` content is stored in a blob (let's say with SHA-1 hash `blob1`).
   - `file2.txt` content is stored in another blob (`blob2`).

2. **Tree Objects**:
   - A tree object for `dir` includes an entry for `file2.txt` referencing `blob2`.
   - A tree object for the root directory includes entries for `file1.txt` referencing `blob1` and for `dir` referencing the tree object of `dir` in the forms of SHA-1 hashes:
    * A tree object references directories by storing the SHA-1 hash of another tree object along with the directory name and mode. Using the above visual, the tree object for `my_repo/` might look like this:
    ```
    100644 blob blob1_sha    file1.txt
    040000 tree dir_tree_sha dir
    ```

3. **Commit Object**:
   - The commit object references the tree object _representing the root directory_.

###### Information Retrieval Commands
To see these objects, you can use the following commands:

1. **View the commit object**:
   ```sh
   git cat-file -p <commit_sha1>
   ```

2. **View the tree object referenced by the commit**:
   ```sh
   git cat-file -p <tree_sha1>
   ```

3. **View the blob object referenced by the tree**:
   ```sh
   git cat-file -p <blob_sha1> # {1}
   ```

   {1} To find the Blobs SHA-1 Hash, use the `git ls-files` command with the `-s` option to show the SHA-1 hashes of the blobs for your files.

###### Summary
- **Blobs** store file contents.
- **Trees** organize blobs and other trees, representing the directory structure.
- **Commits** reference trees, capturing the state of the repository at a specific point in time.

Each layer references the one below it, building up the complete structure of your project in a way that efficiently tracks changes and maintains history.

#### Garbage Collection
When you use `git commit --amend` (more on this command below), you're actually building a completely different commit, and pointing your local branch reference to it instead.

**The initial commit you made (before ammending) is still there on disk, and you can still get back to it.**

However, in the interest of not cluttering up your view, neither `git log` nor your Git visualizer will show it to you, because it's not part of the history of something, Git thinks, you care about.

Eventually, Git will decide that it's time to run **garbage collection**.
You can trigger this process yourself using, `git gc`.

> **Starting from every branch and every tag, Git walks back through the graph, building a list of every commit it can reach. Once it's reached the end of every path, it deletes all the commits it didn't visit.** 

The unreachable objects that that are removed include commits, blobs, trees, and tags.

Unreachable objects are typically:
  * **Dangling Commits:** commits that are not part of any branches history.
  * **Unreferenced Blobs:** file contents that are not pointed to by any tree or commit.
  * **Old Commits:** commits that were replaced by amended commits.

Garbage collection also handles loose objects into pack files for efficient storage.
An example of a loose file is a file that was a part of a commit (that added the file), that was deleted in an amended commit. 
They are individual files stored in the `.git/objects` directory. 
When an object is no longer referenced by any branch, tag, or other Git object, it is considered "loose."

Something very important to understand about Gits garbage collection algorithm can be expressed as:
> "**Starting from every branch and every tag**, Git walks back through the graph, building a list of every commit it can reach."

### References
> **REFERENCE MAKE COMMITS REACHABLE**
_(References are pointers to commits)_

References come in several flavors: **local branch**, **remote branch**, and **tag**.

On disk, a **local branch reference** consists entirely of a file in your project's `.git/refs/head directory`.
This file contains the 40-byte identifier of the commit that the reference points to… and that's it!

**The entire file is 40 bytes.**
_(If you ever hear that Git allows "cheap branching", this is what they're referring to.)_

In other words, creating a branch in Git just means writing 40 bytes to disk, which is why `git branch foo` is so fucking fast.

**Local branch references** are specific to a single repository: your local one.
Commands that affect local branch references include `commit`, `merge`, `rebase` and `reset`.

**Remote branch references** are also specific to a single repository, but one that's previously been defined as a remote.
Commands that affect remote branches include **fetch** and **push**.

(The `pull` command is a special case: It combines **fetch** and either a `merge` or a `rebase`, depending on your Git configuration.)

**Tag references** are basically like branch references that never move. 
**Once you've created a tag, it will never change** (unless you explicitly update it using the `--force` option).
This behavior makes them useful for marking specific versions of a software package, or marking exactly what got deployed to a production server on a particular date.
The only command that affects **tags**… is `tag`.

---

## Basics Review: Commits, Branches and Pointers
### What are Commits?
Commits are snapshots.
Every time you type in `git commit`, your computer is taking a figurative _picture_ of all the file contents that have been stage with `git add .`
In other words, your entire tracked workspace gets copied. 

### So what is a branch?
One might visualize a branch as a group of commits; However, this isn't the case.
**A branch is actually a pointer to a single commit!**
This leads to the question, "If a branch is just a finger pointing to a single commit, how does that single commit know about all the commits that came before it?"
The answer is that each commit _also_ a pointer that points to the commit that came before it (similar to a linked list data structure). 

Take for example `git rebase -i HEAD~2`. 
This command lets us edit the last two commits.
How does Git know which two commits to edit?
**Pointers!**
We start at `HEAD`, which is a special pointer for keeping track of the branch you're currently on.
`HEAD` points to our most recent commit in the current branch. That commit points to the commit made directly before it, which we can call commit two.
That's how `git rebase -i HEAD~2` starts with a HEAD pointer, and then follows subsequent pointers to find which two commits to edit.

#### Branches as Savepoints
Because a Git branch is just a 40-byte file on disk, **it takes order of magnitude more time for you to tell the computer to create a branch** (by typing `git branch foo`) **than for your computer to actually do it.**

Because branches are references, **references make commits reachable**… creating a branch is a way to **nail down** part of the graph that you might want to come back to later.

And because neither `git merge` nor `git rebase` will change your existing commits (remember. a commits ID is a hash of its contents **_and its history_**), you can create a temporary branch any time you want to try something you're even just a little bit unsure about. 

In other words for you fuckin' nerds, creating a branch before you try a merge or a rebase is like saving you game before you battle the boss.

---

## HEAD vs Branch vs Commit
1. **HEAD:**
   - In Git, `HEAD` is a special pointer that points to the current branch or directly to a commit (in a detached state).

2. **Branch:**
   - A branch is a pointer to a specific commit. It represents a line of development in the repository.

3. **Commits:**
   - Commits are linked in a sequence, where each commit points to its parent commit(s). A branch points to the latest commit in this sequence.

### HEAD Points to a Branch
When you are on a branch, `HEAD` points to that branch.

``` bash
A -- B -- C (main)
           ^
          HEAD
```
- `HEAD` is pointing to the `main` branch.
- The `main` branch is pointing to commit `C`.

### Branch Points to the Latest Commit
A branch is a pointer to the latest commit in the line of commits.

``` bash
A -- B -- C (main)
           ^
          HEAD
```
- The `main` branch points to commit `C`.
- Commit `C` points back to commit `B`, and commit `B` points back to commit `A`.

### Detached HEAD State
When `HEAD` is detached, it points directly to a specific commit instead of a branch.

``` bash
A -- B -- C (main)
           ^
          HEAD (detached)
```
- `HEAD` is pointing directly to commit `C`.
- The `main` branch remains pointing to commit `C`.

### Visualizing with More Branches
Let's add another branch for clarity:

``` bash
A -- B -- C (main)
      \
       D -- E (feature)
```
- `HEAD` points to `main`, which points to `C`.
- The `feature` branch points to commit `E`.

### Summary
- `HEAD` points to the current branch (or commit in detached state).
- A branch points to the latest commit in that branch.
- Commits are linked in a sequence, with each commit pointing to its parent commit(s).

By understanding these relationships, you can see how `HEAD`, branches, and commits interact in a Git repository.

---

## Changing The Last Commit: `git commit --amend`
Let's say we forgot a file in our most recent commit. 
As long as we haven't pushed our commit anywhere, we can amend it. 

In the case of forgetting a file… first we would stage it via `git add <file-name>`… then we would run `git commit --amend`. 

This would open our code editor where we can update the message associated with the commit if we so choose.

If you want to change the commit message directly without opening an editor, you can use `git commit --amend -m 'new message'`, but this will replace the entire commit message, not just append to it.

It doesn't _change_ our commit. It _replaces_ it. 
This is why, as previously mentioned, you should only amend commits that haven't been pushed anywhere because you could potentially destroy a commit other developers are working on.
It is imperative to _rewrite history_ in a safe and responsible manner.

---

## Changing Multiple Commmits: `git rebase`
**VSCode Tutorial**

`git rebase` works by:
  1. Going to the common ancestor of the two branches (the one you’re on and the one you’re rebasing onto).
  2. Getting the diff (differences) introduced by each commit of the branch you’re on.
  3. Saving those diffs to temporary files.
  4. Resetting the current branch to the same commit as the branch you are rebasing onto.
  5. Finally, applying each change in turn.

  * A typical scenario is rebasing a topic branch onto the main branch… where the commits of your topic branch are replayed/applied to the main branch. You'd call `git rebase main` from the topic branch.

**To perform a fast-forward merge from (Step 5):**
  1. Checkout the branch that was rebased onto (typically the main branch) using `git checkout main`.
  2. Merge the sub-branch/feature/experiment using `git merge sub-branch`.

  This updates the main branch to include all the changes from the feature branch, effectively moving the main branch’s pointer to the latest commit of the feature branch, assuming there are no conflicts and it can be fast-forwarded.

  A `git merge` can result in the same commit becoming the master; however, with rebase, checking `git log` results in a linear history: appearing as if all the work happened in series, even when it originally happened in parallel.

### Interesting Rebase Scenario
1. ![Interesting Rebase 1](./assets/interesting-rebase-1.png)
  - In the figure above we have a branch that diverges from our `master` branch at commit `C2` that has some server-side functionality to our project. We made one commit on that branch initially.
  - We also have another branch, `client`, that diverges from the `server` branch at commit `C3` (which has client side changes). The initial commit from this branch is `C8`. We make a commit here before anything else.
  - We go back to the `server` branch and add another commit, `C10`.   
  
  a. **Merge client-side changes into mainline, bypassing server-side updates**:
    `git rebase --onto master server client`

    This basically says "take the `client` branch, figure out the patches (later commits of the branch) since it diverged from the `server` branch, and replay these patches in the `client`  branch as if it was based directly off the `master` branch instead."
      * `--onto master`: specifies the new base branch we are rebasing onto (`master` in this case).
      * `server`: this is the upstream branch from which `client` diverged. Git will dertermine the changes on `client` since it branched off `server`.
      * `client`: this is the branch you are currently on and want to rebase.

    **Client Rebase Result:**
    ![Interesting Rebase 1 Result - Client](./assets/interesting-rebase-1-result-client.png)
  
  b. **Fast-forward `master` branch to include `client` branch**
    `git checkout master && git merge client`

    **Client Merged Result:**
    ![Interesting Rebase 1 Result - Client Merged](./assets/interesting-rebase-1-result-client-merged.png)

  c. **Pulling in the `server` branch (into main)**
    We can rebase the `server` branch onto the `master` branch without having to check it out first by running:

    `git rebase <basebranch> <topicbranch>` 

    …which checks out the topic branch (in this case, `server`) for you and replays it onto the base branch (`master`). 

    This is what this looks like with our example:
     `git rebase master server`.

    **Server Rebase Result:**
    ![Interesting Rebase 1 Result - Server](./assets/interesting-rebase-1-result-server.png)

  d. **Fast-forward the base branch to include `server` branch** 
    `git checkout master && git merge server`

    Also, at this point we can remove the `client` and `server` branches via: 

    `git branch -d client && git branch -d server` 

    …because all the work is integrated and we don't need them anymore. 

    This leaves our final commit history:
    ![Interesting Rebase 1 Result - Server Merged](./assets/interesting-rebase-1-result-server-merged.png)

---

### Another Interesting Scenario (Rebase drawbacks)
One rule:
**Do not rebase commits that exist outside your repository and that people may have based work on.**

> In other words, rebase local changes before pushing to clean up _your_ work, but never rebase anything that you've pushed somewhere. If you follow this rule… you'll be chillin'; Otherwise, several kittens will, experience a severe existential crisis… and we all know what happens post felis catus existential crisis'. 💭

When you `rebase` stuff, you're abandoning existing commits and creating new ones that are similar but different. If you push commits somewhere and others pull them down and base work on them, and then you rewrite those commits with `git rebase` and push them up again, your collaborators will have to re-merge their work and things will get messy when you try to pull their work back into yours.
See `The Perils of Rebasing` at: https://git-scm.com/book/en/v2/Git-Branching-Rebasing#rbdiag_g 

Following the example in `The Perils of Rebasing` link above…

If you find yourself in a sitation where someone else working on the same project had originally created a `merge` commit that you pulled into your branch (via `merge` as well).

If this coworker went back and rebased their work instead, using `git push --force` {1} to overwrite the history on the server (abandoning the commits you have based your work on).

Performing a `git pull` {2} creates a new merge commit on your branch. This includes _both lines_ of history (the merge from the original merge commit and the merge from the rebase). 

Running `git log` will result in seeing two commits that have the same author, date and message… which is confusing. 
Furthermore, if you push this history back up to the server, you'll reintroduce all those rebased commits to the central server… confusing people further. 

Of course, the developer would prefer if those commits were not in the history… the reason why they rebased in the first place. Fortunately there is some more of that Git maagic that can help. See below.

**Resolving the issue above: Rebase on Rebase!**
If someone on your team force pushes changes that overwrite work that you've based work on, your challenge is to _figure out what is yours and what they've rewritten_.

In addition to the commit SHA-1 checksum, Git also calculates a checksum that is based just on the patch introduced with the commit. This is called a **patch-id** {3}. 

If you pull down work that was rewritten and rebase it on top of the new commits from your partner Git can often successfully figure out what is uniquely yours and apply them back on top of the new branch.

For instance, in the _scenario above_, if instead of doing a merge to pull the new rebased changes after already merging the previous history that was overwritten, we run:

`git rebase teamone/master` (from our branch)

When this is run, Git will:
  1. Determine what work is unique to our branch.
  2. Determine which are not merge commits.
  3. Determine which have not been rewritten into the target branch.
  4. Apply/replay those commits to the top of the master.

So you're **rebasing on top of the rebase!**

💭 {1} `git push --force` forcibly updates a remote repository with changes from your local repository. It is typically used to overwrite the remote branch with your local branch, even if the remote branch has commits that are not present in your local branch.

💭 {2} `git pull` (essentially a combination of `git fetch` {a} and `git merge`) performs a `merge` by default. You can have it perform a `rebase` instead by adding a `--rebase` flag after the `pull`. To make rebasing the default behavior `git pull`, you can set the configuration: `git config --global pull.rebase true`.
  {a} `git fetch` is a command used in Git to download commits, files and references from a remote repository and updates your remote-tracking branches, allowing you to review the changes before integrating them via `git diff main origin/main`, followed by `git merge origin/main` (merges the changes from `origin/main` into your local `main` branch).

💭 {3} **patch**: refers to the set of changes introduced by a commit (addtions, deletions, and modifications to files in the repository).
A patch ID is a unique identifier for this set of changes. 

Here's a breakdown:
  * **Commit SHA-1 Checksum**:
    - This is a unique identifier for the entire commit, which includes the changes (patch), the commit message, the author information, the parent commit(s), and other metadata.

  * **Patch**:
    - As mentioned above… the patch is the difference (diff) between the content of files in one commit and its parent commit.

  * **Patch-id**:
    - A unique checksum calculated based on just the content of the patch itself, not including metadata like the commit message or author information. This allows git to identify identical changes even if they are in different commits. Patch-ids are useful in scenarios like;
      * **Detecting duplicate patches**:
        - Even if two different commits have different SHA-1 checksums, if their patch-ids are the same, they introduce the same changes (like when rebasing onto a forcibly pushed rebase branch that was originially a merge).
      * **Cherry-picking** (_more on this below_): Applying the same patch to different branches.

### A Helpful Mnemoic for `git rebase`
A helpful mnemonic for `git rebase` arguments (by **Sam Livingston-Gray**):
  The two following command chains are identical in behavior: 

  1. ```bash 
      #{1}
      git checkout foo
      git checkout -b newbar # {2}
      git checkout bar 
      git reset --hard newbar #{3}
      git branch -d newbar
    ```

  2. ```bash
      git rebase foo bar
    ```
💭 {1} **First Command Chain Detailed Steps**:
  * git checkout foo: Switch to the foo branch.
  * git checkout -b newbar: Create and switch to a new branch newbar at the same commit as foo.
  * git checkout bar: Switch to the bar branch.
  * git reset --hard newbar: Reset the bar branch to point to the same commit as newbar (which is the same as the latest commit on foo).
  * git branch -d newbar: Delete the temporary newbar branch.

💭 {2} `newbar` is created as a new branch that points to the `HEAD` of the `foo` branch (i.e., the latst commit on `foo`).
💭 {3} The `git reset --hard newbar` command forcibly moves the `bar` branch to point to the same commit as `newbar` (which is the latest commit on `foo`). This effectively repositions `bar` to be based on the same commit as `foo`.

As a reminder for the power of `git rebase`… 
When you do a rebase, you are **rewriting history**. 
You are essentially telling Git,
"Hey, you know all that shit thats over there on that completely different timeline? I want you to pretend that **ALL THAT SHIT** happened over here instead."

> In English, we read from **left to right**. On most charts that show the change in something over time, time is shown on the x-axis of the graph, with time increasing **from left to right**. When you issue commands to the shell, you can put several of them on one line, and they'll be executed in order **from left to right**. So one tip for using `git rebase` is to always give it two arguments (until you fully understand it that is): **The name of the place you want to START from and the name of the place you want to end up** …Or to put it another way, you tell rebase the sequence of events you want it to create… **from left to right**: `git rebase first_this then_this`.

### Interactive Rebase: `git rebase -i` 
`git rebase -i` is a command which allows us to `-i`nteractively stop after each commit we're trying to modify, and then make whatever changes we wish. 
We tell this command which is the last commit we want to edit.

For example, `git rebase -i HEAD~2` allows us to edit the last two commits.

#### `pick`, `edit` & `drop`
When the tool has opened up in VS Code, and we wish to edit one of our commits, we change the word `pick` to be `edit` for the appropriate commit.
This allows us to amend the commit in the command line by running `git commit --amend`, which will open up in the editor and allow us to make our change. 
Once satisfied with our changes" we run `git rebase --continue`.
Running `git log` post change will allow us to see our handiwork.

If you have to rebase commits in a shared repository, make sure that it is done for a very good reason that your coworkers are aware of. 

If we wanted to remove a commit, we would remove it from the list via `drop`, and if we wanted to change their order, we would change their position in the list. 

#### `reflog`
If we accidentally drop a commit during an interactive rebase, the commit is immediately lost.
Git keeps a reference to the commit for a while (typically a couple of weeks) in a mechanism called the **reflog**. 
This allows use to recover the commit if needed.
We use the reflog to find the commit's SHA {1} and then reset your branch to that commit. 

The general steps are:
  1. Find the SHA of the dropped commit using `git reflog`.
  2. Reset your branch to that commmit using `git reset --hard <SHA>`.
Be cautious with `git reset --hard`, as it will remove any changes in your working directory and staging area. 
If you're unsure, you can use `git reset --soft <SHA>` to reset the branch to the dropped commit without affecting your working directory or staging area.

{1} SHA - Secure Hashing Algorithm:
 - The 40-character string of hexadecimal characters (0-9 and a-f) generated by the SHA-1 cryptographic hash function.

#### `squash`
Using `squash` for our commits is a very handy way of keeping our Git history tidy. 
It's important to know how to `squash` because this process may be the standard on some development teams.
Squashing makes it easier for others to understand the history of your project. 

What often happens when a feature is merged, is we end up with some visually complex logs of all the changes a feature branch had a main branch. These commits are important while the feature is in development, but aren't really necessary when looking thorugh the entire history of your main branch. 

Lets say we have 3 commits in the current repository and we want to `squash` the second commit into the first commit on the list.

First we rebase all the way back to our root commit by typing `git rebase -i --root`.
Now what we'll do is `pick` that first commit, as the one which the second commit is being `squash`ed into.
Then we select `squash` for the second commit.
This gives us the opportunity to rename the conjoined commit.
`git log` after should reveal 2 commits. The new root and the what was previously the third commit.

---

## Git Review & Splitting up a commit: `git reset`
**(For Head^ vs Head~1, see here: ![Head^ vs Head~1](./traverse-from-head.md))**

`git reset HEAD^` resets the current branch by pointing `HEAD` at the commit right before it.

So lets say our HEAD commit added 2 files. Running `git reset HEAD^` gives us the ability to add and stage the files individually.

At the same time, `git reset` also updated the index (the staging area) with the contents of wherever `HEAD` is now pointed. 

So your staging area was also reset to what it was at the prior commit.
This allowed us to add and commit both files separately.

Now, let's say want to move where HEAD points to but don't want to touch the staging area. If we want to leave the index alone, you can use `git reset --soft`.
This would only perform the first part of `git reset` where the HEAD is moved to point somewhere else.
You can think of `git reset --soft` as a more powerful amend. 
Instead of changing the last commit, you can go back multiple commits and combine all the changes included in them into one commit… a squashing!
Keep in mind that from the branches perspective, it looks as if the commits that were squashed never existed.
The SHA's for the squashed commits are still around in the repository (accessible via `reflog`) but they are no longer referenced by any branch and eventually will be garbage collected by Git if they are not referenced by any other commit, branch, tag, or reflog entry (reflog expiry default is 90 days).

`git reset --hard` performs all the steps of `git reset`, moving `HEAD` and updating the index (staging area), but it _also_ updates the working directory.
This is important to note because it can be dangerous as it can potentially destroy data. A hard reset overwrites the files in the working directory to make it look exactly like the staging area of wherever `HEAD` ends up pointing to.

Like `git commit --amend`, a hard reset is a destructive command which overwrites history.
This doesn't mean you should completely avoid it if working with shared repositories on a team with other developers.
You should however, make sure you _exactly why_ you're using it, and that your coworkers are also aware of how and why you're using it.

### The Three Trees
An easier way to think about `reset` and `checkout` is through the mental frame of Git being a content manager of three different trees.
By "tree" here, we really mean "collection of files", not specifically the data structure.
There are a few cases where the index doesn't exactly act like a tree… but for our purposes it is easier to think about it this way for now.

Git is a system manages and manipulates three trees in its normal operation:

| Tree              | Role                              |
|-------------------|-----------------------------------|
| HEAD              | Last commit snapshot, next parent |
| Index             | Proposed next commit snapshot     |
| Working Directory | Sandbox                           |


#### The HEAD
HEAD is the pointer to the current branch reference, which is in turn a pointer to the last commit made on that branch. That means HEAD will be the parent of the next commit that is created. 
It's generally simplest to think of HEAD as the snapshot of **your last commit on that branch.**

In fact, it's pretty easy to see what that snapshot looks like. Here's an example of getting the actual directory listing and SHA-1 checksums for each file in the HEAD snapshot:
``` bash 
$ git cat-file -p HEAD # {1}
tree cfda3bf379e4f8dba8717dee55aab78aef7f4daf
author Deez Nuts  1301511835 -0700
committer Deez Nuts  1301511835 -0700

initial commit message 

$ git ls-tree -r HEAD # {2}
100644 blob a906cb2a4a904a152...   README
100644 blob 8f94139338f9404f2...   Rakefile
040000 tree 99f1a6d12cb4b6f19...   lib
```

The Git `cat-file` and `ls-tree` commands are **plumbing** commands that are used for lower level things and not really used in day-to-day work, but they help us see what's going on here.

💭 {1} The command `git cat-file -p HEAD` is used to display the content of the commit object referenced by `HEAD`. 
Heres a breakdown of what it does:

  * `git cat-file`
    - This command is used to provide content or type information for repository objects.
    - It can be used to examine the contents of objects in the Git database.
  * `-p`
    - This option stands for "pretty-print".
    - When used with `git cat-file`, it formats the content of the object in a human-readable way.
  * `HEAD`
    - This is a reference to the current commit.
    - In Git, `HEAD` points to the latest commit in the currently checked-out branch.

  * **Combined Command**
    * `git cat-file -p HEAD` pretty-prints the content of the commit object pointed to by `HEAD`. 
    * This will show details such as the _commit message_, _author_, _date_, and the _tree object_ that represents the directory structure of the project at the time of that commit.
  
  * **Output Explained**
``` bash
tree 83baae61804e65cc73a7201a7252750c76066a30
parent dfcbad7e8fd4e47edb1404dbcb33d72af984c1ae
author John Doe <john.doe@example.com> 1623760012 +0200
committer John Doe <john.doe@example.com> 1623760012 +0200

Commit message
```
  * **tree:** The SHA-1 hash of the tree object for this commit, which represents the state of the directory structure and the content of the files at the time of the commit.
  * **parent:** The SHA-1 hash of the parent commit. A commit can have zero (initial commit), one (regular commit), or multiple (merge commit) parent references.
  * **author:** the name and email of the author, along with the timestamp of when the commit was originally made. 
  * **commmitter:** the name and email of the author, along with the timestamp of the commit. The author and committer can be different in cases like patches applied by a maintainer.
  * **Commit message:* the message describing the changes mde in this commit.

  * **Practical Use** 
  This command is useful for inspecting the details of a commit, understanding the changes introduced, and verifying the commit metadata.

💭 {2} The command `git ls-tree -r HEAD` is used to list the contents of the tree object (directory structure) of the commit referenced by `HEAD` recursively. 
Here's a breakdown of what it does:

  * `git ls-tree`
    - This command is used to list the contents of a tree object, showing the names, types, and modes of its contained objects (blobs, trees, and submodules).
  * `-r`
    - This option stands for "recursive".
    - When used with `git ls-tree` it lists the contents of the tree object recursively, meaning it will traverse subdirectories and list their contents as well.
  * `HEAD`
    - Reference to the latest commit. 

  * **Combined Command**
    * `git ls-tree -r HEAD` lists all files and directories in the current commit, including their paths, types (blob for files, tree for directories), and SHA-1 hashes, recursively.

  **Output Explained**
``` bash
100644 blob a7f5f35426b927411fc9231b56382173e2a80b6d    .gitignore
100644 blob 5f0c15442f4086d10bf12b6209f896b60a4055b9    README.md
100644 blob 3b18e1de6757b11f4e48dddfce09f11b37228820    src/main.js
100644 blob a35ee8d8b4765c00b0e25f0492cb1b94b117b3bf    src/utils/helper.js
040000 tree a8c03cb0d4e70e9ae6b5c5d6220f1d5e0f7f4d41    src/utils
```

  * **100644:** the file mode (permissions) for regular files.
  * **blob:** indicates that the object type is a file.
  * **tree:** indicates that the object type is a directory.
  * **SHA-1 hash:** the unique identifier for the object.
  * **Path** the path to the file or directory relative to the repository root.

  * **Practical Use**
  This command is useful for:
    - Inspecting the directory structure of a commit.
    - Verifying the files and directories present in a specific commit.
    - Getting the SHA-1 hashes of files and directories for further inspection or comparison.
    - Provides a comprehensive view of the repository's state at a particular commit, making it valuable for debugging, auditing, and understanding changes over time. 

#### The Index
The **index** is your _proposed next commit_.
We've also been referring to this concept as Git's "Staging Area" as this is what git looks like when you run `git commit`.

Git populates this index with a list of all the file contents that were last checked out into your working directory and what they looked like when they were originally checked out.
You then replace some of those files with new versions of them, and `git commit` converts that into the tree for a new commit.

``` bash
git ls-files -s # {1}
100644 a906cb2a4a904a152e80877d4088654daad0c859 0	README
100644 8f94139338f9404f26296befa88755fc2598c289 0	Rakefile
100644 47c6340d6459e05787f644c2447d2595f5d3a54b 0	lib/simplegit.rb
```

The index is not _technically_ a tree structure - it's actually implemented as a _flattened manifest_ (conceptually) - but for our purposes, it's close enough.

💭 {1} The `-s` flag in the command `git ls-files -s` stands for "stage". When used with `git ls-files`, it shows detailed information about the files in the index (staging area). 
Here's a breakdown:
  * `git ls-files` is used to show information about files in the index (the mf staging area bitch). It simply lists the paths of the files.
  * `-s` (or `--stage`) provides detailed information about the index, including the mode, the object name (SHA-1 hash), and the stage number for each file. 

  **Output Explained**
``` bash
100644 e69de29bb2d1d6434b8b29ae775ad8c2e48c5391 0    .gitignore
100644 d670460b4b4aece5915caf5c68d12f560a9fe3e4 0    README.md
100644 5f0c15442f4086d10bf12b6209f896b60a4055b9 0    src/main.js
100644 3b18e1de6757b11f4e48dddfce09f11b37228820 0    src/utils/helper.js
```

  * **10644:** the file mode (as mentioned above) for regular files
  * **SHA-1 hash:** the unique identifier for the object.
  * **Stage number:** the stage number of the file _(typically 0 for files that are not involved in a merge conflict)_.
  * **Path:** the path to the file relative to the repository root.

  * **Practical Use**
  This command is useful for:
    - Inspecting the details of files in the staging area.
    - Debugging issues related to the index, such as understanding the state of files during a merge conflict.
    - Verifying the exact versions of files that are staged for the next commmit.
    - The `-s` flag with `git ls-files` provides a detailed view of the staging area, which can be helpful when we need more information other than the filenames and want to understand the specifics of the staged content. 

#### The Working Directory
Also referred to as the "working tree".
The other two trees store their content in an efficient but unconventional manner… inside the `.git` folder.
The working directory unpacks them into actual files, which makes it much easier for you to edit them.
Think of the working directory as a **sandbox**, where you can try changes out before adiing them to your staging area (index) and then to history.

For example:
``` bash
my-project/
├── .git/
│   ├── objects/
│   ├── refs/
│   ├── config
│   ├── HEAD
│   └── ...
├── src/
│   ├── main.js
│   ├── utils.js
│   └── ...
├── README.md
└── .gitignore
```

#### The Workflow
Git's typical workflow is to record snapshots of your project in successively better states, by manipulating these three trees.

When we run `git init` in a directory, this creates the `.git` directory repository with a `HEAD` reference that points to the unborn `master` branch.

Lets say this directory has a single file in it called `file.txt`.
Running `git add file.txt` will place the file in the index (staging area) located in the git repository (`.git/index` directory).

Also, note that `.git/objects` is the directory that contains all the objects, including blob objects created when the files are staged.

Now, when we run `git commit`, the contents of the index are saved as a permanent snapshot, a commit object is created which points to that snapshot, and `master` is updated to point to that commit. 

At this point, if we run `git status` we will see no changes, because all three trees are the same.

If we edit the `file.text` file and run `git status` again however, we receive a "changes not staged for commit" message and the file (in _red_) we changed because the entry (our latest commit) now differs between the index and the working directory.

Next we run `git add file.txt` to stage it into our index.
Running `git status` at this point shows the file (in _green_) under "changes to be committed" because the index and HEAD differ -  that is, our proposed next commit is now different from our last commit.

Finally, we run `git commit` to finalize the commit, after which, running `git status` will give us no output, because _all three trees_ are the same again.

Switching branches or cloning goes through a similar process.
When you checkout a branch, it changes **HEAD** to point to the new branch reference, populates your **index** with the snapshot of that commit, then copies the contents of the **index** into your **working directory**.
In short, it aligns all three trees with the commit reference of the branch you're checking out.

#### The Role of Reset
The `reset` command makes more sense when viewed in this context.

Let's now say (based on the example above), that we've modified `file.txt` again and commited it a third time.
When calling `reset`, it directly manuplates these three trees in a simple and predictable way. 
It does up to three basic operations.

1. **Move HEAD**
  - The first thing `reset` will do is move what HEAD points to. This isn't the same as changing HEAD itself (which is what `checkout` does); `reset` moves the branch that HEAD is pointing to. This means that if HEAD is set to the master branch (i.e., you're currently on the master branch), running `git reset 9e5e6a4` will start by making master point to `9e5e6a4`.

  No matter what form of `reset` with a commit you invoke, this is the first thing it will _always_ try to do.
  
  With `git reset --soft`, it will simply stop there.

  This essentially undid the last `git commit` command. 
  `git commit` creates a new commit and moves the branch that HEAD points to up to it.

  When you `reset` back to `HEAD~` (the parent of HEAD), you are moving the branch back to where it was, without changing the index or working directory.
  You could now now update the index and run git commit again to accomplish what `git commit --amend` would have done.

2. **Updating the Index (DEFAULT: `--mixed`)**
  - If we run `git status` after performing the reset to `HEAD~`. We will see the _green_ difference between the index and what the new HEAD is.
  - The next thing `reset` will do is to update the index (staging area) with the contents of whatever snapshot HEAD now points to. This leaves only the working directory unchanged (undos the last commit and unstages everything… esesentially rolling back to before you ran all your `git add` and `git commit` commands).

3. **Updating the Working Directory (`--hard`)**
  - The third thing that `reset` will do is to make the working directory look like the index. If you use the `--hard` option, it will continue to this stage.
  - This undos the last commit, the `git add` and `git commit` commands,**and** all the work you did in your working directory.

  Using the `--hard` flag is the only way to make the `reset` command dangerous, and one of the very few cases where Git will actually destroy data.
  
  Any other invocation of `reset` can be easily undone, but `--hard` forcibly overwrites files in the working directory.

  The overwritten commit is stored in the Git database, and we could get it back by looking at our `reflog`, but if we had not committed it, Git still would have overwritten the file and it would be unrecoverable. 

##### Reset With a Path
If a path is specified, `reset` will _skip step 1_, and limit the remainder of its actions to a specific file or set of files.

This makes sense because HEAD is just a pointer, and you can't point to part of one commit and part of another. 

But the index and working directory **can** be partially updated, so reset proceeds with steps 2 and 3. 

If we run `git reset file.txt` (which is shorthand for `git reset --mixed HEAD file.txt`) from where we left off:
  1. Move the branch HEAD points to (**skipped**).
  2. Make the index look like HEAD (**stop here**).

So it essentially just copies **file.txt** from HEAD to the index. 

In other words, the index is updated to match the specified file as it exists in HEAD. 
Meaning that `file.txt` in the index will now be identical to `file.txt` in the last commit.
By making the index for file.txt look like it does in HEAD, any changes you had staged for file.txt are effectively removed from the index. 
This has the _practical effect_ of **unstaging** the file.

So let's say you modify `file.txt` and run git add `file.txt` to stage the changes.
Now, if you run `git reset file.txt`, it will unstage `file.txt` but keep the modifications in your working directory.

You could also not let Git assume we meant "pull the data from HEAD" by specifying a specific commit to pull that file version from. 
We would just run something like `git reset eb43bf file.txt`. 
This pulls **file.txt** from the commit `eb43bf` into our index. 

Note, that like `git add`, the `reset` command will accept a `--patch` option to unstage content on a hunk-by-hunk basis. So you can selectively unstage or revert content.

### Squashing with `reset`
Let's say we have a series of commits with messages like "ooops.", "WIP" and "forgot this file".
You can use `reset` to quickly and easily squash them into a single commit that makes you look really smart.
Of course we can use `rebase`… but in a scenario likes this, it's simpler to use `reset`.

For example, you're working on a project where:
  1. The first commit has one file.
  2. The second commit added a new file and changed the first.
  3. The third commit changed the first file again. 

The second commit was a work in progress and you want to squash it down.

Performing `git reset --soft HEAD~2` moves the HEAD branch back to an older commit (the most recent commmit you want to keep).
Simply running `git commit` again from this point gives us a squashed commmit that has the new file AND the first file we modified to create the third commit originally. 
But now there are two commits, down from three. The previous second commit that we squashed is no longer in the history.

### `reset` Summary & Cheat Sheet
If the value in the table says **NO** in reference to the working directory, take a second to think before running that command. Working directory safe

|                                        | Head | Index | Workdir | WD Safe? |
|----------------------------------------|------|-------|---------|----------|
| **Commit Level**                       |      |       |         |          |
| `reset --soft [commit]`                | REF  | NO    | YES     | NO       |
| `reset [commit]`                       | REF  | YES   | NO      | YES      |
| `reset --hard [commit]`                | REF  | YES   | YES     | **NO**   |
| `checkout <commit>`                    | HEAD | YES   | YES     | YES      |
| **File Level**                         |      |       |         |          |
| `reset [commit] <paths>`               | NO   | YES   | NO      | YES      |
| `checkout [commit] <paths>`            | NO   | YES   | YES     | **NO**   |


#### Table Terms Explained

##### 1. **`HEAD` vs. `REF` vs. `NO`**
- **`HEAD`**:
  - **What It Means**: This indicates that `HEAD` is updated to point to the specified commit or state.
  - **For `checkout <commit>`**: `HEAD` is updated to the specified commit. You are moving `HEAD` to a different commit, which is the primary action of this command. This results in `HEAD` not poining to the latest commit in the branch, but rather to a specific commit, tag or another non-branch reference. `HEAD` is "detached" from any branch and is pointing directly to a commit.

- **`REF`**:
  - **What It Means**: `REF` signifies that the command updates the `HEAD` pointer to the commit specified. `REF` generally means that you are moving the `HEAD` to the new commit.
  - **For `reset --soft [commit]`, `reset [commit]`, and `reset --hard [commit]`**: `HEAD` moves to the commit you specify. 

- **`NO`**:
  - **What It Means**: This indicates that `HEAD` does not change, or is not a focus of the command. The `HEAD` is not updated to the specified commit.
  - **For `reset [commit] <paths>`, `checkout [commit] <paths>`**: The command does not move `HEAD` to the specified commit; instead, it affects only a subset of files or paths.

##### 2. **Command Behavior**
- **`git reset --soft [commit]`**:
  - **HEAD**: Moves to the specified commit (`REF`).
  - **Index**: Not affected.
  - **Working Directory**: Not affected.
  - **WD Safe?**: No; changes in the working directory are not preserved, as the working directory remains the same.

- **`git reset [commit]`** (or `--mixed`):
  - **HEAD**: Moves to the specified commit (`REF`).
  - **Index**: Updated to reflect the state of the specified commit.
  - **Working Directory**: Not affected.
  - **WD Safe?**: Yes; changes are preserved because only the index is updated.

- **`git reset --hard [commit]`**:
  - **HEAD**: Moves to the specified commit (`REF`).
  - **Index**: Updated to reflect the state of the specified commit.
  - **Working Directory**: Updated to reflect the state of the specified commit.
  - **WD Safe?**: No; all changes in the working directory are lost.

- **`git checkout <commit>`**:
  - **HEAD**: Moves to the specified commit (`HEAD`).
  - **Index**: Updated to reflect the state of the specified commit.
  - **Working Directory**: Updated to reflect the state of the specified commit.
  - **WD Safe?**: Yes; the working directory is updated to reflect the state of the specified commit, preserving changes in a safe state.

##### File-Level Commands
- **`git reset [commit] <paths>`**:
  - **HEAD**: `NO` - `HEAD` does not change; it remains on the current commit.
  - **Index**: Updated to reflect the state of the specified commit for the paths.
  - **Working Directory**: Not affected.
  - **WD Safe?**: Yes; the command modifies the index but not the working directory.

- **`git checkout [commit] <paths>`**:
  - **HEAD**: `NO` - `HEAD` does not change; it remains on the current commit.
  - **Index**: Updated to reflect the state of the specified commit for the paths.
  - **Working Directory**: Updated to reflect the state of the specified commit for the paths.
  - **WD Safe?**: No; changes in the working directory are not preserved as the command updates files at the path level to reflect the state of the commit.

---

#### Overview 
`git reset --mixed` (default)
  - **HEAD**: Moves to the specified commit.
  - **Staging Area (Index)**: Resets to match the specified commit.
  - **Working Directory**: Remains unchanged.
  - **Effect**: This un-stages any changes that were added to the staging area but leaves your working directory untouched.

`git reset --soft`
  - **HEAD**: Moves to the specified commit.
  - **Staging Area (Index)**: Remains unchanged.
  - **Working Directory**: Remains unchanged.
  - **Effect**: Only moves the HEAD to the specified commit. Your changes in the staging area and working directory remain as they are.

`git reset --hard`
  - **HEAD**: Moves to the specified commit.
  - **Staging Area (Index)**: Resets to match the specified commit.
  - **Working Directory**: Resets to match the specified commit.
  - **Effect**: This resets everything (HEAD, index, and working directory) to the specified commit. Any changes in your working directory and staging area will be lost.

##### Summary
- `git reset --mixed` (default): HEAD moves, staging area resets, working directory stays.
- `git reset --soft`: Only HEAD moves, staging area and working directory stay.
- `git reset --hard`: HEAD moves, staging area resets, working directory resets.

Using `--soft` is useful when you want to change the commit history (e.g., remove or combine commits) but keep all your current changes and stages intact.

#### Practical Example
Let's say you have the following commit history:

```plaintext
A - B - C - D (HEAD)
```

And your working directory has some changes that are staged and some that are not.

* Using `git reset --mixed <commit>`
  - If you run `git reset B`:
    - **HEAD**: Points to `B`.
    - **Staging Area**: Matches `B`.
    - **Working Directory**: Remains unchanged.
    - Result: Changes in the working directory stay the same, but changes that were staged are un-staged and your index matches commit `B`.

* Using `git reset --soft <commit>`
  - If you run `git reset --soft B`:
    - **HEAD**: Points to `B`.
    - **Staging Area**: Remains unchanged.
    - **Working Directory**: Remains unchanged.
    - Result: Both the staging area and working directory stay the same. Only the HEAD pointer is moved.

* Using `git reset --hard <commit>`
  - If you run `git reset --hard B`:
    - **HEAD**: Points to `B`.
    - **Staging Area**: Matches `B`.
    - **Working Directory**: Matches `B`.
    - Result: Both the staging area and working directory are reset to match commit `B`. Any uncommitted changes are lost.

---

## Check It Out: `git checkout`
So what's the difference between `checkout` and `reset`?

Like `reset`, `checkout` manipulates the three trees, and it is a bit different depending on whether you give the command a file path or not. 

### Without Paths
Running `git checkout <branch>` is pretty similar to running `git reset --hard <branch>` in that it updates all three trees for you to look like `<branch>`… but there are two _important differences_:

  1. Unlike `reset --hard`, `checkout` is working-directory safe; it will check to make sure it's not blowing away files that have changes to them. It's actually a bit smarter than that - it tries to do a trivial merge in the working directory, so all of the files you _haven't_ changed will be updated. `reset --hard` on the other hand, will simply replace everything across the board without checking.

  2. The second important difference is how `checkout` updates HEAD. Whereas `reset` will move the branch that HEAD points to. `checkout` will move HEAD itself to point to another branch/commit.

#### Overview Without Paths
1. **How `checkout` Updates HEAD:**
  - When you use `git checkout`, it updates the HEAD pointer directly.
  - **Example:** If you use `git checkout branch-name`, HEAD will now point to `branch-name`.

2. **How `reset` Updates HEAD:**
  - The `git reset` command does not change where HEAD is pointing.
  - Instead, it moves the branch that HEAD is currently pointing to.
  - **Example:** If HEAD is pointing to `branch-name` and you use `git reset --hard commit-hash`, `branch-name` will now point to `commit-hash`, but HEAD will still point to `branch-name`.

3. **Summary of Differences:**
  - `git checkout` changes the HEAD pointer to a new branch or commit.
  - `git reset` changes the commit that the current branch (which HEAD points to) is pointing to, without changing the HEAD pointer itself.

For instance, say we have `master` and `develop` branches which point at different commits, and we're currently on  `develop` (so HEAD points to it).
If we run `git reset master`, `develop` itself will now point to the same commit that `master` does.
If we run `git checkout master`, `develop` does not move. HEAD itself does… it will now point to `master`.

#### Example Without Paths
**Visual:**
``` bash
A -- B -- C (main)
      \   ^ HEAD
       D -- E (feature)
```

**Given:**
`HEAD` points to the branch `main`… `main` branch points to commit `C`.
Commit `C` points back to commit `B`, and commit `B` points back to commit `A`.
The `feature` branch points to commit `E`.
Commit `E` points back to `D` which is the initial commit on the feature branch divereged from `main` at commit `B`.

1. **Checking Out the Feature Branch**
  If you `checkout` the `feature` branch:

  **Command:** `git checkout feature`

  ```
  A -- B -- C (main)
        \
         D -- E (feature)
               ^
              HEAD
  ```

  - `HEAD` now points to the `feature` branch, which points to commit `E`.
  - The index and working directory are updated to match `HEAD`

2. **Resetting the Main Branch**
  If you `reset` the `main` branch to commit `B`:

  **Command:** `git reset --hard B` (assuming you are on `main`)

  ```
  A -- B (main)
        \
         D -- E (feature)
             ^
            HEAD
  ```

  - `main` now points to commit `B`.
  - `HEAD` is still on `main`.
  - Commit `C` still exists in the repositories history. It becomes an unreferenced (or dangling) commit unless it's reachable through another branch, tag, or reflog.

### With Paths
The other way to run `checkout` is with a file path, which like `reset`, does not move HEAD.
It is just like `git reset [branch] file` (remember that if it isn't a commit SHA-1 or branch, HEAD is not moved) in that it updates the index with that file at that commit, except that with `checkout file-path` the files in the working directory are overwritten.

It would be exactly like `git reset --hard [branch] file` (if `reset` would let you run that) - it's not working-directory safe and it does not move HEAD.

Also, like `git reset` and `git add`, `checkout` will accept a `--patch` option to allow you to selectively revert file contents on a hunk-by-hunk basis.

---

## Dangers and Best Practices (Pertaining to history changing Git commands)
### Danger List
* `commit --amend`
* `rebase`, 
* `reset`  
* `push --force` 

They can destroy work your coworkers have created.
When attempting to rewrite history, always check the dangers of the particular command you're using.

### Best Practice
1. If working on a team project, make sure rewriting history is safe to do and others know you're doing it.
2. Ideally, stick to using these commands only on branches that you're working with by yourself.
3. Using the `-f` flag to force something should **scare you**. Have a really good reason for using it.
4. Don't push after every single commit, changing published history should be avoided when possible. 
5. Regarding the specific commands we've covered:
  - For `git commit --amend`, never amend commits that have been pushed to remote repositories.
  - For `git rebase`, never rebase a repository that others may work off of.
  - For `git reset`, never reset commits that have been pushed to remote repositories. 
  - For `git push --force`, only use it when appropriate, with caution, and preferably default to using `git push --force-with-lease`.

---

## `git push --force`
If you want to _push a branch_ you've made changes on to a remote repository, normally, Git will only let you push your changes if you've already updated your local branch with the latest commits from this remote.

In the context of Git, _push a branch_ means updating the remote repository with the changes from your local branch. This can involve different actions depending on the current state of the remote and local branches:

  What happens when you push a branch.
  1. **If there are no conflicts**: When you push your branch, Git will append your branch to the remote branch. This means your commits will be added to the end of the chain of commits in the remote branch.

  2. **If there are conflicts**: If the remote branch has commits that your local branch doesn't have (i.e., your local branch is behind), Git will reject the push. You need to first update your local branch with the latest commits from the remote repository, typically by performing a `git pull` to fetch and integrate these changes. After resolving any conflicts and committing the merge, you can then push your branch. This process ensures that the remote branch is updated with a complete and coherent history of commits, including both your changes and those from other collaborators.

  So, to summarize:
  - **Appending**: If your local branch is up to date with the remote, pushing will append your new commits to the remote branch.
  - **Updating**: If your local branch is behind, you'll need to update it with the latest changes from the remote before you can push your changes, ensuring the branch history remains consistent.

If you haven't updated your local branch. and you're attempting to `git push` a commit which would create a **conflict** on the remote repository, you'll get an error message.
This is a actually a great thing. This is a safety mechanism to prevent you from overwriting commits created by the people you're working with, which could fuck shit up. 
You get the error because your history is outdated.

The `git push --force` command overwrites the remote repository with your own local history.
If we are working with others, this gives us potential to destroy the work of those we are collaborating with. This command can be **very dangerous**.
Instead, we can fix our outdated history error by updating our local history using `fetch`, `merge`, and then attempting to `push` again.
Another option we have when collaborating with others and want to _undo_ a commit we just made, we can instead use `git revert`:

``` bash
git revert HEAD
git push origin main 
```

Remember, when we are working with `HEAD`, aka the current commit we're viewing.
So `revert`-ing simply will revert the changes to `HEAD`.
Then we would push our new commit to whichever branch we're working on (most typically a feature branch).

Understanding how dangerous `git push --force` can be, why does it exist and when can it be applied practically?
A very common scenario for its use is when a developer is updating pull requests.
The main point is that the `--force` option should be used only when we are certain that it is appropriate. 
Another common scenario is when sensitive information is accidentally uploaded to a repository and you want to remove all occurrences of it.

`git push --force-with-lease` is a command, which in some companies, is the default option.
The reason why is that it's a fail-safe. It checks if the branch you're attempting to push to has been updated and sends an error if it has. This gives us an opportunity to `fetch` the work and update our local repository.

## Understanding `git merge`

Here are two `merge` foreplay techniques:

### The Scout Pattern
The following has been dubbed the _Scout Pattern_ by **Sam Livingston-Gray**. 

In my own words, here is the concept behind the pattern:
> If you're unsure about what the terrain ahead is like, you essentially send a _scouting party_ ahead to check it out. If they radio back and they're like, "**yo, it's lit**", you'll move ahead and join them. If not, R.I.P to the scouting party.

#### The Steps
1. Make sure you're on the right branch and that you have a clean working state.
2. Create a new branch and switch to it.
3. Do the merge.
4. Switch to your visualizer and predict how its view will change when you refresh it.
5. Refresh your visualizer and see whether your prediction was correct.
6. Are you happy with the result?

If **YEAH**: Move your real branch forward to where the test_merge.
If **NAH** Delete the test_merge branch.

#### The Walkthrough
**Scenario:**
- You're on the `master` branch and you want the changes from the `thiccc_new_feature` branch to be incorporated into `master`.
- You're not entirely sure if this will be a good idea… so want to try out the merge… but be able to abort it if things don't go smoothly.

**Steps**
1. **Make sure you're on the right branch and that you have a clean working state.**
  Whatever visualizer you're using (such as **GitX**), figure out how it shows you where your current branch is.
  Or, at the command line, type `git status` and you should see something like this:
  ``` bash
  # On branch master
  nothing to commit (working directory clean)
  ```

2. **Create a new branch and check it out**
  Type `git checkout -b test_merge`.
  This switches you over to the new branch created `test_merge` (The `-b` flag enables the creation the new branch).
  Running `git status` again will show a message confirms which branch you are currently on… `test_merge`.

3. **Do the `merge`**
  (We are currently on the `test_merge` branch.)
  Type `git merge thiccc_new_feature`.
  If you're lucky, there won't be any merge conflicts you can't resolve.

  If you want to **abort the merge** at this point, type `git reset --hard`…
  Which as a reminder, resets the current branch by pointing `HEAD` at the commit right before it.
  The `--hard` flag resets the `HEAD`, index **AND** working directory (unlike the `--mixed` (default) and `--soft` resets which change the `HEAD` & Index for `--mixed` and solely the `HEAD` for `--soft`).
  For this example, it will reset the branch to the state it was in before the merge attempt, which is the same state of the `master` branch at the time `test_merge` was created. The `test_merge` branch still exists though.

  Remember that when you create a new branch in Git, a new commit is not automatically created for that branch. Instead, the new branch is created at the current commit of the branch you are diverging from. This means that the new branch points to the same commit as the original branch at the time of creation and shares the same SHA-1 hash for that commit.

4. **Switch to your visualizer and predict how its view will change when you refresh it.**
  For example:
    a. After a merge, you should see a new commit.
    b. The new commit should have a message like "Merge branch `thiccc_new_feature` into test_merge".
    c. Your `test_merge` branch label should have moved to this new commit, while the `master` and **thiccc_new_feature** branch labels should still be in the same place.

5. **Refresh your visualizer and see whether your prediction was correct.**

6. **Are you happy with the result?** 
  If **YEAH**: Move the `master` branch forward to where the `test_merge` branch is with:
    `git checkout master && git merge test_merge`

  If **NAH**: Drop the `test_merge` branch with:
    `git checkout master && git branch -d test_merge`

### The Savepoint Pattern
The following, also conceptualized by **Sam Livingston-Gray**, is the _Savepoint Pattern_.

#### The Steps
1. Make sure you're on the right branch and that you have a clean working state.
2. Create a new branch to use as a savepoint, but don't switch to it.
3. Merge it zaddy.
4. Switch to your visualizer and predict how its view will change when you refresh it.
5. Refresh your visualizer and see whether your prediction was correct.
6. Are you happy with the result?
  If **YEAH:** Delete the savepoint.
  If **NAH:** Reset your branch to the savepoint. 

> Unless the last video game you ever played was Super Mario Brothers, it should be obvious why I (S.L.G.) call this one the Savepoint pattern.

#### The Walkthrough
**Scenario**
- You're on the `master` branch and you want the changes from the `thiccc_new_feature` branch to be incorporated into `master`.
- You're substantially certain that you'll want to keep the changes, but you want to be able to abort it if, for example, this feature has unintended side effects.

**Steps**
1. **Make sure you're on the right branch and that you have a clean working state.**

2. Whatever visualizer you're using, figure out how it shows you where your current branch is. Or, at the command line, type `git status` and you should see something like:
  ```bash
  # On branch master
  nothing to commit (working directory clean)
  ```

3. **Create a new branch to use as a savepoint, but don't switch to it.**
  Type `git branch savepoint`. Now if you type `git status` again, you should still see a message that you're on the `master` branch. 

4. **Do the merge**
  Type `git merge thiccc_new_feature`. If you're lucky, there won't be any merge conflicts you can't resolve.
  If you want to **abort the merge** at this point, type `git reset --hard`.

5. **Switch to your visualizer and predict how its view will change when you refresh it.**
  For example:
    a. After a merge, you should see a new commit.
    b. The new commit should have a message like "Merge branch `thiccc_new_feature` into master",
    c. Your `master` branch label should have moved to this commit, while the `thiccc_new_feature` branch label should still be in the same place. 

6. **Refresh your visualizer and see whether your prediction was correct.**

7. Are you content with the result?
  If **YEAH:** Delete the savepoint via `git branch -d savepoint`
  If **NAH:**  Reset your branch to the savepoint via `git reset --hard savepoint`
  If you want to clean up, you can now delete the savepoint with `git branch -d savepoint`.

### Black Belt Merging
Once comfortable with the _Savepoint pattern_, you might grow tired of creating the savepoint branch, only to have to remember to delete it every time.
At this point you won't need to create a branch as a savepoint for merges.

Merge commits always wind up with a branch label pointing at them, and one of the branches parent commits will be the commit that that branch label was just moved from.

The upshot is that the commit you started on - the one you would've marked with a savepoint branch - **will always be reachable**.

**Git doesn't care about what you call your branches.**
> The branch is just there for us puny humans to have some convenient, memorable name pointing to a part of the graph.

At the end fo the _Savepoint pattern_ the command you type to reset your branch to the savepoint is `git reset --hard savepoint` (where "savepoint" is a branch name). If you look at the documentation that comes up when you type `git reset -h`, you'll see that the final argument it takes is called **<commit>**. Older versions of the docuemntation called this **<commit-ish>**, which was a convenient reminder that you could use anything that Git can turn into a SHA-1 hash.

Things Git is happy to accept in a **<commit>** argument include (but are probably not limited to):
  * Branch names
  * Tags
  * Relative references like **HEAD^**, **HEAD^^** or **HEAD~3**
  * Partial SHA-1 hashes like `9c333696` (you just need to provide a sufficient amount of digits in order to produce a unique hash; Git will fill in the rest).
  * SHA-1 hashes like `8d434382d9420940be260199a8a058cf468d9037` (these are very easy for Git to turn into SHA-1 hashes!).

So at the end of the _Savepoint pattern_, if you wanted to back out of the merge, you could just as easily use `git log` or your visualizer to find the SHA-1 of the commit. 
Let's say it starts with `f4cku80085`. 
If you type `git reset f4cku80085`… Git would behave exactly the same as if you'd remembered to create a branch in the first place.

### `merge` Conflicts
> Merge conflicts happen when you merge branches that have competing commits, and Git needs your help trying to decide which changes to incorporate in the final merge.

Git can often resolve differences between branches and merge them automatically.
Usually the changes are on different lines or even in different files, which makes the merge simple for computers to understand; However, sometimes there are competing changes that Git can't resolve without assistance.
Often, merge conflicts happen when people make different changes to the same line of the same file, or when one person edits a file and another person deletes the same file. 

When pulling form GitHub (`git pull <remote> <branch>`), all merge conflicts need to be resolved.
If you have a merge conflict between the compare branch and the base branch in your pull request, you can view a list of files with conflicting changes above the **Merge pull request** button. 
The **Merge pull request button** is deactivated until you've resolved all conflicts between the two branches. 

**Compare and Base Branch Definitions:**
  * Compare Branch (or HEAD branch): This is the branch that contains the changes you want to merge. It's the branch that you've been working on and will be compared against the base branch.
  * Base Branch: This is the branch into which you want to merge your changes. It's the target branch of your pull request, often the main or master branch.

#### Resolving Merge Conflicts
To resolve a merge conflict, you must manually edit the conflicted file to select the changes that you want to keep in the final merge. 
Here are a couple different methods for doing so:
  1. If your merge conflict is caused by competing line changes, such as when people make different changes to the same line of the same file on different branches in your Git Repository, you can resolve it on GitHub using the conflict editor. 

    **GitHub Conflict Editor Steps:**
    (https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github)

      1. Under your repository name, click _Pull Requests_.
      2. In the "Pull Requests" list, click the pull request with a merge conflict that you'd like to resolve.
      3. Near the bottom of your pull request, click _Resolve conflicts_.
        - If this button is deactivated, your pull requests merge conflict is too complex to resolve on GitHub. You must resolve the merge conflict using an alternative Git client, or by using Git on the command line (See https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line).
      4. Decide if you want to keep only your branches changes, keep only the other branches changes, or make a brand new change, which may incorporate changes from both branches. Delete the conflict markers (`<<<<<<<`, `=======` and `>>>>>>>`) and make the changes you want in the final merge. 
      5. If you have more than one merge conflict in your file, scroll down to the next set of conflict markers and repeat steps 4 & 5 to resolve your merge conflict. 
      6. Once you've resolved all the conflicts in the file, click **Mark as resolved**.
      7. If you have more tha one file with a conflict select the next file you want to edit on the left side of the page under "conflicting files" and repeat steps 4-7 until you've resolved all of your pull requests merge conflicts.
      8. Once you've resolved all your merge conflicts, click **Commit merge**. This merges the entire base branch into your head branch.
      9. If prompted, review the branch that you are committing to. 
      If the head branch is the default branch of the repository (reiterating from above), you can choose either to update this branch with the changes you made to resolve the conflict, or to create a new branch and use this as the head branch of the pull request. 
      If you choose to create a new branch, enter a name for the branch. 
      If the head branch of your pull request is protected, you must create a new branch. You won't get the option to update the protected branch.
      Click **Create branch and update my pull request** or **I understand, continue updating BRANCH**. The button text corresponds to the action you are performing.
      10. To merge your pull request, click **Merge pull request**. 
      
    **More info on GitHub Conflict Editor:**
      - ⚠️ When you resolve a merge conflict on GitHub, the entire base branch of your pull request is merged into the HEAD branch. This means that you are integrating changes from the base branch into your head branch to resolve conflicts. This process helps ensure that your head branch has all the latest changes from the base branch. Once you resolve the conflicts, you commit the changes to your head branch. This commit will include the conflict resolutions and any changes brought in from the base branch. 
      - If the head branch is the default branch (e.g., main or master), GitHub might prompt you to create a new branch to serve as the head branch for your pull request to avoid committing directly to the default branch.
      - If the head branch is protected (i.e., it has certain restrictions to prevent direct modifications), you will need to create a new branch to complete the merge conflict resolution and commit the changes there. 

  2. For all other types of merge conflicts, you must resolve the merge conflict in a local clone of the repository and push the change to your branch on GitHub. You can use the command line or a tool like **GitHub Desktop** to push the change.

    **More info on Merge Conflicts on the Command Line:**
      - If you have a merge conflict on the command line, you cannot push your local changes to GitHub until you resolve the merge conflict locally on your computer. If you try merging branches on the command line that have a merge conflict, you'll get an error message.
      - Documentation: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line 

---

## `git cherry-pick`
`git cherry-pick <commit>` will replay that commit atop our current branch. In other words, when you use ` git cherry-pick`, Git calculates the diff between the specified commit and its parent commit and then applies that diff to the current branch. It will not contain the history of the cherry-picked commits branch. It will come with a new commit message that _may be based on the original commit's message_… to give futher importance to the content of the commit message. 

### Using `git cherry-pick` to simulate `git rebase`
Once you have `git cherry-pick` down, you can start off by thinking of `git rebase` as being a faster way to cherry-pick all of the commits in a given branch at once, rather than having to type out their IDs separately. 
Obviously, as seen above, `rebase` is far more powerful than just this capability.

In the following, the reason why we create a new branch before our `cherry-pick`ing (instead of just cherrypicking directly atop the `master` branch) are for the following reasons:
  1. **Safety and Experimentation:**
    Creating a new branch ensures that you don't alter the `master` branch until you're sure the `cherry-pick` operation is successful and doesn't introduce any issues. It provides a safe environment to test the changes. 

  2. **Avoiding Conflicts:**
    By working on a separate branch, you can resolve any conflicts without affecting the `master` branch.
    Once everything is resolved and tested, you can merge the changes into `master`. 

  3. **Preservation of Original State:**
    Keeping the `master` branch unchanged allows you to easily revert to its original state if something goes wrong during the `cherry-pick` operation. You can compare the changes or switch back without any hassle. 

### Visual Walkthrough
#### Initial Commit History
Assume we have the following commit history:
```plaintext
A -- B -- C -- D  (master)
       \
        E -- F -- G  (feature)
```

We want to rebase the `feature` branch onto `master`.

#### Step-by-Step Simulation Using `git cherry-pick`
1. **Checkout `master` and create a new branch to hold the rebased commits:**
   ```bash
   git checkout master
   git checkout -b feature-rebased
   ```

   The state of the branches is now:
   ```plaintext
   A -- B -- C -- D  (master, feature-rebased)
       \
        E -- F -- G  (feature)
   ```

2. **Cherry-pick each commit from `feature` onto `feature-rebased`:**
   ```bash
   git cherry-pick E
   git cherry-pick F
   git cherry-pick G
   ```

   After cherry-picking `E`:
   ```plaintext
   A -- B -- C -- D -- E'  (feature-rebased)
       \
        E -- F -- G  (feature)
   ```

   After cherry-picking `F`:
   ```plaintext
   A -- B -- C -- D -- E' -- F'  (feature-rebased)
       \
        E -- F -- G  (feature)
   ```

   After cherry-picking `G`:
   ```plaintext
   A -- B -- C -- D -- E' -- F' -- G'  (feature-rebased)
       \
        E -- F -- G  (feature)
   ```

#### Explanation:
- **Commit `E'`** is a new commit on `feature-rebased` that has the same changes as commit `E` from `feature`.
- **Commit `F'`** is a new commit on `feature-rebased` that has the same changes as commit `F` from `feature`.
- **Commit `G'`** is a new commit on `feature-rebased` that has the same changes as commit `G` from `feature`.

#### Summary:
We have effectively rebased the `feature` branch onto `master` by cherry-picking each commit from `feature` onto a new branch `feature-rebased` that starts from `master`.

#### Final Step (Optional):
To complete the rebase, you might want to move the `feature` branch to the new rebased position:
```bash
git branch -f feature feature-rebased
git checkout feature
```

Now the branches look like:
```plaintext
A -- B -- C -- D -- E' -- F' -- G'  (master, feature)
       \
        E -- F -- G  (old-feature)
```

You can delete the temporary `feature-rebased` branch if desired:
```bash
git branch -d feature-rebased
```

#### Visual Summary:
1. **Initial State:**
   ```plaintext
   A -- B -- C -- D  (master)
          \
           E -- F -- G  (feature)
   ```

2. **After Creating `feature-rebased`:**
   ```plaintext
   A -- B -- C -- D  (master, feature-rebased)
          \
           E -- F -- G  (feature)
   ```

3. **After Cherry-Picking Commits `E`, `F`, and `G`:**
   ```plaintext
   A -- B -- C -- D -- E' -- F' -- G'  (feature-rebased)
          \
           E -- F -- G  (feature)
   ```

4. **Move `feature` to New Rebasing Position (Optional):**
   ```plaintext
   A -- B -- C -- D -- E' -- F' -- G'  (master, feature)
          \
           E -- F -- G  (old-feature)
   ```
By cherry-picking each commit from the `feature` branch onto a new branch starting from `master`, we've manually simulated the rebase operation.

#### When to Use a New Branch
Creating a new branch (`feature-rebased`) before cherry-picking the commits is particularly useful in the following scenarios:
  * **Complex Rebase Operations**:
    If you're dealing with many commits or potential conflicts, having a separate branch helps isolate the changes.
  * **Review and Testing:** 
    You can review and test the changes on the new branch before merging them into `master`.
  * **Team Collaboration:** 
    In a collaborative environment, working on a new branch allows other team members to continue their work on `master` without disruption.

After ensuring that everything works correctly on the new branch (`feature rebased`), you can merge it into `master`:
```bash
git checkout master
git merge feature-rebased
```

This way, the changes are safely incorporated into `master`.
While yes, you can `cherry-pick` directly atop `master`, creating a branch first provides a safer, more flexible workflow.
It allows you to handle conflicts, review changes, and test thoroughly before merging into the main branch. 

This final step is comparable to our _fast-forward merge operation_ post rebasing…
When you perform a `git rebase`, Git effectively changes the parent of the first commit of the branch being rebased to point to the `HEAD` of the branch you are rebasing onto. This process involves creating new commits that are identical to the original commits, but with a different parent commit.

---


## Using Git in the Real World
The key to learning Git is like learning anything else. 
It's one thing to read about the shit. 
It's another to do the shit.

### Conventional Commits

### Seven Rules of a Thiccc Git Commit Message
1. Separate subject from body with a blank line.
2. Limit the subject line to 50 characters.
3. Capitalize the beginning of all subject lines with a capital letter.
4. Do not end the subject line with a period.
5. Use the imperative mood in the subject line.
6. Wrap the body at 72 characters.
7. Use the body to explain _what_ and _why_ vs. _how_.

### Commit Message Template
```bash
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Types & Rules
  - **fix:** a commit for the this type patches a bug in your codebase (this correlates with **PATCH** in Semantic Versioning).
  - **feat:** a commit of this type introduces a new feature to the codebase (this correlates with **MINOR** in Semantic Versioning).
  - **BREAKING CHANGE:** a commit that has a footer `BREAKING CHANGE:`, or appends a `!` after type/scope, introduces a breaking API change (correlating with **MAJOR** in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
  - <type>'s other than `fix:` and `feat:` are allowed, for example @commitlint/config-conventional (based on the Angular convention) recommends `build:` `chore:`, `ci:`. `docs:`, `style:`, `refactor:`, `perf:`, `test` and others.
  - Footers other than BREAKING CHANGE: <description> may be provided and follow a convention similar to ![git trailer format](https://git-scm.com/docs/git-interpret-trailers).

A breaking change refers to a modification in the code that introduces changes incompatible with previous versions of
the software. This means that the new version of the software will not work with the old version's code without requiring changes from the users of the software.

In the context of Conventional Commits, the `scope` is an optional part of the commit message that specifies the section or part of the codebase that the commit affects. It helps to give more context about what part of the project the change pertains to, making it easier for developers to understand what areas of the code are impacted by the commit.

Here’s how the `scope` fits into the commit message format:

```
<type>[optional scope]: <description>
```

#### Scope Parameters
  - **auth**: For changes related to authentication.
    ```
    feat(auth): add OAuth2 support
    ```

  - **api**: For changes related to the API.
    ```
    fix(api): handle edge case in endpoint
    ```

  - **ui**: For changes related to the user interface.
    ```
    style(ui): improve button styles
    ```

  - **docs**: For changes related to documentation.
    ```
    docs(readme): update usage instructions
    ```

  - **build**: For changes related to the build system or dependencies.
    ```
    chore(build): update webpack configuration
    ```

  - **tests**: For changes related to tests.
    ```
    test(unit): add tests for new feature
    ```

Using scopes helps in organizing and understanding the commit history, especially in larger projects where multiple areas of the codebase are maintained by different teams or individuals. It provides a more granular context to the changes being made.

Examples & More Info: ![Commit Message Examples](https://www.conventionalcommits.org/en/v1.0.0/#examples)

### Contributing to Open Source 
For small changes to an open source repository, it is typically okay to directly make a pull request. 
Otherwise, start some shit and create an issue. 
To do so, navigate to the main page of the repository, click **Issues**, click **New issue**, then follow the rest of the steps. You can also create an issue with GitHub CLI via the `gh issue create` subcommand. To skip the interactive prompts, include the `--body` and the `--title` flags.
Here are a couple examples of how it might look when creating an issue from the command line:
``` bash 
gh issue create --title "My problem with this shit" --body "Honestly, it isn't giving."

gh issue create --title "My Other Issue" --body "Here are more details." --assignee @me,deeznuts --label "bug, help me zaddy" --project onboarding --milestone "learning codebase"
```

**Here some considerations and best practices to keep in mind:**

**When It's Usually Okay to Directly Make a PR:**
1. **Small Fixes**:
  * **Typo Corrections** - fixing typos in documentation or comments.
  * **Minor Documentation Updates** - improving or clarifying existing documentation.
  * **Simple Bug Fixes** - addressing minor bugs that are straightforward to resolve.

2. **Non-Controversial Changes:**
  * Change that are unlikely to cause disagreements or require significant discussion.
  * Code style improvements that align with the existing coding conventions of the project.

**When You Should Consider Opening an Issue First:**
1. **Significant Changes:**
  * **New Features** - proposing new features or significant modifications.
  * **Refactoring** - Large-scale code restructuring or refactoring.
  * **Behavioral Changes** - alterations that change the behavior of the code in a noticeable way.

2. **Unclear Impact:**
  * When you are unsure about the impact of your change or how it might fit with the projects goals are architecture.

3. **Project Guidelines:**
  * Some projects have specific guidelines requesting contributors to open an issue before making a PR, regardless of the changes size. Always check the projects contribution guidelines.

#### Best Practices
1. **Check Contribution Guidelines:**
  * Always read and follow the projects contribution guidelines. They often provide specific instructions on how to contribute, including whether an issue should be opened before a PR.
2. **Small Commits:**
  * Make small, atomic commits that are easy to review and understand. This makes it easier for maintainers to review your PR.
3. **Descriptive PR Descriptions:**
  * Clearly describe what your PR does, why it's needed, and any relevant context. Even for small changes, a well-written PR description can help maintainers understand the purpose of your contribution.
4. **Link to Related Issues:** 
  * If your PR addresses an existing issue, make sure to link to that issue in your PR description. This helps maintainers track the relationship between issues and PRs. 

#### Example of a Small Fix PR Description
```markdown
### Summary

This PR fixes a typo in the README file.

### Description

Corrected the spelling of "accomodate" to "accommodate" in the "installation" section.

### Checklist

- [x] Documentation updated (if necessary)
```

#### Example of When to Open an Issue First  
If you are proposing a new feature or a significant change, you might open an issue like this:
```markdown
### Feature Request: Add Dark Mode Support
**Is your feature request related to a problem? Please describe.**
Some users prefer a dark mode to reduce eye strain in low-light environments.

**Describe the solution you'd like**
Add a dark mode toggle that switches the UI theme to a darker color palette.

**Describe alternatives you've considered**
Using browser extensions for dark mode, but native support would be more integrated and user-friendly.

**Additional context**
Would like to discuss the preferred implementation approach before proceeding with the PR.
```

#### The PR Workflow
The key players in this story will be the `upstream` (the original GitHub repository), the `origin` (your fork of that repository), and the "local" repository (your local clone of `origin`). Think of it as a happy triangle, except that "local" can only pull from `upstream`, not push.

Here is the typical workflow:
1. **Fork the Original Repository (Upstream):**
  - On GitHub, fork the original repository. This creates a copy of it under your GitHub about known as `origin`.
  - This creates a copy of the repository under your GitHub account, allowing you to push changes without affecting the original repository directly.

2. **Clone Your (Origin) Locally:**
  - Clone your fork to your local machine:
    ```bash
    git clone https://github.com/yourusername/original-repo.git
    cd original-repo
    ```
    
3. **Set Upstream Remote:**
  - Add the original repository as the `upstream` remote:
    ```bash
    git remote add upstream https://github.com/originalauthor/original-repo.git
    ```
  - This allows you to fetch updates from the original repository, ensuring your fork stays up to date with any changes  made by the original authors.

4. **Create a New Branch:**
  - Create a new branch for your changes:
    ```bash
    git checkout -b my-feature-branch
    ```
  - Branching ensures that your changes are isolated from the main codebase until they are reviewed and merged.

5. **Make Changes Locally:**
  - Make your changes and commit them locally:
    ```bash
    git add . 
    git commit -m "Change this shit and that shit"
    ```

6. **Push Changes to Your Fork (Origin):**
  - Push your changes to your fork on GitHub:
    ```bash
    git push origin my-feature-branch
    ```

7. **Create a Pull Request to the Original Repository (Upstream):**
  - On GitHub. navigate to your fork (`origin`) and you will see an option to create a pull request. Ensure the PR is directed from your branch (`my-feature-branch` on `origin`) to the appropriate branch (often `main` or `develop`) on the `upstream` repository.
  - A PR notifies the maintainers of the original repository about your changes and allows them to review, provide feedback and eventually merge your changes.

#### Keeping Your Forkin` Fork Up to Date
Updating your fork and keeping it in sync with the upstream repository is generally considered a good practice for a plethora of reasons. Even if you are not immediately applying your branch atop it.

**Reasons to Update Your Fork:** 
1. Stay Up-to-Date with Upstream Changes:
  - Keeping your fork updated ensures you have the latest bug fixes, features and improvements from the upstream repository. This can help you avoid duplicating work that has already been done by others.

2. Reduce Merge Conflicts:
  - By regularly syncing your fork with the upstream repository, you minimize the risk of running into large merge conflicts later. Smaller, more frequent updates are easier to manage and resolve.

3. Maintain Compatibility:
  - Ensuring your local repository is compatible with the latest upstream changes helps maintain compatibility with the main codebase. This is particularly important if the upstream repository is actively developed and your feature branch might interact with other parts of the codebase.

4. Simplify Collaboration:
  - If you are collaborating with others, keeping your fork updated ensures everyone is working with the same base code, reducing confusion and potential issues arising from outdated code.

To keep your fork in sync with the upstream repository, you can use the following commands:

1. **Fetch Changes from Upstream**
```bash
git fetch upstream
```

2. **Merge Changes into Your Local Branch:**
```bash
git checkout main
git merge upstream/main
```

3. **Push Updates to Your Fork:**
```bash
git push origin main
```

4. **(Optional) Rebase Your Feature Branch:**
```bash
git checkout my-feature-branch
git rebase main
```
Resolve any conflicts that arise during the rebase process.

You could also push your branch to `origin` without rebasing first; However, not without some implications. This is not to say that it isn't viable workflow, as this method is demonstrated in The Odin Projects official documentation regarding pull requests. These implications include, but are not limited to: potential merge conflicts, outdated changes, less clean commit history. Rebasing prior gives us the opportunity to test your branch with the latest changes from the upstream repository before making your pull request. 

#### Process Overview (18+, this section is a little vulgar)
1. Once you have the repo forked and cloned, and the upstream remote has been set, you can begin working on your issue.
2. Create and check out your branch and get to fuckin' on those keys.
3. Commit often as you work.
4. Sync your work with the upstream remote every so _any_ chance you get.
5. When you're ready to play with others/submit your work for integration, you can either push your branch to the forkin' (forked) repo… or you can apply your work atop the main branch via `rebase`, and handle any conflicts before shoving it up `origin`'s ass (your remote forked repository) via `push`. 
6. After pushing that shit, go to your forked repo on the Hub (No. Not that one. GitHub), and click the **Compare & pull request** button. If you have multiples of this button, be sure to click the one for the correct branch. If you don't see the button, click the branch drop down menu and then select the branch you just pushed from your local clone.
7. Once you have switched to the correct branch on GitHub. click the "Contribute" dropdown and then click the **Open Pull Request** button.
8. If there is a PR template, fill it out completely & correctly (Not adhering to the templates guidelines will delay the integration of your work and get your maintainers tight).
9. **Submit Dat Shit!**
10. Go for a walk and wait for a a wild maintainer to appear, responding either with comments, change requests or dopamine notifications (approval followed by a merge).

🥸 MK: "Get stamps. for internat."