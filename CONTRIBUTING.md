# Pushing Your Project to GitHub

Here's a step-by-step guide to get your project from your local machine into a new GitHub repository.

### Prerequisites

*   You have [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed on your machine.
*   You have a [GitHub account](https://github.com/join).

### Step 1: Initialize a Git Repository

First, you need to initialize a Git repository in your project's root folder. Open your terminal or command prompt, navigate to your project directory, and run:

```bash
git init -b main
```

This command creates a new `.git` subdirectory and sets your default branch name to `main`.

### Step 2: Add and Commit Your Files

Next, add all your project files to the staging area and commit them.

```bash
# Add all files to be tracked
git add .

# Create your first commit
git commit -m "Initial commit: My ShopNGo Project"
```

### Step 3: Create a New Repository on GitHub

1.  Go to [GitHub](https://github.com) and log in.
2.  Click the `+` icon in the top-right corner and select **"New repository"**.
3.  Give your repository a name (e.g., `shopngo-app`).
4.  You can add an optional description.
5.  Choose whether to make it **Public** or **Private**.
6.  **Important**: Do **not** initialize the repository with a `README`, `.gitignore`, or license file, as your project already has these.
7.  Click **"Create repository"**.

### Step 4: Link Your Local Repository to GitHub

On the next page, GitHub will show you a repository URL. Copy it. It will look something like this: `https://github.com/your-username/your-repo-name.git`.

Now, in your terminal, run the following command to link your local project to the remote GitHub repository. Replace the URL with your own.

```bash
git remote add origin https://github.com/your-username/your-repo-name.git
```

### Step 5: Push Your Code to GitHub

Finally, push your committed files to your new GitHub repository:

```bash
git push -u origin main
```

And that's it! Refresh your GitHub repository page, and you should see all your project files there.
