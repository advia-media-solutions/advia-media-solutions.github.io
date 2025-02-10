#!/bin/bash

# Exit on error
set -e

PROJECT_ID="advia-tech-website"
REGION="europe-west1"
SERVICE_NAME="website"

echo "Attempting to configure access for Cloud Run service..."

# Try domain-restricted access first
echo "Attempting domain-restricted access..."
if gcloud run services set-iam-policy $SERVICE_NAME \
  --region=$REGION \
  --project=$PROJECT_ID \
  iam-policies/domain-policy.yaml; then
  echo "Successfully configured domain-restricted access"
  exit 0
fi

# If domain-restricted fails, try authenticated users
echo "Attempting authenticated users access..."
if gcloud run services set-iam-policy $SERVICE_NAME \
  --region=$REGION \
  --project=$PROJECT_ID \
  iam-policies/authenticated-policy.yaml; then
  echo "Successfully configured authenticated users access"
  exit 0
fi

# If authenticated fails, try public access
echo "Attempting public access..."
if gcloud run services set-iam-policy $SERVICE_NAME \
  --region=$REGION \
  --project=$PROJECT_ID \
  iam-policies/public-policy.yaml; then
  echo "Successfully configured public access"
  exit 0
fi

echo "Failed to configure access with any policy"
exit 1