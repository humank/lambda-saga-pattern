#!/bin/bash

name=kim-"$(date +'%Y%m%d%H%M%S')"

aws stepfunctions start-execution --state-machine-arn arn:aws:states:us-west-2:584518143473:stateMachine:sagapattern --name $name --input file://$1