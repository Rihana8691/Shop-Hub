# Deploy Shop Hub to Render

## Quick Deploy Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

### 2. Deploy on Render
1. Go to [render.com](https://render.com)
2. Sign up/login with your GitHub account
3. Click **"New +"** and select **"Static Site"**
4. Connect your GitHub repository
5. Configure deployment:
   - **Name**: `shop-hub-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Node Version**: `18`

### 3. Environment Variables (Optional)
Add any environment variables if needed:
- `NODE_VERSION`: `18`

### 4. Deploy
Click **"Create Static Site"** and Render will automatically deploy your app.

## Alternative: Using render.yaml (Infrastructure as Code)

If you have the `render.yaml` file in your root directory:

1. Push your code to GitHub
2. In Render dashboard, click **"New +"** > **"Web Service"**
3. Select your repository
4. Render will automatically detect and use your `render.yaml` configuration

## What Happens During Deployment

1. Render pulls your code from GitHub
2. Runs `npm install` to install dependencies
3. Runs `npm run build` to create the production build
4. Serves the static files from the `dist` folder
5. Your app gets a public URL like `https://your-app-name.onrender.com`

## Post-Deployment

- Your app will be available at the provided URL
- Automatic deployments are enabled for future pushes
- You can monitor deployment logs in the Render dashboard
- Custom domains can be configured in Render settings

## Troubleshooting

If deployment fails:
1. Check the deployment logs in Render dashboard
2. Ensure all dependencies are in package.json
3. Verify build command works locally
4. Make sure the build output is in the correct directory (`frontend/dist`)
