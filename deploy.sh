#!/bin/bash

# Exit on any error
set -e

# Configuration
PROJECT_ID="advia-tech-website"
REGION="europe-west1"
REPOSITORY="website-repo"
IMAGE_NAME="website"

# Generate a timestamp for the image tag
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

# Ensure we're using the right builder
docker buildx use builder 2>/dev/null || docker buildx create --name builder --driver docker-container --bootstrap --use

# Build and push the image for amd64 platform
echo "Building and pushing Docker image..."
docker buildx build \
  --platform linux/amd64 \
  --push \
  -t "$REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/$IMAGE_NAME:$TIMESTAMP" \
  -t "$REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/$IMAGE_NAME:latest" \
  .

# Deploy to Cloud Run
echo "Deploying to Cloud Run..."
gcloud run deploy website \
  --image "$REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/$IMAGE_NAME:$TIMESTAMP" \
  --platform managed \
  --region $REGION \
  --project $PROJECT_ID \
  --no-allow-unauthenticated

# Add IAM policy binding to allow public access
echo "Setting IAM policy to allow public access..."
gcloud run services add-iam-policy-binding website \
  --region=$REGION \
  --project=$PROJECT_ID \
  --member=allUsers \
  --role=roles/run.invoker

echo "Deployment complete!"

# Print the service URL
gcloud run services describe website \
  --region $REGION \
  --project $PROJECT_ID \
  --format='value(status.url)'