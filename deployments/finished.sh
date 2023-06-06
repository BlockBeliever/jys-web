#!/bin/bash

docker login  -u flct -p flctEHAcRqW12 https://docker.flct.io/

if [ "${EVN}" = "pre" ];then
    docker tag pre-jys-web:${VERSION}-${BUILD_ID} docker.flct.io/flct/pre-jys-web:${VERSION}-${BUILD_ID}
    docker push docker.flct.io/flct/pre-jys-web:${VERSION}-${BUILD_ID}
else
    docker tag jys-web:${VERSION}-${BUILD_ID} docker.flct.io/flct/jys-web:${VERSION}-${BUILD_ID}
    docker push docker.flct.io/flct/jys-web:${VERSION}-${BUILD_ID}
fi