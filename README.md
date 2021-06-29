## Genesis Logger service

### Setup:

1. npm install
2. create .env with .env.dev as example
3. configure logstash.conf in logstash folder
4. setup elasticsearch, kibana, rabbitmq
5. npm test if you wish
6. npm run dev

### Dockerized setup ( recommended )

1. configure docker-compose.yml if you wish so
2. docker-compose up -d

## How to use?

send to the same rabbitmq service which this service connected, to queue "logger" an object with this required fields:

```
    level: string ['info', 'warn', 'error ] || 'info'
    title: string;
    scope: string
    system: string;
    service: string;
```

And you can pass any other property you wish to extraFields object.

examples:

```
    {level: 'info', title: 'writing user', system: 'kartoffel', service: 'write', scope: 'application', extraFields: {user: 'haha@haha.com'}}
    {level: 'warn', title: 'writing user', system: 'kartoffel', service: 'write', scope: 'application' extraFields: {user: 'haha@haha.com', message: 'not needed operation'}}
    {level: 'error', title: 'merging user', system: 'karting', service: 'merger', scope: 'application', extraFields: {user: 'haha@haha.com', message: 'very verbose error that happened with merging user haha@haha.com, the user sucks and is broken so merge failed'}}
    {level: 'error', title: 'sending to kartoffel', system: 'karting', service: 'build', scope: 'http', extraFields: {user: 'haha@haha.com', message: 'everything was succesful but there was error sending the result to kartoffel, with error 500.'}}
```

Now access localhost:5601 to view kibana, from here it depends what you configured in kibana, but in general you
can go to discover tab, add "logstash\*" and you will see all the logs, and will be able to filter them as you wish.

fix elastic bug:

```
    untill restart:
        sysctl -w vm.max_map_count=262144

    Permament:
        In your host machine
        nano /etc/sysctl.conf
        make entry vm.max_map_count=262144
        restart

    or for windows(only untill restart):
        wsl -d docker-desktop
        sysctl -w vm.max_map_count=262144

```
