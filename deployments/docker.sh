#!/bin/bash

echo "It is a test"
echo ${BUILD_ID}
echo ${WORKSPACE}
ls -al
ls ./dist 

if [ "${EVN}" = "pre" ];then
    docker build -f ./deployments/Dockerfile -t pre-jjh-web:${VERSION}-${BUILD_ID} .
else
    docker build -f ./deployments/Dockerfile -t jjh-web:${VERSION}-${BUILD_ID} .
fi
