setup:
	echo ">>> VZY API >>>>"

dev-start: setup
	docker-compose -f ./docker-compose-dev.yml up --build --remove-orphans

dev-start-detach:
	docker-compose -f ./docker-compose-dev.yml up -d

dev-stop:
	docker-compose -f ./docker-compose-dev.yml -f docker-compose.dev.yml down --remove-orphans
