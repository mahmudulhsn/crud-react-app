
build:
	docker-compose build --no-cache --force-rm
start:
	docker-compose up -d
stop:
	docker-compose stop
down:
	docker-compose down
npm-install:
	docker exec frontend_container bash -c "npm install"
setup:
	@make build
	@make start
	@make npm-install