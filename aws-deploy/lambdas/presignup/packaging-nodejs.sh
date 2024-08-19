#!/bin/bash

set -e

# Set S3 bucket
S3_BUCKET="cognito-loginid"
S3_DIRECTORY="lambdas/nodejs/"

cd nodejs

mkdir -p dist

# Building and archiving lambdas

echo "Archiving lambdas"

echo "Archiving PreSignUp lambda"
cd PreSignUp
zip -r ../dist/PreSignUp.zip .

# Uploading lambdas to s3 bucket
cd ..

aws s3 cp dist/PreSignUp.zip "s3://$S3_BUCKET/$S3_DIRECTORY"
