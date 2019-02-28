#!/bin/bash
aws stepfunctions create-state-machine --name sagapattern --definition file://stepfunc.json --role-arn "arn:aws:iam::584518143473:role/service-role/StatesExecutionRole-us-west-2"
