sudo docker login  -u admin -p Fh7FSgEQ6hMn8MB7Q4URnh76eEDdIXAg https://docker.biyong.com/

## api
docker rm -f shop-admin
sudo docker run -d --name shop-admin --network phoenix  -p 6061:80 --restart=always  docker.biyong001.com/pre/shop-admin:1.0.0-3


