STACK_NAME=PD-PasskeyCPO
REGION=us-west-1

export AWS_REGION=$REGION

S3Bucket=cognito-loginid
S3Directory=lambdas/nodejs

aws  cloudformation create-stack \
    --stack-name $STACK_NAME \
    --template-body file://CognitoPoolOnly.yaml \
     --parameters \
        ParameterKey="S3Bucket",ParameterValue="${S3Bucket}" \
        ParameterKey="S3Directory",ParameterValue="${S3Directory}" \
    --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_NAMED_IAM


aws  cloudformation wait stack-create-complete --stack-name $STACK_NAME
aws  cloudformation describe-stacks --stack-name $STACK_NAME