#!/bin/bash

set -e

# Set S3 bucket
S3_BUCKET="cognito-loginid"
S3_DIRECTORY="lambdas/nodejs/passkey-only/"

cd nodejs

mkdir -p dist

# Building and archiving lambdas

echo "Archiving lambdas"


echo "Archiving DefineAuthChallenge lambda"
cd DefineAuthChallenge
zip -r ../dist/DefineAuthChallenge.zip .
cd ..

echo "Archiving VerifyAuthChallenge lambda"
cd VerifyAuthChallenge
zip -r ../dist/VerifyAuthChallenge.zip .
cd ..


echo "Building and Archiving CreateyAuthChallenge lambda"
cd CreateAuthChallenge
npm install jsonwebtoken jwk-to-pem

zip -r ../dist/CreateAuthChallenge.zip .

cd ..
# Uploading lambdas to s3 bucket


aws s3 cp dist/DefineAuthChallenge.zip "s3://$S3_BUCKET/$S3_DIRECTORY"
aws s3 cp dist/VerifyAuthChallenge.zip "s3://$S3_BUCKET/$S3_DIRECTORY"
aws s3 cp dist/CreateAuthChallenge.zip "s3://$S3_BUCKET/$S3_DIRECTORY"