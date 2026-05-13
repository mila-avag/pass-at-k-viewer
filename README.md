# Pass@k Audit Viewer — Reviewer Guide

## What is this?

A browser-based tool for auditing pass@k evaluation results. For each task, you'll review **2 randomly selected runs**, checking whether the grader scored each rubric criterion correctly and whether the agent's environment was set up properly.

**Live link:** https://mila-avag.github.io/pass-at-k-viewer/

---

## Getting started

1. Open the link above in Chrome, Firefox, or Edge.
2. Pick a task from the left sidebar (or use the search box to filter).
3. Go to the **Audit** tab and enter your name in the **Reviewer** field at the top.

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

### Reviewer name

Enter your name at the top. This is **per-task** — each task tracks who reviewed it independently, so different people can audit different tasks.

### Run selection

- Two runs are **auto-picked randomly** for you on your first visit to a task.
- You can change them via the dropdowns or click **Random 2** to re-roll.
- Each run shows its model, score, and trajectory/workspace links.
- Your run selection is saved automatically.

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
- **Overall task quality** dropdown: Looks Good, Has Issues, or Needs Discussion.

---

## Saving

### Auto-save

Everything you type is **automatically saved to your browser's local storage** within half a second. You'll see a "Saved" indicator in the audit toolbar. Your data persists across page reloads and browser restarts — no save button needed.

**Important:** Local storage is per-browser, per-device. If you switch browsers or clear site data, your progress is lost. Use the export options below as backup.

### Progress dots

Each task in the sidebar shows a colored dot:

| Dot | Meaning |
|-----|---------|
| **Gray** | Not started |
| **Yellow** | In progress (some fields filled) |
| **Green** | Done (all criteria reviewed for both runs + env checks completed) |

---

## Exporting your work

### Sidebar buttons (bottom-left)

| Button | What it does |
|--------|-------------|
| **Export** | Downloads a JSON backup of all your audit data |
| **Import** | Restores from a previously exported JSON file |

### Audit toolbar buttons

| Button | What it does |
|--------|-------------|
| **Export CSV** | Downloads a flat CSV (one row per run × criterion) for spreadsheets |
| **Sync to Sheet** | Pushes this task's audit data to Google Sheets |
| **Sync All to Sheet** | Pushes all tasks at once |

Google Sheets sync requires a Google Apps Script URL configured in the sidebar. Ask the project lead if this has been set up.

---

## Tips

- **Use the trajectory links** — click the trajectory/workspace URLs in the run cards to verify what the agent actually did before agreeing or disagreeing with the grader.
- **Export periodically** — click Export in the sidebar as a backup, especially before clearing browser data.
- **"Disagree" is valuable** — if the grader called PASS but you think it should be FAIL (or vice versa), select Disagree and explain why in the notes.

---

## FAQ

**I accidentally closed the tab. Is my work lost?**
No. Everything auto-saves to your browser. Just reopen the link.

**Can two people audit the same task?**
Yes, on different browsers/devices. Each person's data is stored locally. Use Export + Google Sheets to collect results.

**The page is blank or data didn't load.**
Hard-refresh with Ctrl+Shift+R (Cmd+Shift+R on Mac). The data is bundled with the page and loads automatically.

**How do I know when I'm done?**
All sidebar dots should be green, and every Audit tab should say "Audit (Done)".
