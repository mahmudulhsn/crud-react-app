
build:
	docker-compose build --no-cache --force-rm
start:
	docker-compose up -d
stop:
	docker-compose stop
down:
	docker-compose down
setup:
	@make build
	@make start
	@make composer-update