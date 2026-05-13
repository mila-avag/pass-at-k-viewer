# Pass@k Audit Viewer — Reviewer Guide

## What is this?

A browser-based tool for auditing pass@k evaluation results. For each task, you'll review **2 randomly assigned runs** (from different models), checking whether the grader scored each rubric criterion correctly and whether the agent's environment was set up properly.

All reviewer data is synced to a shared Firebase database in real time — no manual saving or exporting required.

**Live link:** https://mila-avag.github.io/pass-at-k-viewer/

---

## Getting started

1. Open the link above in Chrome, Firefox, or Edge.
2. Pick a task from the left sidebar (or use the search box to filter).
3. Go to the **Audit** tab and enter your name in the **Reviewer** field.

---

## Navigating a task

Each task has 5 tabs:

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

Enter your name at the top. This is **per-task** — each task tracks who reviewed it independently.

### Assigned runs

Two runs are **randomly assigned** the first time any reviewer opens the task. They are locked and cannot be changed. The runs are always from **different models** (e.g. one Opus, one Gemini). Each run shows its model, score, and trajectory/workspace links.

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

### Auto-save to Firebase (no action needed)

Everything you type is **automatically saved** within a couple of seconds — both locally in your browser and to a shared Firebase database. You'll see a "Saved" indicator in the audit toolbar.

Because all data syncs to Firebase, **your work is visible to the whole team** and persists across devices and browsers. If you open the viewer on a different computer, your previous audit data will load automatically.

### Progress dots

Each task in the sidebar shows a colored dot:

| Dot | Meaning |
|-----|---------|
| **Gray** | Not started |
| **Yellow** | In progress (some fields filled) |
| **Green** | Done (all criteria reviewed for both runs + env checks completed) |

---

## Exporting (optional)

These are convenience features — Firebase is the primary storage.

| Button | Location | What it does |
|--------|----------|-------------|
| **Export** | Sidebar (bottom) | Downloads a JSON backup of all your local audit data |
| **Import** | Sidebar (bottom) | Restores from a previously exported JSON file |
| **Export CSV** | Audit toolbar | Downloads a flat CSV (one row per run x criterion) for spreadsheets |

---

## Tips

- **Use the trajectory links** — click the trajectory/workspace URLs in the run cards to verify what the agent actually did before agreeing or disagreeing with the grader.
- **"Disagree" is valuable** — if the grader called PASS but you think it should be FAIL (or vice versa), select Disagree and explain why in the notes.
- **You don't need to export** — Firebase stores everything automatically. Export is just a backup option.

---

## FAQ

**I accidentally closed the tab. Is my work lost?**
No. Everything auto-saves to Firebase and to your browser. Just reopen the link.

**Can two people audit the same task?**
Yes. Each person's data is saved under their reviewer name. The Firebase database stores the latest state per task.

**The page is blank or data didn't load.**
Hard-refresh with Ctrl+Shift+R (Cmd+Shift+R on Mac). The data is bundled with the page and loads automatically.

**How do I know when I'm done?**
All sidebar dots should be green, and every Audit tab should say "Audit (Done)".

**Can I work offline?**
Yes — data saves locally in your browser and will sync to Firebase next time you're online.
