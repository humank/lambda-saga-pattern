#!/bin/bash

accountid=$(aws sts get-caller-identity --output text --query 'Account')
region=$(aws configure get region)

aws stepfunctions create-state-machine --name sagapattern --definition file://stepfunc.json --role-arn "ROLEARN"
