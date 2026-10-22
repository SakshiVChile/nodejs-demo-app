# nodejs-demo-app

Task 1 – Automate Code Deployment Using a CI/CD Pipeline (GitHub Actions)

A small Node.js web app with a GitHub Actions pipeline that tests the code, builds a Docker image, and pushes it to Docker Hub every time I push to `main`.

## What I did

1. Built a simple Node.js web server (`src/app.js`, `src/server.js`) with a home page (`/`) and a health check (`/health`).
2. Wrote automated tests (`test/app.test.js`) using Node's built-in test runner. Run them with `npm test`.
3. Wrote a `Dockerfile` that packages the app into a Node 20 Alpine image.
4. Created the pipeline in `.github/workflows/main.yml`, triggered on every push to `main`:
   - **test job**: checks out the code, sets up Node.js 20, runs `npm test`.
   - **build-and-push job** (runs only if tests pass): logs in to Docker Hub, builds the image, and pushes it tagged `latest` and with the commit SHA.
5. Stored Docker Hub credentials as GitHub repository secrets instead of putting them in the code.

## Pipeline flow

```
push to main  ->  test  ->  build Docker image  ->  push to Docker Hub
```

## Run it locally

```bash
npm test          # run the tests
npm start         # start the app on http://localhost:3000

docker build -t nodejs-demo-app .
docker run -p 3000:3000 nodejs-demo-app
```

## Secrets needed

Add these under **Settings -> Secrets and variables -> Actions**:

| Secret | Value |
| --- | --- |
| `DOCKERHUB_USERNAME` | my Docker Hub username |
| `DOCKERHUB_TOKEN` | a Docker Hub access token (not my password) |

## Screenshots

Add screenshots here: the successful workflow run in the Actions tab, and the pushed image on Docker Hub.

## What I learned

- How a CI/CD pipeline moves code from commit to a deployable image automatically.
- The difference between jobs and steps, and how `needs` makes one job wait for another.
- Why secrets belong in GitHub Secrets and not in the repository.
