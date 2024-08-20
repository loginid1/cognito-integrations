STACK_NAME=PD-ABCBankLambdas
REGION=us-west-1
BASEURL=<loginid baseurl>
APIKEY=$APIKEY
COGNITO_ID=<cognito pool id>
COGNITO_CLIENT_ID=<cognito client id>
S3Bucket=cognito-loginid
S3Directory=lambdas/nodejs/passkey-only

export AWS_REGION=$REGION

aws  cloudformation create-stack \
    --stack-name $STACK_NAME \
    --template-body file://TemplateExisting.yaml \
    --parameters \
        ParameterKey="S3Bucket",ParameterValue="${S3Bucket}" \
        ParameterKey="S3Directory",ParameterValue="${S3Directory}" \
        ParameterKey="LOGINIDBaseURL",ParameterValue="${BASEURL}" \
        ParameterKey="LOGINIDAPIKeyID",ParameterValue="${APIKEY}" \
        ParameterKey="CognitoUserPoolID",ParameterValue="${COGNITO_ID}" \
        ParameterKey="CognitoClientID",ParameterValue="${COGNITO_CLIENT_ID}" \
    --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_NAMED_IAM


aws  cloudformation wait stack-create-complete --stack-name $STACK_NAME
aws  cloudformation describe-stacks --stack-name $STACK_NAME