# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Pull Requests

Every PR description **must** include a **URL for testing** section linking to the
branch's AEM preview environment, so reviewers can test the change live.

The preview URL follows the AEM Edge Delivery branch pattern
(`https://<branch>--<repo>--<owner>.aem.page/`), with any `/` in the branch name
replaced by `-`. For example, for branch `claude/upbeat-aryabhata-ea4053`:

```
URL for testing:

- https://claude-upbeat-aryabhata-ea4053--mdanderson-eds--adobedrago.aem.page/
```
