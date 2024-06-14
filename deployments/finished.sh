#!/bin/bash

docker login  -u flct -p flctEHAcRqW12 https://docker.flct.io/

if [ "${EVN}" = "pre" ];then
    docker tag pre-jjh-web:${VERSION}-${BUILD_ID} docker.flct.io/flct/pre-jjh-web:${VERSION}-${BUILD_ID}
    docker push docker.flct.io/flct/pre-jjh-web:${VERSION}-${BUILD_ID}
else
    docker tag jjh-web:${VERSION}-${BUILD_ID} docker.flct.io/flct/jjh-web:${VERSION}-${BUILD_ID}
    docker push docker.flct.io/flct/jjh-web:${VERSION}-${BUILD_ID}
fi