.PHONY: web agent server all clean

web:
	cd web && npm ci && npm run build

agent:
	CGO_ENABLED=0 go build -o bin/agent ./cmd/agent

server: web
	mkdir -p cmd/server/web
	cp -r web/dist cmd/server/web/dist
	CGO_ENABLED=1 go build -o bin/server ./cmd/server

all: agent server

clean:
	rm -rf bin/ web/dist cmd/server/web/dist
