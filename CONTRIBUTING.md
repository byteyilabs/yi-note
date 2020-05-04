# Contributing to YiNote Repo

## Commit Message Guidelines

### Git Commit Messages

We use an adapted form of [Conventional Commits](http://conventionalcommits.org/).

- Use the present tense ("Adds feature" not "Added feature")
- Limit the first line to 72 characters or less
- Add one feature per commit. If you have multiple features, have multiple commits.

### Template

    <type>: Short Description of Commit
    <BLANKLINE>
    More detailed description of commit
    <BLANKLINE>
    (Optional) Resolves: <Issue #>

### Template for specific package change

    <type>[<package-name>]: Short Description of Commit
    <BLANKLINE>
    More detailed description of commit
    <BLANKLINE>
    (Optional) Resolves: <Issue #>

### Type

Types include:

- `feat` when creating a new feature
- `fix` when fixing a bug
- `test` when adding tests
- `refactor` when improving the format/structure of the code
- `docs` when writing docs
- `release` when pushing a new release
- `chore` others (ex: upgrading/downgrading dependencies)

### Example

    docs: Updates CONTRIBUTING.md

    Updates Contributing.md with new template

    Resolves: #1234

### Example for specific package change

    fix(background): Fixes background bug

    Fixes a very bad bug in background

    Resolves: #5678
