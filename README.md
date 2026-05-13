# Pass@k Audit Viewer — Reviewer Guide

## What is this?

A browser-based tool for auditing pass@k evaluation results. For each task, you'll review **2 randomly selected runs**, checking whether the grader scored each rubric criterion correctly and whether the agent's environment was set up properly.

**Live link:** https://mila-avag.github.io/pass-at-k-viewer/

---

## Getting started

1. Open the link above in Chrome, Firefox, or Edge.
2. **Enter your name** in the "Reviewer" field at the bottom of the left sidebar. This is saved locally and attached to all your audit submissions.
3. Pick a task from the sidebar (or use the search box to filter).

---

## Navigating a task

Each task has 5 tabs across the top:

| Tab | What it shows |
|-----|--------------|
| **Overview** | Pass@k rates, score distribution, and summary stats |
| **All Runs** | Table of every run with scores and model info |
| **Criteria Analysis** | Per-criterion pass/fail rates across all runs |
| **Compare 2 Runs** | Side-by-side detailed comparison (for exploration) |
| **Audit** | **This is where you do your review work** |

---

## How to audit a task

Go to the **Audit** tab. It has 4 sections:

### Run selection (top)

- Two runs are **auto-picked randomly** for you on your first visit.
- You can change them via the dropdowns or click **Random 2** to re-roll.
- Each run shows its model, score, and trajectory/workspace links.

### 1. Environment Check

- **"All input files exist that the prompt needs"** — check the trajectory/workspace to confirm the agent had access to required input files.
- **"Agent was not hindered by its environment"** — confirm the sandbox, tools, etc. didn't block the agent unfairly.
- Add notes if anything was off.

### 2. Grading Accuracy — Per Criterion

For each rubric criterion, you'll see **two side-by-side boxes** (Run A and Run B), each showing:

- The **grader's verdict** (PASS/FAIL) and its justification
- A dropdown for **your opinion**: Agree, Disagree, or Unsure
- A notes field for explanation (especially if you disagree)

**What to ask yourself:** "Given the trajectory and workspace, did the grader call this criterion correctly?"

### 3. Other Issues

- Free-text field for anything else weird you noticed.
- **Overall task quality** dropdown: "Looks Good", "Has Issues", or "Needs Discussion".

---

## Saving and exporting

### Auto-save (no action needed)

Everything you type is **automatically saved to your browser's local storage** within 500ms. You'll see a "Saved" indicator in the audit toolbar. Your data persists across page reloads and browser restarts.

**Important:** Local storage is per-browser and per-device. If you switch browsers or clear site data, your progress is lost — use the export options below as backup.

### Sidebar progress dots

Each task in the sidebar shows a colored dot:
- **Gray** — not started
- **Yellow** — in progress (some fields filled)
- **Green** — done (all criteria reviewed for both runs + env checks completed)

### Export / Import (bottom of sidebar)

| Button | What it does |
|--------|-------------|
| **Export** | Downloads a JSON file with all your audit data across all tasks |
| **Import** | Restores from a previously exported JSON file |
| **Load CSV** | Loads a different data CSV (you shouldn't need this — data is pre-loaded) |

### Export CSV (in audit toolbar)

The **Export CSV** button inside the Audit tab exports a flat CSV with one row per run × criterion, suitable for pasting into a spreadsheet.

### Google Sheets sync (optional)

If a Google Apps Script URL has been configured in the sidebar:
- **Sync to Sheet** — pushes the current task's audit data
- **Sync All to Sheet** — pushes all tasks at once

Ask the project lead if this has been set up.

---

## Tips

- **Use the trajectory links** — click the trajectory/workspace URLs in the run cards to verify what the agent actually did before agreeing/disagreeing with the grader.
- **"Disagree" is useful** — if the grader called PASS but you think it should be FAIL (or vice versa), select "Disagree" and explain why in the notes.
- **Export periodically** — click Export in the sidebar every so often as a backup.
- **You can re-audit** — changing the selected runs will update the criteria section, but your saved opinions stay tied to the criterion IDs.

---

## FAQ

**Q: I accidentally closed the tab. Is my work lost?**
No. Everything is saved in your browser automatically. Just reopen the link.

**Q: Can two people audit the same task?**
Yes, as long as they're on different browsers/devices. Each person's data is stored locally. Use Export + Google Sheets to merge results.

**Q: The page is blank / data didn't load.**
Hard-refresh (Ctrl+Shift+R / Cmd+Shift+R). The CSV data is bundled with the page and should load automatically.

**Q: How do I know when I'm done?**
All sidebar dots should be green. You can also check: if every task shows "Audit (Done)" in its tab label, you've completed the full review.
