
build:
	docker-compose build --no-cache --force-rm
start:
	docker-compose up -d
stop:
	docker-compose stop
down:
	docker-compose down
npm-install:
	docker exec crud_frontend_app bash -c "npm install"
shell:
	docker exec -it crud_frontend_app bash
setup:
	@make build
	@make start