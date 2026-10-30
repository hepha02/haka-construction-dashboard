# Operating constraints

- Production is in active use. Preserve all existing rows, identifiers, names, monetary values, statuses, uploaded objects, authentication accounts, and permissions.
- Use production only for read-only inspection while implementing this overhaul. Never run schema.sql, seeds, TRUNCATE, DELETE, bulk UPDATE/UPSERT, a restore, a reset, or a migration against production as part of development or testing.
- Develop and test with localhost `?preview=1`, which must not create a Supabase client. Never use real customer data in screenshots, fixtures, Git history, or test output.
- `.private-backups/` contains sensitive data and attachments. Keep it ignored and never upload it to GitHub or publish it as a web asset. Application JSON and file copies are supplementary backups; do not claim a full database restore test has succeeded without actually verifying one.
- People can add and approve payments during development. Do not overwrite production from a snapshot. Preserve conditional writes and detect zero-row updates so an approval cannot be silently overwritten by a stale edit.
- Keep approved gross cost, net transfers, withholding, pending requests, and legacy ledger figures distinct. Do not add legacy ledger totals to new payment totals.
- Business-income payments need conspicuous Amaranth (아마란스) reporting reminders. Filing happens in Amaranth; do not implement filing or claim to track filing completion here.
- Prepare the source branch and a local reviewable preview first. Production deployment is a separate release step after the user reviews the result and the current data-preservation checks.
