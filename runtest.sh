#!/bin/bash
accountid=$(aws sts get-caller-identity --output text --query 'Account')
region=$(aws configure get region)
name=demo-"$(date +'%Y%m%d%H%M%S')"

aws stepfunctions start-execution --state-machine-arn arn:aws:states:$region:$accountid:stateMachine:sagapattern --name $name --input file://$1