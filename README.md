# lambda-saga-pattern

Implements the Saga pattern for Lambda functions using Step Functions.

The example is based on Catie McCaffrey's example in her talk on [Applying the
Saga pattern](https://www.youtube.com/watch?v=xDuwrtwYHu8).

Each request has a compensating request for rollback.

The Saga goes like this:

```
Begin saga
  Start book hotel request
  End book hotel request
  Start book flight request
  End book flight request
  Start book car rental request
  End book car rental request  
End saga
```

We'll need a transaction log for the saga, and Step Functions would be our
coordinator for the saga.

Because the compensating requests can also fail so we need to be able to retry
them until success, which means they have to be **idempotent**.

This demo implements **backward recovery** only.

For *forward recovery* you also need to ensure the requests are imdempotent.

The code for the corresponding Step Function is [here](https://gist.github.com/theburningmonk/cf194c7dc5ac1f1acdb278d94eb1dfa7).

## Setup AWS environment

### Create Step Function Execution Role

It could be a service role or self defined one, which contains the following policy :

```shell
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "lambda:InvokeFunction"
            ],
            "Resource": "*"
        }
    ]
}
```

### Modify execution script

All the scripts default run in us-west-2. If you'd like to deploy to different region, make sure the following files are also modified.

* runtest.sh
* deploy-stepfunc.sh

you need to replace real aws account id in the previous script files.
Besides, replace the execution role in deply-stepfunc.sh

Replace "ROLEARN" with you created one.

## Lambda Function Deployment

This serverless lambda function is developing with Serverless  Framework adopted.

To deploy this example to an AWS environment, run:

`./build.sh deploy <stage> <region> <aws_profile>`

example

`/build.sh deploy dev us-west-2 default`

which will install NPM packages and use the `Serverless` framework to deploy both
DynamoDB tables as well as Lambda functions to the account.

To remove the demo, run:

`./build.sh remove <stage> <region> <aws_profile>`

## Deploy Step Functions

`./deploy-stepfunc.sh`

## Run Test

Try success scenario

`/runtest.sh test-booking-success.json`

Try compensate scenario

`/runtest.sh test-booking-fail.json`