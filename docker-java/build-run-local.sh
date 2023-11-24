

NAME=test-java-corretto

docker kill $NAME
docker rmi $NAME
#docker build --no-cache -t $NAME .
docker build -t $NAME .
docker run -p 8080:8080 -d --privileged --name $NAME -h $NAME --rm $NAME
