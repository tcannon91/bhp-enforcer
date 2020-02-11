import { Application } from 'probot' // eslint-disable-line no-unused-vars

const prTitleRegex = new RegExp(`^\\[(([A-Z]+-\d+)|(NO_TICKET))\\].+$`);

export = (app: Application) => {
  app.on('pull_request', async (context) => {
    let descriptionError = false;
    let squashError = false;
    let signOffsError = false;

    const githubDetails = {
      owner: context.payload.repository.owner.login,
      pull_number: context.payload.pull_request.number,
      repo: context.payload.repository.name,
    };

    // Check PR Title
    const titleToParse = context.payload.pull_request.title;
    if (!prTitleRegex.test(titleToParse)) {
      // DOES NOT MEET STANDARDS
      await context.github.pulls.createReview({
        ...githubDetails,
        event: 'REQUEST_CHANGES',
        body: `This PR does not meet our description standards, please update the title to the following format:
          \`\`\`[<jira_id>] <PR Description>\`\`\`
        `,
      });

      descriptionError = true;
    }

    // Check for squashed commits
    if (context.payload.pull_request.commits > 1) {
      // DOES NOT MEET STANDARDS
      await context.github.pulls.createReview({
        ...githubDetails,
        event: 'REQUEST_CHANGES',
        body: `Please squash commits prior to requesting a review. See this [reference](https://linuxhint.com/how-to-squash-git-commits/) for squashing instructions.`,
      });

      squashError = true;
    }

    // Everything is looking good
    if (!descriptionError && !squashError && !signOffsError) {
      await context.github.pulls.createReview({
        ...githubDetails,
        event: 'APPROVE',
        body: "All checks passing, you are good to go.",
      });
    }
  });
}
