# bhp-enforcer

> A GitHub App built with [Probot](https://github.com/probot/probot) that Enforces requirements for bheng PRs

## Bright Health PR Rules
### PR Title
The commits for a PR are squashed when merged to master for all repos in the Consumer Platformer team. When Github does this, it take the PR's title and that becomes the primary commit on master with the extended description being the individual commits from the PR. To keep master's history parseable, easy to identify changes to revert (if necessary), and for compliance/auditing purposes, all commits on master should contain the Jira ticket for which the work was done. This rule enforces that the PR title be in the following format:
```
[<Jira Ticket ID>] <PR Description>
```

Example:
```
[CP-246] Adjusted header for IFP Plans page
```

## Deploy updates
To deploy updates to the app:
- Log in to Glitch
- copy/import the latest code

## Setup

```sh
# Install dependencies
npm install

# Run typescript
npm run build

# Run the bot
npm start
```

## Contributing

If you have suggestions for how bhp-enforcer could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2020 Taylor Cannon <tcannon@brighthealthplan.com>
